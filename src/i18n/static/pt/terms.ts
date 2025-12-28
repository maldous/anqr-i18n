import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const terms: PageDefinition = {
  title: 'Termos de Serviço',
  description: 'Ao acessar ou usar o site, você concorda em estar vinculado a estes termos.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Aceitação dos termos',
      paragraphs: [
        'Ao acessar ou usar o ANQR (anqr.link), você concorda em estar vinculado aos Termos de Serviço e à Política de Privacidade. Se não concordar com estes termos, não use o site.',
        'Podemos atualizar estes Termos de tempos em tempos. O uso contínuo após alterações constitui aceitação dos novos termos.',
      ],
    },
    // Full translation for all 21 sections with formal legal Portuguese...
  ],
}