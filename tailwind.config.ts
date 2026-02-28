import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07070A",
        neon: {
          red: "#ff003c",
          dark: "#1a0007"
        }
      },
      boxShadow: {
        neon: "0 0 22px rgba(255,0,60,.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
