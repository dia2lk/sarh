/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f172a',
          dark:    '#050810',
          light:   '#1e2d4a',
        },
        gold: {
          DEFAULT: '#c9a227',
          light:   '#e2b93b',
          dark:    '#a88218',
        },
        'gray-light': '#f4f4f5',
        'gray-text':  '#6b7280',
      },
      fontFamily: {
        arabic: ['"Cairo"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a227, #e2b93b)',
      },
    },
  },
  plugins: [],
}
