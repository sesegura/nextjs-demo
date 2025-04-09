import { ImageGallery } from "@/components/gallery/image-gallery";
import { getImages } from "./actions";

const INITIAL_LIMIT = 12; // 12 full rows in lg dimensions
const INITIAL_PAGE = 0;

export default async function Gallery() {
  const { hasNextPage, images } = await getImages({
    limit: INITIAL_LIMIT,
    page: INITIAL_PAGE,
  });

  return (
    <ImageGallery
      hasNextPage={hasNextPage}
      images={images}
      limit={INITIAL_LIMIT}
      page={INITIAL_PAGE}
    />
  );
}
