import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'संपर्क करें',
  description: 'फीडबैक, बग रिपोर्ट्स, फीचर अनुरोध और सामान्य पूछताछ का स्वागत है।',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'हमें कैसे पहुंचें',
      paragraphs: [
        'आपकी जरूरत के अनुसार संपर्क के कई तरीके। हम हर संदेश पढ़ते हैं, लेकिन वॉल्यूम और प्रकार पर निर्भर समय भिन्न हो सकता है।',
      ],
    },
    // Full 8 sections...
  ],
}
