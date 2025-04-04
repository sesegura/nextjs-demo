import { Page, PageContent, PageHeader } from "@/components/ui/page";

export default function GalleryLayout({ children }: React.PropsWithChildren) {
  return (
    <Page>
      <PageHeader>Gallery</PageHeader>
      <PageContent>{children}</PageContent>
    </Page>
  );
}
