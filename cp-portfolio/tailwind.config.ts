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
        'cor-1': '#F3C623',
        'cor-2': '#EB8317',
        'cor-3': '#F4F6FF',
        'cor-4': '#10375C',
      },
    },
  },
  plugins: [],
};
export default config;
