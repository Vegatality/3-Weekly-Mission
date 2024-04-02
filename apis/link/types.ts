export interface Link {
  id: number;
  favorite: boolean;
  created_at: string;
  url: string;
  title: string;
  image_source: string | null;
  description: string | null;
}
