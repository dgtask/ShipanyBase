"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  Loader2,
  Music,
  Clock,
  User,
  Download,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useSession } from "@/core/auth/client";
import { useAppContext } from "@/contexts/app";

interface SunoSongData {
  id: string;
  audioUrl: string;
  sourceAudioUrl: string;
  streamAudioUrl: string;
  sourceStreamAudioUrl: string;
  imageUrl: string;
  sourceImageUrl: string;
  prompt: string;
  modelName: string;
  title: string;
  tags: string;
  createTime: number;
  duration: number;
}

interface GeneratedSong {
  id: string;
  title: string;
  duration: number;
  audioUrl: string;
  imageUrl?: string;
  artist: string;
  style: string;
  status: string;
  prompt?: string;
}

interface SongGeneratorProps {
  srOnlyTitle?: string;
  className?: string;
}

export function MusicGenerator({ className, srOnlyTitle }: SongGeneratorProps) {
  const { user, isCheckSign, setIsShowSignModal } = useAppContext();

  // Form state
  const [customMode, setCustomMode] = useState(false);
  const [model, setModel] = useState("V4_5");
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("");
  const [instrumental, setInstrumental] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [prompt, setPrompt] = useState("");

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [generatedSongs, setGeneratedSongs] = useState<GeneratedSong[]>([]);
  const [currentPlayingSong, setCurrentPlayingSong] =
    useState<GeneratedSong | null>(null);
  const [generationStartTime, setGenerationStartTime] = useState<number | null>(
    null
  );

  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Task polling
  const pollTaskStatus = async (taskId: string) => {
    try {
      // Check timeout (3 minutes = 180000ms)
      if (generationStartTime) {
        const elapsedTime = Date.now() - generationStartTime;
        if (elapsedTime > 180000) {
          setIsGenerating(false);
          setProgress(0);
          setGenerationStartTime(null);
          toast.error("Song generation timed out. Please try again.");
          return true; // Stop polling
        }
      }

      const response = await fetch("/api/ai-song/query-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }),
      });

      if (!response.ok) {
        throw new Error("Failed to query task status");
      }

      const { code, message, data } = await response.json();
      if (code !== 0) {
        throw new Error(message || "Failed to query task status");
      }

      if (data) {
        const { status, response: responseData } = data;

        // Handle ERROR status (any status containing ERROR)
        if (status && status.includes("ERROR")) {
          setIsGenerating(false);
          setProgress(0);
          setGenerationStartTime(null);

          let errorMessage = "Song generation failed";
          if (status === "SENSITIVE_WORD_ERROR") {
            errorMessage =
              "Generation failed due to sensitive content. Please modify your prompt and try again.";
          } else {
            errorMessage = `Generation failed: ${status
              .replace("_ERROR", "")
              .toLowerCase()
              .replace("_", " ")}`;
          }

          toast.error(errorMessage);
          throw new Error(errorMessage);
        }

        // Handle TEXT_SUCCESS - show title and cover
        if (status === "TEXT_SUCCESS") {
          setProgress(60);
          if (responseData?.sunoData && responseData.sunoData.length > 0) {
            const songs = responseData.sunoData.map((song: SunoSongData) => ({
              id: song.id,
              title: song.title || title || "Generated Song",
              duration: song.duration || 0,
              audioUrl: "", // Not available yet
              imageUrl: song.imageUrl,
              artist: "Suno AI",
              style: song.tags || style || "AI Generated",
              status: "text_success",
              prompt: song.prompt,
            }));
            setGeneratedSongs(songs);
          }
          return false; // Continue polling
        }

        // Handle FIRST_SUCCESS - show songs with audio, but continue polling for all songs
        if (status === "FIRST_SUCCESS") {
          setProgress(85);
          if (responseData?.sunoData && responseData.sunoData.length > 0) {
            const allSongs = responseData.sunoData.map(
              (song: SunoSongData) => ({
                id: song.id,
                title: song.title || title || "Generated Song",
                duration: song.duration || 0,
                audioUrl: song.audioUrl || "", // Keep empty string for songs without audio yet
                imageUrl: song.imageUrl,
                artist: "Suno AI",
                style: song.tags || style || "AI Generated",
                status: song.audioUrl ? "first_success" : "generating",
                prompt: song.prompt,
              })
            );

            setGeneratedSongs(allSongs);

            // Check if all songs have audio
            const songsWithAudio = responseData.sunoData.filter(
              (song: SunoSongData) => song.audioUrl
            );
            const totalSongs = responseData.sunoData.length;

            if (songsWithAudio.length === totalSongs) {
              // All songs have audio, we can stop polling
              setProgress(100);
              setIsGenerating(false);
              setGenerationStartTime(null);
              toast.success(`All ${totalSongs} songs generated successfully!`);
              return true; // Stop polling
            } else {
              // Some songs still generating audio, continue polling
              toast.success(
                `${songsWithAudio.length}/${totalSongs} songs ready, generating remaining...`
              );
              return false; // Continue polling
            }
          }
          return false; // Continue polling if no data
        }

        // Handle final SUCCESS
        if (status === "SUCCESS") {
          if (responseData?.sunoData && responseData.sunoData.length > 0) {
            const completeSongs = responseData.sunoData.map(
              (song: SunoSongData) => ({
                id: song.id,
                title: song.title || title || "Generated Song",
                duration: song.duration || 0,
                audioUrl: song.audioUrl || "",
                imageUrl: song.imageUrl,
                artist: "Suno AI",
                style: song.tags || style || "AI Generated",
                status: "success",
                prompt: song.prompt,
              })
            );
            setGeneratedSongs(completeSongs);

            const songsWithAudio = completeSongs.filter(
              (song: GeneratedSong) => song.audioUrl
            );
            const totalSongs = completeSongs.length;
            toast.success(
              `Generation completed! ${songsWithAudio.length}/${totalSongs} songs with audio.`
            );
          }
          setProgress(100);
          setIsGenerating(false);
          setGenerationStartTime(null);
          return true;
        }

        // Handle FAILED status
        if (status === "FAILED" || status === "failed") {
          setIsGenerating(false);
          setProgress(0);
          setGenerationStartTime(null);
          toast.error("Song generation failed. Please try again.");
          throw new Error("Song generation failed");
        }

        // Still processing - update progress
        setProgress((prev) => Math.min(prev + 3, 80));
        return false;
      }
      return false;
    } catch (error: any) {
      console.error("Error polling task:", error);
      setIsGenerating(false);
      setProgress(0);
      setGenerationStartTime(null);
      toast.error("Create song failed: " + error.message);
      return true; // Stop polling on error
    }
  };

  // Start task polling
  useEffect(() => {
    if (taskId && isGenerating) {
      const interval = setInterval(async () => {
        const completed = await pollTaskStatus(taskId);
        if (completed) {
          clearInterval(interval);
        }
      }, 10000); // Poll every 10 seconds

      return () => clearInterval(interval);
    }
  }, [taskId, isGenerating, generationStartTime]);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter either a style of music or lyrics");
      return;
    }

    setIsGenerating(true);
    setProgress(10);
    setGeneratedSongs([]);
    setCurrentPlayingSong(null);
    setGenerationStartTime(Date.now()); // Set generation start time

    try {
      const response = await fetch("/api/ai-song/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          style: style,
          title: title,
          customMode: customMode,
          instrumental: instrumental,
          model: model,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate song");
      }

      const { code, message, data } = await response.json();
      if (code !== 0) {
        throw new Error(message || "Failed to generate song");
      }

      if (data?.taskId) {
        setTaskId(data.taskId);
        setProgress(20);
      } else {
        throw new Error(message || "Failed to start generation");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate song. Please try again.");
      setIsGenerating(false);
      setProgress(0);
      setGenerationStartTime(null);
    }
  };

  const togglePlay = async (song: GeneratedSong) => {
    if (!song?.audioUrl) return;

    setIsLoadingAudio(true);

    try {
      // Stop current audio if playing
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }

      // If clicking on currently playing song, just pause
      if (currentPlayingSong?.id === song.id && isPlaying) {
        setIsPlaying(false);
        setCurrentPlayingSong(null);
        setIsLoadingAudio(false);
        return;
      }

      // Create new audio for the selected song
      audioRef.current = new Audio(song.audioUrl);
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentPlayingSong(null);
      });
      audioRef.current.addEventListener("error", (e) => {
        console.error("Audio playback error:", e);
        setIsLoadingAudio(false);
        setIsPlaying(false);
        setCurrentPlayingSong(null);
      });

      // Play the selected song
      await audioRef.current.play();
      setIsPlaying(true);
      setCurrentPlayingSong(song);
      setIsLoadingAudio(false);
    } catch (error) {
      console.error("Failed to play audio:", error);
      setIsLoadingAudio(false);
      setIsPlaying(false);
      setCurrentPlayingSong(null);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const downloadAudio = (song: GeneratedSong) => {
    if (song?.audioUrl) {
      const link = document.createElement("a");
      link.href = song.audioUrl;
      link.download = `${song.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="create" className={cn("py-16 md:py-24", className)}>
      {srOnlyTitle && <h2 className="sr-only">{srOnlyTitle}</h2>}
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Form */}
            <Card>
              {/* <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={customMode}
                      onCheckedChange={setCustomMode}
                    />
                    <Label>Custom Mode</Label>
                  </div>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="V4_5">V4.5+</SelectItem>
                      <SelectItem value="V4">V4</SelectItem>
                      <SelectItem value="V3">V3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader> */}
              <CardContent className="space-y-6">
                {/* <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Style of Music</Label>
                  <Textarea
                    id="style"
                    placeholder="Enter style of music"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="min-h-24"
                  />
                  <div className="text-sm text-muted-foreground text-right">
                    {style.length}/1000
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="instrumental"
                    checked={instrumental}
                    onCheckedChange={setInstrumental}
                  />
                  <Label htmlFor="instrumental">Instrumental</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lyrics">Lyrics</Label>
                  <Textarea
                    id="lyrics"
                    placeholder="Write your own lyrics, two verses (8 lines) for the best result"
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    className="min-h-32"
                  />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="A love story of Romeo and Juliet"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-32"
                    required
                  />
                </div>
                {isCheckSign ? (
                  <Button className="w-full" size="lg">
                    <Loader2 className="size-4 animate-spin" /> Loading...
                  </Button>
                ) : user ? (
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || (!style && !prompt)}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Music className="w-4 h-4 mr-2" />
                        Generate Music
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setIsShowSignModal(true)}
                  >
                    <User className="w-4 h-4 mr-2" /> Sign In to Generate Music
                  </Button>
                )}

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Generation Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground text-center">
                      This may take up to 2-3 minutes...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right side - Generated Song Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Generated Song
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedSongs.length > 0 ? (
                  <div className="space-y-4">
                    {generatedSongs.map((song, index) => {
                      const isCurrentlyPlaying =
                        currentPlayingSong?.id === song.id && isPlaying;
                      const isCurrentlyLoading =
                        currentPlayingSong?.id === song.id && isLoadingAudio;

                      return (
                        <div key={song.id} className="space-y-4">
                          <div className="flex gap-4">
                            <div className="relative flex-shrink-0">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                                {song.imageUrl ? (
                                  <Image
                                    src={song.imageUrl}
                                    alt={song.title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                                    <Music className="w-6 h-6 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              {song.audioUrl && (
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="absolute top-6 right-6 w-8 h-8 rounded-full p-0 shadow-lg"
                                  onClick={() => togglePlay(song)}
                                  disabled={isCurrentlyLoading}
                                >
                                  {isCurrentlyLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : isCurrentlyPlaying ? (
                                    <Pause className="w-3 h-3" />
                                  ) : (
                                    <Play className="w-3 h-3" />
                                  )}
                                </Button>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground text-lg mb-1">
                                {song.title}
                              </h3>
                              <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                                <User className="w-4 h-4" />
                                <span>{song.artist}</span>
                                <Clock className="w-4 h-4 ml-2" />
                                <span>{formatDuration(song.duration)}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-2 line-clamp-1">
                                {song.style
                                  .split(",")
                                  .slice(0, 2)
                                  .map((tag, tagIndex) => (
                                    <Badge
                                      key={tagIndex}
                                      variant="default"
                                      className="text-xs"
                                    >
                                      {tag.trim()}
                                    </Badge>
                                  ))}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                {song.audioUrl ? (
                                  <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Ready to play</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 text-yellow-600">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Audio generating...</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              {song.audioUrl && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadAudio(song)}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          {index < generatedSongs.length - 1 && (
                            <div className="border-t" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Music className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-2">
                      {isGenerating
                        ? "Your song is being generated..."
                        : "No song generated yet"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isGenerating
                        ? "Please wait while we create your masterpiece"
                        : "Fill out the form and click generate to create your song"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
