"use server";

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const mockedIdeas = [
  "A mysterious door in a tree trunk leads to a hidden world filled with glowing fireflies.",
  "A magical tree with shimmering leaves that change color with every heartbeat, surrounded by swirling fireflies at dusk.",
  "A fantastical garden where crystals grow like flowers, shimmering in the moonlight.",
  "A wizard surfing on a magic carpet through a stunning galaxy filled with colorful nebulas and shooting stars.",
];

export async function getPromptIdea(): Promise<string> {
  if (process.env.OPENAI_ENABLED == "0")
    return mockedIdeas[Math.floor(Math.random() * mockedIdeas.length)];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a creative assistant that generates imaginative image prompts.",
        },
        {
          role: "user",
          content:
            "Give me one creative and visual image prompt idea. It NEEDS to be at most 100 characters long.",
        },
      ],
      max_completion_tokens: 35,
      temperature: 1.2,
    });

    return response.choices?.[0]?.message?.content?.trim() || "";
  } catch (e) {
    console.log(e);
    return "";
  }
}
