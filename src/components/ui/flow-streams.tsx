import { useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

type Stream = { path: string; output: boolean };
type Bounds = { x: number; y: number; width: number; height: number };

/** Dotted flow is restricted to the two gutters, never underneath a card. */
export function FlowStreams({
  container,
}: {
  container: RefObject<HTMLDivElement | null>;
}) {
  const reduced = useReducedMotion();
  const [drawing, setDrawing] = useState<{
    width: number;
    height: number;
    clips: Bounds[];
    streams: Stream[];
  } | null>(null);
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const bounds = root.getBoundingClientRect();
      const sourceNodes = [
        ...root.querySelectorAll<HTMLElement>(".flow-source-item"),
      ];
      const goal = root
        .querySelector<HTMLElement>(".goal-filter")!
        .getBoundingClientRect();
      const newsletter = root
        .querySelector<HTMLElement>(".newsletter-preview")!
        .getBoundingClientRect();
      const rows = sourceNodes.map((node) => node.getBoundingClientRect());
      if (!rows.length) return;
      const left = Math.min(...rows.map((row) => row.right)) - bounds.left + 3;
      const goalLeft = goal.left - bounds.left - 8;
      const goalRight = goal.right - bounds.left + 8;
      const right = newsletter.left - bounds.left - 3;
      const goalY = goal.top - bounds.top + goal.height / 2;
      const newsletterY = newsletter.top - bounds.top + newsletter.height / 2;
      const streams: Stream[] = [];
      const arrivalSpacing = Math.min(
        18,
        (goal.height * 0.3) / (rows.length - 1),
      );
      rows.forEach((row, index) => {
        const startX = row.right - bounds.left + 3;
        [-3, 3].forEach((offset) => {
          const y = row.top - bounds.top + row.height / 2 + offset;
          const endY =
            goalY + (index - (rows.length - 1) / 2) * arrivalSpacing + offset;
          const width = goalLeft - startX;
          streams.push({
            path: `M ${startX} ${y} C ${startX + width * 0.45} ${y}, ${goalLeft - width * 0.45} ${endY}, ${goalLeft} ${endY}`,
            output: false,
          });
        });
      });
      {
        const y = goalY;
        const endY = newsletterY;
        const width = right - goalRight;
        streams.push({
          path: `M ${goalRight} ${y} C ${goalRight + width * 0.45} ${y}, ${right - width * 0.45} ${endY}, ${right} ${endY}`,
          output: true,
        });
      }
      setDrawing({
        width: bounds.width,
        height: bounds.height,
        streams,
        clips: [
          {
            x: left,
            y: rows[0].top - bounds.top,
            width: Math.max(0, goalLeft - left),
            height: rows.at(-1)!.bottom - rows[0].top,
          },
          {
            x: goalRight,
            y: Math.min(goalY, newsletter.top - bounds.top) - 10,
            width: Math.max(0, right - goalRight),
            height:
              Math.max(goalY, newsletter.bottom - bounds.top) -
              Math.min(goalY, newsletter.top - bounds.top) +
              20,
          },
        ],
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    root
      .querySelectorAll(".goal-filter,.newsletter-preview,.flow-source-item")
      .forEach((node) => observer.observe(node));
    document.fonts.ready.then(measure);
    measure();
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [container]);

  if (!drawing) return null;
  return (
    <svg
      className="source-flow-connections fitted-flow-streams"
      viewBox={`0 0 ${drawing.width} ${drawing.height}`}
      aria-hidden="true"
    >
      <defs>
        {drawing.clips.map((clip, i) => (
          <clipPath id={`flow-gutter-${i}`} key={i}>
            <rect {...clip} />
          </clipPath>
        ))}
      </defs>
      {drawing.streams.map((stream, i) => (
        <g key={i} clipPath={`url(#flow-gutter-${stream.output ? 1 : 0})`}>
          <path
            d={stream.path}
            fill="none"
            stroke="#F5F0E8"
            strokeOpacity={stream.output ? 0.85 : i % 2 === 0 ? 0.5 : 0.28}
            strokeWidth={stream.output ? 2.2 : 1.7}
            strokeDasharray={stream.output ? undefined : ".1 8"}
            strokeLinecap="round"
          />
          {!reduced && i % 2 === 0 && (
            <circle r={stream.output ? 3.5 : 2} fill="#F5F0E8" opacity=".9">
              <animateMotion
                path={stream.path}
                dur={`${3 + (i % 4) * 0.4}s`}
                begin={`${-i * 0.37}s`}
                repeatCount="indefinite"
              />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}
