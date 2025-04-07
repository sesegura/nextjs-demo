"use server";

import { OpenAI } from "openai";
import { Image, PrismaClient } from "../../../generated/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

export async function generateImage(
  prevState: any,
  formData: FormData
): Promise<Image | undefined> {
  const prompt = formData.get("prompt")?.toString() || "";

  if (process.env.OPENAI_ENABLED == "0") {
    await new Promise((res) =>
      setTimeout(res, Math.floor(Math.random() * 5000))
    );

    return prisma.image.create({
      data: {
        title: prompt,
        url: "https://picsum.photos/512/512",
      },
    });
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      n: 1,
      prompt,
      quality: "standard",
      response_format: "b64_json",
      size: "512x512",
    });

    return prisma.image.create({
      data: {
        title: prompt,
        url: `data:image/png;base64,${response.data?.[0]?.b64_json}`,
      },
    });
  } catch (error) {
    return undefined;
  }
}
