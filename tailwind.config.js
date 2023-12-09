module.exports = {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['black'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
};
