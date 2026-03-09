// postcss.config.mjs
//
// Tailwind v4 uses @tailwindcss/postcss instead of the standalone tailwindcss
// PostCSS plugin. autoprefixer is bundled — no separate installation needed.

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
