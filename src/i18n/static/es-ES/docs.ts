import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'Guía del usuario de ANQR',
  description: 'Guía completa sobre el uso de ANQR para crear códigos QR.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Primeros pasos',
      paragraphs: [
        'ANQR es un generador de códigos QR que funciona completamente en tu dispositivo: computadora, teléfono o tableta. No requiere cuenta, no se utilizan servidores y tus datos se mantienen privados.',
        'La interfaz tiene tres niveles: Básico, Avanzado y Profesional. Selecciona tu nivel usando las pestañas del encabezado. Cada nivel desbloquea funciones adicionales, manteniendo la interfaz enfocada en lo que necesitas.',
      ],
      bullets: [
        'Básico: Creación de códigos QR simples con contenido de texto/URL sin formato y superposición de imágenes.',
        'Avanzado: opciones de codificación QR, estilos de renderizado, animación, formatos de salida, tipos de contenido extendidos y personalización de superposición.',
        'Profesional: Marcas de agua, metadatos, uso compartido, análisis de seguridad, códigos QR de pago y funciones empresariales.',
      ],
    },
    {
      heading: 'Inicio rápido',
      paragraphs: [
        'Para crear tu primer código QR',
      ],
      bullets: [
        '1. Seleccione un tipo de contenido (URL, texto, WiFi, etc.) en el menú desplegable Tipo de contenido.',
        '2. Ingrese sus datos en los campos provistos.',
        '3. Personaliza colores y estilos, y añade una imagen superpuesta.',
        '4. Haga clic en Exportar para descargar su código QR como PNG, GIF, WebP o SVG.',
      ],
    },
    {
      heading: 'Características básicas',
      paragraphs: [
        'El nivel Básico ofrece una interfaz optimizada para crear códigos QR con contenido de carga útil y superposiciones de imágenes. Es la forma más sencilla de empezar.',
      ],
    },
    {
      heading: 'Tipos de contenido (básico)',
      paragraphs: [
        'Texto sin formato: Codifique cualquier texto hasta el límite de capacidad del código QR. Ideal para mensajes cortos, códigos o identificadores.',
        'URL: Codifica direcciones web. El código QR abrirá la URL al escanearlo. Compatible con los protocolos http:// y https://.',
      ],
    },
    {
      heading: 'Superposición de imágenes (básica)',
      paragraphs: [
        'Sube una imagen (JPG, PNG, GIF, WebP) para combinarla con tu código QR. Las funciones básicas de superposición incluyen',
      ],
      bullets: [
        'Subir desde archivo: seleccione una imagen de su dispositivo.',
        'Cargar desde URL: ingrese una URL de imagen (debe permitir CORS).',
        'Logotipo central: coloca la imagen en el centro, confiando en la corrección de errores.',
        'Fusión: fusión alfa simple de imagen con patrón QR.',
        'Intensidad: controla la intensidad con la que la superposición afecta al código QR (0-100%).',
        'Modo de color: A todo color, Escala de grises o Blanco y negro.',
        'Conservar patrones del buscador: mantiene los patrones de las esquinas sin modificar para un escaneo confiable.',
      ],
    },
    {
      heading: 'Funciones avanzadas',
      paragraphs: [
        'El nivel Avanzado desbloquea opciones de codificación QR, estilos de renderizado, animación, formatos de salida, tipos de contenido extendidos y personalización avanzada de superposición.',
      ],
    },
    {
      heading: 'Configuración de codificación QR',
      paragraphs: [
        'Versión: Los códigos QR vienen en versiones del 1 al 40, y las versiones superiores contienen más datos, pero son más grandes. Configúrelo en 0 (Automático) para que ANQR elija la versión más pequeña que se ajuste a su contenido.',
        'Corrección de errores: determina cuánto daño puede sufrir un código QR sin dejar de ser escaneable.',
      ],
      bullets: [
        'L (Bajo): 7 % de corrección de errores: tamaño más pequeño, menor redundancia.',
        'M (Medio): 15% de corrección de errores - opción equilibrada.',
        'Q (Cuartil): corrección de errores del 25 % - bueno para códigos impresos.',
        'H (Alto): 30 % de corrección de errores: ideal para códigos con superposiciones o en condiciones adversas.',
      ],
    },
    {
      heading: 'Zona tranquila (Margen)',
      paragraphs: [
        'La zona tranquila es el espacio en blanco que rodea el código QR. Los escáneres necesitan este margen para detectar dónde comienza el código. El estándar recomienda al menos 4 módulos. Reducirlo por debajo de 4 puede causar problemas de escaneo.',
      ],
    },
    {
      heading: 'Estilo de módulo',
      paragraphs: [
        'Los módulos son los cuadrados individuales que componen un código QR. ANQR ofrece cinco estilos',
      ],
      bullets: [
        'Cuadrado: apariencia QR clásica con esquinas afiladas.',
        'Redondeado: esquinas suavizadas para una apariencia más amigable.',
        'Puntos: Módulos circulares para una estética moderna.',
        'Diamante: cuadrados rotados 45° para un patrón distintivo.',
        'Conectado: Los módulos se fusionan cuando están adyacentes, creando formas orgánicas.',
      ],
    },
    {
      heading: 'Estilo de patrón del buscador',
      paragraphs: [
        'Los patrones del buscador son los tres cuadrados grandes en las esquinas de los códigos QR que ayudan a los escáneres a orientar el código. Estilos disponibles',
      ],
      bullets: [
        'Cuadrado: Esquinas cuadradas estándar.',
        'Redondeado: esquinas suavizadas que combinan con el estilo del módulo redondeado.',
        'Círculo: Patrones de búsqueda circular para códigos de estilo de puntos.',
      ],
    },
    {
      heading: 'Patrones de alineación y sincronización',
      paragraphs: [
        'Los patrones de alineación aparecen en códigos QR más grandes (versión 2+) para corregir la distorsión. Los patrones de sincronización son las líneas alternas que conectan los patrones del buscador.',
      ],
      bullets: [
        'Estilo de alineación: Buscador de coincidencias, Cuadrado, Redondeado o Círculo.',
        'Estilo de tiempo: Módulo de coincidencia, sólido o discontinuo.',
      ],
    },
    {
      heading: 'Colores',
      paragraphs: [
        'Primer plano: El color de los módulos QR. El negro (#000000) es el estándar, pero cualquier color oscuro funciona.',
        'Fondo: El color de fondo. El blanco (#ffffff) es el estándar. Asegúrese de que haya suficiente contraste con el primer plano.',
        'Fondo transparente: Elimine el fondo por completo para su uso en superficies de color. Asegúrese de que la superficie ofrezca un contraste adecuado.',
      ],
    },
    {
      heading: 'Tamaño y espacio del módulo',
      paragraphs: [
        'Tamaño del módulo: Controla el tamaño de cada módulo en píxeles. Los valores más altos generan códigos más grandes y fáciles de escanear.',
        'Separación entre módulos: Agrega espacio entre módulos como un porcentaje. Una separación pequeña (5-15%) puede mejorar la escaneabilidad en algunas condiciones, pero una separación excesiva reduce la fiabilidad.',
      ],
    },
    {
      heading: 'Configuración de salida',
      paragraphs: [
        'Formato: Elija su formato de exportación según el caso de uso.',
      ],
      bullets: [
        'PNG: Formato raster sin pérdida, ideal para la mayoría de los usos. Ideal para impresión y digital.',
        'WebP: Formato moderno con archivos más pequeños. Ideal para uso web.',
        'GIF: Requerido para códigos QR animados. Admite transparencia.',
        'SVG: Formato vectorial con escalabilidad infinita. Ideal para impresiones grandes o cuando se necesita editar el código.',
      ],
    },
    {
      heading: 'Dimensiones de salida',
      paragraphs: [
        'Ancho/Alto: Establezca el tamaño de salida en píxeles. Para impresión, calcule en DPI (p. ej., 300 DPI a 1 pulgada = 300 píxeles). Los tamaños más grandes se escanean con mayor fiabilidad a distancia.',
      ],
    },
    {
      heading: 'Configuración de animación (Avanzada)',
      paragraphs: [
        'Controlar el comportamiento del código QR animado',
      ],
      bullets: [
        'Velocidad: Velocidad de fotogramas de la animación en milisegundos.',
        'Bucle: animación continua o de una sola reproducción.',
        'Rebote: Dirección de animación de ping-pong.',
        'Iniciar fotograma: comienza la animación desde un fotograma específico.',
        'Fragmentos máximos: limita el total de fotogramas en la animación.',
        'Paso de fotograma: omite fotogramas para una animación más rápida.',
        'Interpolación: Ninguna, Fundido cruzado o Morfosis entre fotogramas.',
      ],
    },
    {
      heading: 'Tipos de contenido (avanzados)',
      paragraphs: [
        'El nivel avanzado desbloquea formatos de carga adicionales',
      ],
      bullets: [
        'Número de teléfono (tel:): Crea un enlace telefónico al que se puede llamar.',
        'Correo electrónico (mailto:): abre un cliente de correo electrónico con asunto y cuerpo opcionales.',
        'SMS: Mensaje de texto precargado a un número de teléfono.',
        'vCard: Tarjeta de contacto completa con nombre, organización, teléfono, correo electrónico, dirección.',
        'MeCard: formato de contacto compacto popular en Japón.',
        'BizCard: Formato de tarjeta de presentación heredado.',
        'Geolocalización: coordenadas GPS que se abren en mapas.',
        'WiFi: Credenciales de red para conexión automática (SSID, contraseña, tipo de seguridad).',
        'Evento de calendario: formato iCalendar con título, ubicación, fecha/hora.',
        'RSVP del evento: Enlace a la página de registro del evento.',
        'Suscripción al calendario: suscríbase a una fuente ICS/WebCal.',
        'URL del archivo/documento: enlace directo a archivos descargables.',
        'Enlace de almacenamiento en la nube: enlaces a Google Drive, Dropbox, OneDrive, etc.',
        'Perfil social: enlaces a LinkedIn, Twitter, Instagram, etc.',
        'Enlace de mensajería: enlaces profundos de WhatsApp, Telegram y Signal.',
      ],
    },
    {
      heading: 'Funciones avanzadas de superposición',
      paragraphs: [
        'Capacidades de superposición adicionales',
      ],
      bullets: [
        'Recortar: habilite el recorte para seleccionar una región cuadrada de su imagen.',
        'Semitono: Patrón de puntos de estilo de impresión clásico basado en el brillo de la imagen.',
        'Dithered: Dithering por difusión de errores para una reproducción detallada.',
      ],
    },
    {
      heading: 'Modos de fusión de superposición (avanzados)',
      paragraphs: [
        'Modos de fusión adicionales en el nivel avanzado',
      ],
      bullets: [
        'Subpíxel: divide cada módulo en subpíxeles para obtener mayores detalles.',
        'Ruido azul: utiliza tramado de ruido azul para lograr patrones sin artefactos.',
        'Mosaico: Efecto basado en mosaicos que preserva la estructura de la imagen.',
        'Rellenar espacios: coloca la imagen en los espacios entre los módulos.',
        'Brillo: varía el tamaño del módulo según el brillo de la imagen.',
        'Duotono: asigna la imagen a dos colores para lograr un contraste sorprendente.',
      ],
    },
    {
      heading: 'Intensidad de superposición',
      paragraphs: [
        'Controla la intensidad con la que la superposición afecta al código QR (0-100%). Los valores más altos muestran más detalles de la imagen, pero pueden reducir la escaneabilidad. Comienza alrededor del 70% y ajústalo según las pruebas.',
      ],
    },
    {
      heading: 'Modo de color',
      paragraphs: [
        'Cómo se procesa la imagen superpuesta',
      ],
      bullets: [
        'A todo color: conserva los colores originales de la imagen.',
        'Escala de grises: convierte a tonos blanco y negro.',
        'Blanco y negro: conversión binaria de alto contraste.',
      ],
    },
    {
      heading: 'Conservar patrones del buscador',
      paragraphs: [
        'Al activar esta opción, la superposición mantiene los patrones del localizador de tres esquinas sin modificar. Muy recomendable para un escaneo fiable.',
      ],
    },
    {
      heading: 'Preprocesamiento de imágenes',
      paragraphs: [
        'Aplica filtros a la imagen superpuesta antes de fusionarla. Estos ajustes pueden mejorar la apariencia de la imagen en el código QR final.',
      ],
      bullets: [
        'Brillo (-100 a +100): aclara u oscurece la imagen.',
        'Contraste (-100 a +100): aumenta o disminuye el rango tonal.',
        'Gamma (0,2 a 3,0): Ajuste de brillo no lineal. Valores inferiores a 1 aclaran los medios tonos, superiores a 1 los oscurecen.',
        'Saturación (-100 a +100): Intensidad del color. -100 es escala de grises, +100 es sobresaturado.',
        'Rotación de tono (0-360°): cambia todos los colores alrededor de la rueda de colores.',
        'Desenfoque (0-20 px): suaviza los detalles de la imagen.',
        'Nitidez (0-100%): mejora los bordes y los detalles.',
        'Posterizar (niveles 0-16): reduce los niveles de color para lograr un efecto póster.',
        'Umbral (0-255): Convertir a binario blanco y negro en el punto de corte.',
        'Detección de bordes: algoritmos Sobel o Canny para mostrar solo bordes.',
        'Invertir: Invierte todos los colores.',
      ],
    },
    {
      heading: 'Modo de ajuste',
      paragraphs: [
        'Cómo se ajusta la imagen superpuesta al área del código QR',
      ],
      bullets: [
        'Portada: la imagen llena toda el área, recortándose si es necesario.',
        'Contiene: toda la imagen visible, puede tener márgenes.',
        'Estirar: La imagen se distorsiona para rellenarse exactamente.',
      ],
    },
    {
      heading: 'Opciones de transformación',
      paragraphs: [
        'Rotación: rotar la superposición en incrementos de 90°.',
        'Voltear X/Y: Refleja la imagen horizontal o verticalmente.',
      ],
    },
    {
      heading: 'Algoritmos de dithering',
      paragraphs: [
        'El tramado convierte imágenes de tono continuo en patrones que los códigos QR pueden representar. Disponible al usar los modos de fusión Tramado, Ruido Azul o Tramado Verdadero.',
      ],
      bullets: [
        'Difusión de errores: Estilo clásico de Floyd-Steinberg. Distribuye el error de cuantificación a los píxeles vecinos.',
        'Ordenado (Bayer): utiliza una matriz de umbral para patrones regulares.',
        'Punto agrupado: simula la impresión de medios tonos.',
        'Void & Cluster: tramado ordenado optimizado.',
        'Ruido azul: Patrón aleatorio visualmente agradable.',
        'Umbral de ruido azul: tramado de umbral con textura de ruido azul.',
        'Ruido blanco: tramado de umbral aleatorio.',
        'Ruido Gaussiano/Triangular: Ruido con diferentes distribuciones.',
        'Ruido Azul + Difusión de Errores: Híbrido que combina ambas técnicas.',
        'Ruido azul en pantalla: Patrón de ruido azul similar a una pantalla.',
        'Perceptual: ponderación de luminancia para mejores resultados visuales.',
        'Consciente de los bordes: conserva los bordes de la imagen durante el tramado.',
        'Umbral adaptativo: Umbral adaptativo local.',
        'Ruido azul temporal: para GIF animados, el patrón varía por fotograma.',
      ],
    },
    {
      heading: 'Núcleos de difusión',
      paragraphs: [
        'Al utilizar el tramado de difusión de errores, elija cómo se distribuye el error',
      ],
      bullets: [
        'Floyd-Steinberg: Difusión clásica de 4 vecinos. Buena opción general.',
        'Jarvis-Judice-Ninke: 12 vecinos, más suave pero más lento.',
        'Stucki: Similar a JJN con diferentes pesos.',
        'Burkes: JJN simplificado, más rápido.',
        'Sierra: Familia de kernels que equilibran calidad y velocidad.',
        'Atkinson: Difusión de la luz, conserva los detalles pero puede ser granulada.',
      ],
    },
    {
      heading: 'Fuerza de la vibración',
      paragraphs: [
        'Controla la cantidad de tramado aplicado (0-100%). Los valores más bajos conservan más del patrón original, mientras que los más altos muestran más detalle de la imagen.',
      ],
    },
    {
      heading: 'Configuración de subpíxeles',
      paragraphs: [
        'Al utilizar el modo de fusión de subpíxeles',
      ],
      bullets: [
        'Tamaño de la cuadrícula: 2×2, 3×3 o 4×4 subpíxeles por módulo. Cuanto mayor sea el tamaño, mayor será el detalle.',
        'Regla de centro: Estricta: requiere que el subpíxel central coincida con el módulo. El centro de semitonos permite variación.',
        'Color neutro: color utilizado para subpíxeles indeterminados.',
        'Anulación del buscador: cómo se representan los patrones del buscador (sólidos o estilizados).',
      ],
    },
    {
      heading: 'Configuración de medios tonos',
      paragraphs: [
        'Al utilizar el modo de fusión Semitono',
      ],
      bullets: [
        'Tamaño de celda: por módulo o cuadrícula N×N.',
        'Forma del punto: círculo, cuadrado o línea.',
        'Curva de brillo: lineal, curva S o gamma.',
      ],
    },
    {
      heading: 'Colores Duotono',
      paragraphs: [
        'Al utilizar el modo de fusión Duotono, configure el color de Sombra (áreas oscuras) y el color de Resaltado (áreas brillantes).',
      ],
    },
    {
      heading: 'Configuración de animación GIF',
      paragraphs: [
        'Al usar superposiciones GIF animadas',
      ],
      bullets: [
        'Usar retrasos de fotogramas: respetar la sincronización original del GIF.',
        'FPS máximo: Limitar la velocidad de cuadros (1-60 fps).',
        'Manejo de eliminación: Respetar o simplificar los métodos de eliminación de cuadros.',
      ],
    },
    {
      heading: 'Opciones de renderizado avanzadas',
      paragraphs: [
        'Controles de renderizado adicionales',
      ],
      bullets: [
        'Modo de espacio: Ninguno, Insertar, Trazo o Estilo de espacio negativo.',
        'Radio de esquina: porcentaje de esquinas redondeadas para módulos.',
        'Gradiente: Ninguno, lineal, radial o cónico en los módulos.',
        'Estilo exterior/interior del ojo: Estilo independiente para anillos con patrón de búsqueda.',
        'Rotación de puntos: rotar módulos de diamante/punto.',
        'Escala de ojos: ajuste de tamaño para patrones de visor.',
        'Estilo de marco: agregar marcos decorativos (marco redondeado, pegatina, etiqueta).',
        'Texto del marco: agrega texto como ¡Escanéame! a los marcos.',
      ],
    },
    {
      heading: 'Codificación QR avanzada',
      paragraphs: [
        'Ajuste fino de la codificación QR',
      ],
      bullets: [
        'Modo de codificación: Automático, Numérico, Alfanumérico, Byte/UTF-8 o Kanji.',
        'Aplicar zona mínima de silencio: garantizar un margen de al menos 4 módulos.',
      ],
    },
    {
      heading: 'Opciones de salida avanzadas',
      paragraphs: [
        'Configuración de exportación adicional',
      ],
      bullets: [
        'Nombre de archivo: nombre de archivo personalizado para descargas.',
        'Tamaño de la paleta GIF: 2-256 colores en salida GIF.',
        'Cuantizador GIF: Reducción de color de corte medio, NeuQuant o Octree.',
        'Dithering GIF: Off, Floyd-Steinberg u Ordenado.',
        'Color transparente GIF: establece un color para que sea transparente.',
        'SVG True Vector: utiliza rutas en lugar de raster incrustado.',
        'Precisión de forma SVG: representación de píxeles o de ruta precisa.',
        'Superposición ráster incrustada SVG: incluir superposición como imagen incrustada.',
        'Anulación de fondo: forzar un color de fondo específico en la salida.',
      ],
    },
    {
      heading: 'Opciones de validación',
      paragraphs: [
        'Configuración del procesamiento de entrada',
      ],
      bullets: [
        'Validar entrada: verificar el formato del contenido antes de codificar.',
        'Recortar espacios en blanco: eliminar espacios iniciales y finales.',
        'Normalizar nuevas líneas: convertir todos los finales de línea a LF.',
        'Max Length Guard: advierte si el contenido excede la capacidad del QR.',
      ],
    },
    {
      heading: 'Características profesionales',
      paragraphs: [
        'El nivel Profesional agrega marcas de agua, metadatos, opciones para compartir, análisis de seguridad, códigos QR de pago y funciones empresariales.',
      ],
    },
    {
      heading: 'Marca de agua',
      paragraphs: [
        'Añade marcas de agua a tus códigos QR',
      ],
      bullets: [
        'Tipo: Marca de agua de texto, imagen o patrón.',
        'Posición: Centro, Esquinas, Bordes, Detrás o Zona Tranquila.',
        'Opacidad: Transparencia de marca de agua (0-100%).',
        'Modo de fusión: fusión Normal, Multiplicar, Trama o Superposición.',
      ],
    },
    {
      heading: 'Metadatos',
      paragraphs: [
        'Incrustar metadatos en archivos exportados',
      ],
      bullets: [
        'Campos Título, Autor, Copyright, Licencia, Descripción.',
        'Hora de creación: Marca de tiempo de generación de incrustación.',
        'Clave-valor personalizado: agregar pares de metadatos arbitrarios.',
      ],
    },
    {
      heading: 'Compartir',
      paragraphs: [
        'Comparte tus configuraciones de código QR',
      ],
      bullets: [
        'Enlace directo: genera una URL para compartir con tu configuración actual.',
        'Incrustar HTML: obtener código para incrustar para sitios web.',
        'Parámetros de codificación: incluir todas las configuraciones en la URL compartida.',
        'Nota: Las imágenes superpuestas de archivos locales no se pueden compartir a través de URL.',
      ],
    },
    {
      heading: 'Análisis de seguridad',
      paragraphs: [
        'Asegúrese de que los códigos QR sigan siendo escaneables',
      ],
      bullets: [
        'Modo de seguridad: Desactivado, Equilibrado o Requisitos de escaneo estrictos.',
        'Tamaño mínimo del módulo: tamaño mínimo de píxel por módulo.',
        'Zona mínima tranquila: módulos de margen mínimo.',
        'Buscadores de bloqueo/Tiempo/Alineación/Formato/Versión: Proteger elementos específicos.',
        'Intensidad máxima de superposición por ECC: límites de intensidad automáticos basados en el nivel de corrección de errores.',
      ],
    },
    {
      heading: 'Tipos de contenido (profesional)',
      paragraphs: [
        'El nivel profesional añade tipos de contenido de pago y empresarial',
      ],
      bullets: [
        'EPC/SEPA (UE): Códigos QR de transferencias bancarias europeas con IBAN, BIC, importe y referencia.',
        'UPI (India): Interfaz de pagos unificada con VPA, nombre del beneficiario, monto.',
        'PayNow (Singapur): Pago rápido en Singapur con UEN o número de teléfono móvil.',
        'PromptPay (Tailandia): sistema de pago nacional tailandés.',
        'PIX (Brasil): Pago instantáneo brasileño con clave PIX.',
        'Cripto: Direcciones de pago de Bitcoin, Ethereum, Litecoin con monto opcional.',
        'Enlace de campaña de marketing: URL con seguimiento completo de parámetros UTM (etiquetas de marketing).',
        'Enlace corto: para usar con acortadores de URL para códigos QR dinámicos/rastreables.',
        'GS1 Digital Link: Identificación de producto con GTIN, número de serie, lote y vencimiento.',
        'App Deep Link: enlaces profundos de aplicaciones iOS/Android con esquemas personalizados.',
        'Formato personalizado: Datos sin formato ni validación.',
      ],
    },
    {
      heading: 'Pagos relevantes por idioma en Modo Avanzado',
      paragraphs: [
        'Al usar el Modo Avanzado, ANQR muestra automáticamente los métodos de pago relevantes para tu idioma seleccionado. Por ejemplo, los usuarios vietnamitas ven VietQR, los usuarios tailandeses ven PromptPay, y los usuarios de idiomas de la India ven UPI y BharatQR. Los métodos de pago globales (criptomonedas, PayPal, Cash App) están disponibles para todos los idiomas. El modo Profesional desbloquea todos los estándares de pago independientemente del idioma.',
      ],
    },
    {
      heading: 'Estándares de pago europeos',
      bullets: [
        'EPC/SEPA (UE): Códigos QR de transferencia bancaria europea siguiendo el estándar EPC QR Code. Admite IBAN, BIC (opcional para transferencias domésticas), importe en EUR y referencias de pago estructuradas o no estructuradas. Se utiliza en toda la zona SEPA, incluyendo países de la UE más Suiza, Noruega, Islandia, Liechtenstein, Mónaco y San Marino.',
        'QR-bill suizo: Estándar de pago suizo siguiendo las Directrices de implementación SIX. Admite CHF y EUR, QR-Reference (QRR), Referencia de acreedor (ISO 11649), direcciones estructuradas de acreedor/deudor e información de factura. Requerido para facturas suizas desde 2022.',
      ],
    },
    {
      heading: 'Estándares de pago de la India',
      bullets: [
        'UPI (India): Interfaz de pagos unificada siguiendo la especificación de enlaces profundos NPCI. Admite VPA (Dirección de pago virtual), nombre del beneficiario, importe en INR, nota de transacción, ID de referencia, código de categoría de comerciante y modo de transacción.',
        'BharatQR (India): Estándar QR unificado que admite pagos UPI y basados en tarjeta. Combina VPA de UPI con PAN de tarjeta para máxima compatibilidad. Incluye nombre del comerciante, ciudad, MCC, detalles de GST y números de factura/referencia.',
      ],
    },
    {
      heading: 'Estándares de pago del sudeste asiático',
      bullets: [
        'PayNow (Singapur): Sistema de pago rápido de Singapur usando la especificación EMVCo QR con perfil SGQR. Admite UEN (registro comercial), número de móvil o NRIC como identificadores proxy. Incluye indicador de editabilidad de importe y fecha de vencimiento.',
        'PromptPay (Tailandia): Sistema de pago nacional tailandés siguiendo el perfil EMV del Banco de Tailandia. Admite número de móvil, ID nacional, ID fiscal, ID de billetera electrónica y pago de facturas con múltiples campos de referencia.',
        'QRIS (Indonesia): Estándar indonesio de código QR de respuesta rápida. Estándar de pago nacional basado en EMV que admite ID de comerciante, NMID (ID Nacional de Comerciante), clasificación de criterios de comerciante y tarifas de conveniencia (fijas o porcentuales).',
        'DuitNow (Malasia): Sistema de pago instantáneo de Malasia. Admite múltiples tipos de proxy incluyendo NRIC, móvil, pasaporte, ID militar y números de registro comercial.',
        'VietQR (Vietnam): Estándar vietnamita de transferencia interbancaria. Requiere BIN bancario (identificación NAPAS) y número de cuenta. Admite múltiples códigos de servicio para diferentes tipos de transferencia (QRPUSH, QRIBFTTA, QRIBFTTC).',
        'QR Ph (Filipinas): Estándar de pago QR de Filipinas para InstaPay y PESONet. Utiliza números de cuenta con identificación de comerciante para transacciones P2M (persona a comerciante).',
      ],
    },
    {
      heading: 'Estándares de pago de Asia Oriental',
      bullets: [
        'TWQR (Taiwán): Estándar de pago QR taiwanés. Admite ID de comerciante, ID fiscal e importes en TWD.',
        'HKQR/FPS (Hong Kong): Códigos QR del Sistema de Pago Más Rápido de Hong Kong. Admite ID de FPS, número de móvil o correo electrónico como identificadores de pago. Importes en HKD.',
        'JPQR (Japón): Estándar de pago QR unificado japonés. Utiliza ID de tienda para identificación de comerciante con importes en JPY.',
      ],
    },
    {
      heading: 'Otros estándares de pago regionales',
      bullets: [
        'PIX (Brasil): Sistema de pago instantáneo del Banco Central de Brasil siguiendo la especificación BR Code. Admite claves PIX (CPF, CNPJ, correo electrónico, teléfono o clave aleatoria), nombre/ciudad del comerciante, ID de transacción e importes en BRL.',
        'AusPayNet/NPP PayID (Australia): Sistema PayID de la Plataforma de Nuevos Pagos de Australia. Admite tipos de PayID (correo electrónico, móvil, ABN, ID de organización) o BSB tradicional + número de cuenta. El nombre del comerciante es opcional ya que los pagadores ven el nombre registrado de la búsqueda NPP.',
      ],
    },
    {
      heading: 'Pagos con criptomonedas',
      bullets: [
        'Bitcoin/Litecoin (BIP-21): URIs estándar de pago de criptomonedas con dirección de billetera, importe opcional y etiqueta. Compatible con todas las principales billeteras de Bitcoin y Litecoin.',
        'Lightning Network (BOLT11): Facturas de pago de Lightning Network. Pegue una cadena de factura codificada en BOLT11 para pagos instantáneos de Bitcoin con tarifas mínimas.',
        'Ethereum (EIP-681): URIs de solicitud de transacción de Ethereum que admiten transferencias nativas de ETH y transferencias de tokens ERC-20. Incluye ID de cadena para soporte multi-red (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), parámetros de gas y llamadas a funciones de contrato.',
      ],
    },
    {
      heading: 'Servicios de enlace de pago',
      bullets: [
        'PayPal.Me: Enlaces de pago de PayPal con nombre de usuario e importe pre-rellenado opcional. Los destinatarios pueden pagar mediante saldo de PayPal, tarjetas o cuentas bancarias.',
        'Cash App: Enlaces de pago de Cash App usando $cashtag con importe opcional. Popular en Estados Unidos para pagos entre personas.',
      ],
    },
    {
      heading: 'QR EMV genérico',
      bullets: [
        'EMV genérico: Cree códigos QR EMV de Modo Presentado por Comerciante personalizados para esquemas de pago no listados específicamente. Configure nombre del comerciante, ciudad, código de país (ISO 3166-1), código de moneda (ISO 4217 numérico), MCC, opciones de propina/tarifa de conveniencia y campos de datos adicionales. Útil para pruebas o integraciones personalizadas.',
      ],
    },
    {
      heading: 'Modos de fusión de superposición (Profesional)',
      paragraphs: [
        'Modos de fusión adicionales en el nivel Profesional',
      ],
      bullets: [
        'Pixelate: Efecto de superposición pixelada.',
        'Contorno: superposición de detección de bordes que muestra solo contornos.',
        'Onda: Efecto de distorsión ondulada.',
        'Tamaño de subpíxel: tamaño de subpíxel variable según la imagen.',
        'True Dither: tramado avanzado con selección de matriz ordenada.',
        'Extremo: Máxima visibilidad de la imagen, puede afectar la capacidad de escaneo.',
      ],
    },
    {
      heading: 'Configuración de protección',
      paragraphs: [
        'Control detallado sobre qué elementos QR están protegidos de la modificación de la superposición',
      ],
      bullets: [
        'Preservar el tiempo: mantener los patrones de tiempo sin modificar.',
        'Preservar la alineación: mantener los patrones de alineación sin modificar.',
        'Proteger información de formato: Proteger módulos de información de formato.',
        'Proteger información de versión: Proteger módulos de información de versión.',
      ],
    },
    {
      heading: 'Modo compatible con ECC',
      paragraphs: [
        'Distribuye inteligentemente la intensidad de la superposición según la capacidad de corrección de errores. El sistema analiza qué módulos se pueden modificar manteniendo la escaneabilidad.',
      ],
      bullets: [
        'Presupuesto de Riesgo: Porcentaje de capacidad de corrección de errores a utilizar (0-100%).',
        'Mayor presupuesto = superposición más visible pero escaneabilidad más riesgosa.',
        'Menor presupuesto = escaneo más seguro pero menos superposición visible.',
      ],
    },
    {
      heading: 'Opciones de renderizado profesional',
      paragraphs: [
        'Controles de renderizado avanzados',
      ],
      bullets: [
        'Bordes nítidos: utilice la representación de imágenes pixeladas para lograr bordes de módulos nítidos.',
        'Ajuste de píxeles: alineación de píxeles de piso, redondo o techo.',
        'Modo de color por módulo: sólido, por brillo, por posición, por superposición, por grupo.',
        'Paleta de colores: define una paleta de colores personalizada para la coloración por módulo.',
        'Protección de contraste: garantiza una relación de contraste mínima entre colores.',
        'Relación de contraste mínima: requisito de contraste estilo WCAG (1:1 a 21:1).',
        'Módulos Fronterizos Adicionales: Frontera adicional más allá de la zona tranquila.',
      ],
    },
    {
      heading: 'Opciones de salida profesional',
      paragraphs: [
        'Configuración de exportación empresarial',
      ],
      bullets: [
        'DPI: Establezca la resolución de impresión (72-600 DPI). Se recomiendan 300 DPI para imprimir.',
        'Incluir zona silenciosa: alternar zona silenciosa en las dimensiones de salida.',
        'Exportar como adicional: generar PDF junto con el formato principal.',
      ],
    },
    {
      heading: 'Configuración de animación (profesional)',
      paragraphs: [
        'Funciones adicionales de animación profesional',
      ],
      bullets: [
        'Tramado temporal: Desactivado, Ruido azul o Tramado seguro por fotograma.',
        'Patrón: Ninguno, Pulso, Onda, Línea de escaneo, Brillo o Efectos de deriva.',
      ],
    },
    {
      heading: 'Referencia de API',
      paragraphs: [
        'ANQR proporciona una API del lado del servidor para generar códigos QR mediante parámetros URL. Esto es ideal para incrustar códigos QR en sitios web, correos electrónicos, documentos o flujos de trabajo automatizados sin JavaScript del lado del cliente.',
        'URL base: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Parámetros básicos"',
      paragraphs: [
        'Parámetros requeridos y comunes (los nombres de los parámetros no se traducen):',
      ],
      bullets: [
        'data (requerido): El contenido a codificar en el código QR. Codifica con URL los caracteres especiales.',
        'size: Tamaño de imagen en píxeles (predeterminado: 400, máximo: 2000). Se usa si w/h no se especifica.',
        'w, h: Ancho y alto de salida en píxeles. Reemplaza el parámetro size.',
        'format: Formato de salida — png, webp o gif (predeterminado: png).',
        'ec: Nivel de corrección de errores — L, M, Q o H (predeterminado: H).',
        'fg: Color de primer plano como hex sin # (predeterminado: 000000).',
        'bg: Color de fondo como hex sin # (predeterminado: ffffff).',
        'transparent: Establecer en 1 para fondo transparente.',
        'margin: Zona tranquila en módulos (predeterminado: 4).',
      ],
    },
    {
      heading: 'Parámetros de estilo"',
      paragraphs: [
        'Estilos de módulo y patrón:',
      ],
      bullets: [
        'style: Estilo de módulo — square, rounded, dots, diamond, connected.',
        'finder: Estilo de patrón del buscador — square, rounded, circle.',
        'align: Estilo de patrón de alineación — match_finder, square, rounded, circle.',
        'timing: Estilo de patrón de sincronización — match_module, solid, dashed.',
        'radius: Porcentaje de radio de esquina 0-100.',
        'gap: Porcentaje de separación entre módulos 0-50.',
        'gapMode: Modo de separación — none, inset, stroke, negative_space.',
        'eyeOuter, eyeInner: Estilos de ojo — square, rounded, circle.',
        'eyeScale: Porcentaje de escala de ojo (predeterminado: 100).',
        'grad: Tipo de gradiente — none, linear, radial, conic.',
        'gradAngle: Ángulo de gradiente para gradientes lineales.',
        'gradStops: Paradas de gradiente como color1,pos1,color2,pos2,... (ej., ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Parámetros de superposición"',
      paragraphs: [
        'Opciones de superposición de imagen (la imagen se obtiene del lado del servidor):',
      ],
      bullets: [
        'img: URL de la imagen de superposición (debe ser accesible públicamente).',
        'mode: Modo de superposición — center, halftone, blend, brightness, mosaic, dithered, blue-noise, subpixel.',
        'intensity: Intensidad de superposición 0-100 (predeterminado: 100).',
        'colorMode: Modo de color de superposición — color, grayscale, bw.',
        'fit: Cómo se ajusta la superposición — cover, contain, stretch.',
        'rot: Rotación de superposición en grados.',
        'flipX, flipY: Establecer en 1 para voltear la superposición.',
        'keepFinders: Preservar patrones del buscador (predeterminado: 1).',
        'keepTiming, keepAlign: Establecer en 1 para preservar patrones de sincronización/alineación.',
      ],
    },
    {
      heading: 'Parámetros de preprocesamiento"',
      paragraphs: [
        'Preprocesamiento de imagen aplicado a la superposición:',
      ],
      bullets: [
        'brightness: Ajuste de -100 a 100 (predeterminado: 0).',
        'contrast: Ajuste de -100 a 100 (predeterminado: 0).',
        'gamma: Valor de 0.1 a 3 (predeterminado: 1).',
        'saturation: Ajuste de -100 a 100 (predeterminado: 0).',
        'hue: Rotación de tono en grados.',
        'blur: Desenfoque en píxeles.',
        'sharpen: Cantidad de nitidez 0-100.',
        'posterize: Niveles de posterización.',
        'threshold: Umbral binario 0-255.',
        'edge: Detección de bordes — off, sobel, canny.',
        'invert: Establecer en 1 para invertir colores.',
      ],
    },
    {
      heading: 'Parámetros de marca de agua"',
      paragraphs: [
        'Añadir marcas de agua a códigos QR generados:',
      ],
      bullets: [
        'wmEn: Establecer en 1 para habilitar marca de agua.',
        'wmKind: Tipo de marca de agua — text, image, pattern.',
        'wmText: Texto de marca de agua (codificado en URL).',
        'wmImg: URL de la imagen de marca de agua.',
        'wmPos: Posición — center, corners, edges, behind, quiet_zone.',
        'wmOpacity: Opacidad 0-100 (predeterminado: 50).',
        'wmBlend: Modo de fusión — normal, multiply, screen, overlay.',
      ],
    },
    {
      heading: 'Parámetros de animación"',
      paragraphs: [
        'Para salida GIF animada (requiere format=gif):',
      ],
      bullets: [
        'animPattern: Patrón de animación — none, pulse, wave, scanline, shimmer, drift, color_cycle.',
        'animFrames: Número de fotogramas 1-60 (predeterminado: 24).',
        'animSpeed: Retraso de fotograma en milisegundos 10-1000 (predeterminado: 100).',
        'animSeed: Semilla aleatoria para animación.',
        'easing: Suavizado de animación — linear, ease_in, ease_out, ease_in_out, bounce.',
      ],
    },
    {
      heading: 'Parámetros de salida"',
      paragraphs: [
        'Opciones de formato de salida:',
      ],
      bullets: [
        'quality: Calidad WebP 0-1 (predeterminado: 0.9).',
        'webpQ: Calidad WebP 0-100 (predeterminado: 90).',
        'gifColors: Tamaño de paleta GIF 2-256 (predeterminado: 256).',
        'dpi: DPI de salida para PNG (predeterminado: 72).',
        'metaTitle, metaAuthor, metaCopy, metaDesc: Campos de metadatos PNG.',
      ],
    },
    {
      heading: 'Ejemplo de uso"',
      paragraphs: [
        'Código QR básico:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Código QR con estilo y colores personalizados:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'Código QR con imagen superpuesta:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70',
        'GIF animado:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
      ],
    },
    {
      heading: 'Incrustar códigos QR',
      paragraphs: [
        'En el modo Profesional, la función Compartir genera HTML y URLs incrustables. Así es como funciona la incrustación:',
      ],
      bullets: [
        'Enlace para compartir: Crea una URL a la aplicación ANQR con todos tus ajustes codificados como parámetros URL. Los destinatarios pueden ver y modificar el código QR.',
        'Incrustar imagen: Genera una etiqueta <img> que apunta a la API del servidor. El código QR se renderiza del lado del servidor y se sirve como imagen.',
        'Incrustar Markdown: Crea sintaxis de imagen Markdown para documentación y archivos README.',
        'URL de API directa: La URL de API sin procesar para usar en aplicaciones, scripts u otras integraciones.',
      ],
    },
    {
      heading: 'Ejemplo HTML',
      paragraphs: [
        'Para incrustar un código QR en tu sitio web:',
        '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=200" alt="Código QR" />',
        'Para tamaño responsivo:',
        '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=400" alt="Código QR" style="max-width: 100%; height: auto;" />',
        'El servidor almacena en caché las respuestas con encabezados de caché prolongados, por lo que las solicitudes repetidas para la misma URL son rápidas.',
      ],
    },
    {
      heading: 'Formato de URL para compartir',
      paragraphs: [
        'Cuando haces clic en Compartir en el modo Profesional, ANQR codifica tus ajustes actuales en parámetros URL. El formato es:',
        'https://anqr.link/?data=...&ec=H&style=rounded&....',
        'Estos parámetros reflejan los parámetros de la API, por lo que puedes convertir una URL compartida en una URL de API cambiando la ruta base de / a /api/qr y ajustando los parámetros w/h según sea necesario.',
        'Nota: Las imágenes superpuestas cargadas desde archivos locales no se pueden compartir mediante URL — solo las superposiciones basadas en URL (parámetro img) funcionan en enlaces compartidos y llamadas a la API.',
      ],
    },
    {
      heading: 'Límites de uso y tarifas"',
      paragraphs: [
        'La API es gratuita para volúmenes razonables. Para uso de alto volumen o aplicaciones comerciales que requieren tiempo de actividad garantizado, contáctenos.',
        'Las respuestas de la API incluyen encabezados de caché agresivos. Para un mejor rendimiento, almacena en caché las respuestas de tu lado o usa la misma URL de manera consistente para códigos QR idénticos.',
      ],
    },
    {
      heading: 'Mejores prácticas',
      paragraphs: [
        'Siga estas pautas para obtener códigos QR confiables',
      ],
      bullets: [
        'Siempre pruebe sus códigos QR con varias aplicaciones de escáner antes de imprimirlos.',
        'Utilice corrección de errores H (Alta) al agregar superposiciones.',
        'Mantener al menos 4 módulos de zona tranquila (margen).',
        'Asegure un alto contraste entre el primer plano y el fondo.',
        'Para imprimir, utilice al menos 300 DPI y pruebe con el tamaño de impresión real.',
        'Habilitar la conservación de patrones del Finder al usar superposiciones.',
        'Comience con una intensidad de superposición más baja y aumente gradualmente.',
        'Para uso en exteriores, considere tamaños de módulo más grandes y una mayor corrección de errores.',
      ],
    },
    {
      heading: 'Solución de problemas',
      paragraphs: [
        'Problemas comunes y soluciones',
      ],
      bullets: [
        'El código QR no se escanea: reduzca la intensidad de la superposición, aumente la corrección de errores, verifique el contraste.',
        'Código demasiado grande: reducir la longitud del contenido, usar un acortador de URL, versión inferior.',
        'Salida borrosa: aumente el tamaño del módulo, utilice PNG en lugar de formatos comprimidos.',
        'Los colores se ven mal: verifique el contraste de color, pruebe el modo de superposición en escala de grises.',
        'El formato GIF no se anima: asegúrese de utilizar el formato GIF como salida y verifique el número de cuadros.',
        'La superposición de imágenes no se carga: Verifique los permisos CORS en imágenes remotas.',
      ],
    },
    {
      heading: 'Atajos de teclado',
      paragraphs: [
        'ANQR admite atajos de teclado estándar. Use Ctrl/Cmd+S para iniciar la exportación (cuando esté enfocado en la vista previa).',
      ],
    },
    {
      heading: 'Compartir e integrar',
      paragraphs: [
        'En el modo Profesional, haga clic en el botón Compartir para copiar una URL con su configuración actual. Los destinatarios pueden abrir esta URL para ver su configuración exacta. Nota: Las imágenes superpuestas de archivos locales no se pueden compartir mediante URL.',
      ],
    },
  ],
};

export default docs;
