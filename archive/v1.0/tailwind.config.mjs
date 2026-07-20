/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      boxShadow: {
        'shadow-transparent':
          '0px 0px 4px 0px #00000014, 0px 4px 16px 0px #00000014, 0px 8px 32px 0px #00000014',
      },
      colors: {
        purple: '#9a63f5',
        card: '#212121bd',
        border: '#ffffff1a',
        github: '#2b3137',
        inlight: '#fc553f',
        'exco-partners': '#fab815',
        whitefox: '#64656a',
        mylittletag: '#FF0066',
        vercel: '#ededed',
        linkedin: '#0077b5',
        smartphone: '#69cc7a',
        instagram: '#d62976',
        facebook: '#1e85ff',
        spellbook: '#41a1af',
      },
      keyframes: {
        'page-load': {
          '0%': { opacity: '0', transform: 'translateY(1.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'dock-load': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '70%': { transform: 'scale(1.2)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'icon-load': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'cauldron-bubble': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '20%': { opacity: '0.8' },
          '80%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-0.5rem)', opacity: '0' },
        },
      },
      animation: {
        'page-load': 'page-load 0.6s ease-out forwards',
        'dock-load': 'dock-load 0.4s ease-out forwards',
        'icon-load': 'dock-load 0.5s ease-out forwards',
        'cauldron-bubble': 'cauldron-bubble 3s infinite',
      },
      backgroundImage: {
        'forest-layer-0': "url('/forest/layer0.png')",
        'forest-layer-1': "url('/forest/layer1.png')",
        'forest-layer-2': "url('/forest/layer2.png')",
        'forest-layer-3': "url('/forest/layer3.png')",
        'forest-layer-4': "url('/forest/layer4.png')",
        'forest-layer-5': "url('/forest/layer5.png')",
        'forest-layer-6': "url('/forest/layer6.png')",
        'forest-layer-7': "url('/forest/layer7.png')",
        'forest-layer-8': "url('/forest/layer8.png')",
      },
    },
  },
  plugins: [],
};
