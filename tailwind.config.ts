import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                purple: '#A06FD6',
                pink: '#EA5FD0',
                blue: '#2157A9',
                purpleLight: '#B791D0',
                blueLight: '#4477C3',
                yes: '#7BD486',
                no: '#CC1E1E',
                maybe: '#E37337'
            },
        },
    },
    plugins: [],
} satisfies Config;
