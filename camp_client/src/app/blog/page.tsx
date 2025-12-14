import { notFound } from "next/navigation";
import { getPageData } from "../data/loaders";
import { BlockRenderer } from "../components/BlocksRenderer";
import { ContentList } from "../components/content_list";
import { BlogCard } from "../components/BlogCard";

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string }>;
}

async function loaders(slug: string) {
  const pageData = await getPageData(slug);
  if (!pageData) notFound();
  // console.log(pageData);
  return pageData;
}

export default async function BlogRoute({ searchParams }: PageProps) {
  const { page, query } = await searchParams;
  const { data } = await loaders("blog");
  const [blocks] = data;
  const block = [blocks][0].blocks;

  return (
    <div>
      <BlockRenderer blocks={block} />
      <ContentList
        headline="Check out our last articles"
        path="/api/articles"
        component={BlogCard}
        showSearch
        showPagination
        page={page}
        query={query}
      />
    </div>
  );
}
