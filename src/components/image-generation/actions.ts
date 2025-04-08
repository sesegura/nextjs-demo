"use server";

import { OpenAI } from "openai";
import { Image as ImageSchema, PrismaClient } from "../../../generated/prisma";
import { redirect } from "next/navigation";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

export async function generateImage(
  _: unknown,
  formData: FormData
): Promise<ImageSchema | undefined> {
  const prompt = formData.get("prompt")?.toString() || "";

  if (process.env.OPENAI_ENABLED == "0") {
    await new Promise((res) =>
      setTimeout(res, Math.floor(Math.random() * 3000))
    );

    const image = await prisma.image.create({
      data: {
        title: prompt,
        url: `https://picsum.photos/seed/${Date.now()}512/512`,
      },
    });

    redirect(`/i/${image.id}`);
  }

  const response = await openai.images.generate({
    model: "dall-e-2",
    n: 1,
    prompt,
    quality: "standard",
    response_format: "b64_json",
    size: "512x512",
  });

  const image = await prisma.image.create({
    data: {
      title: prompt,
      url: `data:image/png;base64,${response.data?.[0]?.b64_json}`,
    },
  });

  redirect(`/i/${image.id}`);
}
