/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', "serif"],
        sans: ['"IBM Plex Sans"', '"PingFang SC"', "sans-serif"]
      }
    }
  },
  plugins: []
};
