import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Helmer den Dekker",
  description: "Documentation and Resources",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Resources', link: '/resources/resources' },
      { text: 'Blog', link: '/blog/blog' },
    ],

    sidebar: [
      {
        text: 'Blog',
        items: [
          { text: 'DDD - 1 Webshop Design', link: '/blog/domaindrivendesignwebshop/1domaindrivendesignwebshop' },
          { text: 'VitePress and GitHub Pages', link: '/blog/vitepress-githubpages' },
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Frontend', link: '/resources/frontend/frontend' },
          { text: 'Markdown Examples', link: '/resources/frontend/markdown-examples' },
          { text: 'Runtime API Examples', link: '/resources/frontend/api-examples' },
          // { text: 'Input Validation', link: '/resources/input-validation' },
          { text: 'Backend', link: '/resources/backend/backend' },
          { text: 'API', link: '/resources/backend/api' },
          // { text: 'Internet', link: '/resources/internet/internet' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HelmerDenDekker' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/helmerdendekker' },
    ]
  }
})
