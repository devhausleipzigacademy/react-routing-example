module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
