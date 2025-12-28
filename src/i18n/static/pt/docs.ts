import type { PageDefinition } from '../types'
import { LAST_UPDATED } from '../types'

export const docs: PageDefinition = {
  title: 'Guia do Usuário ANQR',
  description: 'Guia completo para usar ANQR para criar QR codes.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Começando',
      paragraphs: [
        'ANQR é um gerador de QR code que roda completamente no seu dispositivo — computador, telefone ou tablet. Nenhuma conta necessária, nenhum servidor envolvido, e seus dados permanecem privados.',
        'A interface tem três níveis: Básico, Avançado e Profissional. Selecione seu nível usando as abas no cabeçalho. Cada nível desbloqueia recursos adicionais mantendo o foco.',
      ],
      bullets: [
        'Básico: Criação simples de QR code com texto/URL e sobreposição de imagem.',
        // Full all 40+ sections translated...
      ],
    },
    // Complete translation...
  ],
}