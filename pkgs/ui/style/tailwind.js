const defaultTheme = require('tailwindcss/defaultTheme')
const twColors = require('tailwindcss/colors')

module.exports = function(context) {
  const config = {
    darkMode: 'class',
    content: [
      '../../pkgs/{editor/**/*.{ts,tsx},ui/src/**/*.{ts,tsx}}',
      '../../apps/web/src/**/*.{ts,tsx}',
    ],
    theme: {
      colors: {
        inherit: twColors.inherit,
        transparent: twColors.transparent,
        current: twColors.current,
        black: twColors.black,
        white: twColors.white,
        gray: twColors.neutral,
        stone: twColors.stone,
      },
      extend: {
        transitionProperty: {
          'width': 'width',
        },
        colors: {
          editorFg: 'var(--editor-fg)',
          editorBg: 'var(--editor-bg)',
          sidebarBg: 'var(--sidebar-bg)',
          iconFg: 'var(--icon-fg)',
          iconBg: 'var(--icon-bg)',
          caretColor: 'var(--caret-color)',
        },
        width: {
          sidebar: 'var(--sidebar-width)',
        },
        fontFamily: {
          sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        },
        padding: {
          editor: 'var(--editor-padding)',
        },
        gridTemplateColumns: {
          'with-sidebar': 'var(--sidebar-width) 1fr',
          'without-sidebar': '0px 1fr',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }

  return config
}
