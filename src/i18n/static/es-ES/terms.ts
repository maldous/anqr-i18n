import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const terms: PageDefinition = {
  title: 'Condiciones de servicio',
  description: 'Al acceder o utilizar el sitio, usted acepta estar sujeto a estos términos.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Aceptación de los términos',
      paragraphs: [
        'Al acceder o utilizar ANQR (anqr.link), usted acepta estas Condiciones de Servicio y nuestra Política de Privacidad. Si no las acepta, no utilice el sitio.',
        'Es posible que actualicemos estos Términos ocasionalmente. El uso continuado del sitio después de los cambios constituye la aceptación de los nuevos términos.',
      ],
    },
    {
      heading: 'Elegibilidad',
      paragraphs: [
        'Debes tener al menos 13 años para usar ANQR. Al usar el sitio, declaras que cumples con este requisito de edad. Si eres menor de 18 años, declaras que tienes el permiso de tus padres o tutores para usar el sitio.',
      ],
    },
    {
      heading: 'Uso permitido',
      paragraphs: [
        'Solo puede usar ANQR con fines legales. Usted es el único responsable del contenido que codifica en códigos QR y del uso que hace de los códigos QR que genere.',
      ],
    },
    {
      heading: 'Conducta prohibida',
      paragraphs: ['Usted acepta no'],
      bullets: [
        'Utilice ANQR para crear códigos QR que faciliten el phishing, la distribución de malware, el fraude, las estafas, el acoso, la difamación o cualquier actividad ilegal.',
        'Codificar contenido que infrinja derechos de propiedad intelectual, viole la privacidad o contenga material ilegal.',
        'Intentar interrumpir, sobrecargar o interferir con el funcionamiento o la seguridad del sitio.',
        'Realizar ingeniería inversa, descompilar o intentar extraer el código fuente del sitio.',
        'Utilizar herramientas automatizadas (bots, scrapers) para acceder al sitio de una manera que degrada el rendimiento para otros usuarios.',
        'Evitar o desactivar cualquier función de seguridad o control de acceso.',
        'Hacerse pasar por cualquier persona o entidad o tergiversar su afiliación.',
      ],
    },
    {
      heading: 'Propiedad intelectual',
      paragraphs: [
        'Usted conserva la propiedad del contenido que codifica en códigos QR. ANQR no reclama la propiedad de sus datos.',
        'El nombre, el logotipo, el diseño de la interfaz y el código subyacente de ANQR están protegidos por derechos de autor, marcas registradas y otras leyes de propiedad intelectual. No se permite copiar, modificar, distribuir ni crear obras derivadas sin nuestro permiso.',
        'QR Code® es una marca registrada de DENSO WAVE INCORPORATED. ANQR no está afiliado a DENSO WAVE.',
      ],
    },
    {
      heading: 'Licencia de contenido de usuario',
      paragraphs: [
        'Al usar ANQR, no nos otorga ningún derecho sobre su contenido: toda la generación de códigos QR se realiza localmente en su dispositivo y no accedemos, almacenamos ni transmitimos sus datos codificados.',
        'Cuando usas la API del lado del servidor, tu contenido se procesa para generar la imagen QR pero no se almacena, registra ni se usa para ningún otro propósito más allá de renderizar la imagen solicitada.',
      ],
    },
    {
      heading: 'Servicios y publicidad de terceros',
      paragraphs: [
        'El sitio muestra anuncios a través de Google AdSense y puede incluir enlaces a sitios web de terceros. No nos responsabilizamos del contenido, los servicios ni las prácticas de privacidad de terceros.',
        'Sus interacciones con anunciantes y terceros son exclusivamente entre usted y ellos. Consulte nuestra Política de Privacidad para obtener información sobre las prácticas de datos publicitarios.',
      ],
    },
    {
      heading: 'Exención de garantías',
      paragraphs: [
        'ANQR SE PROPORCIONA TAL CUAL Y SEGÚN DISPONIBILIDAD SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS O IMPLÍCITAS, INCLUIDAS, ENTRE OTRAS, LAS GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN.',
        'No garantizamos que: (a) el sitio será ininterrumpido, seguro o libre de errores; (b) los códigos QR se escanearán en todos los entornos, en todos los dispositivos o con todas las aplicaciones de escáner; (c) el sitio cumplirá con sus requisitos.',
        'Siempre debes probar los códigos QR en las condiciones en las que se utilizarán (tamaño de impresión, iluminación, tipo de pantalla, distancia, calidad de la cámara).',
      ],
    },
    {
      heading: 'Limitación de responsabilidad',
      paragraphs: [
        'HASTA EL GRADO MÁXIMO PERMITIDO POR LA LEY, ANQR Y SUS OPERADORES, AFILIADOS Y LICENCIANTES NO SERÁN RESPONSABLES DE NINGÚN DAÑO DIRECTO, INDIRECTO, INCIDENTAL, ESPECIAL, DERIVADO, PUNITIVO O EJEMPLAR, INCLUYENDO, ENTRE OTROS, DAÑOS POR PÉRDIDA DE BENEFICIOS, INGRESOS, DATOS, FONDOS DE COMERCIO, USO U OTRAS PÉRDIDAS INTANGIBLES, QUE SURJAN DE O ESTÉN RELACIONADOS CON SU ACCESO O USO (O INCAPACIDAD DE ACCEDER O USAR) EL SERVICIO.',
        'USTED ENTIENDE Y ACEPTA EXPRESAMENTE QUE EL USO DEL SERVICIO ES BAJO SU PROPIA RESPONSABILIDAD. EL SERVICIO SE PROPORCIONA GRATUITAMENTE Y, POR CONSIGUIENTE, USTED ACEPTA QUE ANQR Y SUS OPERADORES NO TENDRÁN NINGUNA RESPONSABILIDAD ANTE USTED POR DAÑOS O PÉRDIDAS. EN NINGÚN CASO NUESTRA RESPONSABILIDAD TOTAL AGREGADA SUPERARÁ CERO DÓLARES (0 AUD).',
        'USTED ACEPTA LIBERAR, RENUNCIAR Y DESCARGAR TODAS Y CADA UNA DE LAS RECLAMACIONES, DEMANDAS Y CAUSAS DE ACCIÓN CONTRA ANQR Y SUS OPERADORES QUE SURJAN DE SU USO DEL SERVICIO.',
        'ALGUNAS JURISDICCIONES NO PERMITEN LA EXCLUSIÓN DE CIERTAS GARANTÍAS O LIMITACIONES DE RESPONSABILIDAD. EN DICHAS JURISDICCIONES, NUESTRA RESPONSABILIDAD SE LIMITARÁ AL MÁXIMO PERMITIDO POR LA LEY APLICABLE.',
      ],
    },
    {
      heading: 'Indemnización',
      paragraphs: [
        'Usted acepta indemnizar, defender y eximir de responsabilidad a ANQR, sus operadores, afiliados y sus respectivos funcionarios, directores, empleados y agentes de cualquier reclamo, daño, pérdida, responsabilidad, costo y gasto (incluidos los honorarios legales) que surjan de: (a) su uso del sitio; (b) su violación de estos Términos; (c) su violación de cualquier derecho de terceros; (d) cualquier contenido que codifique en códigos QR.',
      ],
    },
    {
      heading: 'Resolución de disputas',
      paragraphs: [
        'Cualquier disputa que surja de estos Términos o su uso de ANQR se intentará resolver primero mediante una negociación informal contactándose con ${CONTACT_EMAIL}.',
        'Si la resolución informal falla, las disputas se resolverán mediante arbitraje vinculante en Victoria, Australia, excepto que cualquiera de las partes pueda solicitar una medida cautelar ante el tribunal por violaciones de propiedad intelectual.',
      ],
    },
    {
      heading: 'Renuncia a la demanda colectiva',
      paragraphs: [
        'EN LA MEDIDA EN QUE LO PERMITA LA LEY, USTED ACEPTA QUE CUALQUIER PROCEDIMIENTO DE RESOLUCIÓN DE DISPUTAS SE LLEVARÁ A CABO SOLO DE FORMA INDIVIDUAL Y NO EN UNA ACCIÓN COLECTIVA, CONSOLIDADA O REPRESENTATIVA.',
      ],
    },
    {
      heading: 'Ley aplicable',
      paragraphs: [
        'Estos Términos se rigen por las leyes de Victoria, Australia, sin perjuicio de los principios de conflicto de leyes. Usted acepta la jurisdicción exclusiva de los tribunales de Victoria, Australia.',
      ],
    },
    {
      heading: 'Cambios y disponibilidad',
      paragraphs: [
        'Podemos modificar, suspender o discontinuar el sitio (o cualquier parte del mismo) en cualquier momento sin previo aviso ni responsabilidad.',
        'Podemos actualizar estos Términos en cualquier momento. La fecha de Última actualización indica cuándo se revisaron por última vez. El uso continuado después de los cambios constituye su aceptación.',
      ],
    },
    {
      heading: 'Divisibilidad',
      paragraphs: [
        'Si alguna disposición de estos Términos se considera inválida o inaplicable, dicha disposición se aplicará en la máxima medida permitida y las disposiciones restantes permanecerán en pleno vigor y efecto.',
      ],
    },
    {
      heading: 'Renuncia',
      paragraphs: [
        'Nuestra falta de hacer cumplir cualquier derecho o disposición de estos Términos no se considerará una renuncia a dicho derecho o disposición.',
      ],
    },
    {
      heading: 'Acuerdo completo',
      paragraphs: [
        'Estos Términos, junto con nuestra Política de Privacidad, constituyen el acuerdo completo entre usted y ANQR con respecto a su uso del sitio y reemplazan cualquier acuerdo anterior.',
      ],
    },
    {
      heading: 'Fuerza mayor',
      paragraphs: [
        'No seremos responsables de ningún fallo o retraso en el cumplimiento debido a circunstancias fuera de nuestro control razonable, incluidos desastres naturales, guerra, terrorismo, disturbios, acciones gubernamentales o fallos de Internet/infraestructura.',
      ],
    },
    {
      heading: 'Contacto',
      paragraphs: ['Las preguntas sobre estos Términos se pueden enviar a: ${CONTACT_EMAIL}'],
    },
  ],
};

export default terms;
