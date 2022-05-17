module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-bg': "url('/images/wool.jpg')",
      },
      fontFamily: {
        mont: 'Montserrat',
        montLight: 'Montserrat-Light',
        montMedium: 'Montserrat-Medium',
        montBold: 'Montserrat-Bold',
        montExtraBold: 'Montserrat-ExtraBold',
        futuraBold: 'Futura LT Bold',
        futuraBook: 'Futura LT Book',
        georgiaBold: 'Georgia Bold',
        georgia: 'Georgia',
      },
    },
  },
  plugins: [],
};
