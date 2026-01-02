import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Política de Privacidad',
  description:
    'Información que recopila ANQR, cómo se utiliza y sus derechos según las leyes de privacidad aplicables.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Resumen',
      paragraphs: [
        'ANQR es un generador de códigos QR que funciona completamente en su dispositivo. No es necesario crear una cuenta y los códigos QR se generan localmente; no tenemos acceso al contenido que usted codifica.',
        'Para uso profesional, ANQR proporciona una API del lado del servidor que genera códigos QR desde parámetros URL. Cuando usas la API, tu contenido QR se procesa en nuestros servidores para renderizar la imagen, pero no se almacena ni registra.',
        'Utilizamos Google AdSense para publicidad y podríamos usar servicios de análisis. Estos servicios recopilan información mediante cookies y tecnologías similares. Esta política explica qué datos se recopilan, cómo se utilizan y sus derechos.',
      ],
    },
    {
      heading: 'Información que recopilamos',
      bullets: [
        'Información que usted proporciona: si se comunica con nosotros por correo electrónico o mediante nuestro formulario de contacto, recopilamos su nombre, dirección de correo electrónico y contenido del mensaje.',
        'Información recopilada automáticamente: Nuestro proveedor de alojamiento (Netlify), socios publicitarios y servicios de análisis pueden recopilar: dirección IP, tipo y versión del navegador, sistema operativo, tipo de dispositivo, URL de referencia, páginas visitadas, tiempo en el sitio y ubicación geográfica aproximada.',
        'Cookies de terceros: Nuestros socios publicitarios (Google AdSense) utilizan cookies y tecnologías similares para mostrar y medir anuncios. ANQR no instala cookies propias.',
      ],
    },
    {
      heading: 'Cookies y tecnologías de terceros',
      paragraphs: [
        'ANQR no instala cookies propias. Sus preferencias (como el modo oscuro) se almacenan localmente en su dispositivo y no se transmiten a ningún servidor.',
        'Sin embargo, nuestros socios publicitarios (Google AdSense) y el proveedor de alojamiento pueden utilizar cookies y tecnologías de seguimiento similares',
      ],
      bullets: [
        'Cookies publicitarias (de terceros): Las establecen Google AdSense y sus socios publicitarios para mostrar anuncios relevantes, medir su rendimiento y comprender los intereses de los usuarios. Estas cookies pueden rastrear su actividad en diferentes sitios web.',
        'Cookies de análisis (de terceros): pueden ser utilizadas por nuestro proveedor de alojamiento o servicios de análisis para recopilar datos de uso anónimos.',
      ],
    },
    {
      heading: 'Google AdSense y la publicidad',
      paragraphs: [
        'Mostramos anuncios a través de Google AdSense. Google y sus socios utilizan cookies para mostrar anuncios basados en su historial de navegación en este sitio y otros sitios web (publicidad basada en intereses).',
        'Descubre cómo utiliza Google tu información: https://policies.google.com/technologies/partner-sites',
        'Administrar la personalización de anuncios: https://adssettings.google.com',
        'Exclusión voluntaria a través de la Iniciativa de Publicidad en Red: https://optout.networkadvertising.org',
        'Exclusión voluntaria a través de Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Cómo utilizamos la información',
      bullets: [
        'Para responder a sus consultas y brindarle apoyo.',
        'Para mostrar anuncios relevantes a través de nuestros socios publicitarios.',
        'Para analizar el uso del sitio y mejorar nuestros servicios.',
        'Para detectar, prevenir y abordar el fraude, el abuso y los problemas de seguridad.',
        'Para cumplir con obligaciones legales.',
      ],
    },
    {
      heading: 'Servicios de terceros',
      bullets: [
        'Google AdSense: recibe datos para publicar y medir anuncios.',
        'Proveedores de análisis: reciben datos de uso anónimos.',
        'Netlify (alojamiento): procesa solicitudes y puede registrar direcciones IP.',
        'No vendemos su información personal. Sin embargo, compartir datos con socios publicitarios puede considerarse una venta según la CCPA (véase más adelante).',
      ],
    },
    {
      heading: 'Retención de datos',
      bullets: [
        'Envíos de contactos: hasta 2 años.',
        'Registros del servidor: hasta 30 días (proveedor de alojamiento).',
        'Datos analíticos: hasta 26 meses (anonimizados).',
        'Cookies publicitarias: normalmente 13 meses (varía según el socio).',
      ],
    },
    {
      heading: 'Sus derechos bajo el RGPD (usuarios del EEE)',
      paragraphs: [
        'Si se encuentra en el Espacio Económico Europeo, tiene los siguientes derechos bajo el Reglamento General de Protección de Datos',
      ],
      bullets: [
        'Derecho de acceso: Solicitar una copia de los datos personales que tenemos sobre usted.',
        'Derecho de rectificación: Solicitar la corrección de los datos inexactos.',
        'Derecho de supresión: Solicitar la eliminación de sus datos (derecho al olvido).',
        'Derecho a restringir el procesamiento: Solicitar límites en cómo usamos sus datos.',
        'Derecho a la portabilidad de los datos: Solicitar sus datos en un formato portátil.',
        'Derecho de oposición: Oponerse al tratamiento, incluido el de marketing directo.',
        'Derecho a retirar el consentimiento: retirar el consentimiento en cualquier momento cuando el tratamiento esté basado en el consentimiento.',
        'Derecho a presentar una reclamación: Presentar una reclamación ante su autoridad de protección de datos.',
      ],
    },
    {
      heading: 'Base jurídica del RGPD',
      paragraphs: [
        'Tratamos datos sobre estas bases: (a) Consentimiento: para publicidad personalizada (gestionada por nuestros socios publicitarios); (b) Intereses legítimos: para análisis, seguridad y mejora; (c) Contrato: para responder consultas.',
        'Para ejercer sus derechos, contacte con ${CONTACT_EMAIL}. Responderemos en un plazo de 30 días.',
      ],
    },
    {
      heading: 'Sus derechos bajo la CCPA (usuarios de California)',
      bullets: [
        'Derecho a saber: Solicitar información sobre los datos recopilados, fuentes, finalidades y terceros.',
        'Derecho de supresión: Solicitar la eliminación de su información personal.',
        'Derecho de exclusión: optar por no participar en la venta de información personal (compartirla con socios publicitarios puede ser válido).',
        'Derecho a la no discriminación: No discriminaremos por ejercer tus derechos.',
      ],
    },
    {
      heading: 'Categorías de la CCPA recopiladas',
      paragraphs: [
        'Categorías: Identificadores (dirección IP, ID del dispositivo), Actividad en Internet (navegación, interacciones con anuncios), Geolocalización (aproximada), Inferencias (intereses de la navegación).',
        'Para ejercer derechos o darse de baja: ${CONTACT_EMAIL} o ajuste la configuración de cookies.',
      ],
    },
    {
      heading: 'Transferencias internacionales',
      paragraphs: [
        'Su información podría transferirse a países con diferentes leyes de protección de datos, incluido Estados Unidos. Utilizamos medidas de seguridad adecuadas, como las Cláusulas Contractuales Tipo.',
      ],
    },
    {
      heading: 'Privacidad de los niños',
      paragraphs: [
        'ANQR no está dirigido a menores de 13 años (o de 16 en el EEE). No recopilamos datos de menores a sabiendas. Contacte con ${CONTACT_EMAIL} si cree que un menor ha proporcionado información.',
      ],
    },
    {
      heading: 'Seguridad',
      paragraphs: [
        'Utilizamos medidas técnicas y organizativas adecuadas para proteger los datos, incluido el cifrado HTTPS. Sin embargo, ninguna transmisión por internet es 100 % segura.',
      ],
    },
    {
      heading: 'No rastrear',
      paragraphs: [
        'Respetamos las señales de No rastrear del navegador siempre que sea posible, aunque los socios publicitarios pueden no responder a DNT.',
      ],
    },
    {
      heading: 'Cambios a esta política',
      paragraphs: [
        'Es posible que actualicemos esta política periódicamente. La fecha de Última actualización indica la revisión más reciente. Los cambios significativos se podrán comunicar mediante un banner en el sitio web.',
      ],
    },
    {
      heading: 'Contáctanos',
      paragraphs: [
        'Para preguntas sobre privacidad o para ejercer sus derechos: ${CONTACT_EMAIL} o utilice nuestra página de Contacto. Respondemos a las solicitudes de privacidad en un plazo de 30 días.',
      ],
    },
  ],
};

export default privacy;
