module.exports = {
  darkMode: "class",   // ✅ MUST be here

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#6C5CE7",
        surface: "#121214",
        card: "#1e1e1f",
        muted: "#9aa0a6",
        danger: "#FF4D4F",
      },
      fontFamily: {
        sans: ["Inter", "system-ui"],
      },
    },
  },

  plugins: [],
};
