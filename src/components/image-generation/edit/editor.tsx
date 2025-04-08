"use client";

import { useActionState, useRef } from "react";
import { Card, CardContent } from "../../ui/card";
import { Image, ImageTitle } from "@/components/ui/image";
import { Image as ImageSchema } from "../../../../generated/prisma";
import { ImageCanvas } from "./canvas";
import { ImageGenerationForm } from "../form";
import { editImage } from "./actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";

interface Props {
  image: ImageSchema;
}

export function ImageEditor({ image }: Props) {
  // The type definition for `exportImage` from ReactSketchCanvasRef doesn't allow dimensions,
  // although it does support them, so we need to use `any` here to avoid overwriting the type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const canvasRef = useRef<any>(null);

  const [, formAction, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const mask =
        (await canvasRef.current?.exportImage("png", 512, 512)) || "";

      return editImage(prevState, formData, {
        mask: mask,
        originalImage: image,
      });
    },
    null
  );

  const renderImage = () => (
    <Image alt={image.title} pending={pending} src={image.url} />
  );

  return (
    <>
      {pending && (
        <>
          <ImageTitle className="mb-4" loading>
            Generating...
          </ImageTitle>
          {renderImage()}
        </>
      )}

      {!pending && (
        <>
          <ImageTitle className="mb-4" title={image.title}>
            {image.title}
            {image.parentId && (
              <>
                {" - "}
                <Link href={`/i/${image.parentId}`}>
                  <Button className="h-auto p-0 cursor-pointer" variant="link">
                    View original
                  </Button>
                </Link>
              </>
            )}
          </ImageTitle>

          <ImageCanvas ref={canvasRef}>{renderImage()}</ImageCanvas>
        </>
      )}

      <Card className="w-full mt-4">
        <CardContent>
          <ImageGenerationForm
            disabled={pending}
            formAction={formAction}
            placeholder="Edit prompt..."
          />
          <Separator className="my-2" />
          <p className="flex items-center gap-2 text-sm text-muted-foreground font-extralight">
            <Info size="16" /> This prompt will be used to modify the
            highlighted areas from the original image
          </p>
        </CardContent>
      </Card>
    </>
  );
}
