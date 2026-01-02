import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Sobre a ANQR',
  description:
    'O ANQR é um gerador de código QR gratuito com uma abordagem cliente-primeiro — gere códigos QR localmente ou use nossa API para incorporação.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'O que é ANQR?',
      paragraphs: [
        'O ANQR (pronuncia-se anchor) é um gerador de código QR gratuito que funciona localmente no seu dispositivo e cria códigos escaneáveis para URLs, textos, credenciais de Wi-Fi, cartões de contato, eventos de calendário e muito mais.',
        'Ele foi desenvolvido para indivíduos, pequenas empresas, profissionais de marketing e desenvolvedores que desejam ferramentas de QR Code poderosas sem precisar fazer upload de arquivos ou se cadastrar. Seus dados permanecem no seu dispositivo.',
      ],
    },
    {
      heading: 'Características principais',
      bullets: [
        'Gere códigos QR instantaneamente no seu dispositivo — sem uploads para o servidor, sem necessidade de conta."',
        'Personalize cores, estilos de módulos, padrões de busca e adicione sobreposições de imagens.',
        'Exportar em vários formatos: PNG, SVG, WebP e GIF animado.',
        'Controles avançados para nível de correção de erros, versão do QR Code, modo de codificação e seleção de máscara.',
        'Orientações de segurança de leitura e pré-visualização em tempo real para ajudar a manter os códigos legíveis tanto na impressão quanto nas telas.',
        'API do lado do servidor para incorporação profissional com suporte completo a parâmetros.',
        'Funciona offline depois de carregado — é um aplicativo web estático que você pode executar em qualquer lugar.',
      ],
    },
    {
      heading: 'Como funciona o ANQR',
      paragraphs: [
        'O ANQR é executado no seu navegador e codifica a sua entrada em uma matriz QR padrão com correção de erros Reed-Solomon, e então a renderiza no formato que você escolher.',
        'Por padrão, a geração acontece localmente no seu navegador. Para uso profissional, você também pode usar a API do lado do servidor para gerar códigos QR via parâmetros de URL — perfeito para incorporar em sites, e-mails ou fluxos de trabalho automatizados.',
        'Toda a geração ocorre localmente. Ao adicionar sobreposições ou animações, o ANQR equilibra o estilo com a confiabilidade da leitura, para que o resultado permaneça legível.',
        'O ANQR se concentra em códigos estáticos (os dados estão dentro do QR). Se você precisar de um código dinâmico (destino editável), poderá codificar seu próprio URL de redirecionamento ou link curto.',
      ],
    },
    {
      heading: 'Quem opera a ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Publicidade e como nos mantemos livres',
      paragraphs: [
        'O ANQR é gratuito e financiado por publicidade. Podemos exibir anúncios através do Google AdSense e/ou de outros parceiros de publicidade.',
        'Os fornecedores de anúncios podem usar cookies ou tecnologias semelhantes para personalizar anúncios com base nos seus interesses e na sua atividade de navegação. Pode gerir as preferências de anúncios nas definições do seu dispositivo e através das definições de anúncios do Google, e saber mais na nossa Política de Privacidade.',
        'Não vendemos o conteúdo que você codifica em códigos QR. Os anúncios ajudam a cobrir os custos de operação e aprimoramento do projeto.',
      ],
    },
    {
      heading: 'Padrões abertos',
      paragraphs: [
        'O ANQR gera códigos QR com base na norma ISO/IEC 18004 e visa ampla compatibilidade com scanners, câmeras e fluxos de trabalho de impressão.',
      ],
    },
    {
      heading: 'Aviso de marca registrada',
      paragraphs: [
        'QR Code® é uma marca registrada da DENSO WAVE INCORPORATED. A ANQR não é afiliada, endossada ou patrocinada pela DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Feedback e contribuições',
      paragraphs: [
        'Agradecemos comentários, relatórios de erros e sugestões de recursos. Entre em contato conosco por e-mail ou pela página de contato — lemos todas as mensagens, embora o tempo de resposta possa variar.',
      ],
    },
  ],
};

export default about;
