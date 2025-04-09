"use server";

import { Image as ImageSchema, PrismaClient } from "../../../generated/prisma";

interface GetImagesInput {
  limit: number;
  page: number;
}

interface GetImagesResponse {
  hasNextPage: boolean;
  images: ImageSchema[];
}

const prisma = new PrismaClient();

export async function getImages(
  input: GetImagesInput
): Promise<GetImagesResponse> {
  const { limit, page } = input;

  const offset = page * limit;

  const images = await prisma.image.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      id: "desc",
    },
  });

  const totalCount = await prisma.image.count();
  const hasNextPage = offset + images.length < totalCount;

  return { hasNextPage, images };
}
