import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue50: "var(--blue50)",
        blue100: "var(--blue100)",
        blue200: "var(--blue200)",
        blue300: "var(--blue300)",
        blue400: "var(--blue400)",
        blue500: "var(--blue500)",
        blue600: "var(--blue600)",
        blue700: "var(--blue700)",
        blue800: "var(--blue800)",
        blue900: "var(--blue900)",
        blue950: "var(--blue950)",
      },
    },
  },
  plugins: [],
} satisfies Config;
