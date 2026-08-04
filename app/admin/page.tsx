import type { Metadata } from "next";
import { GalleryAdmin } from "@/components/admin/GalleryAdmin";

export const metadata: Metadata = {
  title: "Gallery Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <GalleryAdmin />;
}

