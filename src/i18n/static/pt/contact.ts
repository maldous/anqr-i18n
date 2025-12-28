import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'Fale Conosco',
  description: 'Acolhemos feedback, relatos de bugs, pedidos de recursos e dúvidas gerais.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Como falar conosco',
      paragraphs: [
        'Oferecemos várias formas de contato, dependendo da sua necessidade. Lemos todas as mensagens, mas o tempo de resposta pode variar conforme o volume e o tipo de solicitação.',
      ],
    },
    {
      heading: 'E-mail',
      paragraphs: [
        `Para todas as solicitações: ${CONTACT_EMAIL}`,
        'Este é o meio mais confiável para falar conosco e é recomendado para perguntas detalhadas, solicitações comerciais ou se o formulário de contato não funcionar no seu dispositivo.',
      ],
    },
    {
      heading: 'Formulário de contato',
      paragraphs: [
        'Use o formulário abaixo para nos enviar uma mensagem diretamente. Se o formulário não for enviado com sucesso, use o e-mail.',
      ],
    },
    {
      heading: 'Tipos de solicitações',
      bullets: [
        'Perguntas gerais: Dúvidas sobre como usar o ANQR, explicações de recursos ou feedback geral.',
        'Relatos de bugs: Inclua seu navegador, sistema operacional, passos para reproduzir e quaisquer mensagens de erro que você veja.',
        'Pedidos de recursos: Sugestões de novos recursos ou melhorias. Consideramos todos os pedidos, mas não podemos prometer a implementação.',
        'Solicitações comerciais: Oportunidades de parceria, dúvidas sobre licenciamento ou uso comercial.',
        'Solicitações de privacidade: Pedidos para exercer seus direitos de privacidade sob GDPR, CCPA ou outras leis de privacidade (veja a Política de Privacidade).',
        'DMCA/Direitos autorais: Veja a seção de DMCA abaixo para os requisitos de notificação de remoção.',
      ],
    },
    {
      heading: 'Prazos de resposta',
      paragraphs: [
        'Nosso objetivo é responder às solicitações em até 5–7 dias úteis. Solicitações relacionadas à privacidade serão atendidas em até 30 dias, conforme exigido por lei.',
        'Em períodos de maior demanda, o tempo de resposta pode ser maior. Para assuntos urgentes, indique "URGENT" no assunto.',
      ],
    },
    {
      heading: 'Antes de entrar em contato',
      paragraphs: [
        'Consulte nossa página de Documentação para respostas às dúvidas comuns sobre como usar os recursos do ANQR. Muitas perguntas sobre geração de QR code, estilos e opções de exportação são respondidas lá.',
      ],
    },
    {
      heading: 'Notificações de Direitos Autorais (DMCA)',
      paragraphs: [
        'Se você acredita que conteúdo disponível no ANQR viola seus direitos autorais, você pode enviar uma notificação de remoção sob o Digital Millennium Copyright Act (DMCA). Para ser válida, sua notificação deve incluir:',
      ],
      bullets: [
        'Uma assinatura física ou eletrônica do titular dos direitos autorais ou de um agente autorizado.',
        'Identificação da obra protegida por direitos autorais que alega ter sido infringida.',
        'Identificação do material que alega estar infringindo, com informações suficientes para localizá-lo.',
        'Suas informações de contato (endereço, telefone e e-mail).',
        'Uma declaração de boa-fé de que o uso do material não é autorizado pelo titular dos direitos autorais.',
        'Uma declaração, sob pena de perjúrio, de que as informações na sua notificação são precisas e de que você é o titular dos direitos autorais ou está autorizado a agir em seu nome.',
      ],
    },
    {
      heading: 'Contato DMCA',
      paragraphs: [
        `Envie notificações DMCA para: ${CONTACT_EMAIL}`,
        'Inclua "DMCA Notice" no assunto. Responderemos a notificações válidas de acordo com a lei aplicável. Observe que o ANQR gera QR codes localmente nos dispositivos dos usuários e não hospeda conteúdo gerado por usuários.',
      ],
    },
  ],
};

export default contact;
