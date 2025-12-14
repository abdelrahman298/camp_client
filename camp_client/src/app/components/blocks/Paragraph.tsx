import React from "react";
import { ParagraphProps } from "@/app/types";
import ReactMarkdown from "react-markdown";

export function Paragraph({ content }: Readonly<ParagraphProps>) {
  return (
    <div className="copy article-paragraph">
      <p>{content}</p>
    </div>
  );
}
