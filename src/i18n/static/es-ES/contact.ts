import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Contáctenos',
  description:
    'Agradecemos sus comentarios, informes de errores, solicitudes de funciones y consultas generales.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '¿Cómo llegar?',
      paragraphs: [
        'Ofrecemos varias formas de contactarnos según sus necesidades. Leemos todos los mensajes, aunque el tiempo de respuesta puede variar según el volumen y el tipo de consulta.',
      ],
    },
    {
      heading: 'Correo electrónico',
      paragraphs: [
        'Para cualquier consulta: ${CONTACT_EMAIL}',
        'Esta es la forma más confiable de comunicarse con nosotros y se recomienda para preguntas detalladas, consultas comerciales o cualquier otra consulta.',
      ],
    },
    {
      heading: 'Tipos de consultas',
      bullets: [
        'Preguntas generales: preguntas sobre cómo utilizar ANQR, explicaciones de funciones o comentarios generales.',
        'Informes de errores: incluya su navegador, sistema operativo, pasos para reproducirlo y cualquier mensaje de error que vea.',
        'Solicitudes de funciones: Sugerencias para nuevas funciones o mejoras. Consideramos todas las solicitudes, aunque no podemos garantizar su implementación.',
        'Consultas comerciales: oportunidades de asociación, preguntas sobre licencias o consultas sobre uso comercial.',
        'Solicitudes de privacidad: solicitudes para ejercer sus derechos de privacidad según el RGPD, la CCPA u otras leyes de privacidad (consulte la Política de privacidad).',
        'DMCA/Copyright: Consulte la sección DMCA a continuación para conocer los requisitos de notificación de eliminación.',
      ],
    },
    {
      heading: 'Tiempos de respuesta',
      paragraphs: [
        'Nuestro objetivo es responder a las consultas en un plazo de 5 a 7 días hábiles. Las solicitudes relacionadas con la privacidad se atenderán en un plazo de 30 días, según lo exige la ley.',
        'Durante las horas punta, los tiempos de respuesta pueden ser mayores. Para asuntos urgentes, indique URGENTE en el asunto.',
      ],
    },
    {
      heading: 'Antes de contactarnos',
      paragraphs: [
        'Consulta nuestra página de Documentación para obtener respuestas a preguntas frecuentes sobre el uso de las funciones de ANQR. Allí se abordan muchas preguntas sobre la generación, el estilo y las opciones de exportación de códigos QR.',
      ],
    },
    {
      heading: 'Avisos de derechos de autor de la DMCA',
      paragraphs: [
        'Si considera que el contenido disponible en ANQR infringe sus derechos de autor, puede enviar una notificación de eliminación conforme a la Ley de Derechos de Autor de la Era Digital (DMCA). Para que sea válida, su notificación debe incluir',
      ],
      bullets: [
        'Una firma física o electrónica del propietario de los derechos de autor o del agente autorizado.',
        'Identificación de la obra protegida por derechos de autor que se alega ha sido infringida.',
        'Identificación del material que se alega es infractor, con información suficiente para localizarlo.',
        'Su información de contacto (dirección, número de teléfono y dirección de correo electrónico).',
        'Una declaración de que usted cree de buena fe que el uso del material no está autorizado por el propietario de los derechos de autor.',
        'Una declaración, bajo pena de perjurio, de que la información contenida en su notificación es precisa y que usted es el propietario de los derechos de autor o está autorizado para actuar en su nombre.',
      ],
    },
    {
      heading: 'Contacto DMCA',
      paragraphs: [
        'Enviar avisos DMCA a: ${CONTACT_EMAIL}',
        'Por favor, incluya Aviso DMCA en el asunto. Responderemos a los avisos válidos de acuerdo con la legislación aplicable. Tenga en cuenta que ANQR genera códigos QR localmente en los dispositivos de los usuarios y no aloja contenido generado por ellos.',
      ],
    },
  ],
};

export default contact;
