import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Helmer den Dekker",
  description: "Documentation and Resources",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Frontend', link: '/frontend/frontend' },
      { text: 'Backend', link: '/backend/backend' },
      { text: 'Internet', link: '/internet/internet' }
    ],

    sidebar: [
      {
        text: 'Internet',
        items: [
          { text: 'Internet', link: '/internet/internet' },
        ]
      },
      {
        text: 'Frontend',
        items: [
          { text: 'Frontend', link: '/frontend/frontend' },
          { text: 'Markdown Examples', link: '/frontend/markdown-examples' },
          { text: 'Runtime API Examples', link: '/frontend/api-examples' },
          { text: 'VitePress and GitHub Pages', link: '/frontend/vitepress-githubpages' }
        ]
      },
      {
        text: 'Backend',
        items: [
          { text: 'Backend', link: '/backend/backend' },
          { text: 'API', link: '/backend/api' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
