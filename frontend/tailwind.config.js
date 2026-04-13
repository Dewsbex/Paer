/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				paer: {
					bg: { DEFAULT: '#F5F4F0', dark: '#141413' },
					surface: { DEFAULT: '#FFFFFF', dark: '#1C1C1A' },
					'surface-hover': { DEFAULT: '#FAFAF7', dark: '#222220' },
					text: { DEFAULT: '#1A1A18', dark: '#E4E4DC' },
					'text-secondary': { DEFAULT: '#5C5C52', dark: '#A0A094' },
					'text-tertiary': { DEFAULT: '#85857A', dark: '#6E6E64' },
					accent: { DEFAULT: '#B5521E', dark: '#D4793A' },
					'accent-soft': { DEFAULT: '#F5E6DB', dark: '#2E2116' },
					border: { DEFAULT: '#E2E2DA', dark: '#2A2A27' },
					'border-light': { DEFAULT: '#ECECE6', dark: '#222220' },
					cluster: { DEFAULT: '#E0EBD9', dark: '#1E2A1A' },
					'cluster-text': { DEFAULT: '#3D5C30', dark: '#8AB87A' },
					highlight: { DEFAULT: '#FFF3C4', dark: '#3D3520' },
					'highlight-border': { DEFAULT: '#D4BC6A', dark: '#6B5C2E' },
				}
			},
			fontFamily: {
				body: ['"Literata"', 'Georgia', 'serif'],
				ui: ['"Atkinson Hyperlegible Next"', 'system-ui', 'sans-serif'],
				mono: ['"IBM Plex Mono"', 'monospace'],
			},
			fontSize: {
				'reading-sm': '13px',
				'reading-base': '16px',
				'reading-lg': '18px',
				'reading-xl': '20px',
				'reading-2xl': '22px',
			},
			screens: {
				'xs': '390px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
			},
			spacing: {
				'touch': '44px',
			}
		},
	},
	plugins: [],
};
