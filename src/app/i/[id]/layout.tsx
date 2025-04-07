import { Page, PageContent, PageHeader } from "@/components/ui/page";

export default function ImageLayout({ children }: React.PropsWithChildren) {
  return (
    <Page>
      <PageHeader>Remix image</PageHeader>
      <PageContent>{children}</PageContent>
    </Page>
  );
}
