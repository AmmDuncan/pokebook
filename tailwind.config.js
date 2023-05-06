export default  {
  content: [
    './components/**/*.{vue,ts,js}',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './app.vue',
    './utils/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"General Sans"', 'sans-serif'],
        heading: ['"Clash Display"', 'sans-serif'],
      }
    }
  }
}