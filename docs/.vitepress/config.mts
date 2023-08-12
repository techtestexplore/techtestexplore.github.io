import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wuhao's Blog",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: '../assets/icons/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: '记录Box', link: '/apps/recordbox/recordbox-home' },
      {
        text: 'App Store',
        items: [
          { text: '记录Box', link: 'https://apps.apple.com/cn/app/id1579304692' },
          { text: 'HabBox', link: 'https://apps.apple.com/cn/app/id6446240226' }
        ]
      }
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
