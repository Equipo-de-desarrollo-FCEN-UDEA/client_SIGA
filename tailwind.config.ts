import type { Config } from "tailwindcss";

const config: Config = {
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
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(90deg, rgba(67,182,73,0.8) 0%, rgba(67,182,73,0.9) 35%, rgba(141,198,63,1) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
