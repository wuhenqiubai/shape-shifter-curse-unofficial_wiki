import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Shape Shifter Curse-Unofficial Port",
  description: "幻形者诅咒 模组非官方移植版的中文 Wiki 文档，提供安装指南、更新日志、配置说明等信息。",
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // 本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '未找到相关结果',
                resetButtonTitle: '清除搜索条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    // 最后更新显示
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    // 右侧大纲
    outline: {
      level: [2, 4],
      label: '本页内容'
    },

    // 文档上下页
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '更新日志', link: '/fabric-update_log' },
      { text: '常见问题', link: '/FAQ' },
      { text: '创建自定义形态', link: '/custom_forms' }
    ],

    sidebar: [
      {
        text: '更新日志',
        items: [
          { text: 'Fabric', link: '/docs/fabric-update_log' },
          { text: 'NeoForge', link: '/docs/neoforge-update_log' }
        ]
      },
      {
        text: '常见问题',
        items: [
          { text: 'FAQ', link: '/docs/FAQ' }
        ]
      },
      {
        text: '创建自定义形态',
        items: [
          { text: '前言', link: '/docs/custom_forms' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wuhenqiubai/Shape-Shifter-Curse_Unofficial-Port' }
    ],

    footer: {
      message: '本 Wiki 及模组为非官方移植版本，与原作者无关。',
      copyright: 'Copyright (c) 2019-present, Yuxi (Evan) You'
    }
  }
})
