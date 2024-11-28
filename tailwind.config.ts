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
        oxford: "#020122",
        primary: "#2f27ce",
        secondary: "#dedcff",
        accent: "#433bff",
      },
    },
  },
  plugins: [],
} satisfies Config;
