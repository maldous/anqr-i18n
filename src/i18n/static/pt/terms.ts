import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const terms: PageDefinition = {
  title: 'Termos de Serviço',
  description:
    'Ao acessar ou usar o site, você concorda em ficar vinculado a estes termos.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Aceitação dos termos',
      paragraphs: [
        'Ao acessar ou usar o ANQR (anqr.link), você concorda em ficar vinculado a estes Termos de Serviço e à nossa Política de Privacidade. Se você não concordar com estes termos, não use o site.',
        'Podemos atualizar estes Termos periodicamente. O uso contínuo após alterações será considerado como aceitação dos novos termos.',
      ],
    },
    {
      heading: 'Elegibilidade',
      paragraphs: [
        'Você deve ter pelo menos 13 anos para usar o ANQR. Ao usar o site, você declara que atende a esse requisito de idade. Se você tiver menos de 18 anos, você declara que tem permissão de um dos pais ou responsável para usar o site.',
      ],
    },
    {
      heading: 'Uso permitido',
      paragraphs: [
        'Você pode usar o ANQR apenas para fins legais. Você é o único responsável pelo conteúdo que codifica em códigos QR e por como usa quaisquer códigos QR que gerar.',
      ],
    },
    {
      heading: 'Conduta proibida',
      paragraphs: ['Você concorda em não:'],
      bullets: [
        'Usar o ANQR para criar códigos QR que facilitem phishing, distribuição de malware, fraude, golpes, assédio, difamação ou qualquer atividade ilegal.',
        'Codificar conteúdo que viole direitos de propriedade intelectual, infrinja privacidade ou contenha material ilegal.',
        'Tentar interromper, sobrecarregar ou interferir na operação ou segurança do site.',
        'Fazer engenharia reversa, descompilar ou tentar extrair o código-fonte do site.',
        'Usar ferramentas automatizadas (bots, scrapers) para acessar o site de forma que degrade o desempenho para outros usuários.',
        'Burlar ou desativar quaisquer recursos de segurança ou controles de acesso.',
        'Se passar por qualquer pessoa ou entidade, ou deturpar sua afiliação.',
      ],
    },
    {
      heading: 'Propriedade intelectual',
      paragraphs: [
        'Você mantém a propriedade do conteúdo que codifica em códigos QR. O ANQR não reivindica propriedade sobre seus dados.',
        'O nome ANQR, o logotipo, o design da interface e o código subjacente são protegidos por direitos autorais, marcas e outras leis de propriedade intelectual. Você não pode copiar, modificar, distribuir ou criar obras derivadas sem nossa permissão.',
        'QR Code® é uma marca registrada da DENSO WAVE INCORPORATED. O ANQR não é afiliado à DENSO WAVE.',
      ],
    },
    {
      heading: 'Licença de conteúdo do usuário',
      paragraphs: [
        'Ao usar o ANQR, você não nos concede quaisquer direitos sobre seu conteúdo — toda a geração de códigos QR ocorre localmente no seu dispositivo e nós não acessamos, armazenamos ou transmitimos os dados que você codifica.',
      ],
    },
    {
      heading: 'Serviços de terceiros e publicidade',
      paragraphs: [
        'O site exibe anúncios via Google AdSense e pode incluir links para sites de terceiros. Não somos responsáveis pelo conteúdo, serviços ou práticas de privacidade de terceiros.',
        'Suas interações com anunciantes e terceiros são exclusivamente entre você e eles. Consulte nossa Política de Privacidade para informações sobre práticas de dados de publicidade.',
      ],
    },
    {
      heading: 'Isenção de garantias',
      paragraphs: [
        'O ANQR é fornecido "no estado em que se encontra" e "conforme disponível", sem garantias de qualquer tipo, expressas ou implícitas, incluindo, entre outras, garantias implícitas de comercialização, adequação a um fim específico e não violação.',
        'Não garantimos que: (a) o site funcionará sem interrupções, de forma segura ou livre de erros; (b) os códigos QR serão escaneáveis em todos os ambientes, em todos os dispositivos ou com todos os aplicativos de leitura; (c) o site atenderá às suas necessidades.',
        'Você deve sempre testar os códigos QR nas condições em que eles serão usados (tamanho de impressão, iluminação, tipo de tela, distância, qualidade da câmera).',
      ],
    },
    {
      heading: 'Limitação de responsabilidade',
      paragraphs: [
        'Na máxima extensão permitida por lei, o ANQR e seus operadores, afiliadas e licenciadores não serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais, consequentes, punitivos ou exemplares, incluindo, entre outros, danos por perda de lucros, receita, dados, boa-fé (goodwill), uso ou outras perdas intangíveis, decorrentes de ou relacionados ao seu acesso ou uso (ou incapacidade de acessar ou usar) o serviço.',
        'Você entende e concorda expressamente que o uso do serviço é por sua conta e risco. O serviço é fornecido gratuitamente e, portanto, você concorda que o ANQR e seus operadores não têm qualquer responsabilidade perante você por quaisquer danos ou perdas. Em nenhuma hipótese nossa responsabilidade total agregada excederá zero dólares ($0 AUD).',
        'Você concorda em liberar, renunciar e exonerar quaisquer e todas as reivindicações, demandas e causas de ação contra o ANQR e seus operadores decorrentes do seu uso do serviço.',
        'Algumas jurisdições não permitem a exclusão de certas garantias ou limitações de responsabilidade. Nessas jurisdições, nossa responsabilidade será limitada na máxima extensão permitida pela lei aplicável.',
      ],
    },
    {
      heading: 'Indenização',
      paragraphs: [
        'Você concorda em indenizar, defender e isentar o ANQR, seus operadores, afiliadas e seus respectivos diretores, administradores, funcionários e agentes de quaisquer reivindicações, danos, perdas, responsabilidades, custos e despesas (incluindo honorários advocatícios) decorrentes de: (a) seu uso do site; (b) sua violação destes Termos; (c) sua violação de direitos de terceiros; (d) qualquer conteúdo que você codifique em códigos QR.',
      ],
    },
    {
      heading: 'Resolução de disputas',
      paragraphs: [
        `Qualquer disputa decorrente destes Termos ou do seu uso do ANQR deverá primeiro ser tentada resolver por meio de negociação informal, entrando em contato com ${CONTACT_EMAIL}.`,
        'Se a resolução informal falhar, as disputas serão resolvidas por arbitragem vinculante em Victoria, Austrália, exceto que qualquer parte poderá buscar tutela injuntiva em tribunal por violações de propriedade intelectual.',
      ],
    },
    {
      heading: 'Renúncia a ação coletiva',
      paragraphs: [
        'Na medida permitida por lei, você concorda que quaisquer procedimentos de resolução de disputas serão conduzidos apenas de forma individual e não como ação coletiva, consolidada ou representativa.',
      ],
    },
    {
      heading: 'Lei aplicável',
      paragraphs: [
        'Estes Termos são regidos pelas leis de Victoria, Austrália, sem considerar princípios de conflito de leis. Você concorda com a jurisdição exclusiva dos tribunais localizados em Victoria, Austrália.',
      ],
    },
    {
      heading: 'Alterações e disponibilidade',
      paragraphs: [
        'Podemos modificar, suspender ou descontinuar o site (ou qualquer parte dele) a qualquer momento, sem aviso prévio ou responsabilidade.',
        'Podemos atualizar estes Termos a qualquer momento. A data "Última atualização" indica quando eles foram revisados pela última vez. O uso contínuo após alterações constitui aceitação.',
      ],
    },
    {
      heading: 'Divisibilidade',
      paragraphs: [
        'Se qualquer disposição destes Termos for considerada inválida ou inexequível, essa disposição será aplicada na máxima extensão possível, e as disposições restantes permanecerão em pleno vigor e efeito.',
      ],
    },
    {
      heading: 'Renúncia',
      paragraphs: [
        'Nossa falha em aplicar qualquer direito ou disposição destes Termos não será considerada uma renúncia desse direito ou disposição.',
      ],
    },
    {
      heading: 'Acordo integral',
      paragraphs: [
        'Estes Termos, juntamente com nossa Política de Privacidade, constituem o acordo integral entre você e o ANQR a respeito do uso do site e substituem quaisquer acordos anteriores.',
      ],
    },
    {
      heading: 'Força maior',
      paragraphs: [
        'Não seremos responsáveis por qualquer falha ou atraso no desempenho devido a circunstâncias fora de nosso controle razoável, incluindo desastres naturais, guerra, terrorismo, tumultos, ações governamentais ou falhas de internet/infraestrutura.',
      ],
    },
    {
      heading: 'Contato',
      paragraphs: [`Dúvidas sobre estes Termos podem ser enviadas para: ${CONTACT_EMAIL}`],
    },
  ],
}