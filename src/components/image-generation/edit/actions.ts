"use server";

import { createReadStream } from "fs";
import { OpenAI } from "openai";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import path from "path";
import { applyMaskToImage, cleanBase64Img } from "@/lib/utils";
import {
  Image as ImageSchema,
  PrismaClient,
} from "../../../../generated/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

interface InputData {
  mask: string;
  originalImage: ImageSchema;
}

export async function editImage(
  prevState: unknown,
  formData: FormData,
  input: InputData
): Promise<ImageSchema | undefined> {
  const { originalImage, mask } = input;
  const { id, title, url } = originalImage;

  // this feature is not available if openai is not enabled,
  // because I don't want to generate another random image, doesn't make sense
  if (process.env.OPENAI_ENABLED == "0") {
    redirect(`/i/${originalImage.id}`);
  }
  const prompt = formData.get("prompt")?.toString() || "";

  const imgFilename = `img-${Date.now()}.png`;
  const imgFilepath = path.join("/tmp", imgFilename);
  const maskFilename = `mask-${imgFilename}`;
  const maskFilepath = path.join("/tmp", maskFilename);

  const maskedImg = await applyMaskToImage(url, mask);

  const imgBuffer = Buffer.from(cleanBase64Img(url), "base64");
  const maskBuffer = Buffer.from(cleanBase64Img(maskedImg), "base64");

  await writeFile(imgFilepath, imgBuffer);
  await writeFile(maskFilepath, maskBuffer);

  const response = await openai.images.edit({
    model: "dall-e-2",
    image: createReadStream(imgFilepath),
    mask: createReadStream(maskFilepath),
    prompt,
    response_format: "b64_json",
    size: "512x512",
  });

  const image = await prisma.image.create({
    data: {
      parentId: id,
      title: `${title} (${prompt})`,
      url: `data:image/png;base64,${response.data?.[0]?.b64_json}`,
    },
  });

  redirect(`/i/${image.id}`);
}
