export type SourceType =
  | "rss"
  | "youtube"
  | "podcast"
  | "newsletter"
  | "reddit"
  | "x"
  | "web"
  | "research";

// Original Header Font Awesome 6.5.1 marks. Podcast/blog use the same icon family.
const glyphs: Record<SourceType, { family: "brand" | "solid"; code: string }> =
  {
    rss: { family: "solid", code: "\uf09e" },
    youtube: { family: "brand", code: "\uf167" },
    podcast: { family: "solid", code: "\uf2ce" },
    newsletter: { family: "solid", code: "\uf1ea" },
    reddit: { family: "brand", code: "\uf281" },
    x: { family: "brand", code: "\ue61b" },
    web: { family: "solid", code: "\uf781" },
    research: { family: "solid", code: "\uf002" },
  };
export function SourceIcon({
  type,
  size = 20,
}: {
  type: SourceType;
  size?: number;
}) {
  const glyph = glyphs[type];
  return (
    <span
      aria-hidden="true"
      className={`original-source-icon original-source-${glyph.family}`}
      style={{ fontSize: size }}
    >
      {glyph.code}
    </span>
  );
}
