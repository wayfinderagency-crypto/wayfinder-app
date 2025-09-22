import React from "react";

interface RichTextChild {
  type: "text" | "link" | "list-item";
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  url?: string;
  children?: RichTextChild[];
}

interface RichTextBlock {
  type?: "paragraph" | "heading" | "list" | "numbered-list" | string;
  level?: number;
  children?: RichTextChild[] | RichTextBlock[];
  format?: "ordered" | "unordered";
  url?: string; // dla obrazów w media.img-blog
  alt?: string;
  __component?: string; // dla dynamic zone z Strapi
  content?: RichTextBlock[]; // dla content.text
}

// Bezpieczny typ dla dynamicznych bloków Strapi
type StrapiBlock =
  | RichTextBlock
  | {
      __component: string;
      [key: string]: string | undefined | StrapiBlock[] | boolean | number;
    };

interface RichTextRenderProps {
  content: StrapiBlock[];
}

export const RichTextRender: React.FC<RichTextRenderProps> = ({ content }) => {
  if (!content || content.length === 0) return null;

  const renderChildren = (children?: RichTextChild[]): React.ReactNode => {
    if (!children) return null;

    return children.map((child: RichTextChild, i: number) => {
      let node: React.ReactNode = child.text ?? "";

      if (child.type === "link" && child.url) {
        node = (
          <a
            key={i}
            href={child.url}
            className="text-primary text-decoration-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {child.children ? renderChildren(child.children) : child.text}
          </a>
        );
      }

      if (child.bold)
        node = (
          <span key={i} className="fw-bold">
            {node}
          </span>
        );
      if (child.italic)
        node = (
          <span key={i} className="fst-italic">
            {node}
          </span>
        );
      if (child.underline)
        node = (
          <span key={i} className="text-decoration-underline">
            {node}
          </span>
        );

      return <React.Fragment key={i}>{node}</React.Fragment>;
    });
  };

  const renderBlock = (block: StrapiBlock, idx: number): React.ReactNode => {
    // content.text
    if (block.__component === "content.text" && Array.isArray(block.content)) {
      return block.content.map((b, i) => renderBlock(b, i));
    }

    // media.img-blog
    if (block.__component === "media.img-blog") {
      const url = typeof block.url === "string" ? block.url : undefined;
      const alt = typeof block.alt === "string" ? block.alt : "";
      if (url) {
        return (
          <div key={idx} className="my-4 text-center">
            <img src={url} alt={alt} className="img-fluid rounded-3" />
          </div>
        );
      }
    }

    // Bloki tekstowe
    switch (block.type) {
      case "heading": {
        const lvl = Math.max(1, Math.min(6, Number(block.level) || 2));
        return React.createElement(
          `h${lvl}`,
          { key: idx, className: "mt-4 mb-2 fw-semibold" },
          renderChildren(block.children as RichTextChild[])
        );
      }

      case "paragraph":
        return (
          <p key={idx} className="mt-3 fs-5">
            {renderChildren(block.children as RichTextChild[])}
          </p>
        );

      case "list":
      case "numbered-list": {
        const Tag =
          block.format === "ordered" || block.type === "numbered-list"
            ? "ol"
            : "ul";
        return (
          <Tag key={idx} className="mt-3 ps-4">
            {(block.children as RichTextChild[])?.map((child, i) =>
              child.type === "list-item" ? (
                <li key={i}>{renderChildren(child.children)}</li>
              ) : null
            )}
          </Tag>
        );
      }

      default:
        return (
          <div key={idx}>
            {renderChildren(block.children as RichTextChild[])}
          </div>
        );
    }
  };

  return <>{content.map((block, idx) => renderBlock(block, idx))}</>;
};
