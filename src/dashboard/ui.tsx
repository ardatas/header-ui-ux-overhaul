import { useEffect, useRef, type ReactNode } from "react";
import { X, Code2, Music2, PenTool, Compass, ArrowUpRight } from "lucide-react";
import type { Topic } from "./data";

export function TopicMark({
  kind,
  small = false,
}: {
  kind: Topic["kind"];
  small?: boolean;
}) {
  const Icon =
    kind === "code"
      ? Code2
      : kind === "music"
        ? Music2
        : kind === "design"
          ? PenTool
          : Compass;
  return (
    <span className={`hd-topic-mark hd-${kind} ${small ? "hd-small" : ""}`}>
      <Icon size={small ? 14 : 20} />
    </span>
  );
}
export function Modal({
  title,
  children,
  close,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  close: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    el?.showModal();
    return () => {
      el?.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`hd-modal ${wide ? "hd-modal-wide" : ""}`}
      onCancel={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      aria-label={title}
    >
      <div className="hd-modal-header">
        <h2>{title}</h2>
        <button className="hd-icon" onClick={close} aria-label="Close dialog">
          <X size={19} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Empty({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="hd-empty">
      <span className="hd-empty-mark">✳</span>
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
    </div>
  );
}
export function External({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="hd-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={14} />
    </a>
  );
}
