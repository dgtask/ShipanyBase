"use client";

import { envConfigs } from "@/config";
import { useTheme } from "next-themes";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "@/core/auth/client";
import { User } from "@/services/user";

export interface ContextValue {
  user: User | null;
  isCheckSign: boolean;
  isShowSignModal: boolean;
  setIsShowSignModal: (show: boolean) => void;
}

const AppContext = createContext({} as ContextValue);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useTheme();

  // sign user
  const [user, setUser] = useState<User | null>(null);

  // is check sign
  const [isCheckSign, setIsCheckSign] = useState(false);

  // session
  const { data: session, isPending } = useSession();

  // show sign modal
  const [isShowSignModal, setIsShowSignModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !theme) {
      setTheme(envConfigs.default_theme);
    }
  }, [theme, setTheme]);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
    }
  }, [session?.user]);

  useEffect(() => {
    setIsCheckSign(isPending);
  }, [isPending]);

  return (
    <AppContext.Provider
      value={{
        user,
        isCheckSign,
        isShowSignModal,
        setIsShowSignModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
