export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // Custom utility for poster background
        poster: "url('https://image.tmdb.org/t/p/w780')",
      },
      height: {
        hero: "400px", // reusable height for poster section
      },
    },
  },
  plugins: [],
};
