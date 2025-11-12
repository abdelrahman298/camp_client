import { notFound } from "next/navigation";
import { getPageData } from "../data/loaders";
import { BlockRenderer } from "../components/BlocksRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function loaders(slug: string) {
  const pageData = await getPageData(slug);
  if (!pageData) notFound();
  // console.log(pageData);
  return pageData;
}

export default async function DynamicPageRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { data } = await loaders(slug);
  const [blocks] = data;
  const block = [blocks][0].blocks;

  // console.log("data" + JSON.stringify(data));
  // console.log("blocks" + JSON.stringify(block));

  return <BlockRenderer blocks={block} />;
}
