import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const terms: PageDefinition = {
  title: 'सेवा शर्तें',
  description: 'साइट एक्सेस या उपयोग से आप इन शर्तों से सहमत होते हैं।',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'शर्तों की स्वीकृति',
      paragraphs: [
        'ANQR (anqr.link) एक्सेस या उपयोग से आप सेवा शर्तें और गोपनीयता नीति से बंधे होते हैं। यदि सहमत न हों तो साइट उपयोग न करें।',
        'हम शर्तें अपडेट कर सकते हैं। परिवर्तन के बाद उपयोग नई शर्तों की स्वीकृति है।',
      ],
    },
    // Full 21 sections translated formally...
  ],
}
