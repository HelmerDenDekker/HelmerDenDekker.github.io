import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Helmer den Dekker",
	description: "Documentation and Resources",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{text: 'Home', link: '/'},
			{text: 'Blog', link: '/blog/blog'},
			{text: 'How to...', link: '/howto/howto'},
			{text: 'Resources', link: '/resources/resources'},
		],

		sidebar: [
			{
				text: 'Blog',
				items: [
					{text: 'Image Resize', link: '/blog/imageresize'},
					{text: 'Image Formats', link: '/blog/imageresizetx'},
					{text: 'DDD - 0 Introduction', link: '/blog/domaindrivendesignwebshop/0domaindrivendesignintro'},
					{
						text: 'DDD - 1 Webshop Design',
						link: '/blog/domaindrivendesignwebshop/1domaindrivendesignwebshop'
					},
					//{ text: 'DDD - 2 Webshop Layers', link: '/blog/domaindrivendesignwebshop/2domaindrivendesignwebshoplayers' },
				]
			},
			{
				text: 'How to',
				items: [
					{text: 'How to: C4 Model', link: '/howto/c4model'},
					{text: 'How to: VitePress and GitHub Pages', link: '/howto/vitepress-githubpages'},
					{text: 'How to: Advanced unit tests', link: '/howto/advancedunittesting'},
					{text: 'How to: Integration test', link: '/howto/integrationtestingdotnet'},
					{text: 'How to: Dialog modal with JS', link: '/resources/frontend/jsmodal'},
					{text: 'How to: Popover with JS', link: '/resources/frontend/jspopover'},
					{text: 'OpenLayers: How to create a dashed line', link: '/resources/frontend/openlayers-dashedline'},
				]
			},
			{
				text: 'Resources',
				items: [
					//FrontEnd
					{text: 'Frontend', link: '/resources/frontend/frontend'},
					{text: 'Runtime API Examples', link: '/resources/frontend/api-examples'},
					{text: 'How to: Create a dialog modal with JavaScript and CSS', link: '/resources/frontend/jsmodal'},
					{text: 'How to: Create a popover with JavaScript and CSS', link: '/resources/frontend/jspopover'},
					// { text: 'Input Validation', link: '/resources/input-validation' },
					// Backend
					{text: 'Backend', link: '/resources/backend/backend'},
					{text: 'API', link: '/resources/backend/api'},
					{text: 'Authentication: OpenID Connect', link: '/resources/backend/authopenid'},
					{text: 'Authentication: SAML', link: '/resources/backend/authsaml'},
					{text: 'Domain driven design', link: '/resources/backend/domaindrivendesign'},
					{text: 'Kafka', link: '/resources/backend/kafka'},
					{text: 'Persistence strategy', link: '/resources/patterns/persistencestrategy'},
					{text: 'REST: HATEOS', link: '/resources/backend/hateos'},
					//Other
					{text: 'Internet', link: '/resources/other/internet'},
					// Languages
					{text: 'Markdown Examples', link: '/resources/languages/markdown-examples'},
					//{ text: 'Markdown', link: '/resources/languages/markdown' },
					//Testing
					{text: 'About NUnit', link: '/resources/testing/nunit'},
					{text: 'Unit test attributes', link: '/resources/testing/attributes'},
				]
			},
		],
		socialLinks: [
			{icon: 'github', link: 'https://github.com/HelmerDenDekker'},
			{icon: 'linkedin', link: 'https://www.linkedin.com/in/helmerdendekker'},
		]
	}
})
