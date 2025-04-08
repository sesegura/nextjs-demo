import { PrismaClient } from "../../../../generated/prisma";
import { ImageEditor } from "@/components/image-generation/edit/editor";

const prisma = new PrismaClient();

type Params = Promise<{ id: string }>;

export default async function ImagePage({ params }: { params: Params }) {
  const { id } = await params;

  const image = await prisma.image.findUnique({
    where: { id: +id },
    include: {
      parent: true,
    },
  });

  if (!image) {
    return null;
  }

  return (
    <div className="w-full mx-auto md:w-1/2">
      <div className="flex flex-col items-center">
        <ImageEditor image={image} />
      </div>
      <div className="min-h-[154px]" />
    </div>
  );
}
