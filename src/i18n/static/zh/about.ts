import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: '关于 ANQR',
  description: 'ANQR 是一款完全在您的设备上运行的免费二维码生成器——无需帐户。',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '什么是 ANQR？',
      paragraphs: [
        'ANQR（发音为anchor）是一款免费的二维码生成器，可在您的设备本地运行，并为 URL、文本、Wi-Fi 凭据、联系人卡片、日历事件等创建可扫描的二维码。',
        '它专为希望使用功能强大的二维码工具而无需上传文件或注册的个人用户、小型企业、营销人员和开发人员而设计。您的数据将保留在您的设备上。',
      ],
    },
    {
      heading: '主要特点',
      bullets: [
        '在您的设备上即时生成二维码——无需上传到服务器，无需注册帐户。',
        '自定义颜色、模块样式、查找器图案，并添加图像叠加层。',
        '导出为多种格式：PNG、SVG、WebP 和动画 GIF。',
        '高级控制功能，包括纠错级别、QR 版本、编码模式和掩码选择。',
        '扫描安全指南和实时预览，有助于保持条码在打印和屏幕上的可读性。',
        '加载完成后即可离线使用——这是一个静态 Web 应用程序，您可以在任何地方运行。',
      ],
    },
    {
      heading: 'ANQR 的工作原理',
      paragraphs: [
        'ANQR 在您的浏览器中运行，并将您的输入编码为带有里德-所罗门纠错的标准 QR 矩阵，然后将其渲染为您选择的格式。',
        '所有生成过程都在本地进行。当您添加叠加层或动画时，ANQR 会在样式和扫描可靠性之间取得平衡，从而使结果保持可扫描性。',
        'ANQR 主要针对静态代码（数据位于二维码内部）。如果您需要动态代码（可编辑的目标地址），您可以编码自己的重定向 URL 或短链接。',
      ],
    },
    {
      heading: '谁运营 ANQR？',
      paragraphs: [
        'ANQR 是一个独立的网络工具。如有任何疑问、需要支持或商务咨询，请使用联系我们页面或发送电子邮件。' + CONTACT_EMAIL + '。',
      ],
    },
    {
      heading: '广告与我们如何保持自由',
      paragraphs: [
        'ANQR 可免费使用，并通过广告获得支持。我们可能会通过 Google AdSense 和/或其他广告合作伙伴展示广告。',
        '广告提供商可能会使用 Cookie 或类似技术，根据您的兴趣和浏览活动来个性化广告。您可以在设备设置和 Google 广告设置中管理广告偏好，并在我们的隐私政策中了解更多信息。',
        '我们不出售您编码到二维码中的内容。广告收入有助于支付项目运行和改进的成本。',
      ],
    },
    {
      heading: '开放标准',
      paragraphs: [
        'ANQR 根据 ISO/IEC 18004 标准生成二维码，旨在与扫描仪、相机和打印工作流程广泛兼容。',
      ],
    },
    {
      heading: '商标声明',
      paragraphs: [
        'QR Code® 是 DENSO WAVE INCORPORATED 的注册商标。ANQR 与 DENSO WAVE INCORPORATED 无任何关联，也未获得其认可或赞助。',
      ],
    },
    {
      heading: '反馈与贡献',
      paragraphs: [
        '我们欢迎您的反馈、错误报告和功能建议。请通过电子邮件或联系页面与我们联系——我们会阅读每一条信息，但回复时间可能会有所不同。',
      ],
    },
  ],
};

export default about;
