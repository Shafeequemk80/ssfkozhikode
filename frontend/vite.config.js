/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // or wherever your files are
  ],
  theme: {
    extend: {
      fontFamily: {
        fractul: ['Fractul', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
