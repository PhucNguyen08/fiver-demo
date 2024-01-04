/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            width: {
                default: '1400px',
                760: '760px',
                300: '300px',
            },
            padding: {
                '10px': '10px',
            },
            colors: {
                green: '#19a463',
                greenLight: '#1dbf73',
                'green-700': '#013914',
                'white-700': '#fafafa',
                'greyish-400': '#b5b6ba',
                'gray-bold': '#62646A',
                purple: '#0d084d',
                greyish: '#74767E',
                'gray-800': '#404145',
                'white-300': '#f5f5f5',
                'dark-gray': '#74767e',
                lightGray: '#95979d',
            },
            height: {
                featured: '600px',
                70: '70%',
            },
            lineHeight: {
                text: 1.6,
            },
            boxShadow: {
                card: '0px 1px 0px rgba(17, 17, 26, 0.05),0px 0px 8px rgba(17, 17, 26, 0.1)',
            },
            borderWidth: {
                3: '3px',
            },
        },
    },
    plugins: [],
};
