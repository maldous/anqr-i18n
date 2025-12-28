import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'ANQR பற்றி',
  description: 'ANQR ஒரு இலவச QR கோட் உருவாக்கி, உங்கள் சாதனத்தில் முழுமையாக இயங்குகிறது — கணக்கு தேவையில்லை.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'ANQR என்றால் என்ன?',
      paragraphs: [
        'ANQR ("anchor" உச்சரிப்பு) உங்கள் சாதனத்தில் முழுமையாக இயங்கும் இலவச QR கோட் உருவாக்கி — உங்கள் கணினி, தொலைபேசி அல்லது டேப்லெட். URL, உரை, Wi-Fi சான்றிதழ்கள், தொடர்பு அட்டை, நிகழ்ச்சி காலண்டர் போன்றவற்றிற்கான QR கோடுகளை உருவாக்கவும்.',
        'இந்த கருவி கணக்கு உருவாக்காமல் விரைவாக QR கோடுகளை உருவாக்க வேண்டிய தனிநபர்கள், சிறு வணிகங்கள், மார்க்கெட்டர்கள் மற்றும் உருவாக்குநர்களுக்காக வடிவமைக்கப்பட்டது. உங்கள் தரவு உங்கள் சாதனத்தை விட்டு வெளியேறாது.',
      ],
    },
    // Full translation for all sections...
  ],
}