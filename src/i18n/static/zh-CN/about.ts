import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: '关于ANQR',
  description:
    'ANQR 是一款免费的 QR 码生成器，采用客户端优先的方法 - 在本地生成 QR 码或使用我们的 API 进行嵌入。',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open the generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
  ],
  relatedLinks: [
    { href: '/privacy?lang=${lang}', label: 'Privacy Policy', type: 'external' },
    { href: '/terms?lang=${lang}', label: 'Terms of Service', type: 'external' },
  ],
  sections: [
    {
      heading: '什么是ANQR？',
      paragraphs: [
        'ANQR (pronounced "anchor") is a free QR code generator that creates scannable codes for URLs, text, Wi-Fi credentials, contact cards, calendar events, and more.',
        '它专为需要强大的 QR 工具而无需注册的个人、小型企业、营销人员和开发人员而构建。 The client-first design means QR codes are generated locally in your browser by default, with an optional server API for professional embedding and integration.',
      ],
    },
    {
      heading: '主要特点',
      bullets: [
        '在浏览器中立即生成二维码 - 无需帐户。',
        '自定义颜色、模块样式、取景器图案并添加图像叠加层。',
        '以多种格式导出：PNG、SVG、WebP 和动画 GIF。',
        '纠错级别、QR 版本、编码模式和掩码选择的高级控制。',
        '扫描安全指南和实时预览有助于保持代码在打印和屏幕上的可读性。',
        '用于专业嵌入的服务器端 API，具有完整的参数支持。',
        '加载后即可离线工作 - 它是一个可以在任何地方运行的静态网络应用程序。',
      ],
    },
    {
      heading: 'ANQR 的工作原理',
      paragraphs: [
        'ANQR runs in your browser and encodes your input into a standard QR matrix with Reed–Solomon error correction, then renders it to the format you choose.',
        '默认情况下，生成发生在浏览器本地。对于专业用途，您还可以使用服务器端 API 通过 URL 参数生成 QR 码 - 非常适合嵌入网站、电子邮件或自动化工作流程。',
        '当您添加叠加或动画时，ANQR 会平衡样式与扫描可靠性，以便结果保持可扫描性。',
        'ANQR 侧重于静态代码（数据位于 QR 内部）。如果您需要动态代码（可编辑目标），您可以对自己的重定向 URL 或短链接进行编码。',
      ],
    },
    {
      heading: '谁运营 ANQR？',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: '广告以及我们如何保持免费',
      paragraphs: [
        'ANQR 可免费使用并由广告支持。我们可能会通过 Google AdSense 和/或其他广告合作伙伴展示广告。',
        '广告提供商可能会使用 cookie 或类似技术根据您的兴趣和浏览活动来个性化广告。您可以在设备设置中以及通过 Google 广告设置管理广告偏好设置，并在我们的隐私政策中了解更多信息。',
        '我们不会出售您编码为二维码的内容。广告有助于支付运行和改进项目的成本。',
      ],
    },
    {
      heading: '开放标准',
      paragraphs: [
        'ANQR 根据 ISO/IEC 18004 标准生成 QR 码，旨在实现扫描仪、相机和打印工作流程的广泛兼容性。',
      ],
    },
    {
      heading: '商标公告',
      paragraphs: [
        'QR Code® 是 DENSO WAVE INCORPORATED 的注册商标。 ANQR 不隶属于 DENSO WAVE INCORPORATED，也不受其认可或赞助。',
      ],
    },
    {
      heading: '反馈和贡献',
      paragraphs: [
        '我们欢迎反馈、错误报告和功能建议。请通过电子邮件或联系页面联系我们 - 我们会阅读每条消息，但回复时间可能会有所不同。',
      ],
    },
  ],
};

export default about;
