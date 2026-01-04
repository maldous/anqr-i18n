import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: '« À propos d\'ANQR »',
  description: '« ANQR est un générateur de codes QR gratuit avec une approche axée sur le client : générez des codes QR localement ou utilisez notre API pour l\'intégration. »',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open the generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
  ],
  relatedLinks: [
    { href: '/privacy?lang=${lang}', label: 'Privacy Policy', type: 'external' },
    { href: '/terms?lang=${lang}', label: 'Terms of Service', type: 'external' },
  ],
  sections: [
    {
      heading: '« Qu\'est-ce que l\'ANQR ? »',
      paragraphs: ['« ANQR (prononcé anchor) est un générateur de codes QR gratuit qui crée des codes scannables pour les URL, le texte, les identifiants Wi-Fi, les cartes de contact, les événements du calendrier, et plus encore. »', '« Il est conçu pour les particuliers, les petites entreprises, les spécialistes du marketing et les développeurs qui souhaitent des outils QR performants sans inscription. Son architecture centrée sur le client permet la génération locale des codes QR dans votre navigateur par défaut, avec une API serveur optionnelle pour une intégration professionnelle. »'],
    },
    {
      heading: '« Caractéristiques clés »',
      bullets: ['« Générez instantanément des codes QR dans votre navigateur – aucun compte requis. »', '« Personnalisez les couleurs, les styles de modules, les motifs de recherche et ajoutez des superpositions d\'images. »', '« Exportez dans plusieurs formats : PNG, SVG, WebP et GIF animé. »', '« Commandes avancées pour le niveau de correction d\'erreur, la version QR, le mode d\'encodage et la sélection du masque. »', '« Conseils de sécurité de numérisation et aperçu en direct pour aider à maintenir la lisibilité des codes imprimés et à l\'écran. »', '« API côté serveur pour l\'intégration professionnelle avec prise en charge complète des paramètres. »', '« Fonctionne hors ligne une fois chargée — il s\'agit d\'une application Web statique que vous pouvez exécuter n\'importe où. »'],
    },
    {
      heading: '« Comment fonctionne ANQR »',
      paragraphs: ['« ANQR s\'exécute dans votre navigateur et encode votre entrée dans une matrice QR standard avec correction d\'erreur Reed-Solomon, puis la convertit au format que vous choisissez. »', '« Par défaut, la génération s\'effectue localement dans votre navigateur. Pour un usage professionnel, vous pouvez également utiliser l\'API côté serveur pour générer des codes QR via des paramètres d\'URL — idéal pour l\'intégration dans des sites web, des e-mails ou des flux de travail automatisés. »', '« Lorsque vous ajoutez des superpositions ou des animations, ANQR équilibre le style et la fiabilité de la numérisation afin que le résultat reste scannable. »', '« ANQR se concentre sur les codes statiques (les données sont à l\'intérieur du QR code). Si vous avez besoin d\'un code dynamique (destination modifiable), vous pouvez encoder votre propre URL de redirection ou lien court. »'],
    },
    {
      heading: '« Qui gère ANQR ? »',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: '« La publicité et comment nous préservons notre liberté »',
      paragraphs: ['« ANQR est gratuit et financé par la publicité. Nous pouvons afficher des publicités via Google AdSense et/ou d\'autres partenaires publicitaires. »', '« Les fournisseurs de publicité peuvent utiliser des cookies ou des technologies similaires pour personnaliser les annonces en fonction de vos centres d\'intérêt et de votre activité de navigation. Vous pouvez gérer vos préférences publicitaires dans les paramètres de votre appareil et via les paramètres des annonces Google, et en savoir plus dans notre Politique de confidentialité. »', '« Nous ne vendons pas le contenu que vous encodez dans les codes QR. Les publicités aident à couvrir les coûts de fonctionnement et d\'amélioration du projet. »'],
    },
    {
      heading: '« Normes ouvertes »',
      paragraphs: ['« ANQR génère des codes QR basés sur la norme ISO/IEC 18004 et vise une large compatibilité entre les scanners, les appareils photo et les flux de travail d\'impression. »'],
    },
    {
      heading: '« Avis relatif aux marques de commerce »',
      paragraphs: ['« QR Code® est une marque déposée de DENSO WAVE INCORPORATED. ANQR n\'est ni affiliée à, ni approuvée par, ni parrainée par DENSO WAVE INCORPORATED. »'],
    },
    {
      heading: '« Commentaires et contributions »',
      paragraphs: ['« Nous apprécions vos commentaires, vos signalements de bogues et vos suggestions de fonctionnalités. Veuillez nous contacter par courriel ou via la page de contact ; nous lisons tous les messages, même si les délais de réponse peuvent varier. »'],
    },
  ],
};

export default about;
