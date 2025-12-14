import ReactMarkdown from "react-markdown";
import { StrapiImage } from "../StrapiImage";
import { ParagraphWithImageProps } from "@/app/types";
import Markdown from "react-markdown";

export function ParagraphWithImage({
  contents,
  image,
  reversed,
  imageLandscape,
}: Readonly<ParagraphWithImageProps>) {
  return (
    <div
      className={`article-text-image ${
        reversed ? "article-text-image--reversed" : ""
      } ${imageLandscape ? "" : "article-text-image--portrait"}`}
    >
      <p className="copy article-text-image__text article-paragraph">
        {contents}
      </p>
      {/* <Markdown >{contents}</Markdown> */}
      <div className="article-text-image__container">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          width={1920}
          height={1080}
          className="article-text-image__image"
        />
      </div>
    </div>
  );
}
