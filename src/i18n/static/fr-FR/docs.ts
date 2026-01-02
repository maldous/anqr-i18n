import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: "« Guide de l'utilisateur ANQR »",
  description: "« Guide complet d'utilisation d'ANQR pour la création de codes QR. »",
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '« Pour commencer »',
      paragraphs: [
        "« ANQR est un générateur de codes QR conçu pour une utilisation centrée sur le client. Par défaut, les codes QR sont générés localement dans votre navigateur ; aucun compte n'est requis et vos données restent confidentielles. Pour une intégration professionnelle, vous pouvez également utiliser l'API côté serveur. »",
        "« L'interface comporte trois niveaux : Basique, Avancé et Professionnel. Sélectionnez votre niveau à l'aide des onglets de l'en-tête. Chaque niveau débloque des fonctionnalités supplémentaires tout en conservant une interface axée sur vos besoins. »",
      ],
      bullets: [
        "« Basique : Création simple de code QR avec contenu texte/URL et superposition d'image. »",
        "« Avancé : options d'encodage QR, styles de rendu, animation, formats de sortie, types de contenu étendus et personnalisation de la superposition. »",
        "« Professionnel : Filigranes, métadonnées, partage, analyse de sécurité, codes QR de paiement et fonctionnalités d'entreprise. »",
      ],
    },
    {
      heading: '« Démarrage rapide »',
      paragraphs: ['« Pour créer votre premier code QR : »'],
      bullets: [
        '« 1. Sélectionnez un type de contenu (URL, texte, Wi-Fi, etc.) dans la liste déroulante Type de contenu. »',
        '« 2. Saisissez vos données dans les champs prévus à cet effet. »',
        '« 3. Personnalisez éventuellement les couleurs, les styles et ajoutez une image de superposition. »',
        '« 4. Cliquez sur Exporter pour télécharger votre code QR au format PNG, GIF, WebP ou SVG. »',
      ],
    },
    {
      heading: '« Fonctionnalités de base »',
      paragraphs: [
        "« Le niveau de base offre une interface simplifiée pour la création de codes QR avec du contenu et des superpositions d'images. C'est la façon la plus simple de commencer. »",
      ],
    },
    {
      heading: '« Types de contenu (de base) »',
      paragraphs: [
        "« Texte brut : Encodez n'importe quel texte jusqu'à la limite de capacité du code QR. Idéal pour les messages courts, les codes ou les identifiants. »",
        "« URL : Encode les adresses web. Le code QR ouvrira l'URL une fois scanné. Prend en charge les protocoles http:// et https://. »",
      ],
    },
    {
      heading: "« Superposition d'image (basique) »",
      paragraphs: [
        '« Téléchargez une image (JPG, PNG, GIF, WebP) à fusionner avec votre code QR. Les fonctionnalités de superposition de base incluent : »',
      ],
      bullets: [
        "« Télécharger à partir d'un fichier : sélectionnez une image sur votre appareil. »",
        "« Charger à partir d'une URL : Entrez une URL d'image (doit autoriser CORS). »",
        "« Logo centré : Place l'image au centre, en s'appuyant sur la correction des erreurs. »",
        "« Mélange : Fusion alpha simple d'une image avec un motif QR. »",
        "« Intensité : Contrôle l'intensité avec laquelle la superposition affecte le code QR (0-100 %). »",
        '« Mode couleur : Couleur, Niveaux de gris ou Noir et blanc. »',
        "« Préserver les motifs de repérage : Conserve les motifs d'angle intacts pour une numérisation fiable. »",
      ],
    },
    {
      heading: '« Fonctionnalités avancées »',
      paragraphs: [
        "« Le niveau avancé débloque les options d'encodage QR, les styles de rendu, l'animation, les formats de sortie, les types de contenu étendus et la personnalisation avancée de la superposition. »",
      ],
    },
    {
      heading: "« Paramètres d'encodage QR »",
      paragraphs: [
        '« Version : Les codes QR existent en versions 1 à 40, les versions supérieures contenant plus de données mais étant plus volumineuses. Réglez sur 0 (Auto) pour laisser ANQR choisir la version la plus petite adaptée à votre contenu. »',
        "« Correction d'erreur : Détermine le niveau de dommages qu'un code QR peut subir tout en restant scannable. »",
      ],
      bullets: [
        "« L (Faible) : correction d'erreur de 7 % - taille minimale, redondance minimale. »",
        "« M (Moyen) : correction d'erreur de 15 % - option équilibrée. »",
        "« Q (Quartile) : correction d'erreur de 25 % - convient aux codes imprimés. »",
        "« H (Élevé) : Correction d'erreur de 30 % - idéal pour les codes avec superpositions ou dans des conditions difficiles. »",
      ],
    },
    {
      heading: '« Zone calme (marge) »',
      paragraphs: [
        "« La zone de silence est l'espace blanc autour du code QR. Les scanners ont besoin de cette marge pour détecter le début du code. La norme recommande au moins 4 modules. Une réduction en dessous de 4 peut entraîner des problèmes de lecture. »",
      ],
    },
    {
      heading: '« Style modulaire »',
      paragraphs: [
        '« Les modules sont les carrés individuels qui composent un code QR. ANQR propose cinq styles : »',
      ],
      bullets: [
        '« Carré : Apparence QR classique avec des angles vifs. »',
        '« Arrondis : Coins adoucis pour un aspect plus convivial. »',
        '« Points : Modules circulaires pour une esthétique moderne. »',
        '« Diamant : carrés pivotés à 45° pour un motif distinctif. »',
        "« Connectés : les modules fusionnent lorsqu'ils sont adjacents, créant des formes organiques. »",
      ],
    },
    {
      heading: '« Style de motif Finder »',
      paragraphs: [
        '« Les motifs de repérage sont les trois grands carrés situés aux coins du code QR qui aident les scanners à orienter le code. Styles disponibles : »',
      ],
      bullets: [
        '« Carré : Coins carrés standard. »',
        '« Arrondi : Coins adoucis correspondant au style du module arrondi. »',
        '« Cercle : Modèles de recherche circulaires pour les codes de type point. »',
      ],
    },
    {
      heading: "« Modèles d'alignement et de synchronisation »",
      paragraphs: [
        "« Des motifs d'alignement apparaissent dans les codes QR plus grands (version 2 et suivantes) pour aider à corriger la distorsion. Les motifs de synchronisation sont les lignes alternées reliant les motifs de repérage. »",
      ],
      bullets: [
        "« Style d'alignement : Match Finder, Carré, Arrondi ou Cercle. »",
        '« Style de synchronisation : Module correspondant, continu ou pointillé. »',
      ],
    },
    {
      heading: '« Couleurs »',
      paragraphs: [
        "« Premier plan : la couleur des modules QR. Le noir (#000000) est la norme, mais n'importe quelle couleur foncée convient. »",
        "« Arrière-plan : La couleur d'arrière-plan. Le blanc (#ffffff) est la norme. Assurez-vous d'un contraste suffisant avec le premier plan. »",
        '« Fond transparent : Supprimez entièrement le fond pour une utilisation sur des surfaces colorées. Assurez-vous que la surface offre un contraste suffisant. »',
      ],
    },
    {
      heading: '« Taille et espacement des modules »',
      paragraphs: [
        '« Taille du module : contrôle la taille de chaque module rendu en pixels. Des valeurs plus élevées créent des codes plus grands et plus faciles à scanner. »',
        "« Espacement des modules : Ajoute un pourcentage d'espace entre les modules. De petits espaces (5 à 15 %) peuvent améliorer la lisibilité dans certaines conditions, mais des espaces excessifs réduisent la fiabilité. »",
      ],
    },
    {
      heading: '« Paramètres de sortie »',
      paragraphs: [
        "« Format : Choisissez votre format d'exportation en fonction du cas d'utilisation. »",
      ],
      bullets: [
        "« PNG : Format raster sans perte, idéal pour la plupart des utilisations. Meilleur pour l'impression et le numérique. »",
        '« WebP : Format moderne avec des fichiers plus petits. Idéal pour une utilisation sur le Web. »',
        '« GIF : Requis pour les codes QR animés. Prend en charge la transparence. »',
        "« SVG : Format vectoriel à mise à l'échelle infinie. Idéal pour les gros caractères ou lorsque vous devez modifier le code. »",
      ],
    },
    {
      heading: '« Dimensions de sortie »',
      paragraphs: [
        "« Largeur/Hauteur : Définissez la taille de sortie en pixels. Pour l'impression, calculez en fonction du DPI (par exemple, 300 DPI à 1 pouce = 300 px). Les grandes tailles sont numérisées de manière plus fiable à distance. »",
      ],
    },
    {
      heading: "« Paramètres d'animation (avancés) »",
      paragraphs: ['« Contrôler le comportement des codes QR animés : »'],
      bullets: [
        "« Vitesse : Fréquence d'images de l'animation en millisecondes. »",
        '« Boucle : Animation continue ou à lecture unique. »',
        "« Rebond : Direction d'animation de ping-pong. »",
        "« Image de départ : Démarrer l'animation à partir d'une image spécifique. »",
        "« Nombre maximal d'images : Limiter le nombre total d'images dans l'animation. »",
        "« Étape d'images : Sauter des images pour une animation plus rapide. »",
        '« Interpolation : Aucune, Fondu enchaîné ou Morphing entre les images. »',
      ],
    },
    {
      heading: '« Types de contenu (avancés) »',
      paragraphs: ['« Le niveau avancé débloque des formats de charge utile supplémentaires : »'],
      bullets: [
        '« Numéro de téléphone (tel:) : Crée un lien téléphonique appelable. »',
        '« Email (mailto:): Ouvre le client de messagerie avec sujet et corps facultatifs. »',
        '« SMS : Message texte prérempli envoyé à un numéro de téléphone. »',
        '« vCard : Carte de contact complète avec nom, organisation, téléphone, courriel, adresse. »',
        '« MeCard : Format de carte de visite compact populaire au Japon. »',
        '« BizCard : Format de carte de visite traditionnel. »',
        "« Géolocalisation : coordonnées GPS qui s'ouvrent dans les cartes. »",
        '« WiFi : Identifiants réseau pour la connexion automatique (SSID, mot de passe, type de sécurité) ».',
        '« Événement du calendrier : format iCalendar avec titre, lieu, date/heure. »',
        "« RSVP à l'événement : Lien vers la page d'inscription à l'événement. »",
        '« Abonnement au calendrier : Abonnez-vous à un flux ICS/WebCal. »',
        '« URL du fichier/document : Lien direct vers les fichiers téléchargeables. »',
        '« Lien de stockage cloud : Liens vers Google Drive, Dropbox, OneDrive, etc. »',
        '« Profil social : Liens vers LinkedIn, Twitter, Instagram, etc. »',
        '« Lien de messagerie : liens profonds WhatsApp, Telegram, Signal. »',
      ],
    },
    {
      heading: '« Fonctionnalités de superposition avancées »',
      paragraphs: ['« Fonctionnalités de superposition supplémentaires : »'],
      bullets: [
        '« Recadrer : Activez le recadrage pour sélectionner une zone carrée de votre image. »',
        "« Demi-teinte : motif de points classique de style impression basé sur la luminosité de l'image. »",
        "« Dithered : Dithering par diffusion d'erreur pour une reproduction détaillée. »",
      ],
    },
    {
      heading: '« Modes de fusion de superposition (avancés) »',
      paragraphs: ['« Modes de fusion supplémentaires en niveau avancé : »'],
      bullets: [
        '« Sous-pixel : Divise chaque module en sous-pixels pour un niveau de détail plus élevé. »',
        '« Bruit bleu : utilise le tramage de bruit bleu pour des motifs sans artefacts. »',
        "« Mosaïque : Effet à base de tuiles préservant la structure de l'image. »",
        "« Remplissage des espaces : Place l'image dans les espaces entre les modules. »",
        "« Luminosité : La taille du module varie en fonction de la luminosité de l'image. »",
        "« Duotone : Associe l'image à deux couleurs pour un contraste saisissant. »",
      ],
    },
    {
      heading: '« Intensité de superposition »',
      paragraphs: [
        "« Contrôle l'intensité de l'effet de superposition sur le code QR (0-100 %). Des valeurs plus élevées affichent plus de détails dans l'image, mais peuvent réduire la lisibilité. Commencez autour de 70 % et ajustez en fonction des tests. »",
      ],
    },
    {
      heading: '« Mode couleur »',
      paragraphs: ["« Comment l'image superposée est traitée : »"],
      bullets: [
        "« Couleurs vives : préserve les couleurs originales de l'image. »",
        '« Niveaux de gris : Convertit en tons noirs et blancs. »',
        '« Noir et blanc : Conversion binaire à contraste élevé. »',
      ],
    },
    {
      heading: '« Préserver les modèles de recherche »',
      paragraphs: [
        "« Lorsqu'elle est activée, cette fonction préserve l'intégrité des trois motifs de repérage des coins malgré la superposition. Fortement recommandée pour une numérisation fiable. »",
      ],
    },
    {
      heading: "« Prétraitement d'image »",
      paragraphs: [
        "« Appliquez des filtres à votre image de superposition avant de la fusionner. Ces ajustements peuvent améliorer l'apparence de l'image dans le code QR final. »",
      ],
      bullets: [
        "« Luminosité (-100 à +100) : Éclaircir ou assombrir l'image. »",
        '« Contraste (-100 à +100) : Augmenter ou diminuer la gamme tonale. »',
        '« Gamma (0,2 à 3,0) : Réglage non linéaire de la luminosité. Les valeurs inférieures à 1 éclaircissent les tons moyens, les valeurs supérieures à 1 les assombrissent. »',
        "« Saturation (-100 à +100) : Intensité de la couleur. -100 correspond à l'échelle de gris, +100 à la sursaturation. »",
        '« Rotation de la teinte (0-360°) : Déplacer toutes les couleurs sur le cercle chromatique. »',
        "« Flou (0-20px) : Adoucir les détails de l'image. »",
        '« Affûter (0-100%) : Améliorer les bords et les détails. »',
        "« Posterize (0-16 niveaux) : Réduisez les niveaux de couleur pour un effet d'affiche. »",
        '« Seuil (0-255) : Convertir en binaire noir/blanc au point de coupure. »',
        '« Détection des contours : algorithmes de Sobel ou de Canny pour ne montrer que les contours. »',
        '« Inverser : Inverser toutes les couleurs. »',
      ],
    },
    {
      heading: '« Mode Forme »',
      paragraphs: ["« Comment l'image superposée s'adapte à la zone du code QR : »"],
      bullets: [
        "« Couverture : L'image remplit toute la zone, recadrage si nécessaire. »",
        '« Contient : Image entière visible, peut avoir des marges. »',
        "« Étirement : L'image se déforme pour remplir exactement. »",
      ],
    },
    {
      heading: '« Options de transformation »',
      paragraphs: [
        '« Rotation : Faire pivoter la superposition par incréments de 90°. »',
        "« Retourner X/Y : Inverser l'image horizontalement ou verticalement. »",
      ],
    },
    {
      heading: '« Algorithmes de tramage »',
      paragraphs: [
        "« Le tramage convertit les images à tons continus en motifs que les codes QR peuvent représenter. Disponible lors de l'utilisation des modes de fusion Tramage, Bruit bleu ou Tramage réel. »",
      ],
      bullets: [
        "« Diffusion d'erreur : style Floyd-Steinberg classique. Propage l'erreur de quantification aux pixels voisins. »",
        '« Ordonné (Bayer) : Utilise une matrice de seuil pour les motifs réguliers. »',
        "« Point groupé : simule l'impression en demi-teintes. »",
        '« Void & Cluster : tramage ordonné optimisé. »',
        '« Bruit bleu : motif aléatoire visuellement agréable. »',
        '« Seuil de bruit bleu : Dithering de seuil avec texture de bruit bleu. »',
        '« Bruit blanc : Dithering de seuil aléatoire. »',
        '« Bruit gaussien/triangulaire : bruit avec différentes distributions. »',
        "« Bruit bleu + Diffusion d'erreur : Hybride combinant les deux techniques. »",
        '« Bruit bleu filtré : motif de bruit bleu semblable à un écran. »',
        '« Perceptuel : Pondération de la luminance pour de meilleurs résultats visuels. »',
        "« Détection des bords : préserve les bords de l'image pendant le tramage. »",
        '« Seuil adaptatif : seuillage adaptatif local. »',
        '« Bruit bleu temporel : pour les GIF animés, motif variable par image. »',
      ],
    },
    {
      heading: '« Noyaux de diffusion »',
      paragraphs: [
        "« Lorsque vous utilisez le tramage par diffusion d'erreur, choisissez comment l'erreur est distribuée : »",
      ],
      bullets: [
        '« Floyd-Steinberg : Diffusion classique à 4 voisins. Bon choix général. »',
        '« Jarvis-Judice-Ninke : 12 voisins, plus doux mais plus lent. »',
        '«Stucki : Similaire à JJN avec des poids différents.»',
        '« Burkes : JJN simplifié, plus rapide. »',
        '« Sierra : une famille de grains alliant qualité et rapidité. »',
        '« Atkinson : Diffusion de la lumière, préserve les détails mais peut être granuleux. »',
      ],
    },
    {
      heading: "« Force de l'hésitation »",
      paragraphs: [
        "« Contrôle le niveau de tramage appliqué (0-100 %). Les valeurs les plus basses préservent davantage le motif d'origine, les valeurs les plus élevées affichent plus de détails dans l'image. »",
      ],
    },
    {
      heading: '« Paramètres de sous-pixel »',
      paragraphs: ["« Lors de l'utilisation du mode de fusion Subpixel : »"],
      bullets: [
        '« Taille de la grille : 2×2, 3×3 ou 4×4 sous-pixels par module. Plus la valeur est élevée, plus le niveau de détail est important. »',
        '« Règle du centre : Le mode strict exige que le sous-pixel central corresponde au module. Le mode demi-teinte autorise une variation. »',
        '« Couleur neutre : Couleur utilisée pour les sous-pixels indéterminés. »',
        '« Remplacement du chercheur : Comment les motifs du chercheur sont rendus (solide ou stylisé) ».',
      ],
    },
    {
      heading: '« Réglages de demi-teintes »',
      paragraphs: ["« Lors de l'utilisation du mode de fusion Demi-teintes : »"],
      bullets: [
        '« Taille de la cellule : par module ou grille N×N. »',
        '« Forme du point : cercle, carré ou ligne. »',
        '« Courbe de luminosité : linéaire, en S ou gamma. »',
      ],
    },
    {
      heading: '« Couleurs bicolores »',
      paragraphs: [
        "« Lorsque vous utilisez le mode de fusion Duotone, définissez la couleur de l'ombre (zones sombres) et la couleur de la lumière (zones claires). »",
      ],
    },
    {
      heading: "« Paramètres d'animation GIF »",
      paragraphs: ["« Lors de l'utilisation de superpositions GIF animées : »"],
      bullets: [
        "« Utilisez des délais d'images : respectez le timing original du GIF. »",
        "« FPS max : Limiter la fréquence d'images (1-60 fps). »",
        "« Gestion des déchets : Respectez ou simplifiez les méthodes d'élimination des cadres. »",
      ],
    },
    {
      heading: '« Options de rendu avancées »',
      paragraphs: ['« Commandes de rendu supplémentaires : »'],
      bullets: [
        "« Mode d'espacement : Aucun, Insertion, Contour ou Style d'espacement négatif. »",
        '« Rayon des coins : Pourcentage de coins arrondis pour les modules. »',
        '« Dégradé : Aucun, gradient linéaire, radial ou conique sur les modules. »',
        "« Style extérieur/intérieur de l'œil : Style indépendant pour les anneaux de motif de chercheur. »",
        '« Rotation des points : Faire pivoter les modules diamant/point. »',
        '« Échelle oculaire : Réglage de la taille des motifs de visée. »',
        '« Style de cadre : Ajouter des cadres décoratifs (cadre arrondi, autocollant, étiquette) ».',
        '« Texte du cadre : Ajoutez du texte comme « Scannez-moi ! » aux cadres. »',
      ],
    },
    {
      heading: '« Encodage QR avancé »',
      paragraphs: ["« Réglage fin de l'encodage QR : »"],
      bullets: [
        "« Mode d'encodage : Auto, Numérique, Alphanumérique, Octet/UTF-8 ou Kanji. »",
        "« Appliquer la zone de silence minimale : assurer une marge d'au moins 4 modules. »",
      ],
    },
    {
      heading: '« Options de sortie avancées »',
      paragraphs: ["« Paramètres d'exportation supplémentaires : »"],
      bullets: [
        '« Nom de fichier : Nom de fichier personnalisé pour les téléchargements. »',
        '« Taille de la palette GIF : 2 à 256 couleurs dans la sortie GIF. »',
        '« Quantificateur GIF : Median Cut, NeuQuant ou réduction de couleur Octree. »',
        '« Dithering GIF : Désactivé, Floyd-Steinberg ou Commandé. »',
        '« GIF Couleur transparente : Définir une couleur comme transparente. »',
        "« SVG True Vector : Utilisez des tracés au lieu d'un raster intégré. »",
        '« Précision de la forme SVG : rendu pixel ou tracé précis. »',
        "« Superposition raster SVG intégrée : Inclure la superposition en tant qu'image intégrée. »",
        "« Remplacement de l'arrière-plan : forcer une couleur d'arrière-plan spécifique dans la sortie. »",
      ],
    },
    {
      heading: '« Options de validation »',
      paragraphs: ['« Paramètres de traitement des entrées : »'],
      bullets: [
        "« Valider l'entrée : vérifiez le format du contenu avant l'encodage. »",
        '« Supprimer les espaces blancs : Supprimer les espaces de début/fin. »',
        '« Normaliser les sauts de ligne : Convertir toutes les fins de ligne en LF. »',
        '« Protection contre la longueur maximale : avertit si le contenu dépasse la capacité du QR code. »',
      ],
    },
    {
      heading: '« Fonctionnalités professionnelles »',
      paragraphs: [
        "« Le niveau professionnel ajoute des filigranes, des métadonnées, des options de partage, une analyse de sécurité, des codes QR de paiement et des fonctionnalités d'entreprise. »",
      ],
    },
    {
      heading: '« Filigrane »',
      paragraphs: ['« Ajoutez des filigranes à vos codes QR : »'],
      bullets: [
        '« Type : filigrane texte, image ou motif. »',
        '« Position : Centre, Coins, Bords, Derrière ou Zone calme. »',
        '« Opacité : Transparence du filigrane (0-100 %) ».',
        '« Mode de fusion : fusion Normale, Multiplier, Écran ou Superposition. »',
      ],
    },
    {
      heading: '« Métadonnées »',
      paragraphs: ['« Incorporer des métadonnées dans les fichiers exportés : »'],
      bullets: [
        "« Champs Titre, Auteur, Droit d'auteur, Licence, Description. »",
        '« Heure de création : horodatage de génération intégré. »',
        '« Clé-valeur personnalisée : ajoutez des paires de métadonnées arbitraires. »',
      ],
    },
    {
      heading: '« Partage »',
      paragraphs: ['« Partagez vos configurations de code QR : »'],
      bullets: [
        '« Lien direct : Générez une URL partageable avec vos paramètres actuels. »',
        "« Intégrer du HTML : Obtenez le code d'intégration pour les sites Web. »",
        "« Paramètres d'encodage : Inclure tous les paramètres dans l'URL de partage. »",
        '« Remarque : les images superposées provenant de fichiers locaux ne peuvent pas être partagées via une URL. »',
      ],
    },
    {
      heading: '« Analyse de sécurité »',
      paragraphs: ['« Assurez-vous que les codes QR restent scannables : »'],
      bullets: [
        '« Mode de sécurité : Désactivé, Équilibré ou Exigences de balayage strictes. »',
        '« Taille minimale du module : Taille minimale en pixels par module. »',
        '« Zone de silence minimale : modules à marge minimale. »',
        '« Détecteurs de verrous/Calage/Alignement/Format/Version : Protéger des éléments spécifiques. »',
        "« Intensité de superposition maximale par ECC : limites d'intensité automatiques basées sur le niveau de correction d'erreur. »",
      ],
    },
    {
      heading: '« Types de contenu (professionnels) »',
      paragraphs: [
        "« Le niveau professionnel ajoute des types de contenu de paiement et d'entreprise : »",
      ],
      bullets: [
        '« EPC/SEPA (UE) : Codes QR de virement bancaire européen avec IBAN, BIC, montant, référence. »',
        '« UPI (Inde) : Interface de paiement unifiée avec VPA, nom du bénéficiaire, montant. »',
        '« PayNow (Singapour) : Paiement rapide à Singapour avec UEN ou numéro de téléphone mobile. »',
        '« PromptPay (Thaïlande) : Système national de paiement thaïlandais. »',
        '« PIX (Brésil) : Paiement instantané brésilien avec la clé PIX. »',
        '« Crypto : adresses de paiement Bitcoin, Ethereum, Litecoin avec montant optionnel. »',
        '« Lien de campagne marketing : URL avec suivi complet des paramètres UTM (balises marketing) ».',
        "« Lien court : À utiliser avec les raccourcisseurs d'URL pour les codes QR dynamiques/traçables. »",
        "« GS1 Digital Link : Identification du produit avec GTIN, numéro de série, lot, date d'expiration. »",
        "« Lien profond d'application : liens profonds d'application iOS/Android avec des schémas personnalisés. »",
        '« Format personnalisé : Données brutes sans mise en forme ni validation. »',
      ],
    },
    {
      heading: '« Paiements liés à la langue en mode avancé »',
      paragraphs: [
        '« En mode avancé, ANQR affiche automatiquement les moyens de paiement correspondant à la langue sélectionnée. Par exemple, les utilisateurs vietnamiens voient VietQR, les utilisateurs thaïlandais voient PromptPay et les utilisateurs indiens voient UPI et BharatQR. Les moyens de paiement internationaux (cryptomonnaie, PayPal, Cash App) sont disponibles dans toutes les langues. Le mode professionnel débloque tous les standards de paiement, quelle que soit la langue. »',
      ],
    },
    {
      heading: '« Normes européennes de paiement »',
      bullets: [
        "« EPC/SEPA (UE) : Codes QR pour virements bancaires européens conformes à la norme EPC. Prend en charge l'IBAN, le BIC (facultatif pour les virements nationaux), le montant en EUR et les références de paiement structurées ou non structurées. Utilisé dans toute la zone SEPA, y compris les pays de l'UE ainsi que la Suisse, la Norvège, l'Islande, le Liechtenstein, Monaco et Saint-Marin. »",
        "« Facture QR suisse : norme de paiement suisse conforme aux directives de mise en œuvre SIX. Prend en charge le CHF et l'EUR, la référence QR (QRR), la référence du créancier (ISO 11649), les adresses structurées du créancier/débiteur et les informations de la facture. Obligatoire pour les factures suisses depuis 2022. »",
      ],
    },
    {
      heading: '« Normes de paiement indiennes »',
      bullets: [
        "« UPI (Inde) : Interface de paiement unifiée conforme à la spécification de liaison profonde NPCI. Prend en charge l'adresse de paiement virtuelle (VPA), le nom du bénéficiaire, le montant en INR, la note de transaction, l'identifiant de référence, le code de catégorie du commerçant et le mode de transaction. »",
        '« BharatQR (Inde) : Norme QR unifiée prenant en charge les paiements UPI et par carte. Combine le VPA UPI avec le PAN de la carte pour une compatibilité maximale. Inclut le nom du commerçant, la ville, le MCC, les détails de la GST et les numéros de facture/référence. »',
      ],
    },
    {
      heading: "« Normes de paiement de l'Asie du Sud-Est »",
      bullets: [
        "« PayNow (Singapour) : Système de paiement rapide singapourien utilisant la spécification EMVCo QR avec profil SGQR. Prend en charge l'UEN (numéro d'enregistrement d'entreprise), le numéro de téléphone mobile ou le NRIC comme identifiants de substitution. Inclut un indicateur de modification du montant et une date d'expiration. »",
        "« PromptPay (Thaïlande) : Système de paiement national thaïlandais conforme au profil EMV de la Banque de Thaïlande. Prend en charge le numéro de téléphone mobile, la carte d'identité nationale, le numéro d'identification fiscale, l'identifiant de portefeuille électronique et le paiement de factures avec plusieurs champs de référence. »",
        "« QRIS (Indonésie) : Norme indonésienne de code de réponse rapide. Norme nationale de paiement basée sur EMV prenant en charge l'identifiant du commerçant, le NMID (identifiant national du commerçant), la classification des critères du commerçant et les frais de commodité (fixes ou en pourcentage). »",
        "« DuitNow (Malaisie) : Système de paiement instantané malaisien. Prend en charge plusieurs types de proxy, notamment le NRIC, le mobile, le passeport, la carte d'identité militaire et les numéros d'enregistrement d'entreprise. »",
        '« VietQR (Vietnam) : Norme vietnamienne de virement interbancaire. Nécessite le BIN de la banque (identification NAPAS) et le numéro de compte. Prend en charge plusieurs codes de service pour différents types de virement (QRPUSH, QRIBFTTA, QRIBFTTC). »',
        "« QR Ph (Philippines) : Norme de paiement QR philippine pour InstaPay et PESONet. Utilise les numéros de compte avec l'identification du commerçant pour les transactions P2M (personne à commerçant). »",
      ],
    },
    {
      heading: "« Normes de paiement d'Asie de l'Est »",
      bullets: [
        "« TWQR (Taïwan) : Norme de paiement QR taïwanaise. Prend en charge l'identifiant du commerçant, l'identifiant fiscal et les montants en TWD. »",
        "« HKQR/FPS (Hong Kong) : Codes QR du système de paiement rapide de Hong Kong. Prend en charge l'identifiant FPS, le numéro de téléphone mobile ou l'adresse e-mail comme identifiants de paiement. Montants en HKD. »",
        "« JPQR (Japon) : Norme japonaise unifiée de paiement par code QR. Utilise l'identifiant du magasin pour l'identification du commerçant avec les montants en JPY. »",
      ],
    },
    {
      heading: '« Autres normes de paiement régionales »',
      bullets: [
        "« PIX (Brésil) : Système de paiement instantané de la Banque centrale brésilienne conforme à la spécification BR Code. Prend en charge les clés PIX (CPF, CNPJ, courriel, téléphone ou clé aléatoire), le nom/la ville du commerçant, l'identifiant de transaction et les montants en BRL. »",
        "« AusPayNet/NPP PayID (Australie) : Système PayID de la plateforme australienne de nouveaux paiements. Prend en charge les types de PayID (courriel, mobile, ABN, identifiant d'organisation) ou le code BSB traditionnel + numéro de compte. Le nom du commerçant est facultatif, car les payeurs voient le nom enregistré dans la base de données NPP. »",
      ],
    },
    {
      heading: '« Paiements en cryptomonnaie »',
      bullets: [
        '« Bitcoin/Litecoin (BIP-21) : URI de paiement de cryptomonnaie standard avec adresse de portefeuille, montant optionnel et libellé. Compatible avec tous les principaux portefeuilles Bitcoin et Litecoin. »',
        '« Lightning Network (BOLT11) : Factures de paiement Lightning Network. Collez une chaîne de facture encodée en BOLT11 pour des paiements Bitcoin instantanés avec des frais minimes. »',
        "« Ethereum (EIP-681) : URI de requête de transaction Ethereum prenant en charge les transferts ETH natifs et les transferts de jetons ERC-20. Inclut l'identifiant de chaîne pour la prise en charge de plusieurs réseaux (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), les paramètres de gaz et les appels de fonction de contrat. »",
      ],
    },
    {
      heading: '« Services de lien de paiement »',
      bullets: [
        "« PayPal.Me : Liens de paiement PayPal avec nom d'utilisateur et montant prérempli facultatif. Les destinataires peuvent payer via leur solde PayPal, des cartes ou des comptes bancaires. »",
        '« Cash App : Liens de paiement Cash App utilisant $cashtag avec montant optionnel. Populaire aux États-Unis pour les paiements entre particuliers. »',
      ],
    },
    {
      heading: '« QR code EMV générique »',
      bullets: [
        '« EMV générique : Créez des codes QR EMV personnalisés en mode présenté par le commerçant pour les systèmes de paiement non spécifiquement répertoriés. Configurez le nom du commerçant, la ville, le code pays (ISO 3166-1), le code devise (ISO 4217 numérique), le MCC, les options de pourboire/frais de service et des champs de données supplémentaires. Utile pour les tests ou les intégrations personnalisées. »',
      ],
    },
    {
      heading: '« Modes de fusion de superposition (Professionnel) »',
      paragraphs: ['« Modes de fusion supplémentaires au niveau professionnel : »'],
      bullets: [
        '« Pixellisation : Effet de superposition pixélisé. »',
        '« Contour : Superposition de détection des bords ne montrant que les contours. »',
        '« Vague : Effet de distorsion ondulée. »',
        "« Taille des sous-pixels : Dimensionnement variable des sous-pixels en fonction de l'image. »",
        '« True Dither : Dithering avancé avec sélection de matrice ordonnée. »',
        "« Extrême : Visibilité maximale de l'image, peut affecter la numérisation. »",
      ],
    },
    {
      heading: '« Paramètres de protection »',
      paragraphs: [
        '« Contrôle précis des éléments QR protégés contre la modification par superposition : »',
      ],
      bullets: [
        '« Préservez le timing : ne modifiez pas les modèles de timing. »',
        "« Préserver l'alignement : Conserver les modèles d'alignement inchangés. »",
        "« Protection des informations de format : modules d'informations de format de protection. »",
        "« Protection des informations de version : modules d'informations de version Shield ».",
      ],
    },
    {
      heading: '« Mode compatible ECC »',
      paragraphs: [
        "« Distribue intelligemment l'intensité de la superposition en fonction de la capacité de correction d'erreurs. Le système analyse quels modules peuvent être modifiés tout en maintenant la scanabilité. »",
      ],
      bullets: [
        "« Budget de risque : Pourcentage de capacité de correction d'erreur à utiliser (0-100 %) ».",
        '« Budget plus élevé = superposition plus visible mais risque de numérisation plus élevé. »',
        '« Budget plus faible = numérisation plus sûre mais superposition moins visible. »',
      ],
    },
    {
      heading: '« Options de rendu professionnel »',
      paragraphs: ['« Commandes de rendu avancées : »'],
      bullets: [
        "« Bords nets : utilisez le rendu d'image pixélisé pour des bords de module nets. »",
        '« Alignement des pixels : alignement des pixels au sol, rond ou au plafond. »',
        '« Mode de couleur par module : uni, par luminosité, par position, par superposition, par groupe. »',
        '« Palette de couleurs : Définir une palette de couleurs personnalisée pour la coloration par module. »',
        "« Protection contre le contraste : assurez-vous d'un rapport de contraste minimal entre les couleurs. »",
        '« Rapport de contraste minimal : exigence de contraste de style WCAG (1:1 à 21:1) ».',
        '« Modules de frontière supplémentaires : frontière supplémentaire au-delà de la zone de silence. »',
      ],
    },
    {
      heading: '« Options de sortie professionnelles »',
      paragraphs: ["« Paramètres d'exportation d'entreprise : »"],
      bullets: [
        "« DPI : Définissez la résolution d'impression (72-600 DPI). 300 DPI recommandés pour l'impression. »",
        '« Inclure la zone silencieuse : Activer/désactiver la zone silencieuse dans les dimensions de sortie. »',
        '« Exporter en tant que format supplémentaire : générer un PDF en plus du format principal. »',
      ],
    },
    {
      heading: "« Paramètres d'animation (Professionnel) »",
      paragraphs: ["« Fonctionnalités d'animation professionnelles supplémentaires : »"],
      bullets: [
        '« Dithering temporel : Désactivé, bruit bleu ou tramage par image sans scintillement. »',
        '« Motif : Aucun, effet Pulse, Wave, Scanline, Shimmer ou Drift. »',
      ],
    },
    {
      heading: '« Référence API »',
      paragraphs: [
        "« ANQR fournit une API côté serveur pour générer des codes QR via des paramètres d'URL. C'est idéal pour intégrer des codes QR dans des sites web, des e-mails, des documents ou des flux de travail automatisés sans JavaScript côté client. »",
        '« URL de base : https://anqr.link/api/qr »',
      ],
    },
    {
      heading: '« Paramètres de base »',
      paragraphs: [
        '« Paramètres obligatoires et communs (les noms des paramètres ne sont pas traduits) : »',
      ],
      bullets: [
        "« Données (obligatoires) : Le contenu à encoder dans le code QR. Encoder les caractères spéciaux de l'URL. »",
        "« taille : Taille de l'image en pixels (par défaut : 400, max : 2000). Utilisé si la largeur/hauteur n'est pas spécifiée. »",
        '« w, h : Largeur et hauteur de sortie en pixels. Remplace le paramètre de taille. »',
        '« format : Format de sortie — png, webp ou gif (par défaut : png) ».',
        "« ec : Niveau de correction d'erreur — L, M, Q ou H (par défaut : H) ».",
        '« fg : Couleur de premier plan en hexadécimal sans # (par défaut : 000000) ».',
        "« bg : Couleur d'arrière-plan en hexadécimal sans # (par défaut : ffffff) ».",
        '« transparent : Définir sur 1 pour un fond transparent. »',
        '«marge : Zone silencieuse dans les modules (par défaut : 4).»',
      ],
    },
    {
      heading: '« Paramètres de style »',
      paragraphs: ['« Style de module et de motif : »'],
      bullets: [
        '« style : Style de module — carré, arrondi, points, losange, connecté. »',
        '« chercheur : Style de motif du chercheur — carré, arrondi, cercle. »',
        "« align : Style de modèle d'alignement — match_finder, square, rounded, circle. »",
        '« timing : Style de modèle de synchronisation — match_module, solid, dashed. »',
        "« rayon : Pourcentage du rayon d'angle 0-100 ».",
        "« écart : Pourcentage d'écart du module 0-50 ».",
        "« gapMode : Mode d'espacement — aucun, incrustation, trait, espace négatif. »",
        "« œilExterne, œilIntérieur : Styles d'yeux — carré, arrondi, rond. »",
        "« eyeScale : Pourcentage d'échelle oculaire (par défaut : 100) ».",
        '« grad : Type de gradient — aucun, linéaire, radial, conique. »',
        '« gradAngle : Angle de gradient pour les gradients linéaires. »',
        '« gradStops : Arrêts de dégradé sous la forme couleur1,pos1,couleur2,pos2,… (par exemple, ff0000,0,0000ff,1). »',
      ],
    },
    {
      heading: '« Paramètres de superposition »',
      paragraphs: [
        "« Options de superposition d'image (l'image de superposition est récupérée côté serveur) : »",
      ],
      bullets: [
        "« img : URL de l'image à superposer (doit être accessible au public) ».",
        '« mode : Mode de superposition — centre, demi-teinte, mélange, luminosité, mosaïque, tramé, bruit bleu, sous-pixel. »',
        '« intensité : Intensité de superposition 0-100 (par défaut : 100) ».',
        '« colorMode : Mode de couleur de superposition — couleur, niveaux de gris, bw. »',
        "« ajustement : Comment le revêtement s'adapte — couvrir, contenir, étirer. »",
        '« rot : Rotation de la superposition en degrés. »',
        '« flipX, flipY : Définir sur 1 pour retourner la superposition. »',
        '« keepFinders : Conserver les modèles de recherche (par défaut : 1). »',
        '« keepTiming, keepAlign : Définir sur 1 pour préserver les modèles de synchronisation/alignement. »',
      ],
    },
    {
      heading: '« Paramètres de prétraitement »',
      paragraphs: ["« Prétraitement d'image appliqué à la superposition : »"],
      bullets: [
        '« luminosité : Réglage de -100 à 100 (par défaut : 0) ».',
        '« contraste : ajustement de -100 à 100 (par défaut : 0) ».',
        '« gamma : Valeur de 0,1 à 3 (par défaut : 1) ».',
        '« saturation : Ajustement -100 à 100 (par défaut : 0) ».',
        '« teinte : Rotation de la teinte en degrés. »',
        '« flou : Flou en pixels. »',
        "« affûter : Quantité d'affûtage 0-100. »",
        '« posterize : niveaux Posterize ».',
        '« seuil : seuil binaire 0-255 ».',
        '« bord : Détection de bord — désactivé, sobel, canny. »',
        '« inverser : définissez sur 1 pour inverser les couleurs. »',
      ],
    },
    {
      heading: '« Paramètres du filigrane »',
      paragraphs: ['« Ajouter des filigranes aux codes QR générés : »'],
      bullets: [
        '« wmEn : Définir sur 1 pour activer le filigrane. »',
        '« wmKind : Type de filigrane — texte, image, motif. »',
        '« wmText : Texte du filigrane (encodé en URL) ».',
        "« wmImg : URL de l'image du filigrane. »",
        '« wmPos : Position — centre, coins, bords, derrière, zone calme. »',
        '« wmOpacity : Opacité 0-100 (par défaut : 50) ».',
        '« wmBlend : Mode de fusion — normal, multiplier, écran, superposition. »',
      ],
    },
    {
      heading: "« Paramètres d'animation »",
      paragraphs: ['« Pour une sortie GIF animée (nécessite format=gif) : »'],
      bullets: [
        "« animPattern : Motif d'animation — aucun, impulsion, vague, ligne de balayage, scintillement, dérive, cycle de couleurs. »",
        "« animFrames : Nombre d'images 1-60 (par défaut : 24) ».",
        "« animSpeed : Délai d'affichage en millisecondes 10-1000 (par défaut : 100) ».",
        "« animSeed : Graine aléatoire pour l'animation. »",
        "« Accélération : Accélération d'animation — linéaire, ease_in, ease_out, ease_in_out, rebond. »",
      ],
    },
    {
      heading: '« Paramètres de sortie »',
      paragraphs: ['« Options de format de sortie : »'],
      bullets: [
        '« qualité : qualité WebP 0-1 (par défaut : 0,9) ».',
        '« webpQ : Qualité WebP 0-100 (par défaut : 90) ».',
        '« gifColors : taille de la palette GIF 2-256 (par défaut : 256) ».',
        '« dpi : Résolution de sortie pour PNG (par défaut : 72) ».',
        '« metaTitle, metaAuthor, metaCopy, metaDesc : champs de métadonnées PNG ».',
      ],
    },
    {
      heading: "« Exemple d'utilisation »",
      paragraphs: [
        '« Code QR de base : »',
        '« https://anqr.link/api/qr?data=https://example.com »',
        '« Code QR stylisé avec des couleurs personnalisées : »',
        '« https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30 »',
        '« Code QR avec image superposée : »',
        '« https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70 »',
        '« GIF animé : »',
        '« https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out »',
      ],
    },
    {
      heading: '« Intégration de codes QR »',
      paragraphs: [
        "« En mode professionnel, la fonction Partager génère du code HTML et des URL intégrables. Voici comment fonctionne l'intégration : »",
      ],
      bullets: [
        "« Partager le lien : Crée une URL vers l'application ANQR avec tous vos paramètres encodés sous forme de paramètres d'URL. Les destinataires peuvent consulter et modifier le code QR. »",
        "« Image intégrée : Génère une balise pointant vers l'API du serveur. Le code QR est rendu côté serveur et servi sous forme d'image. »",
        "« Embed Markdown : Crée une syntaxe d'image Markdown pour la documentation et les fichiers README. »",
        "« URL API directe : l'URL API brute à utiliser dans les applications, les scripts ou autres intégrations. »",
      ],
    },
    {
      heading: '« Exemple HTML »',
      paragraphs: [
        '« Pour intégrer un code QR à votre site web : »',
        '« <img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=Code QR /> »',
        '« Pour un dimensionnement adaptatif : »',
        '« <img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=Code QR style=max-width: 100%; height: auto; /> »',
        "« Le serveur met en cache les réponses avec des en-têtes de cache longs, ce qui permet d'effectuer rapidement des requêtes répétées pour la même URL. »",
      ],
    },
    {
      heading: "« Format de partage d'URL »",
      paragraphs: [
        "« Lorsque vous cliquez sur Partager en mode professionnel, ANQR encode vos paramètres actuels dans des paramètres d'URL. Le format est : »",
        '« https://anqr.link/?data=…&ec=H&style=rounded&…. »',
        "« Ces paramètres reflètent les paramètres de l'API, vous pouvez donc convertir une URL de partage en une URL d'API en changeant le chemin de base de / à /api/qr et en ajustant les paramètres w/h selon les besoins. »",
        "« Remarque : les images superposées téléchargées à partir de fichiers locaux ne peuvent pas être partagées via une URL — seules les superpositions basées sur une URL (paramètre img) fonctionnent dans les liens partagés et les appels d'API. »",
      ],
    },
    {
      heading: '« Limites de débit et utilisation »',
      paragraphs: [
        "« L'API est gratuite pour les volumes raisonnables. Pour une utilisation à volume élevé ou des applications commerciales nécessitant une disponibilité garantie, veuillez nous contacter. »",
        "« Les réponses de l'API incluent des en-têtes de mise en cache agressifs. Pour des performances optimales, mettez les réponses en cache de votre côté ou utilisez systématiquement la même URL pour des codes QR identiques. »",
      ],
    },
    {
      heading: '« Meilleures pratiques »',
      paragraphs: ['« Suivez ces directives pour des codes QR fiables : »'],
      bullets: [
        '« Testez toujours vos codes QR avec plusieurs applications de numérisation avant de les imprimer. »',
        "« Utilisez la correction d'erreur H (élevée) lors de l'ajout de superpositions. »",
        '« Conservez au moins 4 modules de zone silencieuse (marge). »',
        "« Assurez un contraste élevé entre le premier plan et l'arrière-plan. »",
        "« Pour l'impression, utilisez au moins 300 DPI et testez à la taille d'impression réelle. »",
        "« Activez l'option Conserver les motifs de recherche lors de l'utilisation de superpositions. »",
        '« Commencez par une intensité de superposition plus faible et augmentez-la progressivement. »',
        "« Pour une utilisation en extérieur, envisagez des modules de plus grande taille et une correction d'erreur plus élevée. »",
      ],
    },
    {
      heading: '« Dépannage »',
      paragraphs: ['« Problèmes et solutions communs : »'],
      bullets: [
        "« Le QR ne se scanne pas : Réduisez l'intensité de la superposition, augmentez la correction d'erreur, vérifiez le contraste. »",
        "« Code trop long : Réduisez la longueur du contenu, utilisez un raccourcisseur d'URL, une version inférieure. »",
        '« Sortie floue : Augmentez la taille du module, utilisez le format PNG au lieu des formats compressés. »',
        '« Les couleurs semblent incorrectes : vérifiez le contraste des couleurs, essayez le mode de superposition en niveaux de gris. »',
        "« Le GIF ne s'anime pas : assurez-vous d'utiliser le format de sortie GIF, vérifiez le nombre d'images. »",
        "« L'image superposée ne se charge pas : vérifiez les autorisations CORS sur les images distantes. »",
      ],
    },
    {
      heading: '« Raccourcis clavier »',
      paragraphs: [
        "« ANQR prend en charge les raccourcis clavier standard. Utilisez Ctrl/Cmd+S pour déclencher l'exportation (lorsque le focus est sur l'aperçu). »",
      ],
    },
    {
      heading: '« Partage et intégration »',
      paragraphs: [
        '« En mode Professionnel, cliquez sur le bouton Partager pour copier une URL contenant vos paramètres actuels. Les destinataires peuvent ouvrir cette URL pour consulter votre configuration exacte. Remarque : les images superposées provenant de fichiers locaux ne peuvent pas être partagées via une URL. »',
      ],
    },
  ],
};

export default docs;
