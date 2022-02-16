module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'fairfair': '#37a985',
                'ovh': '#3397B5',
                'light': '#424242',
                'dark': '#333',
                'console': '#380c2a'
            },
            boxShadow: {
                'fairfair': '10px 10px 30px 0px #37a985',
            }
        },
    },
    plugins: [
        require('tw-elements/dist/plugin')
    ],
}
