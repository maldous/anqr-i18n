import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'Sobre ANQR',
  description: 'ANQR é um gerador de QR code gratuito que roda completamente no seu dispositivo — sem conta necessária.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'O que é ANQR?',
      paragraphs: [
        'ANQR (pronunciado "anchor") é um gerador de QR code gratuito que roda completamente no seu dispositivo — computador, telefone ou tablet. Crie QR codes para URLs, texto, credenciais Wi-Fi, cartões de contato, eventos de calendário e mais.',
        'A ferramenta é projetada para indivíduos, pequenas empresas, marketers e desenvolvedores que precisam criar QR codes rapidamente sem criar uma conta. Seus dados nunca saem do seu dispositivo.',
      ],
    },
    {
      heading: 'Principais recursos',
      bullets: [
        'Gere QR codes instantaneamente no seu dispositivo — sem uploads para servidor, sem conta necessária.',
        'Personalize a aparência com cores, estilos de módulo, padrões de finder e sobreposições de imagem.',
        'Exporte em múltiplos formatos: PNG, SVG, WebP e GIF animado.',
        'Opções avançadas para correção de erro, controle de versão e modos de codificação.',
        'Ferramentas de análise de segurança para garantir que seus QR codes permaneçam escaneáveis.',
        'Três níveis de recursos (Básico, Avançado, Profissional) para suas necessidades.',
      ],
    },
    {
      heading: 'Como o ANQR funciona',
      paragraphs: [
        'O ANQR processa tudo localmente no seu dispositivo. O texto ou dados que você insere para criar um QR code nunca saem do seu dispositivo — é codificado diretamente no seu computador, telefone ou tablet sem ser enviado para nenhum servidor.',
        'Ao carregar uma imagem de sobreposição, ela é processada localmente no seu dispositivo. Se você carrega uma imagem de uma URL, ela é buscada diretamente do servidor hospedeiro.',
        'Nós não armazenamos, logamos ou acessamos o conteúdo que você codifica em QR codes.',
      ],
    },
    {
      heading: 'Quem opera o ANQR?',
      paragraphs: [
        `O ANQR é operado como uma ferramenta web independente. Para perguntas, suporte ou consultas comerciais, use a página de Contato ou envie e-mail para ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: 'Publicidade e como permanecemos gratuitos',
      paragraphs: [
        'O ANQR é gratuito para uso e suportado por publicidade. Exibimos anúncios através do Google AdSense e possivelmente outros parceiros de publicidade.',
        'Esses serviços de publicidade podem usar cookies e tecnologias semelhantes para entregar anúncios baseados nos seus interesses e histórico de navegação. Saiba mais na nossa Política de Privacidade e gerencie suas preferências de anúncios nas configurações do seu dispositivo ou Google Ads Settings.',
        'Acreditamos na transparência: anúncios nos ajudam a manter a ferramenta gratuita e acessível a todos sem assinaturas ou paywalls.',
      ],
    },
    {
      heading: 'Padrões abertos',
      paragraphs: [
        'QR codes são um padrão ISO aberto (ISO/IEC 18004). O ANQR gera QR codes compatíveis com padrões que funcionam com qualquer app de scanner QR ou dispositivo.',
      ],
    },
    {
      heading: 'Aviso de marca registrada',
      paragraphs: [
        'QR Code® é uma marca registrada da DENSO WAVE INCORPORATED. O ANQR é uma ferramenta independente e não é afiliada, endossada ou patrocinada pela DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Feedback e contribuições',
      paragraphs: [
        'Bem-vindos feedback, relatórios de bugs e sugestões de recursos. Use a página de Contato para entrar em contato. Lemos todas as mensagens, embora o tempo de resposta possa variar.',
      ],
    },
  ],
}