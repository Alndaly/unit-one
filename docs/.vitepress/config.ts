import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: 'https://unit-one.top',
  },
  lastUpdated: true,
  title: "Unit One",
  description: "高校社区通用解决方案",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://oss.kinda.info/image/unit-one-logo.png',
    nav: [
      { text: '控制台', link: 'https://control.unit-one.top' },
      { text: '商务/定制', link: '/business' }
    ],

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: '基础介绍',
        items: [
          { text: '项目背景', link: '/base/background', }
        ]
      },
      {
        text: '快速开始',
        items: [
          { text: '微信小程序注册', link: '/start/wx_miniprogram' },
          { text: '控制台', link: '/start/control' },
          { text: '图片上传', link: '/start/image_upload' },
          { text: '前端开源代码', link: '/start/frontend' },
          { text: '后端开源代码', link: '/start/backend' },
        ]
      },
      {
        text: '接口',
        items: [
          { text: '开放接口', link: '/api/consumer-api' },
        ]
      },
      {
        text: '更新日志',
        link: '/changelog'
      },
      {
        text: '商务/定制',
        link: '/business'
      },
      {
        text: '寻求帮助',
        link: '/help'
      },
      {
        text: '体验小程序',
        link: '/demo'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Alndaly/pub-miniprogram-unit-one' }
    ],

    footer: {
      copyright: 'Copyright © 2023 Kinda'
    }
  }
})
