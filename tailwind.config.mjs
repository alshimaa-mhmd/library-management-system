/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        up: {
          "0%": { opacity: "0", top: "0" },
          "20%, 40%, 60%, 80%": { opacity: "1", top: "40px" },
          "100%": { opacity: "0", top: "-70svh" },
        },
        logError: {
          "0%": { opacity: "0", top: "0" },
          "100%": { opacity: "1", top: "40px" },
        },
      },
      animation: {
        up: "up 2s ease-in-out",
        logError: "logError 1s ease",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
