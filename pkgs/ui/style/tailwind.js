module.exports = function(context) {
  const config = {
    content: [
      context === 'editor' ? './*.{jsx,tsx}' : './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }

  return config
}
