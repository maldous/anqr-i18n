import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'Guia do Usuário ANQR',
  description: 'Guia completo para usar o ANQR na criação de códigos QR.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Primeiros passos',
      paragraphs: [
        'O ANQR é um gerador de código QR que funciona inteiramente no seu dispositivo — seu computador, celular ou tablet. Não é necessário criar uma conta, não há servidores envolvidos e seus dados permanecem privados.',
        'A interface possui três níveis: Básico, Avançado e Profissional. Selecione o seu nível usando as abas no cabeçalho. Cada nível desbloqueia recursos adicionais, mantendo a interface focada no que você precisa.',
      ],
      bullets: [
        'Básico: Criação simples de código QR com conteúdo de texto simples/URL e sobreposição de imagem.',
        'Avançado: opções de codificação QR, estilos de renderização, animação, formatos de saída, tipos de conteúdo estendidos e personalização de sobreposição.',
        'Profissional: Marcas d\'água, metadados, compartilhamento, análise de segurança, códigos QR de pagamento e recursos corporativos.',
      ],
    },
    {
      heading: 'Início Rápido',
      paragraphs: [
        'Para criar seu primeiro código QR:',
      ],
      bullets: [
        '1. Selecione um tipo de conteúdo (URL, texto, Wi-Fi, etc.) na lista suspensa Tipo de conteúdo.',
        '2. Insira seus dados nos campos fornecidos.',
        '3. Opcionalmente, personalize cores, estilos e adicione uma imagem sobreposta.',
        '4. Clique em Exportar para baixar seu código QR como PNG, GIF, WebP ou SVG.',
      ],
    },
    {
      heading: 'Características Básicas',
      paragraphs: [
        'O nível Básico oferece uma interface simplificada para a criação de códigos QR com conteúdo de carga útil e sobreposições de imagens. Esta é a maneira mais simples de começar.',
      ],
    },
    {
      heading: 'Tipos de Conteúdo (Básico)',
      paragraphs: [
        'Texto simples: Codifique qualquer texto até o limite de capacidade do código QR. Ideal para mensagens curtas, códigos ou identificadores.',
        'URL: Codifica endereços da web. O código QR abrirá o URL quando escaneado. Suporta os protocolos http:// e https://.',
      ],
    },
    {
      heading: 'Sobreposição de Imagem (Básica)',
      paragraphs: [
        'Faça o upload de uma imagem (JPG, PNG, GIF, WebP) para combinar com seu código QR. Os recursos básicos de sobreposição incluem:',
      ],
      bullets: [
        'Carregar de arquivo: Selecione uma imagem do seu dispositivo.',
        'Carregar de URL: Insira um URL de imagem (deve permitir CORS).',
        'Logotipo central: Coloca a imagem no centro, contando com a correção de erros.',
        'Mistura: Mistura alfa simples de imagem com padrão QR.',
        'Intensidade: Controla a intensidade com que a sobreposição afeta o código QR (0-100%).',
        'Modo de cor: cores, tons de cinza ou preto e branco.',
        'Preservar padrões de localização: Mantém os padrões de canto inalterados para uma digitalização confiável.',
      ],
    },
    {
      heading: 'Recursos avançados',
      paragraphs: [
        'O nível Avançado desbloqueia opções de codificação QR, estilos de renderização, animação, formatos de saída, tipos de conteúdo estendidos e personalização avançada de sobreposição.',
      ],
    },
    {
      heading: 'Configurações de codificação QR',
      paragraphs: [
        'Versão: Os códigos QR vêm em versões de 1 a 40, sendo que as versões mais recentes armazenam mais dados, mas são maiores. Defina como 0 (Automático) para permitir que o ANQR escolha a menor versão que se ajuste ao seu conteúdo.',
        'Correção de erros: Determina o quanto de dano um código QR pode suportar sem deixar de ser legível.',
      ],
      bullets: [
        'L (Baixo): 7% de correção de erros - menor tamanho, menor redundância.',
        'M (Médio): correção de erros de 15% - opção balanceada.',
        'Q (Quartil): 25% de correção de erros - bom para códigos impressos.',
        'H (Alto): 30% de correção de erros - ideal para códigos com sobreposições ou em condições adversas.',
      ],
    },
    {
      heading: 'Zona de Silêncio (Margem)',
      paragraphs: [
        'A zona de silêncio é o espaço em branco ao redor do código QR. Os leitores precisam dessa margem para detectar onde o código começa. O padrão recomenda pelo menos 4 módulos. Reduzir para menos de 4 pode causar problemas de leitura.',
      ],
    },
    {
      heading: 'Estilo de Módulo',
      paragraphs: [
        'Os módulos são os quadrados individuais que compõem um código QR. A ANQR oferece cinco estilos:',
      ],
      bullets: [
        'Quadrado: Aparência clássica de QR Code com cantos retos.',
        'Arredondado: Cantos suavizados para um visual mais amigável.',
        'Pontos: Módulos circulares para uma estética moderna.',
        'Diamante: quadrados girados a 45° para um padrão distinto.',
        'Conectado: Os módulos se fundem quando adjacentes, criando formas orgânicas.',
      ],
    },
    {
      heading: 'Estilo de padrão do localizador',
      paragraphs: [
        'Os padrões de localização são os três quadrados grandes nos cantos dos códigos QR que ajudam os leitores a orientar o código. Estilos disponíveis:',
      ],
      bullets: [
        'Quadrado: Cantos quadrados padrão.',
        'Arredondado: Cantos suavizados que combinam com o estilo de módulo arredondado.',
        'Círculo: Padrões de localização circular para códigos do tipo ponto.',
      ],
    },
    {
      heading: 'Padrões de Alinhamento e Temporização',
      paragraphs: [
        'Padrões de alinhamento aparecem em códigos QR maiores (versão 2+) para ajudar a corrigir distorções. Padrões de sincronização são as linhas alternadas que conectam os padrões de localização.',
      ],
      bullets: [
        'Estilo de alinhamento: Localizador de correspondência, Quadrado, Arredondado ou Círculo.',
        'Estilo de temporização: Módulo correspondente, contínuo ou tracejado.',
      ],
    },
    {
      heading: 'Cores',
      paragraphs: [
        'Primeiro plano: A cor dos módulos QR. Preto (#000000) é o padrão, mas qualquer cor escura funciona.',
        'Fundo: A cor de fundo. Branco (#ffffff) é o padrão. Garanta contraste suficiente com o primeiro plano.',
        'Fundo transparente: Remova completamente o fundo para uso em superfícies coloridas. Certifique-se de que a superfície ofereça contraste adequado.',
      ],
    },
    {
      heading: 'Dimensões e Espaçamento do Módulo',
      paragraphs: [
        'Tamanho do Módulo: Controla o tamanho em pixels de cada módulo renderizado. Valores maiores criam códigos maiores e mais fáceis de ler.',
        'Espaço entre módulos: Adiciona espaço entre os módulos em porcentagem. Pequenos espaços (5-15%) podem melhorar a capacidade de leitura em algumas condições, mas espaços excessivos reduzem a confiabilidade.',
      ],
    },
    {
      heading: 'Configurações de saída',
      paragraphs: [
        'Formato: Escolha o formato de exportação com base no caso de uso.',
      ],
      bullets: [
        'PNG: Formato raster sem perdas, ideal para a maioria dos usos. Melhor para impressão e digital.',
        'WebP: Formato moderno com tamanhos de arquivo menores. Bom para uso na web.',
        'GIF: Necessário para códigos QR animados. Suporta transparência.',
        'SVG: Formato vetorial que pode ser redimensionado infinitamente. Ideal para impressões grandes ou quando você precisa editar o código.',
      ],
    },
    {
      heading: 'Dimensões de Saída',
      paragraphs: [
        'Largura/Altura: Defina o tamanho de saída em pixels. Para impressão, calcule com base em DPI (por exemplo, 300 DPI em 1 polegada = 300 px). Tamanhos maiores são digitalizados com mais confiabilidade à distância.',
      ],
    },
    {
      heading: 'Configurações de animação (avançadas)',
      paragraphs: [
        'Controlar o comportamento do código QR animado:',
      ],
      bullets: [
        'Velocidade: Taxa de quadros da animação em milissegundos.',
        'Loop: Animação contínua ou de reprodução única.',
        'Bounce: Direção de animação de pingue-pongue.',
        'Quadro inicial: Iniciar animação a partir de um quadro específico.',
        'Quadros Máximos: Limitar o número total de quadros na animação.',
        'Intervalo de quadro: pular quadros para uma animação mais rápida.',
        'Interpolação: Nenhuma, Transição suave ou Transformação entre quadros.',
      ],
    },
    {
      heading: 'Tipos de Conteúdo (Avançado)',
      paragraphs: [
        'O nível avançado desbloqueia formatos de carga útil adicionais:',
      ],
      bullets: [
        'Número de telefone (tel:): Cria um link telefônico que pode ser chamado.',
        'Email (mailto:): Abre o cliente de e-mail com assunto e corpo opcionais.',
        'SMS: Mensagem de texto pré-preenchida para um número de telefone.',
        'vCard: Cartão de contato completo com nome, organização, telefone, e-mail e endereço.',
        'MeCard: Formato de contato compacto popular no Japão.',
        'BizCard: Formato de cartão de visita tradicional.',
        'Geolocalização: coordenadas GPS que abrem em mapas.',
        'Wi-Fi: Credenciais de rede para conexão automática (SSID, senha, tipo de segurança).',
        'Evento de calendário: formato iCalendar com título, local, data/hora.',
        'Confirmação de presença no evento: Link para a página de inscrição no evento.',
        'Assinar calendário: Assinar um feed ICS/WebCal.',
        'URL do arquivo/documento: Link direto para arquivos para download.',
        'Link para armazenamento em nuvem: Links para Google Drive, Dropbox, OneDrive, etc.',
        'Perfil social: Links para LinkedIn, Twitter, Instagram, etc.',
        'Links de mensagens: links diretos para WhatsApp, Telegram e Signal.',
      ],
    },
    {
      heading: 'Recursos avançados de sobreposição',
      paragraphs: [
        'Recursos adicionais de sobreposição:',
      ],
      bullets: [
        'Recortar: Ative o recorte para selecionar uma região quadrada da sua imagem.',
        'Meio-tom: Padrão de pontos clássico de impressão baseado no brilho da imagem.',
        'Dithered: Dithering por difusão de erros para reprodução detalhada.',
      ],
    },
    {
      heading: 'Modos de mesclagem de sobreposição (avançado)',
      paragraphs: [
        'Modos de mistura adicionais no nível Avançado:',
      ],
      bullets: [
        'Subpixel: Divide cada módulo em subpixels para obter maior detalhamento.',
        'Ruído Azul: Utiliza dithering de ruído azul para padrões sem artefatos.',
        'Mosaico: Efeito baseado em mosaico que preserva a estrutura da imagem.',
        'Preenchimento de lacunas: Insere imagens nas lacunas entre os módulos.',
        'Brilho: Varia o tamanho do módulo com base no brilho da imagem.',
        'Duotone: Mapeia a imagem em duas cores para um contraste impressionante.',
      ],
    },
    {
      heading: 'Intensidade da Sobreposição',
      paragraphs: [
        'Controla a intensidade com que a sobreposição afeta o código QR (0-100%). Valores mais altos exibem mais detalhes da imagem, mas podem reduzir a legibilidade. Comece em torno de 70% e ajuste com base em testes.',
      ],
    },
    {
      heading: 'Modo de Cor',
      paragraphs: [
        'Como a imagem sobreposta é processada:',
      ],
      bullets: [
        'Cores plenas: Preserva as cores originais da imagem.',
        'Escala de cinza: Converte para tons de preto e branco.',
        'Preto e branco: Conversão binária de alto contraste.',
      ],
    },
    {
      heading: 'Padrões de localização de preservação',
      paragraphs: [
        'Quando ativado, mantém os três padrões de localização de canto inalterados pela sobreposição. Altamente recomendado para digitalização confiável.',
      ],
    },
    {
      heading: 'Pré-processamento de imagens',
      paragraphs: [
        'Aplique filtros à sua imagem de sobreposição antes de mesclar. Esses ajustes podem melhorar a aparência da imagem no código QR final.',
      ],
      bullets: [
        'Brilho (-100 a +100): Clarear ou escurecer a imagem.',
        'Contraste (-100 a +100): Aumentar ou diminuir a gama tonal.',
        'Gama (0,2 a 3,0): Ajuste de brilho não linear. Valores abaixo de 1 clareiam os tons médios, acima de 1 os escurecem.',
        'Saturação (-100 a +100): Intensidade da cor. -100 é escala de cinza, +100 é supersaturado.',
        'Rotação de Matiz (0-360°): Desloque todas as cores ao redor da roda de cores.',
        'Desfoque (0-20px): Suaviza os detalhes da imagem.',
        'Aprimorar (0-100%): Realçar bordas e detalhes.',
        'Posterizar (níveis 0-16): Reduza os níveis de cor para um efeito de pôster.',
        'Limiar (0-255): Converter para binário preto/branco no ponto de corte.',
        'Detecção de bordas: algoritmos de Sobel ou Canny para mostrar apenas as bordas.',
        'Inverter: Inverter todas as cores.',
      ],
    },
    {
      heading: 'Modo Fit',
      paragraphs: [
        'Como a imagem sobreposta se ajusta à área do código QR:',
      ],
      bullets: [
        'Capa: A imagem preenche toda a área, sendo recortada se necessário.',
        'Contém: Imagem inteira visível, pode ter margens.',
        'Esticar: A imagem se distorce para preencher exatamente.',
      ],
    },
    {
      heading: 'Opções de Transformação',
      paragraphs: [
        'Rotação: Gire a sobreposição em incrementos de 90°.',
        'Inverter X/Y: Espelhar a imagem horizontalmente ou verticalmente.',
      ],
    },
    {
      heading: 'Algoritmos de Dithering',
      paragraphs: [
        'O dithering converte imagens de tons contínuos em padrões que os códigos QR podem representar. Disponível ao usar os modos de mesclagem Dithered, Blue Noise ou True Dither.',
      ],
      bullets: [
        'Difusão de erros: estilo clássico de Floyd-Steinberg. Espalha o erro de quantização para pixels vizinhos.',
        'Ordenado (Bayer): Usa uma matriz de limiar para padrões regulares.',
        'Ponto agrupado: simula impressão em meio-tom.',
        'Void & Cluster: Dithering ordenado otimizado.',
        'Ruído Azul: Padrão visualmente agradável e de aparência aleatória.',
        'Limiar de Ruído Azul: Variação de limiar com textura de ruído azul.',
        'Ruído Branco: Variação aleatória de limiar.',
        'Ruído Gaussiano/Triangular: Ruído com diferentes distribuições.',
        'Ruído Azul + Difusão de Erros: Híbrido que combina ambas as técnicas.',
        'Ruído Azul com Tela: Padrão de ruído azul semelhante a uma tela.',
        'Perceptual: ponderação por luminância para melhores resultados visuais.',
        'Reconhecimento de bordas: Preserva as bordas da imagem durante o dithering.',
        'Limiar adaptativo: Limiarização adaptativa local.',
        'Ruído Azul Temporal: Para GIFs animados, varia o padrão a cada quadro.',
      ],
    },
    {
      heading: 'Núcleos de Difusão',
      paragraphs: [
        'Ao usar a técnica de dithering por difusão de erros, escolha como o erro será distribuído:',
      ],
      bullets: [
        'Floyd-Steinberg: Difusão clássica de 4 vizinhos. Boa escolha geral.',
        'Jarvis-Judice-Ninke: 12 vizinhos, mais suave, porém mais lento.',
        'Stucki: Semelhante ao JJN, porém com pesos diferentes.',
        'Burkes: JJN simplificado, mais rápido.',
        'Sierra: Família de grãos que equilibra qualidade e velocidade.',
        'Atkinson: Difusão de luz, preserva detalhes, mas pode ficar granulado.',
      ],
    },
    {
      heading: 'Força de Oscilação',
      paragraphs: [
        'Controla a quantidade de dithering aplicada (0-100%). Valores mais baixos preservam mais o padrão original, valores mais altos mostram mais detalhes da imagem.',
      ],
    },
    {
      heading: 'Configurações de subpixel',
      paragraphs: [
        'Ao usar o modo de mesclagem Subpixel:',
      ],
      bullets: [
        'Tamanho da grade: 2×2, 3×3 ou 4×4 subpixels por módulo. Quanto maior, mais detalhes.',
        'Regra Central: A regra estrita exige que o subpixel central corresponda ao módulo. A regra do meio-tom central permite variações.',
        'Cor Neutra: Cor usada para subpixels indeterminados.',
        'Substituição do Localizador: Como os padrões do localizador são renderizados (Sólido ou Estilizado).',
      ],
    },
    {
      heading: 'Configurações de Meio-Tom',
      paragraphs: [
        'Ao usar o modo de mesclagem Meio-tom:',
      ],
      bullets: [
        'Tamanho da célula: por módulo ou grade N×N.',
        'Forma do ponto: círculo, quadrado ou linha.',
        'Curva de brilho: linear, em forma de S ou gama.',
      ],
    },
    {
      heading: 'Cores Duotone',
      paragraphs: [
        'Ao usar o modo de mesclagem Duotone, defina a cor Sombra (áreas escuras) e a cor Realce (áreas claras).',
      ],
    },
    {
      heading: 'Configurações de animação GIF',
      paragraphs: [
        'Ao usar sobreposições de GIFs animados:',
      ],
      bullets: [
        'Use Frame Delays: Respeite o tempo original do GIF.',
        'FPS máximo: Limitar a taxa de quadros (1-60 fps).',
        'Manuseio de descarte: respeitar ou simplificar os métodos de descarte de armações.',
      ],
    },
    {
      heading: 'Opções avançadas de renderização',
      paragraphs: [
        'Controles de renderização adicionais:',
      ],
      bullets: [
        'Modo de espaçamento: Nenhum, Inserido, Contorno ou Espaço Negativo.',
        'Raio do canto: Percentagem de cantos arredondados para módulos.',
        'Gradiente: Nenhum, gradiente linear, radial ou cônico nos módulos.',
        'Estilo externo/interno do olho: Estilo independente para anéis com padrão de dedo indicador.',
        'Rotação de Pontos: Rotacionar módulos de diamante/ponto.',
        'Escala ocular: Ajuste de tamanho para padrões de busca.',
        'Estilo da moldura: Adicione molduras decorativas (Moldura arredondada, Adesivo, Etiqueta).',
        'Texto do quadro: Adicione texto como Escaneie-me! aos quadros.',
      ],
    },
    {
      heading: 'Codificação QR Avançada',
      paragraphs: [
        'Ajuste fino da codificação QR:',
      ],
      bullets: [
        'Modo de codificação: Automático, Numérico, Alfanumérico, Byte/UTF-8 ou Kanji.',
        'Impor uma Zona Mínima de Silêncio: Garantir uma margem de pelo menos 4 módulos.',
      ],
    },
    {
      heading: 'Opções de saída avançadas',
      paragraphs: [
        'Configurações adicionais de exportação:',
      ],
      bullets: [
        'Nome do arquivo: Nome de arquivo personalizado para downloads.',
        'Tamanho da paleta GIF: 2 a 256 cores na saída GIF.',
        'Quantizador de GIF: Corte Mediano, NeuQuant ou redução de cor por Octree.',
        'Dithering GIF: Desligado, Floyd-Steinberg ou Ordenado.',
        'Cor transparente do GIF: Defina uma cor para ser transparente.',
        'SVG True Vector: Use caminhos em vez de raster incorporado.',
        'Precisão de forma SVG: renderização de pixel ou caminho preciso.',
        'Sobreposição raster SVG incorporada: Incluir sobreposição como imagem incorporada.',
        'Substituição de fundo: Forçar uma cor de fundo específica na saída.',
      ],
    },
    {
      heading: 'Opções de Validação',
      paragraphs: [
        'Configurações de processamento de entrada:',
      ],
      bullets: [
        'Validar entrada: Verificar o formato do conteúdo antes da codificação.',
        'Remover espaços em branco: Eliminar espaços iniciais e finais.',
        'Normalizar novas linhas: Converter todas as quebras de linha para LF.',
        'Guarda de comprimento máximo: avisa se o conteúdo exceder a capacidade do QR Code.',
      ],
    },
    {
      heading: 'Recursos Profissionais',
      paragraphs: [
        'O nível Profissional adiciona marcas d\'água, metadados, opções de compartilhamento, análise de segurança, códigos QR de pagamento e recursos corporativos.',
      ],
    },
    {
      heading: 'Marca d\'água',
      paragraphs: [
        'Adicione marcas d\'água aos seus códigos QR:',
      ],
      bullets: [
        'Tipo: Marca d\'água de texto, imagem ou padrão.',
        'Posição: Centro, Cantos, Bordas, Atrás ou Zona Silenciosa.',
        'Opacidade: Transparência da marca d\'água (0-100%).',
        'Modo de mesclagem: mesclagem Normal, Multiplicar, Tela ou Sobrepor.',
      ],
    },
    {
      heading: 'Metadados',
      paragraphs: [
        'Incorporar metadados em arquivos exportados:',
      ],
      bullets: [
        'Campos de Título, Autor, Direitos Autorais, Licença e Descrição.',
        'Hora de Criação: Carimbo de data/hora da geração do elemento incorporado.',
        'Par chave-valor personalizado: Adicionar pares de metadados arbitrários.',
      ],
    },
    {
      heading: 'Compartilhamento',
      paragraphs: [
        'Compartilhe suas configurações de código QR:',
      ],
      bullets: [
        'Link direto: Gere um URL compartilhável com suas configurações atuais.',
        'Incorporar HTML: Obtenha o código de incorporação para sites.',
        'Codificar parâmetros: Incluir todas as configurações no URL de compartilhamento.',
        'Nota: Imagens sobrepostas de arquivos locais não podem ser compartilhadas via URL.',
      ],
    },
    {
      heading: 'Análise de Segurança',
      paragraphs: [
        'Garantir que os códigos QR permaneçam legíveis:',
      ],
      bullets: [
        'Modo de segurança: Desligado, Equilibrado ou Requisitos de digitalização rigorosos.',
        'Tamanho mínimo do módulo: Tamanho mínimo em pixels por módulo.',
        'Zona Silenciosa Mínima: Módulos de margem mínima.',
        'Localizadores de bloqueio/Sincronização/Alinhamento/Formato/Versão: Proteger elementos específicos.',
        'Intensidade máxima de sobreposição por ECC: Limites de intensidade automáticos com base no nível de correção de erros.',
      ],
    },
    {
      heading: 'Tipos de Conteúdo (Profissional)',
      paragraphs: [
        'O nível profissional adiciona tipos de conteúdo de pagamento e empresarial:',
      ],
      bullets: [
        'EPC/SEPA (UE): Códigos QR para transferência bancária europeia com IBAN, BIC, valor e referência.',
        'UPI (Índia): Interface Unificada de Pagamentos com VPA, nome do beneficiário, valor.',
        'PayNow (Singapura): Pagamento rápido em Singapura com UEN ou número de celular.',
        'PromptPay (Tailândia): Sistema nacional de pagamentos da Tailândia.',
        'PIX (Brasil): Pagamento instantâneo brasileiro com chave PIX.',
        'Criptomoedas: endereços de pagamento em Bitcoin, Ethereum e Litecoin com valor opcional.',
        'Link da campanha de marketing: URLs com rastreamento completo de parâmetros UTM (Marketing Tags).',
        'Link curto: Para uso com encurtadores de URL para códigos QR dinâmicos/rastreáveis.',
        'GS1 Digital Link: Identificação do produto com GTIN, número de série, lote e data de validade.',
        'Links diretos de aplicativos: links diretos para aplicativos iOS/Android com esquemas personalizados.',
        'Formato personalizado: Dados brutos sem formatação ou validação.',
      ],
    },
    {
      heading: 'Modos de mesclagem de sobreposição (Profissional)',
      paragraphs: [
        'Modos de mesclagem adicionais no nível Profissional:',
      ],
      bullets: [
        'Pixelate: Efeito de sobreposição pixelizada.',
        'Esboço: Sobreposição de detecção de bordas mostrando apenas contornos.',
        'Onda: Efeito de distorção ondulatória.',
        'Tamanho do subpixel: Dimensionamento variável do subpixel com base na imagem.',
        'True Dither: Dithering avançado com seleção de matriz ordenada.',
        'Extremo: Visibilidade máxima da imagem, pode afetar a digitalização.',
      ],
    },
    {
      heading: 'Configurações de proteção',
      paragraphs: [
        'Controle preciso sobre quais elementos QR são protegidos contra modificações por sobreposição:',
      ],
      bullets: [
        'Preservar a temporização: Manter os padrões de temporização inalterados.',
        'Preservar o alinhamento: Manter os padrões de alinhamento inalterados.',
        'Proteger informações de formato: proteger módulos de informações de formato.',
        'Proteger informações da versão: Proteger módulos de informações da versão.',
      ],
    },
    {
      heading: 'Modo compatível com ECC',
      paragraphs: [
        'Distribui de forma inteligente a intensidade da sobreposição com base na capacidade de correção de erros. O sistema analisa quais módulos podem ser modificados, mantendo a legibilidade da imagem.',
      ],
      bullets: [
        'Orçamento de Risco: Percentagem da capacidade de correção de erros a utilizar (0-100%).',
        'Orçamento maior = sobreposição mais visível, mas maior risco de escaneamento.',
        'Orçamento menor = digitalização mais segura, mas sobreposição menos visível.',
      ],
    },
    {
      heading: 'Opções de Renderização Profissional',
      paragraphs: [
        'Controles avançados de renderização:',
      ],
      bullets: [
        'Bordas nítidas: Use renderização de imagem pixelizada para bordas de módulo nítidas.',
        'Pixel Snap: alinhamento de pixels no chão, em círculos ou no teto.',
        'Modo de cor por módulo: Sólido, por brilho, por posição, por sobreposição, por cluster.',
        'Paleta de cores: Defina uma paleta de cores personalizada para a coloração de cada módulo.',
        'Contrast Guard: Garanta uma taxa de contraste mínima entre as cores.',
        'Taxa de contraste mínima: requisito de contraste no estilo WCAG (1:1 a 21:1).',
        'Módulos de Fronteira Extras: Fronteira adicional além da zona de silêncio.',
      ],
    },
    {
      heading: 'Opções de Saída Profissional',
      paragraphs: [
        'Configurações de exportação corporativa:',
      ],
      bullets: [
        'DPI: Defina a resolução de impressão (72-600 DPI). Recomenda-se 300 DPI para impressão.',
        'Incluir Zona Silenciosa: Ativar/Desativar zona silenciosa nas dimensões de saída.',
        'Exportar como adicional: gerar PDF juntamente com o formato principal.',
      ],
    },
    {
      heading: 'Configurações de animação (Profissional)',
      paragraphs: [
        'Recursos adicionais de animação profissional:',
      ],
      bullets: [
        'Dithering Temporal: Desativado, Ruído Azul ou Dithering por quadro seguro contra cintilação.',
        'Padrão: Nenhum, Pulso, Onda, Linha de Varredura, Brilho ou efeitos de Deriva.',
      ],
    },
    {
      heading: 'Referência da API',
      paragraphs: [
        'O ANQR fornece uma API do lado do servidor para gerar códigos QR via parâmetros de URL. Isso é ideal para incorporar códigos QR em sites, e-mails, documentos ou fluxos de trabalho automatizados sem JavaScript do lado do cliente.',
        'URL Base: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Parâmetros Básicos',
      paragraphs: [
        'Parâmetros obrigatórios e comuns (os nomes dos parâmetros não são traduzidos):',
      ],
      bullets: [
        'data (obrigatório): O conteúdo a ser codificado no código QR. Codifique caracteres especiais na URL.',
        'size: Tamanho da imagem em pixels (padrão: 400, máximo: 2000). Usado se w/h não for especificado.',
        'w, h: Largura e altura de saída em pixels. Substitui o parâmetro size.',
        'format: Formato de saída — png, webp ou gif (padrão: png).',
        'ec: Nível de correção de erros — L, M, Q ou H (padrão: H).',
        'fg: Cor do primeiro plano em hex sem # (padrão: 000000).',
        'bg: Cor de fundo em hex sem # (padrão: ffffff).',
        'transparent: Defina como 1 para fundo transparente.',
        'margin: Zona de silêncio em módulos (padrão: 4).',
      ],
    },
    {
      heading: 'Parâmetros de Estilo',
      paragraphs: [
        'Estilo de módulos e padrões:',
      ],
      bullets: [
        'style: Estilo do módulo — square, rounded, dots, diamond, connected.',
        'finder: Estilo do padrão localizador — square, rounded, circle.',
        'align: Estilo do padrão de alinhamento — match_finder, square, rounded, circle.',
        'timing: Estilo do padrão de temporização — match_module, solid, dashed.',
        'radius: Percentual do raio do canto 0-100.',
        'gap: Percentual de espaçamento entre módulos 0-50.',
        'gapMode: Modo de espaçamento — none, inset, stroke, negative_space.',
        'eyeOuter, eyeInner: Estilos dos olhos — square, rounded, circle.',
        'eyeScale: Percentual de escala do olho (padrão: 100).',
        'grad: Tipo de gradiente — none, linear, radial, conic.',
        'gradAngle: Ângulo do gradiente para gradientes lineares.',
        'gradStops: Pontos de parada do gradiente como cor1,pos1,cor2,pos2,... (ex: ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Parâmetros de Sobreposição',
      paragraphs: [
        'Opções de sobreposição de imagem (a imagem de sobreposição é buscada do lado do servidor):',
      ],
      bullets: [
        'img: URL da imagem de sobreposição (deve ser acessível publicamente).',
        'mode: Modo de sobreposição — center, halftone, blend, brightness, mosaic, dithered, blue-noise, subpixel.',
        'intensity: Intensidade da sobreposição 0-100 (padrão: 100).',
        'colorMode: Modo de cor da sobreposição — color, grayscale, bw.',
        'fit: Como a sobreposição se ajusta — cover, contain, stretch.',
        'rot: Rotação da sobreposição em graus.',
        'flipX, flipY: Defina como 1 para inverter a sobreposição.',
        'keepFinders: Preservar padrões localizadores (padrão: 1).',
        'keepTiming, keepAlign: Defina como 1 para preservar padrões de temporização/alinhamento.',
      ],
    },
    {
      heading: 'Parâmetros de Pré-processamento',
      paragraphs: [
        'Pré-processamento de imagem aplicado à sobreposição:',
      ],
      bullets: [
        'brightness: Ajuste de -100 a 100 (padrão: 0).',
        'contrast: Ajuste de -100 a 100 (padrão: 0).',
        'gamma: Valor de 0.1 a 3 (padrão: 1).',
        'saturation: Ajuste de -100 a 100 (padrão: 0).',
        'hue: Rotação de matiz em graus.',
        'blur: Desfoque em pixels.',
        'sharpen: Quantidade de nitidez 0-100.',
        'posterize: Níveis de posterização.',
        'threshold: Limiar binário 0-255.',
        'edge: Detecção de bordas — off, sobel, canny.',
        'invert: Defina como 1 para inverter cores.',
      ],
    },
    {
      heading: 'Parâmetros de Marca d\'água',
      paragraphs: [
        'Adicione marcas d\'água aos códigos QR gerados:',
      ],
      bullets: [
        'wmEn: Defina como 1 para habilitar marca d\'água.',
        'wmKind: Tipo de marca d\'água — text, image, pattern.',
        'wmText: Texto da marca d\'água (codificado em URL).',
        'wmImg: URL da imagem da marca d\'água.',
        'wmPos: Posição — center, corners, edges, behind, quiet_zone.',
        'wmOpacity: Opacidade 0-100 (padrão: 50).',
        'wmBlend: Modo de mesclagem — normal, multiply, screen, overlay.',
      ],
    },
    {
      heading: 'Parâmetros de Animação',
      paragraphs: [
        'Para saída de GIF animado (requer format=gif):',
      ],
      bullets: [
        'animPattern: Padrão de animação — none, pulse, wave, scanline, shimmer, drift, color_cycle.',
        'animFrames: Número de quadros 1-60 (padrão: 24).',
        'animSpeed: Atraso de quadro em milissegundos 10-1000 (padrão: 100).',
        'animSeed: Semente aleatória para animação.',
        'easing: Suavização da animação — linear, ease_in, ease_out, ease_in_out, bounce.',
      ],
    },
    {
      heading: 'Parâmetros de Saída',
      paragraphs: [
        'Opções de formato de saída:',
      ],
      bullets: [
        'quality: Qualidade WebP 0-1 (padrão: 0.9).',
        'webpQ: Qualidade WebP 0-100 (padrão: 90).',
        'gifColors: Tamanho da paleta GIF 2-256 (padrão: 256).',
        'dpi: DPI de saída para PNG (padrão: 72).',
        'metaTitle, metaAuthor, metaCopy, metaDesc: Campos de metadados PNG.',
      ],
    },
    {
      heading: 'Exemplo de Uso',
      paragraphs: [
        'Código QR básico:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Código QR estilizado com cores personalizadas:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'Código QR com imagem de sobreposição:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70',
        'GIF animado:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
      ],
    },
    {
      heading: 'Incorporando Códigos QR',
      paragraphs: [
        'No modo Profissional, o recurso Compartilhar gera HTML e URLs incorporáveis. Veja como a incorporação funciona:',
      ],
      bullets: [
        'Link de Compartilhamento: Cria uma URL para o aplicativo ANQR com todas as suas configurações codificadas como parâmetros de URL. Os destinatários podem visualizar e modificar o código QR.',
        'Incorporar Imagem: Gera uma tag <img> apontando para a API do servidor. O código QR é renderizado do lado do servidor e servido como imagem.',
        'Incorporar Markdown: Cria sintaxe de imagem Markdown para documentação e arquivos README.',
        'URL Direto da API: A URL bruta da API para uso em aplicativos, scripts ou outras integrações.',
      ],
    },
    {
      heading: 'Exemplo HTML',
      paragraphs: [
        'Para incorporar um código QR em seu site:',
        '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=200" alt="Código QR" />',
        'Para dimensionamento responsivo:',
        '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=400" alt="Código QR" style="max-width: 100%; height: auto;" />',
        'O servidor armazena respostas em cache com cabeçalhos de cache longos, então solicitações repetidas para a mesma URL são rápidas.',
      ],
    },
    {
      heading: 'Formato da URL de Compartilhamento',
      paragraphs: [
        'Quando você clica em Compartilhar no modo Profissional, o ANQR codifica suas configurações atuais em parâmetros de URL. O formato é:',
        'https://anqr.link/?data=...&ec=H&style=rounded&....',
        'Esses parâmetros espelham os parâmetros da API, então você pode converter uma URL de compartilhamento em uma URL de API alterando o caminho base de / para /api/qr e ajustando os parâmetros w/h conforme necessário.',
        'Nota: Imagens de sobreposição carregadas de arquivos locais não podem ser compartilhadas via URL — apenas sobreposições baseadas em URL (parâmetro img) funcionam em links compartilhados e chamadas de API.',
      ],
    },
    {
      heading: 'Limites de Taxa e Uso',
      paragraphs: [
        'A API é gratuita para uso em volumes razoáveis. Para uso de alto volume ou aplicações comerciais que exigem tempo de atividade garantido, entre em contato conosco.',
        'As respostas da API incluem cabeçalhos de cache agressivos. Para melhor desempenho, armazene as respostas em cache do seu lado ou use a mesma URL consistentemente para códigos QR idênticos.',
      ],
    },
    {
      heading: 'Melhores Práticas',
      paragraphs: [
        'Siga estas diretrizes para códigos QR confiáveis:',
      ],
      bullets: [
        'Sempre teste seus códigos QR com vários aplicativos de leitura antes de imprimir.',
        'Use a correção de erros H (Alta) ao adicionar sobreposições.',
        'Mantenha pelo menos 4 módulos de zona silenciosa (margem).',
        'Garantir alto contraste entre o primeiro plano e o fundo.',
        'Para impressão, use pelo menos 300 DPI e teste no tamanho real de impressão.',
        'Ative a opção Preservar padrões do localizador ao usar sobreposições.',
        'Comece com uma intensidade de sobreposição mais baixa e aumente gradualmente.',
        'Para uso externo, considere tamanhos de módulo maiores e maior correção de erros.',
      ],
    },
    {
      heading: 'Solução de problemas',
      paragraphs: [
        'Problemas e soluções comuns:',
      ],
      bullets: [
        'O QR Code não será lido: reduza a intensidade da sobreposição, aumente a correção de erros e verifique o contraste.',
        'Código muito extenso: reduza o tamanho do conteúdo, use um encurtador de URL, reduza a versão.',
        'Saída desfocada: Aumente o tamanho do módulo, use PNG em vez de formatos comprimidos.',
        'As cores parecem erradas: verifique o contraste de cores, tente o modo de sobreposição em tons de cinza.',
        'GIF não está animando: Certifique-se de usar o formato de saída GIF e verifique a contagem de quadros.',
        'Sobreposição de imagem não está carregando: verifique as permissões CORS nas imagens remotas.',
      ],
    },
    {
      heading: 'Atalhos de teclado',
      paragraphs: [
        'O ANQR suporta atalhos de teclado padrão. Use Ctrl/Cmd+S para iniciar a exportação (quando o foco estiver na pré-visualização).',
      ],
    },
    {
      heading: 'Compartilhamento e Incorporação',
      paragraphs: [
        'No modo Profissional, clique no botão Compartilhar para copiar um URL com suas configurações atuais. Os destinatários podem abrir este URL para ver sua configuração exata. Observação: imagens sobrepostas de arquivos locais não podem ser compartilhadas por URL.',
      ],
    },
  ],
};

export default docs;
