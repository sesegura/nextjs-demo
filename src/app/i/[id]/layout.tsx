import { Page, PageContent, PageHeader } from "@/components/ui/page";

export default function ImageLayout({ children }: React.PropsWithChildren) {
  return (
    <Page>
      <PageHeader>Edit image</PageHeader>
      <PageContent centered>{children}</PageContent>
    </Page>
  );
}
