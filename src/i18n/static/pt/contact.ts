import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'Contacte-nos',
  description: 'Agradecemos comentários, relatórios de erros, solicitações de recursos e dúvidas em geral.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Como nos contactar',
      paragraphs: [
        'Oferecemos diversas formas de contato, dependendo das suas necessidades. Lemos todas as mensagens, embora o tempo de resposta possa variar de acordo com o volume e o tipo de consulta.',
      ],
    },
    {
      heading: 'E-mail',
      paragraphs: [
        `Para quaisquer dúvidas: ${CONTACT_EMAIL}`,
        'Esta é a forma mais confiável de entrar em contato conosco e é recomendada para perguntas detalhadas, consultas comerciais ou caso o formulário de contato não funcione no seu dispositivo.',
      ],
    },
    {
      heading: 'Formulário de contato',
      paragraphs: [
        'Use o formulário abaixo para nos enviar uma mensagem diretamente. Se o formulário não for enviado com sucesso, use o e-mail.',
      ],
    },
    {
      heading: 'Tipos de consultas',
      bullets: [
        'Perguntas gerais: Perguntas sobre como usar o ANQR, explicações de recursos ou feedback geral.',
        'Relatórios de erros: Inclua seu navegador, sistema operacional, etapas para reproduzir o problema e quaisquer mensagens de erro que você veja.',
        'Solicitações de recursos: Sugestões para novos recursos ou melhorias. Consideramos todas as solicitações, embora não possamos prometer a implementação.',
        'Consultas comerciais: Oportunidades de parceria, questões de licenciamento ou consultas sobre uso comercial.',
        'Solicitações de privacidade: Solicitações para exercer seus direitos de privacidade de acordo com o GDPR, CCPA ou outras leis de privacidade (consulte a Política de Privacidade).',
        'DMCA/Direitos Autorais: Consulte a seção DMCA abaixo para obter informações sobre os requisitos de notificação de remoção.',
      ],
    },
    {
      heading: 'Tempos de resposta',
      paragraphs: [
        'Nosso objetivo é responder às solicitações dentro de 5 a 7 dias úteis. As solicitações relacionadas à privacidade serão atendidas dentro de 30 dias, conforme exigido por lei.',
        'Durante períodos de grande movimento, os tempos de resposta podem ser mais longos. Para assuntos urgentes, indique URGENTE na linha de assunto.',
      ],
    },
    {
      heading: 'Antes de nos contactar',
      paragraphs: [
        'Consulte nossa página de Documentação para obter respostas às perguntas mais frequentes sobre como usar os recursos do ANQR. Muitas dúvidas sobre geração de código QR, formatação e opções de exportação são abordadas lá.',
      ],
    },
    {
      heading: 'Avisos de direitos autorais da DMCA',
      paragraphs: [
        'Se você acredita que algum conteúdo disponível na ANQR infringe seus direitos autorais, você pode enviar uma notificação de remoção de conteúdo de acordo com a Lei de Direitos Autorais do Milênio Digital (DMCA). Para ser válida, sua notificação deve incluir:',
      ],
      bullets: [
        'Uma assinatura física ou eletrônica do proprietário dos direitos autorais ou de seu agente autorizado.',
        'Identificação da obra protegida por direitos autorais que supostamente foi infringida.',
        'Identificação do material que se alega estar infringindo direitos autorais, com informações suficientes para localizá-lo.',
        'Suas informações de contato (endereço, número de telefone e endereço de e-mail).',
        'Uma declaração de que você acredita de boa-fé que o uso do material não é autorizado pelo proprietário dos direitos autorais.',
        'Uma declaração, sob pena de perjúrio, de que as informações em sua notificação são precisas e de que você é o proprietário dos direitos autorais ou está autorizado a agir em nome deles.',
      ],
    },
    {
      heading: 'Contato DMCA',
      paragraphs: [
        `Enviar notificações DMCA para: ${CONTACT_EMAIL}`,
        'Por favor, inclua Notificação DMCA na linha de assunto. Responderemos às notificações válidas de acordo com a legislação aplicável. Observe que a ANQR gera códigos QR localmente nos dispositivos dos usuários e não hospeda conteúdo gerado pelo usuário.',
      ],
    },
  ],
};

export default contact;
