"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AlertCircle, Loader2, Pencil } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardFooter } from "../ui/card";
import { getImages } from "@/app/gallery/actions";
import { Image } from "../ui/image";
import { Image as ImageSchema } from "../../../generated/prisma";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Zoom } from "../ui/zoom";

interface Props {
  hasNextPage: boolean;
  images: ImageSchema[];
  limit: number;
  page: number;
}

export function ImageGallery({
  hasNextPage: initialHasNextPage,
  images: initialImages,
  limit,
  page: initialPage,
}: Props) {
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [images, setImages] = useState(initialImages);
  const [page, setPage] = useState(initialPage + 1);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();

  const observableScrollTriggerRef = useRef<HTMLDivElement>(null);
  const ready = !(loading || pending);

  useEffect(
    () => {
      const ref = observableScrollTriggerRef.current;

      if (!(hasNextPage && ref)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreImages();
          }
        },
        {
          rootMargin: "0px 0px 150px 0px", // margin-bottom: 150px
          threshold: 0.1,
        }
      );

      observer.observe(ref);

      return () => {
        if (ref) {
          observer.unobserve(ref);
        }

        observer.disconnect();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasNextPage, page]
  );

  const loadMoreImages = async () => {
    if (loading || !hasNextPage) return;

    setError(false);
    setLoading(true);

    try {
      const { hasNextPage, images } = await getImages({ page, limit });

      startTransition(() => {
        setHasNextPage(hasNextPage);
        setImages((prev) => [...prev, ...images]);
        setPage((prev) => prev + 1);
      });
    } catch (error) {
      console.log(error);
      setError(true);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load images.</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <Zoom key={image.id} delay={index * 100}>
            <Link href={`/i/${image.id}`}>
              <Card className="hover:bg-accent">
                <CardContent>
                  <Image alt={image.title} src={image.url} />
                </CardContent>
                <CardFooter className="text-muted-foreground">
                  <p className="flex-1">{image.title}</p>
                  <CardAction>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="cursor-pointer" variant="ghost">
                          <Pencil />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                  </CardAction>
                </CardFooter>
              </Card>
            </Link>
          </Zoom>
        ))}
      </div>

      <div
        ref={observableScrollTriggerRef}
        className="h-10 flex justify-center items-center mt-8"
      >
        {!ready && <Loader2 className="animate-spin" />}
      </div>
    </>
  );
}
