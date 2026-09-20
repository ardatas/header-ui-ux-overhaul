import { useRef } from "react";
import {
  motion,
  mix,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const keywords = [
  { text: "curiosity.", color: "#E5842D" },
  { text: "new ideas.", color: "#A78BFA" },
  { text: "perspective.", color: "#60A5FA" },
  { text: "what matters.", color: "#34D399" },
];
const rowHeight = 1.2;

function Keyword({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const word = keywords[index];
  const color = useTransform(progress, (value) =>
    mix("#B8B0A2", word.color)(Math.max(0, 1 - Math.abs(value - index))),
  );
  const opacity = useTransform(progress, (value) =>
    Math.max(0.18, 1 - Math.abs(value - index) * 0.82),
  );
  return (
    <motion.span className="story-keyword" style={{ color, opacity }}>
      {word.text}
    </motion.span>
  );
}

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Give each word a short reading pause between the vertical transitions.
  const keywordProgress = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.42, 0.58, 0.72, 0.88, 1],
    [0, 0, 1, 1, 2, 2, 3, 3],
  );
  // Only the keyword column moves. The sentence remains pinned to the viewport.
  const y = useTransform(
    keywordProgress,
    (progress) => `${-progress * rowHeight}em`,
  );

  return (
    <section
      id="perspective"
      ref={ref}
      className={`story-scroll-scene${reduced ? " story-still" : ""}`}
      aria-labelledby="story-heading"
    >
      <div className="story-sticky-panel">
        <div className="story-core section-wrap">
          <h2 id="story-heading" className="story-premise">
            The world has enough content.
          </h2>
          <p
            className="story-changing-sentence"
            aria-label="Make room for curiosity, new ideas, perspective, and what matters."
          >
            <span className="story-sentence-prefix" aria-hidden="true">
              Make room for
            </span>
            {reduced ? (
              <span className="story-static-keyword" aria-hidden="true">
                what matters.
              </span>
            ) : (
              <span className="story-keyword-window" aria-hidden="true">
                <motion.span className="story-keyword-stack" style={{ y }}>
                  {keywords.map((word, index) => (
                    <Keyword
                      key={word.text}
                      index={index}
                      progress={keywordProgress}
                    />
                  ))}
                </motion.span>
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
