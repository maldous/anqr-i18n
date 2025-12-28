import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'Sobre o ANQR',
  description: 'O ANQR é um gerador de códigos QR gratuito que funciona inteiramente no seu dispositivo — não é necessário criar conta.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'O que é o ANQR?',
      paragraphs: [
        'O ANQR (pronuncia-se "anchor") é um gerador de códigos QR gratuito que funciona localmente no seu dispositivo e cria códigos escaneáveis para URLs, texto, credenciais de Wi-Fi, cartões de contato, eventos de calendário e muito mais.',
        'Ele foi feito para pessoas, pequenos negócios, profissionais de marketing e desenvolvedores que querem ferramentas de QR poderosas sem enviar arquivos ou se cadastrar. Seus dados permanecem no seu dispositivo.',
      ],
    },
    {
      heading: 'Principais recursos',
      bullets: [
        'Gere códigos QR instantaneamente no seu dispositivo — sem upload para servidor e sem conta.',
        'Personalize cores, estilo dos módulos, padrões de busca (finder) e adicione sobreposições de imagem.',
        'Exporte em vários formatos: PNG, SVG, WebP e GIF animado.',
        'Controles avançados para nível de correção de erros, versão do QR, modo de codificação e seleção de máscara.',
        'Orientações de legibilidade e pré-visualização ao vivo para manter o código fácil de escanear em telas e impressões.',
        'Funciona offline depois de carregado — é um app web estático que você pode usar em qualquer lugar.',
      ],
    },
    {
      heading: 'Como o ANQR funciona',
      paragraphs: [
        'O ANQR roda no seu navegador, codifica sua entrada em uma matriz QR padrão com correção de erros Reed–Solomon e renderiza no formato escolhido.',
        'Toda a geração acontece localmente. Ao adicionar sobreposições ou animações, o ANQR equilibra estilo e confiabilidade de leitura para que o resultado continue escaneável.',
        'O ANQR foca em códigos estáticos (os dados ficam no QR). Se você precisa de um código dinâmico (destino editável), pode codificar seu próprio URL de redirecionamento ou link curto.',
      ],
    },
    {
      heading: 'Quem opera o ANQR?',
      paragraphs: [
        'O ANQR é operado como uma ferramenta web independente. Para dúvidas, suporte ou assuntos comerciais, use a página de Contato ou envie e-mail para ' + CONTACT_EMAIL + '.',
      ],
    },
    {
      heading: 'Publicidade e como continuamos gratuitos',
      paragraphs: [
        'O ANQR é gratuito e é sustentado por publicidade. Podemos exibir anúncios por meio do Google AdSense e/ou de outros parceiros de publicidade.',
        'Os provedores de anúncios podem usar cookies ou tecnologias semelhantes para personalizar anúncios com base em interesses e atividade de navegação. Você pode gerenciar preferências nas configurações do seu dispositivo e nas configurações de anúncios do Google, e saber mais na nossa Política de Privacidade.',
        'Nós não vendemos o conteúdo que você codifica nos códigos QR. A publicidade ajuda a cobrir os custos de manter e melhorar o projeto.',
      ],
    },
    {
      heading: 'Padrões abertos',
      paragraphs: [
        'O ANQR gera códigos QR com base no padrão ISO/IEC 18004 e busca ampla compatibilidade entre leitores, câmeras e fluxos de impressão.',
      ],
    },
    {
      heading: 'Aviso de marca registrada',
      paragraphs: [
        'QR Code® é uma marca registrada da DENSO WAVE INCORPORATED. O ANQR não é afiliado, endossado ou patrocinado pela DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Feedback e contribuições',
      paragraphs: [
        'Agradecemos feedback, relatos de bugs e sugestões de recursos. Entre em contato por e-mail ou pela página de Contato — lemos todas as mensagens, embora o tempo de resposta possa variar.',
      ],
    },
  ],
};

export default about;
