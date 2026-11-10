export const APPEARANCES = ["light", "dark", "system"] as const;
export type Appearance = (typeof APPEARANCES)[number];

export const COLOR_THEMES = [
  "midnight",
  "ocean",
  "violet",
  "emerald",
  "amber",
] as const;
export type ColorTheme = (typeof COLOR_THEMES)[number];

export type ResolvedMode = "light" | "dark";

export type ThemeSwatch = {
  background: string;
  surface: string;
  accent: string;
};

export type ThemePreset = {
  id: ColorTheme;
  name: string;
  description: string;
  swatches: Record<ResolvedMode, ThemeSwatch>;
};

export const THEME_STORAGE_KEY = "dp-theme";

export const themePresets: ThemePreset[] = [
  {
    id: "midnight",
    name: "Midnight",
    description: "Charcoal, electric blue, off-white",
    swatches: {
      dark: { background: "#070709", surface: "#121218", accent: "#7c8cff" },
      light: { background: "#f4f5f8", surface: "#ffffff", accent: "#3f4fdc" },
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Deep navy, cyan, teal",
    swatches: {
      dark: { background: "#030e15", surface: "#08212d", accent: "#22d3ee" },
      light: { background: "#eef8fa", surface: "#ffffff", accent: "#0e7490" },
    },
  },
  {
    id: "violet",
    name: "Electric Violet",
    description: "Graphite, purple, violet",
    swatches: {
      dark: { background: "#0a0812", surface: "#181126", accent: "#a78bfa" },
      light: { background: "#f7f5fd", surface: "#ffffff", accent: "#7c3aed" },
    },
  },
  {
    id: "emerald",
    name: "Emerald",
    description: "Deep graphite, emerald green",
    swatches: {
      dark: { background: "#07100c", surface: "#10211a", accent: "#34d399" },
      light: { background: "#f2faf6", surface: "#ffffff", accent: "#059669" },
    },
  },
  {
    id: "amber",
    name: "Amber",
    description: "Charcoal, warm amber, muted gold",
    swatches: {
      dark: { background: "#100d09", surface: "#211910", accent: "#f5b544" },
      light: { background: "#fbf7ef", surface: "#ffffff", accent: "#b45309" },
    },
  },
];

export const defaultAppearance: Appearance = "system";
export const defaultColorTheme: ColorTheme = "midnight";

export function isAppearance(value: unknown): value is Appearance {
  return typeof value === "string" && (APPEARANCES as readonly string[]).includes(value);
}

export function isColorTheme(value: unknown): value is ColorTheme {
  return typeof value === "string" && (COLOR_THEMES as readonly string[]).includes(value);
}

export function resolveMode(
  appearance: Appearance,
  systemDark: boolean,
): ResolvedMode {
  if (appearance === "system") return systemDark ? "dark" : "light";
  return appearance;
}

export function getThemePreset(theme: ColorTheme): ThemePreset {
  return themePresets.find((preset) => preset.id === theme) ?? themePresets[0];
}
