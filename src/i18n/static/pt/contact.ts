import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'Contato',
  description: 'Bem-vindo feedback, relatórios de bugs, solicitações de recursos e consultas gerais.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Como nos contatar',
      paragraphs: [
        'Oferecemos várias maneiras de entrar em contato dependendo das suas necessidades. Lemos todas as mensagens, embora os tempos de resposta possam variar com base no volume e tipo de consulta.',
      ],
    },
    // Full translation for all 8 sections...
  ],
}