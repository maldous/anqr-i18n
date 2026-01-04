import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /learn page with 5 comprehensive guides
// All string values are numeric ids that map to lines in en-GB.txt.
export const learn: PageDefinition = {
  title: 'Apprendre avec ANQR',
  description: 'Guides pratiques pour améliorer les campagnes QR, les paiements, le marketing et le partage multilingue.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Ouvrez le générateur', type: 'generator' },
    { href: '/guide?lang=${lang}', label: 'Ouvrez le guide de l\'utilisateur complet', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'Voir des exemples de QR', type: 'example' },
  ],
  sections: [
    // Guide 1: Improving Existing QR Campaigns (685-700)
    {
      heading: 'Améliorer les campagnes QR existantes',
      paragraphs: ['Comment auditer, mettre à niveau et remplacer en toute sécurité les codes QR existants sans interrompre le parcours des utilisateurs.'],
      images: [{ src: '/images/learn/campaign-overview.svg', alt: 'Améliorer les campagnes QR existantes', caption: 'Comment auditer, mettre à niveau et remplacer en toute sécurité les codes QR existants sans interrompre le parcours des utilisateurs.' }],
    },
    {
      heading: 'Pourquoi mettre à niveau les codes QR existants ?',
      paragraphs: ['De nombreuses entreprises ont déjà des codes QR en circulation – sur les emballages, la signalisation, les documents imprimés ou les produits. Ces codes utilisent souvent des conceptions de base sans marque, avec une mauvaise correction des erreurs ou des zones de silence inadéquates. Leur mise à niveau peut améliorer la fiabilité de l\'analyse, la reconnaissance de la marque et le suivi des campagnes sans modifier l\'URL de destination.'],
    },
    {
      heading: 'Audit de vos codes QR actuels',
      paragraphs: ['Avant de remplacer un code QR, vérifiez ce que vous avez. Scannez chaque code avec plusieurs applications (appareil photo iOS, Google Lens, scanners QR dédiés) pour vérifier qu\'ils fonctionnent. Notez le contenu encodé, la taille d\'impression, l\'emplacement et tout problème de numérisation. Documentez quels codes se trouvent sur les matériaux permanents (panneaux gravés, emballages de produits) par rapport aux codes temporaires (affiches, dépliants).'],
      images: [
        { src: '/images/learn/campaign-before.svg', alt: 'Audit de vos codes QR actuels', caption: 'Avant de remplacer un code QR, vérifiez ce que vous avez. Scannez chaque code avec plusieurs applications (appareil photo iOS, Google Lens, scanners QR dédiés) pour vérifier qu\'ils fonctionnent. Notez le contenu encodé, la taille d\'impression, l\'emplacement et tout problème de numérisation. Documentez quels codes se trouvent sur les matériaux permanents (panneaux gravés, emballages de produits) par rapport aux codes temporaires (affiches, dépliants).' },
        { src: '/images/learn/campaign-after.svg', alt: 'Audit de vos codes QR actuels', caption: 'Avant de remplacer un code QR, vérifiez ce que vous avez. Scannez chaque code avec plusieurs applications (appareil photo iOS, Google Lens, scanners QR dédiés) pour vérifier qu\'ils fonctionnent. Notez le contenu encodé, la taille d\'impression, l\'emplacement et tout problème de numérisation. Documentez quels codes se trouvent sur les matériaux permanents (panneaux gravés, emballages de produits) par rapport aux codes temporaires (affiches, dépliants).' },
      ],
    },
    {
      heading: 'Stratégie de remplacement sûre',
      paragraphs: ['Pour les codes sur des matériaux permanents, envisagez d\'utiliser un service de raccourcissement d\'URL ou de redirection afin de pouvoir modifier la destination sans réimprimer. Pour les matériaux temporaires, vous pouvez les remplacer en toute sécurité par des conceptions améliorées. Testez toujours le nouveau code à la taille d\'impression réelle avant la production en série.'],
    },
    {
      heading: 'Ajouter une marque en toute sécurité',
      paragraphs: ['ANQR vous permet d\'ajouter des logos et des couleurs de marque tout en conservant la numérisation. Utilisez la correction d\'erreur H (élevée) lors de l\'ajout de superpositions : cela fournit une redondance de 30 %. Activez « Préserver les modèles du Finder » pour conserver les carrés de coin intacts. Commencez avec une faible intensité de superposition (50 à 70 %) et testez minutieusement.'],
    },
    {
      heading: 'Considérations imprimées ou numériques',
      paragraphs: ['L\'impression des codes QR nécessite une résolution plus élevée (300+ DPI) et des zones silencieuses plus grandes pour tenir compte de la texture du papier et de la distance de visualisation. Les codes QR numériques sur les écrans peuvent être plus petits mais doivent tenir compte de l\'éblouissement de l\'écran et des taux de rafraîchissement. Le mode de sécurité d\'ANQR permet d\'appliquer des tailles minimales pour les deux contextes.'],
    },
    {
      heading: 'Tester vos codes mis à niveau',
      paragraphs: ['Testez toujours avec : (1) plusieurs applications de scanner, (2) différentes conditions d\'éclairage, (3) différentes distances, (4) le matériau d\'impression ou le type d\'écran réel. La validation intégrée d\'ANQR analyse le code généré pour vérifier qu\'il décode correctement.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#overlay', label: 'Ouvrez les paramètres recommandés par ce guide dans le générateur ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Voir les guides et exemples associés', type: 'example' },
      ],
    },

    // Guide 2: QR Codes for Retail Payments (701-714)
    {
      heading: 'Codes QR pour les paiements de détail',
      paragraphs: ['Concevez des codes QR de paiement rapides à scanner, adaptés à la marque et compatibles avec les principaux portefeuilles.'],
      images: [{ src: '/images/learn/retail-payment-overview.svg', alt: 'Codes QR pour les paiements de détail', caption: 'Concevez des codes QR de paiement rapides à scanner, adaptés à la marque et compatibles avec les principaux portefeuilles.' }],
    },
    {
      heading: 'Exigences QR de paiement',
      paragraphs: ['Les codes QR de paiement ont des exigences plus strictes que les codes marketing. Ils doivent scanner rapidement (les clients attendent), travailler avec des applications de portefeuille spécifiques et respecter les normes de conformité. La plupart des normes de paiement (UPI, PayNow, SEPA) spécifient les formats d\'encodage exacts pris en charge par ANQR.'],
    },
    {
      heading: 'Dimensionnement pour point de vente',
      paragraphs: ['Les écrans de comptoir nécessitent des codes d\'au moins 3 cm (1,2 pouces) carrés pour une lecture manuelle à une distance de 15 à 30 cm. Les codes muraux pour l\'analyse des files d\'attente doivent mesurer 8 à 15 cm (3 à 6 pouces) pour une distance de 0,5 à 2 m. Le mode de sécurité d\'ANQR impose des tailles de module minimales adaptées aux contextes de paiement.'],
      images: [{ src: '/images/learn/retail-sizing.svg', alt: 'Dimensionnement pour point de vente', caption: 'Les écrans de comptoir nécessitent des codes d\'au moins 3 cm (1,2 pouces) carrés pour une lecture manuelle à une distance de 15 à 30 cm. Les codes muraux pour l\'analyse des files d\'attente doivent mesurer 8 à 15 cm (3 à 6 pouces) pour une distance de 0,5 à 2 m. Le mode de sécurité d\'ANQR impose des tailles de module minimales adaptées aux contextes de paiement.' }],
    },
    {
      heading: 'Une image de marque conforme',
      paragraphs: ['Les codes QR de paiement peuvent inclure la marque du commerçant, mais avec des contraintes. Gardez les logos petits (moins de 20 % de la zone de code), maintenez un contraste élevé et ne modifiez jamais les modèles de recherche. Utilisez la correction d\'erreur H et testez avec les applications de paiement réelles utilisées par vos clients (Google Pay, Apple Wallet, applications bancaires).'],
    },
    {
      heading: 'Matériel d\'affichage PLV',
      paragraphs: ['Les écrans laminés résistent aux empreintes digitales mais peuvent provoquer des éblouissements. Les finitions mates numérisent mieux dans les environnements lumineux. Les supports inclinés (15-30°) réduisent les reflets. Tenez compte des facteurs environnementaux : les points de paiement extérieurs doivent être protégés contre les intempéries et peuvent nécessiter des codes plus grands pour un éclairage variable.'],
    },
    {
      heading: 'Normes de paiement régionales',
      paragraphs: ['ANQR prend en charge les formats de paiement régionaux : UPI/BharatQR (Inde), PayNow (Singapour), PromptPay (Thaïlande), PIX (Brésil), SEPA/EPC (Europe), etc. Chacun a des exigences de terrain spécifiques : utilisez les modèles de paiement de l\'ANQR pour garantir la conformité.'],
    },
    {
      heading: 'Tester les codes de paiement',
      paragraphs: ['Testez avec de véritables applications de paiement, pas seulement avec des scanners QR génériques. Vérifiez que le montant du paiement, les détails du destinataire et les champs de référence sont correctement analysés. Testez dans l\'environnement d\'installation réel avec des conditions d\'éclairage réelles.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#payload', label: 'Ouvrez les paramètres recommandés par ce guide dans le générateur ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Voir les guides et exemples associés', type: 'example' },
      ],
    },

    // Guide 3: Print-Ready QR Codes: SVG vs PNG (715-728)
    {
      heading: 'Codes QR prêts à imprimer : SVG vs PNG',
      paragraphs: ['Pourquoi les formats vectoriels sont importants pour l\'impression et comment exporter des codes QR parfaitement évolutifs.'],
      images: [{ src: '/images/learn/print-svg-overview.svg', alt: 'Codes QR prêts à imprimer : SVG vs PNG', caption: 'Pourquoi les formats vectoriels sont importants pour l\'impression et comment exporter des codes QR parfaitement évolutifs.' }],
    },
    {
      heading: 'Pourquoi SVG pour l\'impression ?',
      paragraphs: ['Les fichiers SVG (Scalable Vector Graphics) contiennent des descriptions mathématiques de formes, pas de pixels. Cela signifie qu\'ils évoluent à l\'infini sans perte de qualité. Un code QR exporté au format SVG à 100 px s\'imprimera parfaitement au format affiche, tandis qu\'un PNG de même taille serait flou ou pixelisé.'],
    },
    {
      heading: 'Quand PNG est acceptable',
      paragraphs: ['PNG fonctionne correctement lorsque : (1) vous exportez à la résolution d\'impression finale (par exemple, 300 DPI × taille physique), (2) le code ne sera pas mis à l\'échelle, (3) vous utilisez des écrans numériques à des résolutions connues. Pour plus de flexibilité et de pérennité, SVG est toujours préféré.'],
      images: [
        { src: '/images/learn/print-png-pixelated.svg', alt: 'Quand PNG est acceptable', caption: 'PNG fonctionne correctement lorsque : (1) vous exportez à la résolution d\'impression finale (par exemple, 300 DPI × taille physique), (2) le code ne sera pas mis à l\'échelle, (3) vous utilisez des écrans numériques à des résolutions connues. Pour plus de flexibilité et de pérennité, SVG est toujours préféré.' },
        { src: '/images/learn/print-svg-crisp.svg', alt: 'Quand PNG est acceptable', caption: 'PNG fonctionne correctement lorsque : (1) vous exportez à la résolution d\'impression finale (par exemple, 300 DPI × taille physique), (2) le code ne sera pas mis à l\'échelle, (3) vous utilisez des écrans numériques à des résolutions connues. Pour plus de flexibilité et de pérennité, SVG est toujours préféré.' },
      ],
    },
    {
      heading: 'Options d\'exportation SVG ANQR',
      paragraphs: ['ANQR propose deux modes SVG : « True Vector » crée un SVG pur basé sur un chemin qui s\'adapte parfaitement et peut être modifié dans Illustrator/Inkscape. « Raster Embed » inclut n\'importe quelle image de superposition sous forme de bitmap intégré - utile lorsque vous avez besoin de superpositions mais que vous souhaitez toujours des formes de modules vectoriels.'],
    },
    {
      heading: 'Intégration du flux de travail d\'impression',
      paragraphs: ['Exportez le SVG depuis ANQR, puis importez-le dans votre logiciel de conception (InDesign, Illustrator, Canva Pro). Placez le code QR à la taille d\'impression finale et vérifiez que la zone silencieuse est préservée. La plupart des imprimeries préfèrent la livraison au format PDF : votre logiciel de conception peut intégrer le SVG dans le PDF final.'],
    },
    {
      heading: 'Paramètres de résolution et DPI',
      paragraphs: ['Pour l\'export PNG destiné à l\'impression : multipliez votre taille physique par DPI. Un code de 2 pouces à 300 DPI nécessite 600 × 600 px. Le paramètre DPI d\'ANQR intègre ces métadonnées pour les logiciels d\'impression. Pour les écrans, 72-96 DPI est la norme.'],
    },
    {
      heading: 'Éviter les erreurs d\'impression courantes',
      paragraphs: ['À ne pas faire : augmentez les exportations basse résolution, compressez les images QR au format JPEG (numérisation des artefacts), placez les codes dans les zones de pliage/coupe ou réduisez les zones silencieuses pour s\'adapter aux mises en page. À faire : exporter à la taille cible, utiliser des formats sans perte, tester des échantillons d\'impression réels.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#output', label: 'Ouvrez les paramètres recommandés par ce guide dans le générateur ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Voir les guides et exemples associés', type: 'example' },
      ],
    },

    // Guide 4: Animated QR Codes for Digital Signage (729-742)
    {
      heading: 'Codes QR animés pour l\'affichage numérique',
      paragraphs: ['Quand et comment utiliser des codes QR animés sur les écrans tout en les gardant numérisables.'],
      images: [{ src: '/images/learn/animation-overview.svg', alt: 'Codes QR animés pour l\'affichage numérique', caption: 'Quand et comment utiliser des codes QR animés sur les écrans tout en les gardant numérisables.' }],
    },
    {
      heading: 'Quand l\'animation aide',
      paragraphs: ['L\'animation attire l\'attention sur les écrans numériques très fréquentés où le contenu statique est ignoré. Des animations subtiles (impulsion douce, changement de couleur) attirent le regard sans perturber la numérisation. L\'animation fonctionne mieux pour : les écrans de vente au détail, les affichages d\'événements, les kiosques interactifs et le contenu des médias sociaux.'],
    },
    {
      heading: 'Quand l\'animation fait mal',
      paragraphs: ['Évitez les animations pour : les codes QR de paiement (la vitesse compte), les codes visualisés brièvement (annonces de transports en commun), les codes sur les écrans avec de mauvais taux de rafraîchissement ou lorsque l\'environnement comporte de nombreux visuels concurrents. En cas de doute, testez l\'animation ou la statique avec votre public cible.'],
      images: [
        { src: '/images/learn/animation-static.svg', alt: 'Quand l\'animation fait mal', caption: 'Évitez les animations pour : les codes QR de paiement (la vitesse compte), les codes visualisés brièvement (annonces de transports en commun), les codes sur les écrans avec de mauvais taux de rafraîchissement ou lorsque l\'environnement comporte de nombreux visuels concurrents. En cas de doute, testez l\'animation ou la statique avec votre public cible.' },
        { src: '/images/learn/animation-animated.svg', alt: 'Quand l\'animation fait mal', caption: 'Évitez les animations pour : les codes QR de paiement (la vitesse compte), les codes visualisés brièvement (annonces de transports en commun), les codes sur les écrans avec de mauvais taux de rafraîchissement ou lorsque l\'environnement comporte de nombreux visuels concurrents. En cas de doute, testez l\'animation ou la statique avec votre public cible.' },
      ],
    },
    {
      heading: 'Paramètres d\'animation sécurisés',
      paragraphs: ['Pour une numérisation fiable : maintenez une vitesse d\'animation lente (200 ms ou plus par image), évitez les clignotements rapides, maintenez un contraste constant tout au long de l\'animation et assurez-vous que chaque image est numérisée indépendamment. Le tramage temporel « Flicker Safe » d\'ANQR aide à prévenir les effets stroboscopiques.'],
    },
    {
      heading: 'Styles d\'animation recommandés',
      paragraphs: ['Impulsion : une légère oscillation de taille attire l\'attention sans interrompre le balayage. Vague : les motifs fluides ajoutent du mouvement tout en gardant la structure intacte. Cycle de couleurs : les changements de teinte maintiennent le contraste tout en ajoutant un intérêt visuel. Shimmer : effets scintillants subtils sur les bords du module.'],
    },
    {
      heading: 'Considérations relatives au format',
      paragraphs: ['GIF : Support universel, limité à 256 couleurs, fichiers plus volumineux. APNG : meilleure qualité, moins de prise en charge du navigateur. Vidéo (MP4/WebM) : meilleure qualité, nécessite le contexte du lecteur vidéo. ANQR exporte GIF par défaut – testez sur votre lecteur de signalisation actuel.'],
    },
    {
      heading: 'Conseils pour le placement de l\'écran',
      paragraphs: ['Positionnez les codes QR à une hauteur de numérisation confortable (1,2 à 1,5 m pour les spectateurs debout). Évitez les bords de l\'écran où se produit une distorsion. Prévoyez un temps d\'attente adéquat : plus de 5 secondes pour que les téléspectateurs puissent le remarquer, retirer leur téléphone et scanner. Pensez à ajouter une incitation à l\'action « Scannez-moi ».'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#animation', label: 'Ouvrez les paramètres recommandés par ce guide dans le générateur ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Voir les guides et exemples associés', type: 'example' },
      ],
    },

    // Guide 5: QR Code Safety and Compliance (743-756)
    {
      heading: 'Sécurité et conformité du code QR',
      paragraphs: ['Comprendre les zones silencieuses, le contraste, la correction d\'erreurs et ce qu\'applique le mode de sécurité de l\'ANQR.'],
      images: [{ src: '/images/learn/safety-overview.svg', alt: 'Sécurité et conformité du code QR', caption: 'Comprendre les zones silencieuses, le contraste, la correction d\'erreurs et ce qu\'applique le mode de sécurité de l\'ANQR.' }],
    },
    {
      heading: 'L\'exigence d\'une zone calme',
      paragraphs: ['La zone silencieuse est la marge vierge autour de chaque code QR. Les scanners ont besoin de cet espace pour détecter les limites du code. La norme ISO 18004 recommande 4 modules minimum. Le fait de pénétrer dans la zone calme est la cause la plus courante d\'échec de numérisation. Le mode de sécurité de l\'ANQR applique ce minimum.'],
      images: [{ src: '/images/learn/safety-quiet-zone.svg', alt: 'L\'exigence d\'une zone calme', caption: 'La zone silencieuse est la marge vierge autour de chaque code QR. Les scanners ont besoin de cet espace pour détecter les limites du code. La norme ISO 18004 recommande 4 modules minimum. Le fait de pénétrer dans la zone calme est la cause la plus courante d\'échec de numérisation. Le mode de sécurité de l\'ANQR applique ce minimum.' }],
    },
    {
      heading: 'Exigences de contraste',
      paragraphs: ['Les codes QR nécessitent un contraste élevé entre le premier plan et l\'arrière-plan. La norme ISO suppose le noir sur blanc, mais toute combinaison à contraste élevé fonctionne. Évitez : les paires de couleurs peu contrastées, les dégradés qui réduisent le contraste dans les zones ou les arrière-plans qui interfèrent avec la zone calme. Contrast Guard de l\'ANQR met en garde contre les combinaisons problématiques.'],
      images: [{ src: '/images/learn/safety-contrast.svg', alt: 'Exigences de contraste', caption: 'Les codes QR nécessitent un contraste élevé entre le premier plan et l\'arrière-plan. La norme ISO suppose le noir sur blanc, mais toute combinaison à contraste élevé fonctionne. Évitez : les paires de couleurs peu contrastées, les dégradés qui réduisent le contraste dans les zones ou les arrière-plans qui interfèrent avec la zone calme. Contrast Guard de l\'ANQR met en garde contre les combinaisons problématiques.' }],
    },
    {
      heading: 'Correction d\'erreur expliquée',
      paragraphs: ['Les codes QR incluent des données redondantes pour la correction des erreurs. Le niveau L autorise 7 % de dégâts, M autorise 15 %, Q autorise 25 %, H autorise 30 %. Utilisez H (Élevé) lorsque vous ajoutez des superpositions, imprimez sur des matériaux texturés ou prévoyez une usure. Correction plus élevée = codes légèrement plus grands.'],
    },
    {
      heading: 'Ce que le mode de sécurité applique',
      paragraphs: ['Le mode de sécurité de l\'ANQR (équilibré ou strict) applique automatiquement une zone de silence minimale, avertit en cas de faible contraste, limite l\'intensité de superposition en fonction du niveau de correction d\'erreur, protège les modèles de recherche/synchronisation/alignement contre les modifications et valide correctement les analyses de code finales.'],
    },
    {
      heading: 'Limites des logos et des superpositions',
      paragraphs: ['Les superpositions couvrant plus de 30 % des modules de données risquent d\'échouer l\'analyse, même avec la correction d\'erreur H. Le mode ECC-Aware d\'ANQR répartit intelligemment l\'impact de la superposition pour rester dans les limites de sécurité. Gardez toujours les motifs de recherche (carrés de coin) complètement inchangés.'],
    },
    {
      heading: 'Conformité pour des secteurs spécifiques',
      paragraphs: ['Certains secteurs ont des exigences QR spécifiques : les systèmes de paiement imposent des formats de codage exacts, le suivi pharmaceutique nécessite la conformité GS1, les billets d\'événements peuvent nécessiter des charges utiles cryptées. ANQR prend en charge ces normes : utilisez le modèle de type de contenu approprié.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#safety', label: 'Ouvrez les paramètres recommandés par ce guide dans le générateur ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Voir les guides et exemples associés', type: 'example' },
      ],
    },
  ],
  relatedLinks: [
    { href: '/guide?lang=${lang}', label: 'Ouvrez le guide de l\'utilisateur complet', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'Voir des exemples de QR', type: 'example' },
    { href: '/gallery?lang=${lang}', label: 'Voir des exemples de QR', type: 'gallery' },
  ],
};

export default learn;
