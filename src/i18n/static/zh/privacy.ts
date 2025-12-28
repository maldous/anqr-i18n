import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: '隐私政策',
  description: 'ANQR 收集哪些信息、如何使用以及您在适用隐私法律下的权利。',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '概述',
      paragraphs: [
        'ANQR 是一个完全在您的设备上运行的二维码生成器。我们不要求您创建账户，二维码本地生成 — 我们无法访问您编码的内容。',
        '我们使用 Google AdSense 进行广告，并可能使用分析服务。这些服务通过 Cookie 和类似技术收集信息。本政策解释收集的數據、其使用方式以及您的权利。'
      ]
    },
    {
      heading: '我们收集的信息',
      bullets: [
        '您提供的信息：如果您通过电子邮件或联系表单联系我们，我们收集您的姓名、电子邮件地址和消息内容。',
        `自动收集的信息：我们的托管提供商（Netlify）、广告合作伙伴和分析服务可能收集：IP 地址、浏览器类型和版本、操作系统、设备类型、来源 URL、访问页面、停留时间和大概地理位置。`,
        '第三方 Cookie：我们的广告合作伙伴（Google AdSense）使用 Cookie 和类似技术提供和测量广告。ANQR 本身不设置任何第一方 Cookie。'
      ]
    },
    {
      heading: 'Cookie 和第三方技术',
      paragraphs: [
        'ANQR 不设置任何第一方 Cookie。您的偏好（如深色模式）存储在您的设备本地，不会传输到服务器。',
        '然而，我们的广告合作伙伴（Google AdSense）和托管提供商可能使用 Cookie 和类似跟踪技术：'
      ],
      bullets: [
        '广告 Cookie（第三方）：由 Google AdSense 和广告合作伙伴设置，用于提供相关广告、测量广告性能并了解用户兴趣。这些 Cookie 可能跟踪您在不同网站上的活动。',
        '分析 Cookie（第三方）：可能由我们的托管提供商或分析服务用于收集匿名使用數據。'
      ]
    },
    {
      heading: 'Google AdSense 和广告',
      paragraphs: [
        '我们通过 Google AdSense 显示广告。Google 及其合作伙伴使用 Cookie 根据您在本网站和其他网站的浏览历史提供广告（基于兴趣的广告）。',
        '了解 Google 如何使用您的信息：https://policies.google.com/technologies/partner-sites',
        '管理广告个性化：https://adssettings.google.com',
        '通过 Network Advertising Initiative 选择退出：https://optout.networkadvertising.org',
        '通过 Digital Advertising Alliance 选择退出：https://optout.aboutads.info'
      ]
    },
    {
      heading: '我们如何使用信息',
      bullets: [
        '回复您的咨询并提供支持。',
        '通过广告合作伙伴显示相关广告。',
        '分析网站使用情况并改进我们的服务。',
        '检测、预防和处理欺诈、滥用和安全问题。',
        '遵守法律义务。'
      ]
    },
    {
      heading: '第三方服务',
      bullets: [
        'Google AdSense：接收數據以提供和测量广告。',
        '分析提供商：接收匿名使用數據。',
        'Netlify（托管）：处理请求并可能记录 IP 地址。',
        '我们不出售您的个人信息。然而，与广告合作伙伴共享數據可能被视为 CCPA 下的“销售”（见下文）。'
      ]
    },
    {
      heading: '數據保留',
      bullets: [
        '联系提交：最多 2 年。',
        '服务器日志：最多 30 天（托管提供商）。',
        '分析數據：最多 26 个月（匿名）。',
        '广告 Cookie：通常 13 个月（因合作伙伴而异）。'
      ]
    },
    {
      heading: 'GDPR 下您的权利（EEA 用户）',
      paragraphs: [
        '如果您位于欧洲经济区，您在通用數據保护条例下拥有以下权利：'
      ],
      bullets: [
        '访问权：请求我们持有的您的个人數據副本。',
        '更正权：请求更正不准确數據。',
        '删除权：请求删除您的數據（“被遗忘权”）。',
        '限制处理权：请求限制我们使用您的數據的方式。',
        '數據可移植权：请求以可移植格式获取您的數據。',
        '反对权：反对处理，包括直接营销。',
        '撤回同意权：随时撤回基于同意的处理。',
        '投诉权：向數據保护机构投诉。'
      ]
    },
    {
      heading: 'GDPR 法律依据',
      paragraphs: [
        '我们基于以下依据处理數據：(a) 同意 — 用于个性化广告（由广告合作伙伴管理）；(b) 合法利益 — 用于分析、安全和改进；(c) 合同 — 用于回复咨询。',
        `行使权利，请联系 ${CONTACT_EMAIL}。我们将在 30 天内回复。`
      ]
    },
    {
      heading: 'CCPA 下您的权利（加州用户）',
      bullets: [
        '知情权：请求有关收集數據、来源、目的和第三方信息。',
        '删除权：请求删除您的个人信息。',
        '选择退出权：选择退出个人信息“销售”（与广告合作伙伴共享可能符合）。',
        '非歧视权：行使权利时我们不会歧视。'
      ]
    },
    {
      heading: 'CCPA 收集类别',
      paragraphs: [
        '类别：标识符（IP 地址、设备 ID）、互联网活动（浏览、广告互动）、地理位置（大概）、推断（浏览兴趣）。',
        `行使权利或选择退出：${CONTACT_EMAIL} 或调整 Cookie 设置。`
      ]
    },
    {
      heading: '国际传输',
      paragraphs: [
        '您的信息可能传输到數據保护法不同的国家，包括美国。我们使用标准合同条款等适当保障措施。'
      ]
    },
    {
      heading: '儿童隐私',
      paragraphs: [
        `ANQR 不针对 13 岁以下儿童（EEA 为 16 岁）。我们不故意收集儿童數據。如果您认为儿童提供了信息，请联系 ${CONTACT_EMAIL}。`
      ]
    },
    {
      heading: '安全',
      paragraphs: [
        '我们使用适当的技术和组织措施保护數據，包括 HTTPS 加密。然而，互联网传输并非 100% 安全。'
      ]
    },
    {
      heading: '不跟踪',
      paragraphs: [
        '我们尽可能尊重不跟踪浏览器信号，但广告合作伙伴可能不响应 DNT。'
      ]
    },
    {
      heading: '政策变更',
      paragraphs: [
        '我们可能定期更新本政策。“最后更新”日期表示最近修订。重大变更可能通过网站横幅通知。'
      ]
    },
    {
      heading: '联系我们',
      paragraphs: [
        `隐私问题或行使权利：${CONTACT_EMAIL} 或使用联系页面。我们将在 30 天内回复隐私请求。`
      ]
    }
  ]
};

export default privacy;
