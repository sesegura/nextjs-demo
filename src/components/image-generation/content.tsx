"use client";

import { useActionState, useOptimistic } from "react";
import { Card, CardContent } from "../ui/card";
import { generateImage } from "./actions";
import { ImageGenerationForm, Props } from "./form";
import { GeneratedImageSchema } from "./schemas";
import { Image } from "../ui/image";

export function ImageGenerationContent({
  promptIdea,
}: Pick<Props, "promptIdea">) {
  const [imagePlaceholder, setImagePlaceholder] = useOptimistic(
    undefined,
    (_: any, newImage?: GeneratedImageSchema) => newImage
  );

  const [generatedImage, formAction, pending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const title = formData.get("prompt")?.toString() || "";
      setImagePlaceholder({ id: String(Date.now()), url: "", title });

      return generateImage(prevState, formData);
    },
    null
  );

  const image = generatedImage || imagePlaceholder;

  if (image) {
    return (
      <div className="w-full mx-auto md:w-1/2">
        <Image
          alt={image.title}
          className="mt-4"
          pending={pending}
          src={image.url}
        />
      </div>
    );
  }

  return (
    <div className="md:w-1/2">
      <h2 className="text-2xl text-center font-semibold">
        Create something awesome!
      </h2>
      <Card className="w-full my-4">
        <CardContent>
          <ImageGenerationForm
            formAction={formAction}
            promptIdea={promptIdea}
          />
        </CardContent>
      </Card>
    </div>
  );
}
