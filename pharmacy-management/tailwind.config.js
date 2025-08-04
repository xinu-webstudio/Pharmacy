export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // General scan across src folder
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Hind", "sans-serif"],
      },
      colors: {
        primary: "#00717E",
        white: "#fff",
        yellow: "#A2AD00",
        green: "#34C759",
        blue: "#3A86FF",
        red: "#FF3B30",
        border: "#D6DCE1",
        textGray: "#16474B",
        DashboardTitle: "#1BB194",
        bg: "#eff7f9",
        "silver-950": "#1a1a1a",
        "silver-600": "#6b7280",
        "grey-200": "#e5e7eb",
        "grey-500": "#6b7280",
      },
    },
  },
  plugins: [],
};
