/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner-one': 'url("/bg.jpg")',
        'banner-two': 'url("/bg2.jpg")',
        'fixed': 'url("/bgfixed.jpg")',
        'recarga': 'url("/bg_container.jpg")',
        'cashtime': 'url("/bg-cash.jpg")',
      },
      animation: {
        enter: 'enter 1.5s forwards',
        evententer: 'evententer 1.5s forwards',
      },
      keyframes: {
        enter: {
          to: {
            opacity: 1,
            transform: 'initial'
          }
        },
        evententer: {
          to: {
            opacity: 1,
          }
        },
      }
    },
  },
  plugins: [],
}

