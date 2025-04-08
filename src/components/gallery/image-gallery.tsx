import { Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Image } from "../ui/image";
import { Image as ImageSchema } from "../../../generated/prisma";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Zoom } from "../ui/zoom";

interface Props {
  images: ImageSchema[];
}

export function ImageGallery({ images }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {images.map((image, index) => (
        <Zoom key={image.id} delay={index * 100}>
          <Link href={`/i/${image.id}`}>
            <Card>
              <CardHeader></CardHeader>
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
  );
}
