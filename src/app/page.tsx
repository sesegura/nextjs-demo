import { Page, PageContent, PageHeader } from "@/components/ui/page";
import { ImageGenerationContent } from "@/components/image-generation/content";
import { getPromptIdea } from "./actions";

export default async function Home() {
  const promptIdea = await getPromptIdea();

  return (
    <Page>
      <PageHeader>Image Generation</PageHeader>
      <PageContent>
        <ImageGenerationContent promptIdea={promptIdea} />
        <div className="min-h-[154px]" />
      </PageContent>
    </Page>
  );
}
