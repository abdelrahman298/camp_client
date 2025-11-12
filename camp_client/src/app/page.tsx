import { notFound } from "next/navigation";
import { getHomePage } from "./data/loaders";
import { BlockRenderer } from "./components/BlocksRenderer";
import { ContentList } from "./components/content_list";
import { BlogCard } from "./components/BlogCard";

async function loaders() {
  const data = await getHomePage();
  if (!data) notFound();
  // console.log(data);
  return { ...data.data };
}

export default async function HomeRoute() {
  const data = await loaders();
  const blocks = data?.blocks || [];
  // console.log(data);

  return (
    <>
      <BlockRenderer blocks={blocks} />;
      <div className="container">
        <ContentList
          headline="Featured Articles"
          path="/api/articles"
          component={BlogCard}
          featured
        />
      </div>
    </>
  );
}
