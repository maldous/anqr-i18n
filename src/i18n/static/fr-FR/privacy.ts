import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: '« Politique de confidentialité »',
  description: '« Informations qu’ANQR recueille, comment elles sont utilisées et vos droits en vertu des lois applicables en matière de protection de la vie privée. »',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '« Résumé »',
      paragraphs: [
        '« ANQR est un générateur de codes QR conçu pour être facile d\'utilisation. La création d\'un compte n\'est pas requise. Par défaut, les codes QR sont générés localement dans votre navigateur ; nous n\'avons pas accès au contenu que vous encodez. »',
        '« Pour un usage professionnel, ANQR propose une API côté serveur qui génère des codes QR à partir des paramètres d’URL. Lorsque vous utilisez cette API, le contenu de votre code QR est traité sur nos serveurs pour générer l’image, mais n’est ni stocké ni enregistré. »',
        '« Nous utilisons Google AdSense pour la publicité et pouvons utiliser des services d\'analyse. Ces services collectent des informations par le biais de cookies et de technologies similaires. La présente politique explique quelles données sont collectées, comment elles sont utilisées et quels sont vos droits. »',
      ],
    },
    {
      heading: '« Informations que nous recueillons »',
      bullets: [
        '« Informations que vous fournissez : Si vous nous contactez par e-mail ou via notre formulaire de contact, nous collectons votre nom, votre adresse e-mail et le contenu de votre message. »',
        '« Informations collectées automatiquement : Notre fournisseur d’hébergement (Netlify), nos partenaires publicitaires et nos services d’analyse peuvent collecter : l’adresse IP, le type et la version du navigateur, le système d’exploitation, le type d’appareil, l’URL de référence, les pages visitées, le temps passé sur le site et la localisation géographique approximative. »',
        '« Cookies tiers : Nos partenaires publicitaires (Google AdSense) utilisent des cookies et des technologies similaires pour diffuser et mesurer les publicités. ANQR n’installe aucun cookie interne. »',
      ],
    },
    {
      heading: '« Cookies et technologies tierces »',
      paragraphs: [
        '« ANQR n’installe aucun cookie interne. Vos préférences (comme le mode sombre) sont stockées localement sur votre appareil et ne sont transmises à aucun serveur. »',
        '« Toutefois, nos partenaires publicitaires (Google AdSense) et notre fournisseur d’hébergement peuvent utiliser des cookies et des technologies de suivi similaires : »',
      ],
      bullets: [
        '« Cookies publicitaires (tiers) : déposés par Google AdSense et ses partenaires publicitaires pour diffuser des annonces pertinentes, mesurer les performances des annonces et comprendre les centres d’intérêt des utilisateurs. Ces cookies peuvent suivre votre activité sur différents sites web. »',
        '« Cookies analytiques (tiers) : Peuvent être utilisés par notre fournisseur d’hébergement ou nos services d’analyse pour collecter des données d’utilisation anonymisées. »',
      ],
    },
    {
      heading: '« Google AdSense et la publicité »',
      paragraphs: [
        '« Nous affichons des publicités via Google AdSense. Google et ses partenaires utilisent des cookies pour diffuser des annonces basées sur votre historique de navigation sur ce site et d\'autres sites Web (publicité ciblée). »',
        '« Découvrez comment Google utilise vos informations : https://policies.google.com/technologies/partner-sites »',
        '« Gérer la personnalisation des annonces : https://adssettings.google.com »',
        '« Désinscription via la Network Advertising Initiative : https://optout.networkadvertising.org »',
        '« Désinscription via Digital Advertising Alliance : https://optout.aboutads.info »',
      ],
    },
    {
      heading: '« Comment nous utilisons l’information »',
      bullets: [
        '« Pour répondre à vos demandes et vous apporter un soutien. »',
        '« Afficher des publicités pertinentes par l’intermédiaire de nos partenaires publicitaires. »',
        '« Pour analyser l’utilisation du site et améliorer nos services. »',
        '« Détecter, prévenir et traiter les fraudes, les abus et les problèmes de sécurité. »',
        '« Pour se conformer aux obligations légales. »',
      ],
    },
    {
      heading: '« Services tiers »',
      bullets: [
        '« Google AdSense : Reçoit des données pour diffuser et mesurer les publicités. »',
        '« Fournisseurs d’analyse : Recevez des données d’utilisation anonymisées. »',
        '« Netlify (hébergement) : Traite les requêtes et peut enregistrer les adresses IP. »',
        '« Nous ne vendons pas vos informations personnelles. Cependant, le partage de données avec des partenaires publicitaires peut être considéré comme une « vente » en vertu de la CCPA (voir ci-dessous). »',
      ],
    },
    {
      heading: '« Conservation des données »',
      bullets: [
        '« Soumissions de contact : jusqu’à 2 ans. »',
        '« Journaux du serveur : jusqu\'à 30 jours (fournisseur d\'hébergement) ».',
        '« Données analytiques : jusqu’à 26 mois (anonymisées) ».',
        '« Cookies publicitaires : généralement 13 mois (varie selon le partenaire) ».',
      ],
    },
    {
      heading: '« Vos droits en vertu du RGPD (utilisateurs de l’EEE) »',
      paragraphs: [
        '« Si vous résidez dans l’Espace économique européen, vous disposez des droits suivants en vertu du Règlement général sur la protection des données : »',
      ],
      bullets: [
        '« Droit d’accès : Demandez une copie des données personnelles que nous détenons à votre sujet. »',
        '« Droit de rectification : Demande de correction des données inexactes. »',
        '« Droit à l’effacement : Demandez la suppression de vos données (« droit à l’oubli ») ».',
        '« Droit de restreindre le traitement : Demandez des limites sur la façon dont nous utilisons vos données. »',
        '« Droit à la portabilité des données : Demandez vos données dans un format portable. »',
        '« Droit d’opposition : S’opposer au traitement, y compris à des fins de marketing direct. »',
        '« Droit de retirer son consentement : Retirer son consentement à tout moment lorsque le traitement est fondé sur le consentement. »',
        '« Droit de porter plainte : Déposez une plainte auprès de votre autorité de protection des données. »',
      ],
    },
    {
      heading: '« Base juridique du RGPD »',
      paragraphs: [
        '« Nous traitons les données sur les bases suivantes : (a) Consentement — pour la publicité personnalisée (gérée par nos partenaires publicitaires) ; (b) Intérêts légitimes — pour l’analyse, la sécurité et l’amélioration ; (c) Contrat — pour répondre aux demandes. »',
        '« Pour exercer vos droits, contactez ${CONTACT_EMAIL}. Nous vous répondrons dans les 30 jours. »',
      ],
    },
    {
      heading: '« Vos droits en vertu de la CCPA (utilisateurs californiens) »',
      bullets: [
        '« Droit de savoir : Demander des informations sur les données collectées, leurs sources, leurs finalités et les tiers. »',
        '« Droit à l’effacement : Demandez la suppression de vos informations personnelles. »',
        '« Droit de retrait : Refusez la « vente » de vos informations personnelles (le partage avec des partenaires publicitaires peut être admissible). »',
        '« Droit à la non-discrimination : Nous ne vous discriminerons pas pour avoir exercé vos droits. »',
      ],
    },
    {
      heading: '« Catégories CCPA collectées »',
      paragraphs: [
        '« Catégories : Identifiants (adresse IP, identifiant de l’appareil), activité Internet (navigation, interactions publicitaires), géolocalisation (approximative), déductions (intérêts tirés de la navigation). »',
        '« Pour exercer vos droits ou vous désinscrire : ${CONTACT_EMAIL} ou modifiez les paramètres des cookies. »',
      ],
    },
    {
      heading: '« Transferts internationaux »',
      paragraphs: [
        '« Vos informations peuvent être transférées vers des pays dont les lois sur la protection des données diffèrent, y compris les États-Unis. Nous utilisons des garanties appropriées telles que les clauses contractuelles types. »',
      ],
    },
    {
      heading: '« Vie privée des enfants »',
      paragraphs: [
        '« ANQR ne s’adresse pas aux enfants de moins de 13 ans (ou de moins de 16 ans dans l’EEE). Nous ne recueillons pas sciemment de données auprès d’enfants. Veuillez contacter ${CONTACT_EMAIL} si vous pensez qu’un enfant a fourni des informations. »',
      ],
    },
    {
      heading: '« Sécurité »',
      paragraphs: [
        '« Nous utilisons des mesures techniques et organisationnelles appropriées pour protéger les données, notamment le chiffrement HTTPS. Cependant, aucune transmission par Internet n’est sécurisée à 100 %. »',
      ],
    },
    {
      heading: '« Ne pas suivre »',
      paragraphs: [
        '« Nous respectons les signaux "Ne pas suivre" des navigateurs lorsque cela est possible, même si nos partenaires publicitaires peuvent ne pas répondre au DNT. »',
      ],
    },
    {
      heading: '« Modifications à cette politique »',
      paragraphs: [
        '« Nous pouvons mettre à jour cette politique périodiquement. La date de « Dernière mise à jour » indique la révision la plus récente. Les changements importants peuvent être communiqués via une bannière sur le site. »',
      ],
    },
    {
      heading: '« Contactez-nous »',
      paragraphs: [
        '« Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits : ${CONTACT_EMAIL} ou utilisez notre page Contact. Nous répondons aux demandes concernant la protection de vos données personnelles dans un délai de 30 jours. »',
      ],
    },
  ],
}

export default privacy;
