/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

const CustomStyle = plugin(function ({addUtilities}) {
  addUtilities({
    ".rotate-y-180" : {
      transform : "rotateY(180deg)"
    },
    ".preserve-3d" : {
      transformStyle : "preserve-3d"
    },
    ".perspective-1000" : {
      perspective : "1000px"
    },
    ".backface-hidden" : {
      backfaceVisibility : "hidden",
    }
  })
})

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
  plugins: [CustomStyle],
}

