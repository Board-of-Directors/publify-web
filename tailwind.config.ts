import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors : {
        "background" : '#F5F5F5',
        "text-black" : '#242424',
        "text-gray" : '#BCBCBC',
        "white" : '#FFFFFF',
        "info" : {
          "red" : "#F12549"
        }
      }
    },
  },
  plugins: [],
}
export default config
