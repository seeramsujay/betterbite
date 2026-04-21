import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        secondary: "#ac330a",
        outline: "#6f7a72",
        "on-primary": "#ffffff",
        "secondary-fixed-dim": "#ffb5a0",
        "secondary-container": "#ff6e43",
        surface: "#fff8f4",
        "on-surface-variant": "#3f4943",
        error: "#ba1a1a",
        "on-error-container": "#93000a",
        "surface-bright": "#fff8f4",
        "on-background": "#231a0f",
        "tertiary-container": "#b15f00",
        "on-tertiary": "#ffffff",
        "surface-tint": "#116c4a",
        "on-error": "#ffffff",
        "inverse-on-surface": "#ffeedc",
        "outline-variant": "#bec9c0",
        "primary-fixed": "#a1f4c8",
        "on-primary-fixed": "#002113",
        "on-secondary-container": "#641700",
        background: "#fff8f4",
        "on-tertiary-fixed": "#2f1500",
        "surface-container": "#fdebd8",
        "tertiary-fixed": "#ffdcc3",
        "primary-container": "#30835f",
        primary: "#0b6947",
        "surface-container-high": "#f7e5d2",
        "on-secondary": "#ffffff",
        "on-secondary-fixed-variant": "#862200",
        "surface-dim": "#e8d7c5",
        "on-secondary-fixed": "#3b0a00",
        "surface-container-highest": "#f1e0cd",
        "on-tertiary-container": "#fffbff",
        "on-surface": "#231a0f",
        "on-tertiary-fixed-variant": "#6e3900",
        "surface-variant": "#f1e0cd",
        "on-primary-fixed-variant": "#005236",
        tertiary: "#8d4b00",
        "inverse-primary": "#86d7ad",
        "secondary-fixed": "#ffdbd1",
        "tertiary-fixed-dim": "#ffb77d",
        "surface-container-low": "#fff1e4",
        "error-container": "#ffdad6",
        "primary-fixed-dim": "#86d7ad",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#f5fff6",
        "inverse-surface": "#392f22"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      fontFamily: {
        headline: ["Newsreader", "serif"],
        editorial: ["Cormorant Garamond", "serif"],
        body: ["Plus Jakarta Sans", "Manrope", "sans-serif"],
        label: ["Plus Jakarta Sans", "Manrope", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
