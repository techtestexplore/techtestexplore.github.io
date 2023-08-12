import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wuhao's Blog",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '../assets/justtest/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: '记录Box', link: '/apps/recordbox/recordbox-home' },
      { text: 'About', link: '/about' }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/remember17' },
      { icon: 'instagram', link: 'https://www.instagram.com/i.haoo' },
      { icon: 'twitter', link: 'https://twitter.com/areahao' }
    ]
  }
})
