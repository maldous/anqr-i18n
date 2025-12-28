import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'Política de Privacidade',
  description: 'Informações coletadas pelo ANQR, como são usadas e seus direitos sob leis de privacidade aplicáveis.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Resumo',
      paragraphs: [
        'O ANQR é um gerador de QR code que roda completamente no seu dispositivo. Não exigimos que você crie uma conta, e QR codes são gerados localmente — não temos acesso ao conteúdo que você codifica.',
        'Usamos Google AdSense para publicidade e possivelmente serviços de análise. Esses serviços coletam informações via cookies e tecnologias semelhantes. Esta política explica o que é coletado, como usado e seus direitos.',
      ],
    },
    // Full complete translation for all sections...
  ],
}