module.exports = function(context) {
  const config = {
    content: [
      '../../pkgs/{editor/*.{ts,tsx},ui/src/**/*.{ts,tsx}}',
      '../../apps/web/src/**/*.{ts,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [require('@kobalte/tailwindcss')],
  }

  return config
}
