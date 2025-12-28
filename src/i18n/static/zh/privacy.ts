import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: '隐私政策',
  description: 'ANQR 收集的信息、其用途，以及您在适用隐私法律下享有的权利。',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '摘要',
      paragraphs: [
        'ANQR 是一款完全在您的设备上运行的二维码生成器。您无需创建账号，二维码在本地生成——我们无法访问您编码的内容。',
        '我们使用 Google AdSense 投放广告，并可能使用分析服务。这些服务会通过 Cookie 和类似技术收集信息。本政策说明收集哪些数据、如何使用以及您的权利。',
      ],
    },
    {
      heading: '我们收集的信息',
      bullets: [
        '您提供的信息：如果您通过电子邮件或我们的联系表单与我们联系，我们会收集您的姓名、电子邮件地址以及消息内容。',
        '自动收集的信息：我们的托管服务商（Netlify）、广告合作伙伴和分析服务可能会收集：IP 地址、浏览器类型和版本、操作系统、设备类型、引荐 URL、访问页面、停留时间以及大致地理位置。',
        '第三方 Cookie：我们的广告合作伙伴（Google AdSense）使用 Cookie 和类似技术来投放和衡量广告效果。ANQR 本身不设置任何第一方 Cookie。',
      ],
    },
    {
      heading: 'Cookie 与第三方技术',
      paragraphs: [
        'ANQR 不设置任何第一方 Cookie。您的偏好设置（例如深色模式）保存在您的设备本地，不会传输到任何服务器。',
        '不过，我们的广告合作伙伴（Google AdSense）以及托管服务商可能会使用 Cookie 和类似的跟踪技术：',
      ],
      bullets: [
        '广告 Cookie（第三方）：由 Google AdSense 及广告合作伙伴设置，用于投放相关广告、衡量广告表现并了解用户兴趣。这些 Cookie 可能会跨不同网站跟踪您的活动。',
        '分析 Cookie（第三方）：托管服务商或分析服务可能会使用它们来收集匿名化的使用数据。',
      ],
    },
    {
      heading: 'Google AdSense 与广告',
      paragraphs: [
        '我们通过 Google AdSense 展示广告。Google 及其合作伙伴使用 Cookie，根据您在本网站及其他网站上的浏览记录投放广告（基于兴趣的广告）。',
        '了解 Google 如何使用您的信息：https://policies.google.com/technologies/partner-sites',
        '管理广告个性化：https://adssettings.google.com',
        '通过 Network Advertising Initiative 选择退出：https://optout.networkadvertising.org',
        '通过 Digital Advertising Alliance 选择退出：https://optout.aboutads.info',
      ],
    },
    {
      heading: '我们如何使用信息',
      bullets: [
        '用于回复您的咨询并提供支持。',
        '用于通过广告合作伙伴展示相关广告。',
        '用于分析网站使用情况并改进我们的服务。',
        '用于检测、防止并处理欺诈、滥用和安全问题。',
        '用于遵守法律义务。',
      ],
    },
    {
      heading: '第三方服务',
      bullets: [
        'Google AdSense：接收数据以投放并衡量广告。',
        '分析服务提供商：接收匿名化的使用数据。',
        'Netlify（托管）：处理请求并可能记录 IP 地址。',
        '我们不会出售您的个人信息。但与广告合作伙伴共享数据在 CCPA 下可能被视为“出售”（见下文）。',
      ],
    },
    {
      heading: '数据保留',
      bullets: [
        '联系表单提交：最长 2 年。',
        '服务器日志：最长 30 天（托管服务商）。',
        '分析数据：最长 26 个月（匿名化）。',
        '广告 Cookie：通常 13 个月（因合作伙伴而异）。',
      ],
    },
    {
      heading: '您在 GDPR 下的权利（EEA 用户）',
      paragraphs: [
        '如果您位于欧洲经济区（EEA），您在《通用数据保护条例》（GDPR）下享有以下权利：',
      ],
      bullets: [
        '访问权：请求我们提供所持有的关于您的个人数据副本。',
        '更正权：请求更正不准确的数据。',
        '删除权：请求删除您的数据（“被遗忘权”）。',
        '限制处理权：请求限制我们使用您的数据的方式。',
        '数据可携带权：请求以可携带格式获取您的数据。',
        '反对权：反对处理，包括用于直接营销的处理。',
        '撤回同意权：在基于同意处理的情况下，您可随时撤回同意。',
        '投诉权：向您的数据保护主管机构提出投诉。',
      ],
    },
    {
      heading: 'GDPR 的法律依据',
      paragraphs: [
        '我们基于以下依据处理数据：(a) 同意——用于个性化广告（由我们的广告合作伙伴管理）；(b) 合法利益——用于分析、安全与改进；(c) 合同——用于回复咨询。',
        `如需行使您的权利，请联系 ${CONTACT_EMAIL}。我们将在 30 天内回复。`,
      ],
    },
    {
      heading: '您在 CCPA 下的权利（加州用户）',
      bullets: [
        '知情权：请求有关所收集数据、来源、用途以及第三方的信息。',
        '删除权：请求删除您的个人信息。',
        '选择退出权：选择退出个人信息“出售”（与广告合作伙伴共享可能构成）。',
        '不歧视权：我们不会因您行使权利而对您区别对待。',
      ],
    },
    {
      heading: 'CCPA 收集的类别',
      paragraphs: [
        '类别：标识符（IP 地址、设备 ID）、互联网活动（浏览、广告互动）、地理位置（大致）、推断（从浏览推断的兴趣）。',
        `行使权利或选择退出：${CONTACT_EMAIL} 或调整 Cookie 设置。`,
      ],
    },
    {
      heading: '国际传输',
      paragraphs: [
        '您的信息可能会被传输到数据保护法律不同的国家/地区，包括美国。我们采取适当的保障措施，例如标准合同条款（SCC）。',
      ],
    },
    {
      heading: '儿童隐私',
      paragraphs: [
        `ANQR 不面向 13 岁以下儿童（或 EEA 的 16 岁以下）。我们不会有意收集儿童数据。如您认为儿童提供了信息，请联系 ${CONTACT_EMAIL}。`,
      ],
    },
    {
      heading: '安全',
      paragraphs: [
        '我们采取适当的技术和组织措施保护数据，包括 HTTPS 加密。但任何互联网传输都无法保证 100% 安全。',
      ],
    },
    {
      heading: '请勿跟踪（Do Not Track）',
      paragraphs: [
        '在可行情况下，我们会遵循浏览器的 Do Not Track 信号，但广告合作伙伴可能不会响应 DNT。',
      ],
    },
    {
      heading: '本政策的变更',
      paragraphs: [
        '我们可能会不时更新本政策。“Last updated”日期表示最近一次修订。重大变更可能会通过网站横幅通知。',
      ],
    },
    {
      heading: '联系我们',
      paragraphs: [
        `如有隐私问题或需行使权利：请联系 ${CONTACT_EMAIL} 或使用我们的联系页面。我们将在 30 天内回复隐私请求。`,
      ],
    },
  ],
}
