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

type StrapiBlock = RichTextBlock | { __component: string; [key: string]: any };

interface RichTextRenderProps {
  content: StrapiBlock[];
}

export const RichTextRender: React.FC<RichTextRenderProps> = ({ content }) => {
  if (!content || content.length === 0) return null;

  // Funkcja renderująca dzieci – typ React.ReactNode
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

  // Funkcja renderująca blok – typ React.ReactNode
  const renderBlock = (block: StrapiBlock, idx: number): React.ReactNode => {
    // content.text
    if (block.__component === "content.text" && Array.isArray(block.content)) {
      return block.content.map((b: StrapiBlock, i: number) =>
        renderBlock(b, i)
      );
    }

    // media.img-blog
    if (block.__component === "media.img-blog" && "url" in block && block.url) {
      return (
        <div key={idx} className="my-4 text-center">
          <img
            src={block.url}
            alt={block.alt || ""}
            className="img-fluid rounded-3"
          />
        </div>
      );
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
            {block.children?.map((child: RichTextChild, i: number) =>
              child.type === "list-item" ? (
                <li key={i} className="mb-1">
                  {renderChildren(child.children)}
                </li>
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

  return (
    <>
      {content.map((block: StrapiBlock, idx: number) =>
        renderBlock(block, idx)
      )}
    </>
  );
};
