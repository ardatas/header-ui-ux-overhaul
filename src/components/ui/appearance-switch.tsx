import { Moon, Sun } from "lucide-react";
import type { Appearance } from "../../lib/appearance";

export function AppearanceSwitch({
  value,
  onChange,
}: {
  value: Appearance;
  onChange: (value: Appearance) => void;
}) {
  return (
    <div
      className="appearance-switch"
      role="group"
      aria-label="Color appearance"
    >
      {(["dark", "light"] as const).map((mode) => {
        const Icon = mode === "dark" ? Moon : Sun;
        return (
          <button
            key={mode}
            type="button"
            aria-label={`${mode === "dark" ? "Dark" : "Light"} appearance`}
            aria-pressed={value === mode}
            onClick={() => onChange(mode)}
          >
            <Icon size={14} aria-hidden="true" />
            <span>{mode}</span>
          </button>
        );
      })}
    </div>
  );
}
