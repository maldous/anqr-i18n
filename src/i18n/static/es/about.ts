import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'Acerca de ANQR',
  description: 'ANQR es un generador de códigos QR gratuito con un enfoque cliente-primero — genera códigos QR localmente o usa nuestra API para integraciones.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '¿Qué es ANQR?',
      paragraphs: [
        'ANQR (pronunciado ancla) es un generador de códigos QR gratuito que se ejecuta localmente en su dispositivo y crea códigos escaneables para URL, texto, credenciales de Wi-Fi, tarjetas de contacto, eventos de calendario y más.',
        'Está diseñado para particulares, pequeñas empresas, profesionales del marketing y desarrolladores que buscan potentes herramientas QR sin necesidad de subir archivos ni registrarse. Tus datos permanecen en tu dispositivo.',
      ],
    },
    {
      heading: 'Características clave',
      bullets: [
        'Genere códigos QR instantáneamente en su dispositivo: sin cargas al servidor ni necesidad de cuenta.',
        'Personalice colores, estilos de módulos, patrones de búsqueda y agregue superposiciones de imágenes.',
        'Exportar en múltiples formatos: PNG, SVG, WebP y GIF animado.',
        'Controles avanzados para el nivel de corrección de errores, versión QR, modo de codificación y selección de máscara.',
        'Guía de seguridad de escaneo y vista previa en vivo para ayudar a mantener los códigos legibles en la impresión y en las pantallas.',
        'API del lado del servidor para integración profesional con soporte completo de parámetros.',
        'Funciona sin conexión una vez cargado — es una aplicación web estática que puedes ejecutar en cualquier lugar.',
      ],
    },
    {
      heading: 'Cómo funciona ANQR',
      paragraphs: [
        'ANQR se ejecuta en su navegador y codifica su entrada en una matriz QR estándar con corrección de errores Reed-Solomon, luego la convierte al formato que usted elija.',
        'Por defecto, la generación ocurre localmente en tu navegador. Para uso profesional, también puedes usar la API del lado del servidor para generar códigos QR mediante parámetros URL — perfecto para integrar en sitios web, correos electrónicos o flujos de trabajo automatizados.',
        'Toda la generación se realiza localmente. Al añadir superposiciones o animaciones, ANQR equilibra el estilo con la fiabilidad del escaneo para que el resultado siga siendo escaneable.',
        'ANQR se centra en códigos estáticos (los datos se encuentran dentro del QR). Si necesita un código dinámico (destino editable), puede codificar su propia URL de redireccionamiento o enlace corto.',
      ],
    },
    {
      heading: '¿Quién opera ANQR?',
      paragraphs: [
        'ANQR funciona como una herramienta web independiente. Para preguntas, soporte o consultas comerciales, utilice la página de contacto o envíe un correo electrónico.' + CONTACT_EMAIL + '.',
      ],
    },
    {
      heading: 'La publicidad y cómo nos mantenemos libres',
      paragraphs: [
        'ANQR es gratuito y se financia con publicidad. Podemos mostrar anuncios a través de Google AdSense u otros socios publicitarios.',
        'Los proveedores de publicidad pueden usar cookies o tecnologías similares para personalizar los anuncios según sus intereses y actividad de navegación. Puede administrar sus preferencias de anuncios en la configuración de su dispositivo y a través de la configuración de anuncios de Google. También puede obtener más información en nuestra Política de Privacidad.',
        'No vendemos el contenido que codificas en códigos QR. La publicidad ayuda a cubrir los costos de funcionamiento y mejora del proyecto.',
      ],
    },
    {
      heading: 'Estándares abiertos',
      paragraphs: [
        'ANQR genera códigos QR basados en el estándar ISO/IEC 18004 y busca una amplia compatibilidad entre escáneres, cámaras y flujos de trabajo de impresión.',
      ],
    },
    {
      heading: 'Aviso de marca registrada',
      paragraphs: [
        'QR Code® es una marca registrada de DENSO WAVE INCORPORATED. ANQR no está afiliado, respaldado ni patrocinado por DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Retroalimentación y contribuciones',
      paragraphs: [
        'Agradecemos sus comentarios, informes de errores y sugerencias de funciones. Contáctenos por correo electrónico o a través de la página de contacto. Leemos todos los mensajes, aunque el tiempo de respuesta puede variar.',
      ],
    },
  ],
};

export default about;
