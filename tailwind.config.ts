import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "background": '#F5F5F5',
                "text-black": '#242424',
                "text-gray": '#BCBCBC',
                "white": '#FFFFFF',
                "info": {
                    "red": "#F12549",
                    "blue": {
                        "default": "#2195FF",
                        "hover": "#0054A1"
                    }
                },
                "border-gray" : "#DEDDDB"
            }
        },
    },
    plugins: [],
}
export default config
