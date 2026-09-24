import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Source } from "./data";

export function NewsletterBody({
  markdown,
  sources,
  onSource,
}: {
  markdown: string;
  sources: Source[];
  onSource: (source: Source) => void;
}) {
  return (
    <div className="hd-generated-text">
      <Markdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          a({ href, children }) {
            // Demo citations stay where they occur in the generated text.
            const source = sources.find(
              (item) => href === `#source-${encodeURIComponent(item.id)}`,
            );
            if (href?.startsWith("#source-")) {
              return source ? (
                <a
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    onSource(source);
                  }}
                >
                  {children}
                </a>
              ) : (
                <span>{children} (source removed)</span>
              );
            }
            return (
              <a
                href={href}
                target={href?.startsWith("#") ? undefined : "_blank"}
                rel="noreferrer"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
