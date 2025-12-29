import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'Política de Privacidade',
  description: 'Informações que a ANQR coleta, como elas são usadas e seus direitos de acordo com as leis de privacidade aplicáveis.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Resumo',
      paragraphs: [
        'O ANQR é um gerador de código QR que funciona inteiramente no seu dispositivo. Não exigimos que você crie uma conta e os códigos QR são gerados localmente — não temos acesso ao conteúdo que você codifica.',
        'Utilizamos o Google AdSense para publicidade e podemos usar serviços de análise. Esses serviços coletam informações por meio de cookies e tecnologias semelhantes. Esta política explica quais dados são coletados, como são usados e seus direitos.',
      ],
    },
    {
      heading: 'Informações que coletamos',
      bullets: [
        'Informações que você fornece: Se você entrar em contato conosco por e-mail ou por meio do nosso formulário de contato, coletamos seu nome, endereço de e-mail e conteúdo da mensagem.',
        'Informações coletadas automaticamente: Nosso provedor de hospedagem (Netlify), parceiros de publicidade e serviços de análise podem coletar: endereço IP, tipo e versão do navegador, sistema operacional, tipo de dispositivo, URL de referência, páginas visitadas, tempo no site e localização geográfica aproximada.',
        'Cookies de terceiros: Nossos parceiros de publicidade (Google AdSense) usam cookies e tecnologias semelhantes para exibir e medir anúncios. A própria ANQR não define nenhum cookie primário.',
      ],
    },
    {
      heading: 'Cookies e tecnologias de terceiros',
      paragraphs: [
        'A ANQR não define nenhum cookie primário. Suas preferências (como o modo escuro) são armazenadas localmente em seu dispositivo e não são transmitidas para nenhum servidor.',
        'No entanto, nossos parceiros de publicidade (Google AdSense) e provedor de hospedagem podem usar cookies e tecnologias de rastreamento semelhantes:',
      ],
      bullets: [
        'Cookies de publicidade (de terceiros): Definidos pelo Google AdSense e parceiros de publicidade para exibir anúncios relevantes, medir o desempenho dos anúncios e entender os interesses do usuário. Esses cookies podem rastrear sua atividade em diferentes sites.',
        'Cookies analíticos (de terceiros): Podem ser utilizados pelo nosso fornecedor de hospedagem ou serviços de análise para coletar dados de uso anonimizados.',
      ],
    },
    {
      heading: 'Google AdSense e publicidade',
      paragraphs: [
        'Exibimos anúncios por meio do Google AdSense. O Google e seus parceiros usam cookies para exibir anúncios com base no seu histórico de navegação neste site e em outros sites (publicidade baseada em interesses).',
        'Saiba como o Google usa suas informações: https://policies.google.com/technologies/partner-sites',
        'Gerenciar a personalização de anúncios: https://adssettings.google.com',
        'Opte por não participar através da Network Advertising Initiative: https://optout.networkadvertising.org',
        'Desative a publicidade digital através da Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Como usamos a informação',
      bullets: [
        'Para responder às suas perguntas e prestar apoio.',
        'Exibir anúncios relevantes por meio de nossos parceiros de publicidade.',
        'Para analisar a utilização do site e melhorar os nossos serviços.',
        'Detectar, prevenir e lidar com fraudes, abusos e problemas de segurança.',
        'Para cumprir as obrigações legais.',
      ],
    },
    {
      heading: 'Serviços de terceiros',
      bullets: [
        'Google AdSense: Recebe dados para exibir e mensurar anúncios.',
        'Fornecedores de análises: Recebam dados de uso anonimizados.',
        'Netlify (hospedagem): Processa solicitações e pode registrar endereços IP.',
        'Não vendemos suas informações pessoais. No entanto, o compartilhamento de dados com parceiros de publicidade pode ser considerado uma venda de acordo com a CCPA (veja abaixo).',
      ],
    },
    {
      heading: 'Retenção de dados',
      bullets: [
        'Envio de contatos: até 2 anos.',
        'Registros do servidor: até 30 dias (provedor de hospedagem).',
        'Dados analíticos: até 26 meses (anonimizados).',
        'Cookies de publicidade: Normalmente 13 meses (varia conforme o parceiro).',
      ],
    },
    {
      heading: 'Seus direitos ao abrigo do RGPD (utilizadores do EEE)',
      paragraphs: [
        'Se você estiver no Espaço Econômico Europeu, você tem os seguintes direitos de acordo com o Regulamento Geral de Proteção de Dados:',
      ],
      bullets: [
        'Direito de acesso: Solicitar uma cópia dos dados pessoais que mantemos sobre você.',
        'Direito à retificação: Solicitar a correção de dados incorretos.',
        'Direito ao apagamento: Solicitar a eliminação dos seus dados (direito ao esquecimento).',
        'Direito de restringir o processamento: Solicitar limites sobre como usamos seus dados.',
        'Direito à portabilidade de dados: Solicite seus dados em um formato portátil.',
        'Direito de oposição: Opor-se ao processamento, inclusive para fins de marketing direto.',
        'Direito de retirar o consentimento: Retirar o consentimento a qualquer momento, sempre que o processamento for baseado no consentimento.',
        'Direito de apresentar uma reclamação: Apresente uma reclamação à sua autoridade de proteção de dados.',
      ],
    },
    {
      heading: 'Base jurídica do RGPD',
      paragraphs: [
        'Processamos dados com base nestes fundamentos: (a) Consentimento — para publicidade personalizada (gerida pelos nossos parceiros de publicidade); (b) Interesses legítimos — para análises, segurança e melhoria; (c) Contrato — para responder a pedidos de informação.',
        `Para exercer seus direitos, entre em contato com ${CONTACT_EMAIL}. Responderemos em até 30 dias.`,
      ],
    },
    {
      heading: 'Seus direitos sob a CCPA (usuários da Califórnia)',
      bullets: [
        'Direito de saber: Solicitar informações sobre os dados coletados, suas fontes, finalidades e terceiros envolvidos.',
        'Direito ao apagamento: Solicite a eliminação das suas informações pessoais.',
        'Direito de optar por não participar: Optar por não participar da venda de informações pessoais (o compartilhamento com parceiros de publicidade pode se qualificar).',
        'Direito à não discriminação: Não discriminaremos você por exercer seus direitos.',
      ],
    },
    {
      heading: 'Categorias CCPA coletadas',
      paragraphs: [
        'Categorias: Identificadores (endereço IP, ID do dispositivo), Atividade na Internet (navegação, interações com anúncios), Geolocalização (aproximada), Inferências (interesses da navegação).',
        `Para exercer seus direitos ou optar por não participar: ${CONTACT_EMAIL} ou ajuste as configurações de cookies.`,
      ],
    },
    {
      heading: 'Transferências internacionais',
      paragraphs: [
        'Suas informações podem ser transferidas para países com leis de proteção de dados diferentes, incluindo os Estados Unidos. Utilizamos salvaguardas apropriadas, como Cláusulas Contratuais Padrão.',
      ],
    },
    {
      heading: 'Privacidade das crianças',
      paragraphs: [
        `O ANQR não se destina a crianças menores de 13 anos (ou 16 anos no EEE). Não coletamos dados de crianças intencionalmente. Entre em contato com ${CONTACT_EMAIL} se você acredita que uma criança forneceu informações.`,
      ],
    },
    {
      heading: 'Segurança',
      paragraphs: [
        'Utilizamos medidas técnicas e organizacionais adequadas para proteger os dados, incluindo criptografia HTTPS. No entanto, nenhuma transmissão pela internet é 100% segura.',
      ],
    },
    {
      heading: 'Não rastrear',
      paragraphs: [
        'Respeitamos os sinais de ‘Não Rastrear’ do navegador sempre que possível, embora os parceiros de publicidade possam não responder ao ‘Não Rastrear’.',
      ],
    },
    {
      heading: 'Alterações a esta política',
      paragraphs: [
        'Podemos atualizar esta política periodicamente. A data de Última atualização indica a revisão mais recente. Alterações significativas podem ser comunicadas por meio de um banner no site.',
      ],
    },
    {
      heading: 'Contacte-nos',
      paragraphs: [
        `Para questões de privacidade ou para exercer seus direitos: ${CONTACT_EMAIL} ou use nossa página de contato. Respondemos às solicitações de privacidade em até 30 dias.`,
      ],
    },
  ],
}
