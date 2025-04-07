import { PrismaClient } from "../../../../generated/prisma";
import { ImageRemix } from "@/components/image-generation/remix";
import { Skeleton } from "@/components/ui/skeleton";

const prisma = new PrismaClient();

type Params = Promise<{ id: string }>;

export default async function ImagePage({ params }: { params: Params }) {
  const { id } = await params;

  const image = await prisma.image.findUnique({
    where: { id: +id },
  });

  if (!image) {
    return (
      <div className="w-full mx-auto md:w-1/2">
        <Skeleton className="w-full aspect-square" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto md:w-1/2">
      <ImageRemix image={image} />
    </div>
  );
}
