import type { ArticleProps, Block } from "@/app/types";
import { notFound } from "next/navigation";
import { formatDate } from "@/app/utils/format_date";

import { HeroSection } from "@/app/components/blocks/HeroSection";
import { getContentBySlug } from "@/app/data/loaders";
import { BlockRenderer } from "@/app/components/BlocksRenderer";
import { ContentList } from "@/app/components/content_list";
import { BlogCard } from "@/app/components/BlogCard";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/articles");
  // console.log("this is the article data error shoould be array" + data);

  const article = data[0];
  if (!article) throw notFound();
  return { article: article as ArticleProps, blocks: article?.blocks };
}

interface ArticleOverviewProps {
  headline: string;
  description: string;
  tableOfContent: {
    heading: string;
    linkId: string;
  }[];
}

function ArticleOverview({
  headline,
  description,
  tableOfContent,
}: Readonly<ArticleOverviewProps>) {
  return (
    <div className="article-overview">
      <div className="article-overview__info">
        <h3 className="article-overview__headline">{headline}</h3>
        <p className="article-overview__description">{description}</p>
      </div>
      {tableOfContent && (
        <ul className="article-overview__contents">
          {tableOfContent.map((item, index) => (
            <li key={index}>
              <Link href={`#${item.linkId}`} className="article-overview__link">
                {index + 1}. {item.heading}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default async function SingleBlogRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const articleData = await loader(slug);
  const { article, blocks } = await loader(slug);
  const { title, author, publishedAt, description, image } = article;
  const tableOfContent = blocks?.filter(
    (block: Block) => block.__component === "blocks.heading"
  );
  // console.log("this is the articleData data" + JSON.stringify(articleData));
//   console.log("this is the articleData data" + articleData);

  return (
    <div>
      <HeroSection
        id={article.id}
        heading={title}
        theme="orange"
        image={image}
        author={author}
        publishedAt={formatDate(publishedAt)}
        darken={true}
      />

      <div className="container">
        <ArticleOverview
          headline={title}
          description={description}
          tableOfContent={tableOfContent}
        />

        <BlockRenderer blocks={blocks} />

        <ContentList
          headline="Featured Articles"
          path="/api/articles"
          component={BlogCard}
          featured={true}
        />
      </div>
    </div>
  );
}
