import { Card, CardContent } from "@/components/ui/card";
import { getPromptIdea } from "./actions";
import { ImageGenerationForm } from "@/components/image-generation/form";
import { Page, PageContent, PageHeader } from "@/components/ui/page";

export default async function Home() {
  const promptIdea = await getPromptIdea();

  return (
    <Page>
      <PageHeader>Image Generation</PageHeader>
      <PageContent>
        <div className="md:w-1/3">
          <h2 className="text-2xl text-center font-semibold">
            Create something awesome!
          </h2>
          <Card className="w-full my-4">
            <CardContent>
              <ImageGenerationForm promptIdea={promptIdea} />
            </CardContent>
          </Card>
          <div className="min-h-[154px]" />
        </div>
      </PageContent>
    </Page>
  );
}
