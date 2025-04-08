import { clsx, type ClassValue } from "clsx";
import { createCanvas, loadImage } from "canvas";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanBase64Img(src: string) {
  return src.replace(/^data:(.+);base64,/, "");
}

export async function applyMaskToImage(
  base64Image: string | Buffer,
  base64Mask: string | Buffer
): Promise<string> {
  const [image, mask] = await Promise.all([
    loadImage(base64Image),
    loadImage(base64Mask),
  ]);

  const width = image.width;
  const height = image.height;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Step 1: Draw the original image
  ctx.drawImage(image, 0, 0, width, height);

  // Step 2: Set composite mode to erase
  ctx.globalCompositeOperation = "destination-out";

  // Step 3: Draw the mask — this will "erase" where the mask is non-transparent
  ctx.drawImage(mask, 0, 0, width, height);

  // Step 4: Return the final image with transparency
  return canvas.toDataURL("image/png");
}
