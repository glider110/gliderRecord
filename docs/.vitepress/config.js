export default {
  title: 'Glider Record',
  description: '个人工作生活文档记录',
  base: '/',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '工作记录', link: '/record/' },
      { text: '知识库', link: '/repository/' },
      { text: '生活管理', link: '/life_management/' }
    ],
    
    sidebar: {
      '/record/': [
        {
          text: '工作记录',
          items: [
            { text: '标准记录', link: '/record/standard_record/' },
            { text: 'AKB记录', link: '/record/akb_Record/' },
            { text: 'Sliver记录', link: '/record/sliver_record/' }
          ]
        }
      ],
      '/repository/': [
        {
          text: '知识库',
          items: [
            { text: '书籍', link: '/repository/book' },
            { text: '读书笔记', link: '/repository/book_note' },
            { text: 'GitHub仓库', link: '/repository/github' },
            { text: '专业知识点', link: '/repository/professional_knowledge' }
          ]
        }
      ],
      '/life_management/': [
        {
          text: '生活管理',
          items: [
            { text: '思维', link: '/life_management/思维/' },
            { text: '理财', link: '/life_management/理财/' },
            { text: '目标细化', link: '/life_management/目标细化2025' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024 Glider Record'
    }
  },
  
  markdown: {
    lineNumbers: true,
    theme: 'github-dark'
  }
}
