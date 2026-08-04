export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  image_type: "single" | "comparison";
  single_image_url: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  alt_text: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

