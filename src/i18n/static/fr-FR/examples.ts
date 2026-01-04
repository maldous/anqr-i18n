import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Examples page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 */
export const examples: PageDefinition = {
  title: 'Exemples d\'ANQR',
  description: 'Trouvez le bon point de départ avec ANQR - du guide de l\'utilisateur complet aux articles pratiques Learn et aux exemples prêts à l\'emploi.',
  lastUpdated: LAST_UPDATED,

  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Ouvrez le générateur', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Parcourir les articles Apprendre', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Ouvrez le guide de l\'utilisateur complet', type: 'guide' },
  ],

  sections: [
    // Example 1: Uplift an Existing QR Campaign
    {
      heading: 'Améliorez une campagne QR existante',
      paragraphs: ['Transformez un simple code QR en une version de marque optimisée pour la sécurité.', '819'],
      images: [
        {
          src: '/images/examples/uplift-overview.png',
          alt: 'Améliorez une campagne QR existante',
          caption: 'Transformez un simple code QR en une version de marque optimisée pour la sécurité.',
        },
      ],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Vous disposez déjà d\'une campagne de codes QR – peut-être de simples codes en noir et blanc imprimés sur des supports marketing. Les codes fonctionnent, mais ils ne correspondent pas à la marque et peuvent avoir des paramètres sous-optimaux. Comment effectuer une mise à niveau sans interrompre les analyses existantes ?', '820'],
      images: [
        {
          src: '/images/examples/uplift-before.png',
          alt: 'Le défi',
          caption: 'Vous disposez déjà d\'une campagne de codes QR – peut-être de simples codes en noir et blanc imprimés sur des supports marketing. Les codes fonctionnent, mais ils ne correspondent pas à la marque et peuvent avoir des paramètres sous-optimaux. Comment effectuer une mise à niveau sans interrompre les analyses existantes ?',
        },
      ],
    },
    {
      heading: 'La solution',
      paragraphs: ['Conservez la même URL de destination mais recréez le code QR avec ANQR. Ajoutez votre logo en superposition centrale, appliquez les couleurs de la marque et activez le mode de sécurité pour garantir la fiabilité du code mis à niveau. Le contenu encodé reste identique.', '821', '822'],
      images: [
        {
          src: '/images/examples/uplift-after.png',
          alt: 'La solution',
          caption: 'Conservez la même URL de destination mais recréez le code QR avec ANQR. Ajoutez votre logo en superposition centrale, appliquez les couleurs de la marque et activez le mode de sécurité pour garantir la fiabilité du code mis à niveau. Le contenu encodé reste identique.',
        },
      ],
    },
    {
      heading: 'Pas à pas',
      paragraphs: ['1. Entrez votre URL existante dans ANQR. 2. Réglez la correction d\'erreur sur H (élevé). 3. Téléchargez votre logo et définissez le mode de superposition sur « Logo central ». 4. Ajustez l\'intensité à 60-70 %. 5. Activez « Préserver les modèles du Finder ». 6. Appliquez les couleurs de la marque (maintenez un contraste élevé). 7. Activez le mode de sécurité « Équilibré ». 8. Testez avec plusieurs applications de scanner. 9. Exportez au format SVG pour une flexibilité d\'impression.', '823', '824', '825', '826', '827', '828'],
    },
    {
      heading: 'Pourquoi ça marche',
      paragraphs: ['Le code QR code la même URL, de sorte que les codes imprimés existants et les nouveaux codes de marque fonctionnent tous les deux. Une correction d\'erreur élevée compense la superposition du logo. Le mode de sécurité garantit que les choix de conception ne compromettent pas la numérisation.', '829', '830'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H#overlay',
          label: 'Recréer dans le générateur',
          type: 'generator',
        },
      ],
    },

    // Example 2: Branded Retail Payments
    {
      heading: 'QR de paiement au détail de marque',
      paragraphs: ['Concevez un QR de paiement qui équilibre l\'image de marque et la fiabilité de la numérisation.', '831'],
      images: [
        {
          src: '/images/examples/retail-payments-overview.png',
          alt: 'QR de paiement au détail de marque',
          caption: 'Concevez un QR de paiement qui équilibre l\'image de marque et la fiabilité de la numérisation.',
        },
      ],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Votre entreprise de vente au détail a besoin de codes QR de paiement qui correspondent à votre identité de marque tout en répondant aux exigences strictes du système de paiement. Les codes de paiement génériques en noir et blanc fonctionnent mais manquent d\'opportunités de branding.', '832'],
      images: [
        {
          src: '/images/examples/retail-payments-before.png',
          alt: 'Le défi',
          caption: 'Votre entreprise de vente au détail a besoin de codes QR de paiement qui correspondent à votre identité de marque tout en répondant aux exigences strictes du système de paiement. Les codes de paiement génériques en noir et blanc fonctionnent mais manquent d\'opportunités de branding.',
        },
      ],
    },
    {
      heading: 'La solution',
      paragraphs: ['Utilisez les modèles de paiement ANQR (UPI, PayNow, SEPA, etc.) avec une image de marque conservatrice. Ajoutez votre logo petit et centré, utilisez les couleurs de la marque pour le premier plan tout en gardant un fond blanc et utilisez le niveau de correction d\'erreur le plus élevé.', '833'],
      images: [
        {
          src: '/images/examples/retail-payments-after.png',
          alt: 'La solution',
          caption: 'Utilisez les modèles de paiement ANQR (UPI, PayNow, SEPA, etc.) avec une image de marque conservatrice. Ajoutez votre logo petit et centré, utilisez les couleurs de la marque pour le premier plan tout en gardant un fond blanc et utilisez le niveau de correction d\'erreur le plus élevé.',
        },
      ],
    },
    {
      heading: 'Contraintes de conception',
      paragraphs: ['Les codes de paiement doivent être scannés en moins d\'une seconde pour une bonne expérience client. Cela limite le degré de sécurité de la personnalisation : logo inférieur à 15 % de la zone de code, aucune modification du modèle de recherche, zone silencieuse minimale de 4 modules et test avec des applications de paiement réelles (pas seulement des scanners génériques).', '834'],
    },
    {
      heading: 'Paramètres recommandés',
      paragraphs: ['Correction d\'erreur : H (élevé). Zone tranquille : 4+ modules. Style de module : carré (le plus fiable). Superposition de logo : intensité maximale de 50 à 60 %. Mode de sécurité : strict. Testez toujours avec votre application de paiement (Google Pay, applications bancaires, etc.).', '835'],
    },
    {
      heading: 'Pourquoi cette approche fonctionne',
      paragraphs: ['Une image de marque conservatrice garantit que les applications de paiement sont analysées rapidement tout en affichant l\'identité de votre marque. La zone silencieuse et la correction d\'erreurs offrent une marge pour les variations d\'impression et les facteurs environnementaux au point de vente.', '836'],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Recréer dans le générateur',
          type: 'generator',
        },
      ],
    },

    // Example 3: Print Scaling
    {
      heading: 'Mise à l\'échelle de l\'impression : PNG vs SVG',
      paragraphs: ['Découvrez la différence entre raster et vectoriel dans les grandes tailles d\'impression.', '837'],
      images: [
        {
          src: '/images/examples/print-scaling-overview.png',
          alt: 'Mise à l\'échelle de l\'impression : PNG vs SVG',
          caption: 'Découvrez la différence entre raster et vectoriel dans les grandes tailles d\'impression.',
        },
      ],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Vous avez besoin de codes QR pour l\'impression grand format : affiches, bannières ou signalisation. L\'exportation avec de petites tailles de pixels, puis la mise à l\'échelle, produisent des codes flous et potentiellement impossibles à numériser.', '838'],
      images: [
        {
          src: '/images/examples/print-scaling-before.png',
          alt: 'Le défi',
          caption: 'Vous avez besoin de codes QR pour l\'impression grand format : affiches, bannières ou signalisation. L\'exportation avec de petites tailles de pixels, puis la mise à l\'échelle, produisent des codes flous et potentiellement impossibles à numériser.',
        },
      ],
    },
    {
      heading: 'PNG au format affiche',
      paragraphs: ['Un code QR exporté au format PNG 200 × 200 px puis mis à l\'échelle à 30 cm (12 pouces) devient évidemment pixelisé. Les bords du module sont flous, réduisant ainsi le contraste et la fiabilité du scanner. Il s\'agit de l\'échec d\'impression QR le plus courant.', '839'],
      images: [
        {
          src: '/images/examples/print-scaling-png.png',
          alt: 'PNG au format affiche',
          caption: 'Un code QR exporté au format PNG 200 × 200 px puis mis à l\'échelle à 30 cm (12 pouces) devient évidemment pixelisé. Les bords du module sont flous, réduisant ainsi le contraste et la fiabilité du scanner. Il s\'agit de l\'échec d\'impression QR le plus courant.',
        },
      ],
    },
    {
      heading: 'SVG au format affiche',
      paragraphs: ['Le même code QR exporté au format SVG s\'adapte parfaitement à n\'importe quelle taille. Les bords des modules restent nets car ils sont définis mathématiquement et non basés sur des pixels. Cela fonctionne qu\'il soit imprimé à 5 cm ou à 5 mètres.', '840'],
      images: [
        {
          src: '/images/examples/print-scaling-svg.png',
          alt: 'SVG au format affiche',
          caption: 'Le même code QR exporté au format SVG s\'adapte parfaitement à n\'importe quelle taille. Les bords des modules restent nets car ils sont définis mathématiquement et non basés sur des pixels. Cela fonctionne qu\'il soit imprimé à 5 cm ou à 5 mètres.',
        },
      ],
    },
    {
      heading: 'Flux de travail d\'exportation',
      paragraphs: ['In ANQR: 1. Design your QR code at any preview size. 2. Accédez aux paramètres de sortie. 3. Sélectionnez Format : SVG. 4. Activez « True Vector » pour les chemins évolutifs. 5. Exportez et importez dans votre logiciel de conception. 6. Adaptez-vous à la taille d\'impression finale : elle reste nette.', '841', '842', '843', '844', '845'],
    },
    {
      heading: 'Quand utiliser le PNG haute résolution',
      paragraphs: ['Si votre flux de travail nécessite PNG : calculez les dimensions finales des pixels (taille physique × DPI). Pour un code de 10 cm à 300 DPI : 10 cm ≈ 4 pouces × 300 = 1200px. Exportez à 1200×1200px. Cela donne des résultats de qualité d\'impression sans mise à l\'échelle.', '846'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: 'Recréer dans le générateur',
          type: 'generator',
        },
      ],
    },

    // Example 4: Animated Signage
    {
      heading: 'Signalisation animée QR',
      paragraphs: ['Ajoutez une animation accrocheuse tout en conservant la fiabilité de l\'analyse.', '847'],
      images: [
        {
          src: '/images/examples/animated-signage-overview.png',
          alt: 'Signalisation animée QR',
          caption: 'Ajoutez une animation accrocheuse tout en conservant la fiabilité de l\'analyse.',
        },
      ],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Votre affichage numérique rivalise pour attirer l\'attention. Les codes QR statiques sont ignorés parmi le contenu animé. Mais une animation agressive peut interrompre l\'analyse.', '848'],
      images: [
        {
          src: '/images/examples/animated-signage-before.png',
          alt: 'Le défi',
          caption: 'Votre affichage numérique rivalise pour attirer l\'attention. Les codes QR statiques sont ignorés parmi le contenu animé. Mais une animation agressive peut interrompre l\'analyse.',
        },
      ],
    },
    {
      heading: 'Approche d\'animation sécurisée',
      paragraphs: ['Utilisez une animation subtile qui attire l\'attention sans perturber la structure du code. Le motif « Pulse » d\'ANQR redimensionne doucement le code, « Shimmer » ajoute des effets scintillants et « Wave » crée un mouvement fluide, tout en gardant chaque image numérisable.', '849'],
      images: [
        {
          src: '/images/examples/animated-signage-after.png',
          alt: 'Approche d\'animation sécurisée',
          caption: 'Utilisez une animation subtile qui attire l\'attention sans perturber la structure du code. Le motif « Pulse » d\'ANQR redimensionne doucement le code, « Shimmer » ajoute des effets scintillants et « Wave » crée un mouvement fluide, tout en gardant chaque image numérisable.',
        },
      ],
    },
    {
      heading: 'Paramètres recommandés',
      paragraphs: ['Motif : Pulse ou Shimmer. Vitesse : 200 à 300 ms par image. Correction d\'erreur : H (élevé). Dither temporel : Scintillement sécurisé. Activez toujours « Préserver les modèles du Finder ». Testez sur votre matériel d\'affichage de signalisation actuel.', '850'],
    },
    {
      heading: 'Format et livraison',
      paragraphs: ['Exportez au format GIF pour la prise en charge du lecteur de signalisation universel. Utilisez 24 à 30 images pour une animation fluide sans taille de fichier excessive. Si votre signalétique prend en charge la vidéo, MP4/WebM offre une meilleure qualité mais nécessite une capacité de lecture vidéo.', '851'],
    },
    {
      heading: 'Placement sur les écrans',
      paragraphs: ['Positionnez-le à une hauteur de numérisation confortable. Prévoyez plus de 5 secondes de temps d\'affichage pour que les spectateurs puissent le remarquer et le numériser. Ajoutez une invite de texte (« Rechercher les détails ») à côté du code. Assurez un contraste adéquat avec votre contenu d\'arrière-plan.', '852'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#animation',
          label: 'Recréer dans le générateur',
          type: 'generator',
        },
      ],
    },

    // Example 5: Cross-lingual Collaboration
    {
      heading: 'Collaboration QR multilingue',
      paragraphs: ['Partagez les configurations QR entre les équipes dans différentes langues.', '853'],
      images: [
        {
          src: '/images/examples/collaboration-overview.png',
          alt: 'Collaboration QR multilingue',
          caption: 'Partagez les configurations QR entre les équipes dans différentes langues.',
        },
      ],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Votre équipe internationale doit créer des codes QR cohérents, mais les membres de l\'équipe travaillent dans des langues différentes. La recréation de configuration manuelle est sujette aux erreurs et prend du temps.', '854'],
      images: [
        {
          src: '/images/examples/collaboration-before.png',
          alt: 'Le défi',
          caption: 'Votre équipe internationale doit créer des codes QR cohérents, mais les membres de l\'équipe travaillent dans des langues différentes. La recréation de configuration manuelle est sujette aux erreurs et prend du temps.',
        },
      ],
    },
    {
      heading: 'La solution',
      paragraphs: ['Les liens de partage d\'ANQR encodent tous les paramètres de l\'URL. Les membres de l\'équipe peuvent ouvrir le même lien dans leur langue préférée : la configuration QR se charge de manière identique, mais l\'interface s\'affiche dans leur langue locale.', '855'],
      images: [
        {
          src: '/images/examples/collaboration-after.png',
          alt: 'La solution',
          caption: 'Les liens de partage d\'ANQR encodent tous les paramètres de l\'URL. Les membres de l\'équipe peuvent ouvrir le même lien dans leur langue préférée : la configuration QR se charge de manière identique, mais l\'interface s\'affiche dans leur langue locale.',
        },
      ],
    },
    {
      heading: 'Comment ça marche',
      paragraphs: ['1. Configurez votre code QR dans ANQR. 2. Cliquez sur Partager pour générer un lien. 3. Envoyez le lien à votre collègue. 4. Ils l\'ouvrent – ​​ANQR charge vos paramètres exacts. 5. Ils peuvent changer la langue de leur interface sans affecter la configuration QR. 6. Les deux membres de l\'équipe exportent des codes QR identiques.', '856', '857', '858', '859', '860'],
    },
    {
      heading: 'Paramètre de langue',
      paragraphs: ['Les liens de partage ANQR incluent un paramètre « lang » pour la langue de l\'interface, mais les paramètres de contenu et de style QR sont indépendants de la langue. La modification du paramètre lang modifie les menus et les étiquettes, pas le code QR lui-même.', '861'],
    },
    {
      heading: 'Flux de travail collaboratif',
      paragraphs: ['Créez une configuration « maître » avec les paramètres de votre marque. Partagez le lien avec votre équipe. Chaque bureau régional peut utiliser sa langue préférée tout en préservant la cohérence de la marque. Les mises à jour du lien principal se propagent à tous ceux qui l\'utilisent.', '862', '863'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#share',
          label: 'Recréer dans le générateur',
          type: 'generator',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Parcourir les articles Apprendre', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Ouvrez le guide de l\'utilisateur complet', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: '899', type: 'gallery' },
  ],
};
