import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const terms: PageDefinition = {
  title: 'Termos de Serviço',
  description: 'Ao acessar ou usar o site, você concorda em ficar vinculado a estes termos.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Aceitação dos termos',
      paragraphs: [
        'Ao acessar ou usar o ANQR (anqr.link), você concorda em ficar vinculado a estes Termos de Serviço e à nossa Política de Privacidade. Se você não concordar com estes termos, não use o site.',
        'Podemos atualizar estes Termos periodicamente. O uso continuado do site após as alterações constitui aceitação dos novos termos.',
      ],
    },
    {
      heading: 'Elegibilidade',
      paragraphs: [
        'Você deve ter pelo menos 13 anos de idade para usar o ANQR. Ao usar o site, você declara que atende a esse requisito de idade. Se você for menor de 18 anos, declara que tem a permissão de seus pais ou responsáveis para usar o site.',
      ],
    },
    {
      heading: 'Uso permitido',
      paragraphs: [
        'Você pode usar o ANQR apenas para fins lícitos. Você é o único responsável pelo conteúdo que codifica nos códigos QR e pela forma como utiliza os códigos QR que gera.',
      ],
    },
    {
      heading: 'Conduta proibida',
      paragraphs: ['Você concorda em não:'],
      bullets: [
        'Use ANQR para criar códigos QR que facilitem phishing, distribuição de malware, fraude, golpes, assédio, difamação ou qualquer atividade ilegal.',
        'Codificar conteúdo que infrinja direitos de propriedade intelectual, viole a privacidade ou contenha material ilegal.',
        'Tentar interromper, sobrecarregar ou interferir com o funcionamento ou a segurança do local.',
        'Fazer engenharia reversa, descompilar ou tentar extrair o código-fonte do site.',
        'Utilizar ferramentas automatizadas (bots, scrapers) para acessar o site de maneira que prejudique o desempenho de outros usuários.',
        'Contornar ou desativar quaisquer recursos de segurança ou controle de acesso.',
        'Fingir ser outra pessoa ou entidade ou deturpar sua afiliação.',
      ],
    },
    {
      heading: 'Propriedade intelectual',
      paragraphs: [
        'Você mantém a propriedade do conteúdo que codifica nos códigos QR. A ANQR não reivindica a propriedade dos seus dados.',
        'O nome, o logotipo, o design da interface e o código subjacente da ANQR são protegidos por direitos autorais, marcas registradas e outras leis de propriedade intelectual. Você não pode copiar, modificar, distribuir ou criar trabalhos derivados sem nossa permissão.',
        'QR Code® é uma marca registrada da DENSO WAVE INCORPORATED. A ANQR não tem qualquer vínculo com a DENSO WAVE.',
      ],
    },
    {
      heading: 'Licença de conteúdo do usuário',
      paragraphs: [
        'Ao usar o ANQR, você não nos concede nenhum direito sobre o seu conteúdo — toda a geração do código QR ocorre localmente no seu dispositivo e não acessamos, armazenamos ou transmitimos seus dados codificados.',
        'Ao usar a API do lado do servidor, seu conteúdo é processado para gerar a imagem QR, mas não é armazenado, registrado ou usado para qualquer outro propósito além de renderizar a imagem solicitada.',
      ],
    },
    {
      heading: 'Serviços e publicidade de terceiros',
      paragraphs: [
        'O site exibe anúncios por meio do Google AdSense e pode incluir links para sites de terceiros. Não nos responsabilizamos pelo conteúdo, serviços ou práticas de privacidade de terceiros.',
        'Suas interações com anunciantes e terceiros são exclusivamente entre você e eles. Consulte nossa Política de Privacidade para obter informações sobre as práticas de dados de publicidade.',
      ],
    },
    {
      heading: 'Exclusão de garantias',
      paragraphs: [
        'O ANQR É FORNECIDO TAL COMO ESTÁ E CONFORME DISPONÍVEL, SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO SE LIMITANDO A, GARANTIAS IMPLÍCITAS DE COMERCIABILIDADE, ADEQUAÇÃO A UM FIM ESPECÍFICO E NÃO VIOLAÇÃO.',
        'Não garantimos que: (a) o site será ininterrupto, seguro ou livre de erros; (b) os códigos QR serão lidos em todos os ambientes, em todos os dispositivos ou com todos os aplicativos de leitura; (c) o site atenderá às suas necessidades.',
        'Você deve sempre testar os códigos QR nas condições em que eles serão usados (tamanho da impressão, iluminação, tipo de tela, distância, qualidade da câmera).',
      ],
    },
    {
      heading: 'Limitação de responsabilidade',
      paragraphs: [
        'NA MÁXIMA EXTENSÃO PERMITIDA POR LEI, A ANQR E SEUS OPERADORES, AFILIADOS E LICENCIADORES NÃO SERÃO RESPONSÁVEIS POR QUAISQUER DANOS DIRETOS, INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS, PUNITIVOS OU EXEMPLARES, INCLUINDO, MAS NÃO SE LIMITANDO A, DANOS POR PERDA DE LUCROS, RECEITA, DADOS, BOA VONTADE, USO OU OUTRAS PERDAS INTANGÍVEIS, DECORRENTES OU RELACIONADAS AO SEU ACESSO OU USO (OU INCAPACIDADE DE ACESSAR OU USAR) O SERVIÇO.',
        'VOCÊ COMPREENDE E CONCORDA EXPRESSAMENTE QUE O USO DO SERVIÇO É POR SUA CONTA E RISCO. O SERVIÇO É FORNECIDO GRATUITAMENTE E, CONFORME ISSO, VOCÊ CONCORDA QUE A ANQR E SEUS OPERADORES NÃO TERÃO QUALQUER RESPONSABILIDADE PERANTE VOCÊ POR QUAISQUER DANOS OU PERDAS. EM NENHUMA HIPÓTESE NOSSA RESPONSABILIDADE TOTAL EXCEDERÁ ZERO DÓLARES (US$ 0 AUD).',
        'VOCÊ CONCORDA EM LIBERAR, RENUNCIAR E EXONERAR A ANQR E SEUS OPERADORES DE TODAS E QUAISQUER REIVINDICAÇÕES, DEMANDAS E CAUSAS DE AÇÃO DECORRENTES DO SEU USO DO SERVIÇO.',
        'ALGUMAS JURISDIÇÕES NÃO PERMITEM A EXCLUSÃO DE CERTAS GARANTIAS OU LIMITAÇÕES DE RESPONSABILIDADE. NESSAS JURISDIÇÕES, NOSSA RESPONSABILIDADE SERÁ LIMITADA AO MÁXIMO PERMITIDO PELA LEI APLICÁVEL.',
      ],
    },
    {
      heading: 'Indenização',
      paragraphs: [
        'Você concorda em indenizar, defender e isentar a ANQR, seus operadores, afiliados e seus respectivos diretores, funcionários e agentes de quaisquer reivindicações, danos, perdas, responsabilidades, custos e despesas (incluindo honorários advocatícios) decorrentes de: (a) seu uso do site; (b) sua violação destes Termos; (c) sua violação de quaisquer direitos de terceiros; (d) qualquer conteúdo que você codificar em códigos QR.',
      ],
    },
    {
      heading: 'Resolução de litígios',
      paragraphs: [
        'Qualquer disputa decorrente destes Termos ou do seu uso do ANQR deverá ser primeiramente tentada a ser resolvida por meio de negociação informal, entrando em contato com ${CONTACT_EMAIL}.',
        'Caso a resolução informal falhe, as disputas serão resolvidas por meio de arbitragem vinculativa em Victoria, Austrália, exceto que qualquer uma das partes poderá buscar medidas cautelares em juízo por violações de propriedade intelectual.',
      ],
    },
    {
      heading: 'Renúncia de ação coletiva',
      paragraphs: [
        'NA MEDIDA PERMITIDA POR LEI, VOCÊ CONCORDA QUE QUALQUER PROCEDIMENTO DE RESOLUÇÃO DE DISPUTAS SERÁ CONDUZIDO APENAS EM CARÁTER INDIVIDUAL E NÃO EM AÇÃO COLETIVA, CONSOLIDADA OU REPRESENTATIVA.',
      ],
    },
    {
      heading: 'Lei aplicável',
      paragraphs: [
        'Estes Termos são regidos pelas leis de Victoria, Austrália, sem levar em consideração os princípios de conflito de leis. Você concorda com a jurisdição exclusiva dos tribunais localizados em Victoria, Austrália.',
      ],
    },
    {
      heading: 'Alterações e disponibilidade',
      paragraphs: [
        'Podemos modificar, suspender ou descontinuar o site (ou qualquer parte dele) a qualquer momento, sem aviso prévio ou responsabilidade.',
        'Podemos atualizar estes Termos a qualquer momento. A data da Última atualização indica quando eles foram revisados mais recentemente. O uso continuado após as alterações constitui aceitação.',
      ],
    },
    {
      heading: 'Separabilidade',
      paragraphs: [
        'Se qualquer disposição destes Termos for considerada inválida ou inexequível, essa disposição será aplicada na máxima extensão permitida, e as disposições restantes permanecerão em pleno vigor e efeito.',
      ],
    },
    {
      heading: 'Isenção',
      paragraphs: [
        'A nossa omissão em exercer qualquer direito ou disposição destes Termos não será considerada uma renúncia a esse direito ou disposição.',
      ],
    },
    {
      heading: 'Acordo integral',
      paragraphs: [
        'Estes Termos, juntamente com a nossa Política de Privacidade, constituem o acordo integral entre você e a ANQR relativamente à sua utilização do site e substituem quaisquer acordos anteriores.',
      ],
    },
    {
      heading: 'Força maior',
      paragraphs: [
        'Não seremos responsáveis por qualquer falha ou atraso no desempenho devido a circunstâncias fora do nosso controle razoável, incluindo desastres naturais, guerra, terrorismo, tumultos, ações governamentais ou falhas de internet/infraestrutura.',
      ],
    },
    {
      heading: 'Contato',
      paragraphs: ['Dúvidas sobre estes Termos podem ser enviadas para: ${CONTACT_EMAIL}'],
    },
  ],
};

export default terms;
