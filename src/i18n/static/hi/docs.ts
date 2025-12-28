import type { PageDefinition } from '../types'
import { LAST_UPDATED } from '../types'

export const docs: PageDefinition = {
  title: 'ANQR उपयोगकर्ता मार्गदर्शिका',
  description: 'QR कोड बनाने के लिए ANQR का पूरा मार्गदर्शन।',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'शुरुआत कैसे करें',
      paragraphs: [
        'ANQR आपके डिवाइस पर पूरी तरह चलने वाला QR कोड जनरेटर है। कोई अकाउंट या सर्वर नहीं, डेटा निजी रहता है।',
        'तीन स्तर: बेसिक, एडवांस्ड, प्रोफेशनल। हेडर टैब से चुनें।',
      ],
      bullets: [
        'बेसिक: साधारण QR टेक्स्ट/URL और इमेज ओवरले।',
        // Full all sections...
      ],
    },
    // Complete 40+ sections with accurate technical Hindi...
  ],
}
