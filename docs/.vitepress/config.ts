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
          { text: 'DDD - 0 Introduction', link: '/blog/domaindrivendesignwebshop/0domaindrivendesignintro' },
          { text: 'DDD - 1 Webshop Design', link: '/blog/domaindrivendesignwebshop/1domaindrivendesignwebshop' },
          //{ text: 'DDD - 2 Webshop Layers', link: '/blog/domaindrivendesignwebshop/2domaindrivendesignwebshoplayers' },
          { text: 'How to: C4 Model', link: '/blog/howtoc4model' },
          { text: 'VitePress and GitHub Pages', link: '/blog/vitepress-githubpages' },
        ]
      },
      {
        text: 'Resources',
        items: [
          //FrontEnd
          { text: 'Frontend', link: '/resources/frontend/frontend' },
          { text: 'Markdown Examples', link: '/resources/frontend/markdown-examples' },
          { text: 'Runtime API Examples', link: '/resources/frontend/api-examples' },
          // { text: 'Input Validation', link: '/resources/input-validation' },
          // Backend
          { text: 'Backend', link: '/resources/backend/backend' },
          { text: 'API', link: '/resources/backend/api' },
          { text: 'Authentication: OpenID Connect', link: '/resources/backend/authopenid' },
          { text: 'Authentication: SAML', link: '/resources/backend/authsaml' },
          { text: 'Domain driven design', link: '/resources/backend/domaindrivendesign' },
          { text: 'Kafka', link: '/resources/backend/kafka' },
          { text: 'Persistence strategy', link: '/resources/backend/persistencestrategy' },
          { text: 'REST: HATEOS', link: '/resources/backend/hateos' },
          //Other
          { text: 'Internet', link: '/resources/other/internet' },
          // Languages
          { text: 'Markdown', link: '/resources/languages/markdown' },
          //Testing
          { text: 'Advanced unit testing', link: '/resources/testing/advancedunittesting' },
          { text: 'Integration testing', link: '/resources/testing/integrationtestingdotnet' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HelmerDenDekker' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/helmerdendekker' },
    ]
  }
})
