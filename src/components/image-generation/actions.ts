import { GeneratedImageSchema } from "./schemas";

export async function generateImage(
  prevState: any,
  formData: FormData
): Promise<GeneratedImageSchema> {
  await new Promise((res) => setTimeout(res, 5000)); // Simulate delay

  return {
    id: String(Date.now()),
    url: "https://picsum.photos/1280/720",
    title: formData.get("prompt")?.toString() || "",
  };
}
