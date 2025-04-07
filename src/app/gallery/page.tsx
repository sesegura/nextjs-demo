import { PrismaClient } from "../../../generated/prisma";
import { ImageGallery } from "@/components/gallery/image-gallery";

const prisma = new PrismaClient();

export default async function Gallery() {
  const images = await prisma.image.findMany();

  return <ImageGallery images={images} />;
}
