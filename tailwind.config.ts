// tailwind.config.ts
//
// In Tailwind v4, most configuration (colors, radius, darkMode) lives in
// globals.css via @theme and @custom-variant. This file is referenced via
// @config in globals.css and is used primarily for plugins.
//
// Color tokens and border-radius are defined in globals.css @theme block.
// See: https://tailwindcss.com/docs/v4-upgrade

import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  // In Tailwind v4, content paths are auto-detected. Explicit paths are only
  // needed if auto-detection misses your files.
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/hooks/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],

  plugins: [animate],
}

export default config
