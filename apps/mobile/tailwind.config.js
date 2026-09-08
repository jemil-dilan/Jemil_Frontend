/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./App.web.{js,jsx,ts,tsx}',
		'./index.{js,jsx,ts,tsx}',
		'./entrypoint.{js,jsx,ts,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
		extend: {
			colors: {
				jemil: {
					primary: '#2563EB',
					accent: '#F59E0B',
					dark: '#18191B',
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
}