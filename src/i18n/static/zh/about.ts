import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: '关于 ANQR',
  description: 'ANQR 是一款完全在你的设备上运行的免费二维码生成器——无需账号。',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '什么是 ANQR？',
      paragraphs: [
        'ANQR（读作“anchor”）是一款免费的二维码生成器，在你的设备上本地运行，可生成用于 URL、文本、Wi-Fi 凭据、联系人卡片、日历事件等的可扫描二维码。',
        '它面向个人、小型企业、营销人员和开发者，提供强大的二维码工具，无需上传文件或注册账号。你的数据始终保留在你的设备上。',
      ],
    },
    {
      heading: '主要功能',
      bullets: [
        '在你的设备上即时生成二维码——无需上传到服务器，也无需账号。',
        '可自定义颜色、模块样式、定位图案（finder），并添加图片叠加。',
        '支持多种导出格式：PNG、SVG、WebP 和动图 GIF。',
        '提供高级控制：纠错级别、二维码版本、编码模式与掩膜选择。',
        '提供可扫描性提示与实时预览，帮助二维码在屏幕与印刷中保持可读。',
        '首次加载后可离线使用——它是一个可在任何地方运行的静态 Web 应用。',
      ],
    },
    {
      heading: 'ANQR 如何工作',
      paragraphs: [
        'ANQR 在浏览器中运行，将你的输入编码为带有 Reed–Solomon 纠错的标准二维码矩阵，然后渲染为你选择的格式。',
        '所有生成过程都在本地完成。添加叠加或动画时，ANQR 会在外观与可扫描性之间做平衡，确保结果仍然可扫描。',
        'ANQR 主要面向静态二维码（数据直接写入二维码）。如果你需要动态二维码（可编辑目的地），可以编码你自己的跳转 URL 或短链接。',
      ],
    },
    {
      heading: '谁在运营 ANQR？',
      paragraphs: [
        'ANQR 作为独立的网页工具运营。如有问题、需要支持或商务咨询，请使用联系页面或发送邮件至 ' + CONTACT_EMAIL + '。',
      ],
    },
    {
      heading: '广告与我们如何保持免费',
      paragraphs: [
        'ANQR 可免费使用，并由广告支持。我们可能通过 Google AdSense 和/或其他广告合作伙伴展示广告。',
        '广告服务可能使用 Cookie 或类似技术，根据你的兴趣和浏览活动提供个性化广告。你可以在设备设置和 Google 广告设置中管理偏好，并在我们的隐私政策中了解更多信息。',
        '我们不会出售你编码进二维码的内容。广告有助于覆盖项目运行与持续改进的成本。',
      ],
    },
    {
      heading: '开放标准',
      paragraphs: [
        'ANQR 按照 ISO/IEC 18004 标准生成二维码，并力求在各类扫描器、相机与印刷流程中具备广泛兼容性。',
      ],
    },
    {
      heading: '商标声明',
      paragraphs: [
        'QR Code® 是 DENSO WAVE INCORPORATED 的注册商标。ANQR 与 DENSO WAVE INCORPORATED 无关联，也未获得其认可或赞助。',
      ],
    },
    {
      heading: '反馈与贡献',
      paragraphs: [
        '欢迎反馈、错误报告和功能建议。请通过邮件或联系页面与我们沟通——我们会阅读每条消息，但回复时间可能有所不同。',
      ],
    },
  ],
};

export default about;
