import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /examples page with 5 comprehensive examples
// All string values are numeric ids that map to lines in en-GB.txt.
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
    // Example 1: Uplift an Existing QR Campaign (759-770)
    {
      heading: 'Améliorez une campagne QR existante',
      paragraphs: ['Transformez un simple code QR en une version de marque optimisée pour la sécurité.'],
      images: [{ src: '/images/examples/uplift-overview.svg', alt: 'Améliorez une campagne QR existante', caption: 'Transformez un simple code QR en une version de marque optimisée pour la sécurité.' }],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Vous disposez déjà d\'une campagne de codes QR – peut-être de simples codes en noir et blanc imprimés sur des supports marketing. Les codes fonctionnent, mais ils ne correspondent pas à la marque et peuvent avoir des paramètres sous-optimaux. Comment effectuer une mise à niveau sans interrompre les analyses existantes ?'],
      images: [{ src: '/images/examples/uplift-before.svg', alt: 'Le défi', caption: 'Vous disposez déjà d\'une campagne de codes QR – peut-être de simples codes en noir et blanc imprimés sur des supports marketing. Les codes fonctionnent, mais ils ne correspondent pas à la marque et peuvent avoir des paramètres sous-optimaux. Comment effectuer une mise à niveau sans interrompre les analyses existantes ?' }],
    },
    {
      heading: 'La solution',
      paragraphs: ['Conservez la même URL de destination mais recréez le code QR avec ANQR. Ajoutez votre logo en superposition centrale, appliquez les couleurs de la marque et activez le mode de sécurité pour garantir la fiabilité du code mis à niveau. Le contenu encodé reste identique.'],
      images: [{ src: '/images/examples/uplift-after.svg', alt: 'La solution', caption: 'Conservez la même URL de destination mais recréez le code QR avec ANQR. Ajoutez votre logo en superposition centrale, appliquez les couleurs de la marque et activez le mode de sécurité pour garantir la fiabilité du code mis à niveau. Le contenu encodé reste identique.' }],
    },
    {
      heading: 'Pas à pas',
      paragraphs: ['1. Entrez votre URL existante dans ANQR. 2. Réglez la correction d\'erreur sur H (élevé). 3. Téléchargez votre logo et définissez le mode de superposition sur « Logo central ». 4. Ajustez l\'intensité à 60-70 %. 5. Activez « Préserver les modèles du Finder ». 6. Appliquez les couleurs de la marque (maintenez un contraste élevé). 7. Activez le mode de sécurité « Équilibré ». 8. Testez avec plusieurs applications de scanner. 9. Exportez au format SVG pour une flexibilité d\'impression.'],
    },
    {
      heading: 'Pourquoi ça marche',
      paragraphs: ['Le code QR code la même URL, de sorte que les codes imprimés existants et les nouveaux codes de marque fonctionnent tous les deux. Une correction d\'erreur élevée compense la superposition du logo. Le mode de sécurité garantit que les choix de conception ne compromettent pas la numérisation.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced&ec=H#overlay', label: 'Recréer dans le générateur', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Parcourir les articles Apprendre', type: 'learn' },
      ],
    },

    // Example 2: Branded Retail Payment QR (771-782)
    {
      heading: 'QR de paiement au détail de marque',
      paragraphs: ['Concevez un QR de paiement qui équilibre l\'image de marque et la fiabilité de la numérisation.'],
      images: [{ src: '/images/examples/payment-overview.svg', alt: 'QR de paiement au détail de marque', caption: 'Concevez un QR de paiement qui équilibre l\'image de marque et la fiabilité de la numérisation.' }],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Votre entreprise de vente au détail a besoin de codes QR de paiement qui correspondent à votre identité de marque tout en répondant aux exigences strictes du système de paiement. Les codes de paiement génériques en noir et blanc fonctionnent mais manquent d\'opportunités de branding.'],
      images: [{ src: '/images/examples/payment-before.svg', alt: 'Le défi', caption: 'Votre entreprise de vente au détail a besoin de codes QR de paiement qui correspondent à votre identité de marque tout en répondant aux exigences strictes du système de paiement. Les codes de paiement génériques en noir et blanc fonctionnent mais manquent d\'opportunités de branding.' }],
    },
    {
      heading: 'La solution',
      paragraphs: ['Utilisez les modèles de paiement ANQR (UPI, PayNow, SEPA, etc.) avec une image de marque conservatrice. Ajoutez votre logo petit et centré, utilisez les couleurs de la marque pour le premier plan tout en gardant un fond blanc et utilisez le niveau de correction d\'erreur le plus élevé.'],
      images: [{ src: '/images/examples/payment-after.svg', alt: 'La solution', caption: 'Utilisez les modèles de paiement ANQR (UPI, PayNow, SEPA, etc.) avec une image de marque conservatrice. Ajoutez votre logo petit et centré, utilisez les couleurs de la marque pour le premier plan tout en gardant un fond blanc et utilisez le niveau de correction d\'erreur le plus élevé.' }],
    },
    {
      heading: 'Contraintes de conception',
      paragraphs: ['Les codes de paiement doivent être scannés en moins d\'une seconde pour une bonne expérience client. Cela limite le degré de sécurité de la personnalisation : logo inférieur à 15 % de la zone de code, aucune modification du modèle de recherche, zone silencieuse minimale de 4 modules et test avec des applications de paiement réelles (pas seulement des scanners génériques).'],
    },
    {
      heading: 'Paramètres recommandés',
      paragraphs: ['Correction d\'erreur : H (élevé). Zone tranquille : 4+ modules. Style de module : carré (le plus fiable). Superposition de logo : intensité maximale de 50 à 60 %. Mode de sécurité : strict. Testez toujours avec votre application de paiement (Google Pay, applications bancaires, etc.).'],
    },
    {
      heading: 'Pourquoi cette approche fonctionne',
      paragraphs: ['Une image de marque conservatrice garantit que les applications de paiement sont analysées rapidement tout en affichant l\'identité de votre marque. La zone silencieuse et la correction d\'erreurs offrent une marge pour les variations d\'impression et les facteurs environnementaux au point de vente.'],
      links: [
        { href: '/?lang=${lang}&tab=professional&ec=H#payload', label: 'Recréer dans le générateur', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Parcourir les articles Apprendre', type: 'learn' },
      ],
    },

    // Example 3: Print Scaling: PNG vs SVG (783-794)
    {
      heading: 'Mise à l\'échelle de l\'impression : PNG vs SVG',
      paragraphs: ['Découvrez la différence entre raster et vectoriel dans les grandes tailles d\'impression.'],
      images: [{ src: '/images/examples/print-overview.svg', alt: 'Mise à l\'échelle de l\'impression : PNG vs SVG', caption: 'Découvrez la différence entre raster et vectoriel dans les grandes tailles d\'impression.' }],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Vous avez besoin de codes QR pour l\'impression grand format : affiches, bannières ou signalisation. L\'exportation avec de petites tailles de pixels, puis la mise à l\'échelle, produisent des codes flous et potentiellement impossibles à numériser.'],
      images: [{ src: '/images/examples/print-png-scaled.svg', alt: 'Le défi', caption: 'Vous avez besoin de codes QR pour l\'impression grand format : affiches, bannières ou signalisation. L\'exportation avec de petites tailles de pixels, puis la mise à l\'échelle, produisent des codes flous et potentiellement impossibles à numériser.' }],
    },
    {
      heading: 'PNG au format affiche',
      paragraphs: ['Un code QR exporté au format PNG 200 × 200 px puis mis à l\'échelle à 30 cm (12 pouces) devient évidemment pixelisé. Les bords du module sont flous, réduisant ainsi le contraste et la fiabilité du scanner. Il s\'agit de l\'échec d\'impression QR le plus courant.'],
      images: [{ src: '/images/examples/print-svg-scaled.svg', alt: 'PNG au format affiche', caption: 'Un code QR exporté au format PNG 200 × 200 px puis mis à l\'échelle à 30 cm (12 pouces) devient évidemment pixelisé. Les bords du module sont flous, réduisant ainsi le contraste et la fiabilité du scanner. Il s\'agit de l\'échec d\'impression QR le plus courant.' }],
    },
    {
      heading: 'SVG au format affiche',
      paragraphs: ['Le même code QR exporté au format SVG s\'adapte parfaitement à n\'importe quelle taille. Les bords des modules restent nets car ils sont définis mathématiquement et non basés sur des pixels. Cela fonctionne qu\'il soit imprimé à 5 cm ou à 5 mètres.'],
    },
    {
      heading: 'Flux de travail d\'exportation',
      paragraphs: ['In ANQR: 1. Design your QR code at any preview size. 2. Accédez aux paramètres de sortie. 3. Sélectionnez Format : SVG. 4. Activez « True Vector » pour les chemins évolutifs. 5. Exportez et importez dans votre logiciel de conception. 6. Adaptez-vous à la taille d\'impression finale : elle reste nette.'],
    },
    {
      heading: 'Quand utiliser le PNG haute résolution',
      paragraphs: ['Si votre flux de travail nécessite PNG : calculez les dimensions finales des pixels (taille physique × DPI). Pour un code de 10 cm à 300 DPI : 10 cm ≈ 4 pouces × 300 = 1200px. Exportez à 1200×1200px. Cela donne des résultats de qualité d\'impression sans mise à l\'échelle.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced&format=svg#output', label: 'Recréer dans le générateur', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Parcourir les articles Apprendre', type: 'learn' },
      ],
    },

    // Example 4: Animated Signage QR (795-806)
    {
      heading: 'Signalisation animée QR',
      paragraphs: ['Ajoutez une animation accrocheuse tout en conservant la fiabilité de l\'analyse.'],
      images: [{ src: '/images/examples/animation-overview.svg', alt: 'Signalisation animée QR', caption: 'Ajoutez une animation accrocheuse tout en conservant la fiabilité de l\'analyse.' }],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Votre affichage numérique rivalise pour attirer l\'attention. Les codes QR statiques sont ignorés parmi le contenu animé. Mais une animation agressive peut interrompre l\'analyse.'],
      images: [{ src: '/images/examples/animation-static.svg', alt: 'Le défi', caption: 'Votre affichage numérique rivalise pour attirer l\'attention. Les codes QR statiques sont ignorés parmi le contenu animé. Mais une animation agressive peut interrompre l\'analyse.' }],
    },
    {
      heading: 'Approche d\'animation sécurisée',
      paragraphs: ['Utilisez une animation subtile qui attire l\'attention sans perturber la structure du code. Le motif « Pulse » d\'ANQR redimensionne doucement le code, « Shimmer » ajoute des effets scintillants et « Wave » crée un mouvement fluide, tout en gardant chaque image numérisable.'],
      images: [{ src: '/images/examples/animation-animated.svg', alt: 'Approche d\'animation sécurisée', caption: 'Utilisez une animation subtile qui attire l\'attention sans perturber la structure du code. Le motif « Pulse » d\'ANQR redimensionne doucement le code, « Shimmer » ajoute des effets scintillants et « Wave » crée un mouvement fluide, tout en gardant chaque image numérisable.' }],
    },
    {
      heading: 'Paramètres recommandés',
      paragraphs: ['Motif : Pulse ou Shimmer. Vitesse : 200 à 300 ms par image. Correction d\'erreur : H (élevé). Dither temporel : Scintillement sécurisé. Activez toujours « Préserver les modèles du Finder ». Testez sur votre matériel d\'affichage de signalisation actuel.'],
    },
    {
      heading: 'Format et livraison',
      paragraphs: ['Exportez au format GIF pour la prise en charge du lecteur de signalisation universel. Utilisez 24 à 30 images pour une animation fluide sans taille de fichier excessive. Si votre signalétique prend en charge la vidéo, MP4/WebM offre une meilleure qualité mais nécessite une capacité de lecture vidéo.'],
    },
    {
      heading: 'Placement sur les écrans',
      paragraphs: ['Positionnez-le à une hauteur de numérisation confortable. Prévoyez plus de 5 secondes de temps d\'affichage pour que les spectateurs puissent le remarquer et le numériser. Ajoutez une invite de texte (« Rechercher les détails ») à côté du code. Assurez un contraste adéquat avec votre contenu d\'arrière-plan.'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=gif#animation',
          label: 'Recréer dans le générateur',
          type: 'generator',
        },
        { href: '/learn?lang=${lang}', label: 'Parcourir les articles Apprendre', type: 'learn' },
      ],
    },

    // Example 5: Cross-Lingual QR Collaboration (807-817)
    {
      heading: 'Collaboration QR multilingue',
      paragraphs: ['Partagez les configurations QR entre les équipes dans différentes langues.'],
      images: [{ src: '/images/examples/collab-overview.svg', alt: 'Collaboration QR multilingue', caption: 'Partagez les configurations QR entre les équipes dans différentes langues.' }],
    },
    {
      heading: 'Le défi',
      paragraphs: ['Votre équipe internationale doit créer des codes QR cohérents, mais les membres de l\'équipe travaillent dans des langues différentes. La recréation de configuration manuelle est sujette aux erreurs et prend du temps.'],
      images: [{ src: '/images/examples/collab-english.svg', alt: 'Le défi', caption: 'Votre équipe internationale doit créer des codes QR cohérents, mais les membres de l\'équipe travaillent dans des langues différentes. La recréation de configuration manuelle est sujette aux erreurs et prend du temps.' }],
    },
    {
      heading: 'La solution',
      paragraphs: ['Les liens de partage d\'ANQR encodent tous les paramètres de l\'URL. Les membres de l\'équipe peuvent ouvrir le même lien dans leur langue préférée : la configuration QR se charge de manière identique, mais l\'interface s\'affiche dans leur langue locale.'],
      images: [{ src: '/images/examples/collab-japanese.svg', alt: 'La solution', caption: 'Les liens de partage d\'ANQR encodent tous les paramètres de l\'URL. Les membres de l\'équipe peuvent ouvrir le même lien dans leur langue préférée : la configuration QR se charge de manière identique, mais l\'interface s\'affiche dans leur langue locale.' }],
    },
    {
      heading: 'Comment ça marche',
      paragraphs: ['1. Configurez votre code QR dans ANQR. 2. Cliquez sur Partager pour générer un lien. 3. Envoyez le lien à votre collègue. 4. Ils l\'ouvrent – ​​ANQR charge vos paramètres exacts. 5. Ils peuvent changer la langue de leur interface sans affecter la configuration QR. 6. Les deux membres de l\'équipe exportent des codes QR identiques.'],
    },
    {
      heading: 'Paramètre de langue',
      paragraphs: ['Les liens de partage ANQR incluent un paramètre « lang » pour la langue de l\'interface, mais les paramètres de contenu et de style QR sont indépendants de la langue. La modification du paramètre lang modifie les menus et les étiquettes, pas le code QR lui-même.', 'Flux de travail collaboratif'],
      links: [
        { href: '/?lang=${lang}&tab=professional#share', label: 'Recréer dans le générateur', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Parcourir les articles Apprendre', type: 'learn' },
      ],
    },
  ],
  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Parcourir les articles Apprendre', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Ouvrez le guide de l\'utilisateur complet', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: 'Voir des exemples de QR', type: 'gallery' },
  ],
};

export default examples;
