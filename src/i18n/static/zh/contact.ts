import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: '联系我们',
  description: '我们欢迎反馈、漏洞报告、功能建议和一般咨询。',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '联系方式',
      paragraphs: [
        '我们提供几种联系方式，根据您的需求选择。我们阅读每条消息，但回复时间可能因数量和咨询类型而异。'
      ]
    },
    {
      heading: '电子邮件',
      paragraphs: [
        `所有咨询：${CONTACT_EMAIL}`,
        '这是最可靠的联系方式，推荐用于详细问题、业务咨询或联系表单在您的设备上无法工作时。'
      ]
    },
    {
      heading: '联系表单',
      paragraphs: [
        '使用下面的表单直接发送消息。如果表单提交失败，请使用电子邮件。'
      ]
    },
    {
      heading: '咨询类型',
      bullets: [
        '一般问题：关于如何使用 ANQR、功能解释或一般反馈的问题。',
        '错误报告：请包括您的浏览器、操作系统、重现步骤和任何错误消息。',
        '功能请求：新功能或改进建议。我们考虑所有请求但无法保证实施。',
        '业务咨询：合作伙伴机会、许可问题或商业使用咨询。',
        '隐私请求：行使 GDPR、CCPA 或其他隐私法下的权利（见隐私政策）。',
        'DMCA/版权：见下文 DMCA 部分的下架通知要求。'
      ]
    },
    {
      heading: '回复时间',
      paragraphs: [
        '我们目标在 5-7 个工作日内回复咨询。隐私相关请求将在法律要求的 30 天内处理。',
        '繁忙期间回复时间可能更长。紧急事项请在主题行标明“紧急”。'
      ]
    },
    {
      heading: '联系前',
      paragraphs: [
        '请检查文档页面以获取常见问题答案。许多关于二维码生成、样式和导出选项的问题已在其中覆盖。'
      ]
    },
    {
      heading: 'DMCA 版权通知',
      paragraphs: [
        '如果您认为 ANQR 上的内容侵犯您的版权，您可提交数字千年版权法 (DMCA) 下架通知。要有效，您的通知必须包括：'
      ],
      bullets: [
        '版权所有者或授权代理的物理或电子签名。',
        '被认定侵犯的受版权保护作品的识别。',
        '被认定侵权材料的识别，并提供足够信息以定位它。',
        '您的联系信息（地址、电话号码和电子邮件地址）。',
        '您善意相信该材料使用未经版权所有者授权的声明。',
        '在伪证处罚下，该通知信息准确且您是版权所有者或授权代理的声明。'
      ]
    },
    {
      heading: 'DMCA 联系',
      paragraphs: [
        `DMCA 通知发送至：${CONTACT_EMAIL}`,
        '请在主题行包含“DMCA 通知”。我们将按照适用法响应有效通知。请注意 ANQR 在用户设备本地生成二维码，不托管用户生成内容。'
      ]
    }
  ]
};

export default contact;
