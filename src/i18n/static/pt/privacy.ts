import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'Política de Privacidade',
  description: 'Informações que a ANQR coleta, como são usadas e os seus direitos nos termos das leis de privacidade aplicáveis.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Resumo',
      paragraphs: [
        'A ANQR é um gerador de QR Code que funciona inteiramente no seu dispositivo. Não é necessário criar uma conta e os QR Codes são gerados localmente — não temos acesso ao conteúdo que você codifica.',
        'Usamos o Google AdSense para publicidade e podemos usar serviços de análise. Esses serviços coletam informações por meio de cookies e tecnologias semelhantes. Esta política explica quais dados são coletados, como são usados e quais são os seus direitos.',
      ],
    },
    {
      heading: 'Informações que coletamos',
      bullets: [
        'Informações fornecidas por você: Se você entrar em contato por e-mail ou pelo nosso formulário de contato, coletamos seu nome, endereço de e-mail e o conteúdo da mensagem.',
        'Informações coletadas automaticamente: Nosso provedor de hospedagem (Netlify), parceiros de publicidade e serviços de análise podem coletar: endereço IP, tipo e versão do navegador, sistema operacional, tipo de dispositivo, URL de referência, páginas visitadas, tempo no site e localização geográfica aproximada.',
        'Cookies de terceiros: Nossos parceiros de publicidade (Google AdSense) usam cookies e tecnologias semelhantes para veicular e medir anúncios. A própria ANQR não define cookies primários (first‑party).',
      ],
    },
    {
      heading: 'Cookies e tecnologias de terceiros',
      paragraphs: [
        'A ANQR não define cookies primários. Suas preferências (como modo escuro) são armazenadas localmente no seu dispositivo e não são transmitidas a nenhum servidor.',
        'No entanto, nossos parceiros de publicidade (Google AdSense) e o provedor de hospedagem podem usar cookies e tecnologias de rastreamento semelhantes:',
      ],
      bullets: [
        'Cookies de publicidade (terceiros): Definidos pelo Google AdSense e parceiros para exibir anúncios relevantes, medir desempenho e entender interesses do usuário. Esses cookies podem rastrear sua atividade em diferentes sites.',
        'Cookies de análise (terceiros): Podem ser usados pelo provedor de hospedagem ou por serviços de análise para coletar dados de uso anonimizados.',
      ],
    },
    {
      heading: 'Google AdSense e publicidade',
      paragraphs: [
        'Exibimos anúncios por meio do Google AdSense. O Google e seus parceiros usam cookies para veicular anúncios com base no seu histórico de navegação neste site e em outros sites (publicidade baseada em interesses).',
        'Saiba como o Google usa suas informações: https://policies.google.com/technologies/partner-sites',
        'Gerencie a personalização de anúncios: https://adssettings.google.com',
        'Desative via Network Advertising Initiative: https://optout.networkadvertising.org',
        'Desative via Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Como usamos as informações',
      bullets: [
        'Para responder às suas solicitações e fornecer suporte.',
        'Para exibir anúncios relevantes por meio de nossos parceiros de publicidade.',
        'Para analisar o uso do site e melhorar nossos serviços.',
        'Para detectar, prevenir e tratar fraudes, abusos e problemas de segurança.',
        'Para cumprir obrigações legais.',
      ],
    },
    {
      heading: 'Serviços de terceiros',
      bullets: [
        'Google AdSense: Recebe dados para veicular e medir anúncios.',
        'Provedores de análise: Recebem dados de uso anonimizados.',
        'Netlify (hospedagem): Processa solicitações e pode registrar endereços IP.',
        'Não vendemos suas informações pessoais. No entanto, o compartilhamento de dados com parceiros de publicidade pode ser considerado uma "venda" segundo a CCPA (veja abaixo).',
      ],
    },
    {
      heading: 'Retenção de dados',
      bullets: [
        'Envios pelo contato: Até 2 anos.',
        'Logs do servidor: Até 30 dias (provedor de hospedagem).',
        'Dados de análise: Até 26 meses (anonimizados).',
        'Cookies de publicidade: Normalmente 13 meses (varia por parceiro).',
      ],
    },
    {
      heading: 'Seus direitos sob a GDPR (usuários do EEE)',
      paragraphs: [
        'Se você estiver no Espaço Econômico Europeu (EEE), você tem os seguintes direitos sob o Regulamento Geral sobre a Proteção de Dados (GDPR):',
      ],
      bullets: [
        'Direito de acesso: Solicitar uma cópia dos dados pessoais que mantemos sobre você.',
        'Direito de retificação: Solicitar a correção de dados imprecisos.',
        'Direito de eliminação: Solicitar a exclusão dos seus dados ("direito ao esquecimento").',
        'Direito de restringir o tratamento: Solicitar limites sobre como usamos seus dados.',
        'Direito à portabilidade: Solicitar seus dados em um formato portátil.',
        'Direito de oposição: Opor-se ao tratamento, inclusive para marketing direto.',
        'Direito de retirar consentimento: Retirar o consentimento a qualquer momento quando o tratamento for baseado em consentimento.',
        'Direito de apresentar reclamação: Registrar uma reclamação junto à sua autoridade de proteção de dados.',
      ],
    },
    {
      heading: 'Base legal da GDPR',
      paragraphs: [
        'Processamos dados com base em: (a) Consentimento — para publicidade personalizada (gerenciada por nossos parceiros de publicidade); (b) Interesses legítimos — para análise, segurança e melhorias; (c) Contrato — para responder a solicitações.',
        `Para exercer seus direitos, entre em contato em ${CONTACT_EMAIL}. Respondemos em até 30 dias.`,
      ],
    },
    {
      heading: 'Seus direitos sob a CCPA (usuários da Califórnia)',
      bullets: [
        'Direito de saber: Solicitar informações sobre dados coletados, fontes, finalidades e terceiros.',
        'Direito de excluir: Solicitar a exclusão das suas informações pessoais.',
        'Direito de optar por não participar: Optar por não participar da "venda" de informações pessoais (o compartilhamento com parceiros de anúncios pode se enquadrar).',
        'Direito à não discriminação: Não discriminaremos você por exercer seus direitos.',
      ],
    },
    {
      heading: 'Categorias coletadas (CCPA)',
      paragraphs: [
        'Categorias: Identificadores (endereço IP, ID do dispositivo), atividade na internet (navegação, interações com anúncios), geolocalização (aproximada), inferências (interesses a partir da navegação).',
        `Para exercer direitos ou optar por não participar: ${CONTACT_EMAIL} ou ajuste as configurações de cookies.`,
      ],
    },
    {
      heading: 'Transferências internacionais',
      paragraphs: [
        'Suas informações podem ser transferidas para países com leis de proteção de dados diferentes, incluindo os Estados Unidos. Usamos salvaguardas apropriadas, como Cláusulas Contratuais Padrão.',
      ],
    },
    {
      heading: 'Privacidade de crianças',
      paragraphs: [
        `A ANQR não é direcionada a crianças menores de 13 anos (ou 16 no EEE). Não coletamos intencionalmente dados de crianças. Entre em contato em ${CONTACT_EMAIL} se você acreditar que uma criança forneceu informações.`,
      ],
    },
    {
      heading: 'Segurança',
      paragraphs: [
        'Usamos medidas técnicas e organizacionais apropriadas para proteger os dados, incluindo criptografia HTTPS. No entanto, nenhuma transmissão pela internet é 100% segura.',
      ],
    },
    {
      heading: 'Não rastrear (Do Not Track)',
      paragraphs: [
        'Respeitamos sinais Do Not Track do navegador quando possível, embora parceiros de publicidade possam não responder ao DNT.',
      ],
    },
    {
      heading: 'Alterações nesta política',
      paragraphs: [
        'Podemos atualizar esta política periodicamente. A data "Last updated" indica a revisão mais recente. Alterações significativas podem ser comunicadas por meio de um banner no site.',
      ],
    },
    {
      heading: 'Fale conosco',
      paragraphs: [
        `Para dúvidas de privacidade ou para exercer seus direitos: ${CONTACT_EMAIL} ou use nossa página de contato. Respondemos a solicitações de privacidade em até 30 dias.`,
      ],
    },
  ],
}
