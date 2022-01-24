module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        title: ["2rem", "2.5rem"],
      },
      spacing: {
        "10px": "10px",
      },
      colors: {
        "cod-gray": "#0F0F0F",
        "moody-blue": "#7271D4",
        "dodger-blue": "#5D92FF",
        scorpion: "#606060",
        alto: "#D9D9D9",
        alabaster: "#F9F9F9",
        silver: "#FCFCFC",
      },
    },
  },
  plugins: [],
};
