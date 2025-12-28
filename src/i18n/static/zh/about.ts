import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'About ANQR',
  description: 'Learn more about ANQR and its features',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '什么是 ANQR？',
      paragraphs: [
        `ANQR（读作“anchor”）是一个免费的二维码生成器，完全在您的设备上运行 — 您的电脑、手机或平板电脑。可用于 URL、文本、Wi-Fi 凭证、联系人卡片、日历事件等的二维码生成。`,
        '该工具专为个人、小型企业、营销人员和开发者设计，他们需要快速创建二维码而无需注册账户。您的數據永不离开您的设备。'
      ]
    },
    {
      heading: '主要功能',
      bullets: [
        '在您的设备上即时生成二维码 — 无需服务器上传，无需账户。',
        '使用颜色、模块样式、查找器图案和图像叠加自定义外观。',
        '支持多种格式导出：PNG、SVG、WebP 和动画 GIF。',
        '高级选项包括纠错、版本控制和编码模式。',
        '安全分析工具帮助确保您的二维码保持可扫描性。',
        '三个功能级别（基础、高级、专业）满足您的需求。'
      ]
    },
    {
      heading: 'ANQR 如何工作',
      paragraphs: [
        'ANQR 在您的设备上本地处理一切。您输入创建二维码的文本或數據永不离开您的设备 — 它直接在您的电脑、手机或平板电脑上编码，而不发送到任何服务器。',
        '上传叠加图像时，它在您的设备上本地处理。如果从 URL 加载图像，它直接从主机服务器获取。',
        '我们不存储、记录或访问您编码到二维码的内容。'
      ]
    },
    {
      heading: '谁运营 ANQR？',
      paragraphs: [
        `ANQR 作为独立网页工具运营。如有问题、支持或业务咨询，请使用联系页面或发送电子邮件至 ${CONTACT_EMAIL}。`
      ]
    },
    {
      heading: '广告和免费使用方式',
      paragraphs: [
        'ANQR 免费使用，由广告支持。我们通过 Google AdSense 显示广告，并可能使用其他广告合作伙伴。',
        '这些广告服务可能使用 Cookie 和类似技术根据您的兴趣和浏览历史提供广告。您可以在隐私政策中了解更多信息，并通过设备设置或 Google 广告设置管理广告偏好。',
        '我们相信透明度：广告帮助我们保持工具免费且人人可访问，无需订阅或付费墙。'
      ]
    },
    {
      heading: '开放标准',
      paragraphs: [
        '二维码是开放的 ISO 标准（ISO/IEC 18004）。ANQR 生成符合标准的二维码，可与任何二维码扫描应用或设备兼容。'
      ]
    },
    {
      heading: '商标声明',
      paragraphs: [
        `QR Code® 是 DENSO WAVE INCORPORATED 的注册商标。ANQR 是独立工具，不与 DENSO WAVE INCORPORATED 有关联、endorsed 或赞助。`
      ]
    },
    {
      heading: '反馈和贡献',
      paragraphs: [
        '我们欢迎反馈、错误报告和功能建议。请使用联系页面与我们联系。我们阅读每条消息，但回复时间可能不同。'
      ]
    }
  ]
};

export default about;
