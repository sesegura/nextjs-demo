"use client";

import { useActionState } from "react";
import { Card, CardContent } from "../ui/card";
import { Image } from "@/components/ui/image";
import { Image as ImageSchema } from "../../../generated/prisma";
import { ImageGenerationForm } from "./form";

interface Props {
  image: ImageSchema;
}

export function ImageRemix({ image }: Props) {
  const [generatedImage, formAction, pending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const prompt = formData.get("prompt")?.toString() || "";
      return () => {};
    },
    null
  );

  return (
    <>
      <Image
        alt={image.title}
        className="mt-4"
        src={image.url}
        title={image.title}
      />
      <Card className="w-full my-4">
        <CardContent>
          <ImageGenerationForm
            formAction={formAction}
            placeholder="Remix this image..."
          />
        </CardContent>
      </Card>
    </>
  );
}
