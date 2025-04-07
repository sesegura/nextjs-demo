"use server";

import { OpenAI } from "openai";
import { GeneratedImageSchema } from "./schemas";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(
  prevState: any,
  formData: FormData
): Promise<GeneratedImageSchema | undefined> {
  const prompt = formData.get("prompt")?.toString() || "";

  if (process.env.OPENAI_ENABLED == "0")
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            id: String(Date.now()),
            url: "https://picsum.photos/1280/720",
            title: prompt,
          }),
        5000
      )
    );

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      n: 1,
      prompt,
      quality: "standard",
      response_format: "b64_json",
      size: "512x512",
    });

    const image = response.data[0];

    return {
      id: String(Date.now()),
      title: prompt,
      url: `data:image/png;base64,${image.b64_json}`,
    };
  } catch (error) {
    return undefined;
  }
}
