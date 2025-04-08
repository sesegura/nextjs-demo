"use client";

import { useActionState, useOptimistic } from "react";
import { Card, CardContent } from "../ui/card";
import { generateImage } from "./actions";
import { Image } from "../ui/image";
import { Image as ImageSchema } from "../../../generated/prisma";
import { ImageGenerationForm, Props } from "./form";

export function ImageGenerationContent({
  promptIdea,
}: Pick<Props, "promptIdea">) {
  const [imagePlaceholder, setImagePlaceholder] = useOptimistic(
    undefined,
    (_: unknown, newImage?: ImageSchema) => newImage
  );

  const [, formAction, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const title = formData.get("prompt")?.toString() || "";
      setImagePlaceholder({ id: Date.now(), url: "", parentId: null, title });

      return generateImage(prevState, formData);
    },
    null
  );

  if (imagePlaceholder) {
    const { title, url } = imagePlaceholder;

    return (
      <div className="w-full mx-auto md:w-1/2">
        <Image
          alt={title}
          className="mt-4"
          pending={pending}
          src={url}
          title={title}
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
            placeholder="Start prompting..."
            promptIdea={promptIdea}
          />
        </CardContent>
      </Card>
    </div>
  );
}
