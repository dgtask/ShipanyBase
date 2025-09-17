export interface PostItem {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  content?: string | ReactNode;
  created_at?: string;
  author_name?: string;
  author_image?: string;
  url?: string;
  target?: string;
}

export interface Posts {
  title?: string;
  description?: string;
  categories?: Category[];
  items: PostItem[];
}

export interface Category {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  target?: string;
}
