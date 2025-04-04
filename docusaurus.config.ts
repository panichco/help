import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';



// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Panich Help Center',
  tagline: 'Help Center for panich.co',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://help.panich.co/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'panichco', // Usually your GitHub org/user name.
  projectName: 'help', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs',
        routeBasePath: 'docs',
        sidebarPath: './sidebars.ts',
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'manual',
        path: 'manual',
        routeBasePath: 'manual',
      },
    ],
    // [
    //   '@docusaurus/plugin-content-blog',
    //   {
    //     showReadingTime: true,
    //     feedOptions: {
    //       type: ['rss', 'atom'],
    //       xslt: true,
    //     },
    //     // Please change this to your repo.
    //     // Remove this to remove the "edit this page" links.
    //     editUrl:
    //       'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
    //     // Useful options to enforce blogging best practices
    //     onInlineTags: 'warn',
    //     onInlineAuthors: 'warn',
    //     onUntruncatedBlogPosts: 'warn',
    //   },
    // ],
    [
      '@docusaurus/theme-classic',
      {
        customCss: './src/css/custom.css',
      }
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Help',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Tutorial',
      //         to: '/docs/intro',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //       {
      //         label: 'X',
      //         href: 'https://x.com/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'More',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: '/blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/facebook/docusaurus',
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} Caffeine Co., Ltd.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
