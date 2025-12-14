import type { Block } from "@/app/types";

import { HeroSection } from "@/app/components/blocks/HeroSection";
import { InfoBlock } from "@/app/components/blocks/InfoBlock";
import { FeaturedArticle } from "@/app/components/blocks/FeaturedArticle";
import { Subscribe } from "@/app/components/blocks/Subscribe";
import { Heading } from "@/app/components/blocks/Heading";
import { ParagraphWithImage } from "@/app/components/blocks/ParagraphWithImage";
import { Paragraph } from "@/app/components/blocks/Paragraph";
import { FullImage } from "@/app/components/blocks/FullImage";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={index} />;
    case "blocks.info-section":
      return <InfoBlock {...block} key={index} />;
    case "blocks.featured-article":
      return <FeaturedArticle {...block} key={index} />;
    case "blocks.subscribe":
      return <Subscribe {...block} key={index} />;
    case "blocks.heading":
      return <Heading {...block} key={index} />;
    case "blocks.paragraph-with-image":
      return <ParagraphWithImage {...block} key={index} />;
    case "blocks.paragraph":
      return <Paragraph {...block} key={index} />;
    case "blocks.full-image":
      return <FullImage {...block} key={index} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}
