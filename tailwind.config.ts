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
        brand: {
          primary: '#110b6d',   // Deep Blue from logo
          secondary: '#f4d295', // Golden Yellow from logo
          dark: '#420375',      // Dark Deep Purple/Blue from logo
          light: '#f7ead5',     // Soft Light Cream
        },
      },
      fontFamily: {
        arabic: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
        english: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
