import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const terms: PageDefinition = {
  title: '« Conditions d’utilisation »',
  description: '« En accédant au site ou en l’utilisant, vous acceptez d’être lié par les présentes conditions. »',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '« Acceptation des conditions »',
      paragraphs: [
        '« En accédant à ANQR (anqr.link) ou en l’utilisant, vous acceptez d’être lié par les présentes Conditions d’utilisation et notre Politique de confidentialité. Si vous n’acceptez pas ces conditions, veuillez ne pas utiliser le site. »',
        '« Nous pouvons mettre à jour ces conditions de temps à autre. L’utilisation continue du site après les modifications constitue l’acceptation des nouvelles conditions. »',
      ],
    },
    {
      heading: '« Admissibilité »',
      paragraphs: [
        '« Vous devez avoir au moins 13 ans pour utiliser ANQR. En utilisant ce site, vous déclarez satisfaire à cette condition d\'âge. Si vous avez moins de 18 ans, vous déclarez avoir l\'autorisation de votre parent ou tuteur pour utiliser ce site. »',
      ],
    },
    {
      heading: '« Utilisation autorisée »',
      paragraphs: [
        '« Vous pouvez utiliser ANQR uniquement à des fins licites. Vous êtes seul responsable du contenu que vous encodez dans les codes QR et de la manière dont vous utilisez les codes QR que vous générez. »',
      ],
    },
    {
      heading: '« Conduite interdite »',
      paragraphs: [
        '« Vous acceptez de ne pas : »',
      ],
      bullets: [
        '« Utilisez ANQR pour créer des codes QR qui facilitent l’hameçonnage, la distribution de logiciels malveillants, la fraude, les escroqueries, le harcèlement, la diffamation ou toute autre activité illégale. »',
        '« Encoder le contenu qui enfreint les droits de propriété intellectuelle, viole la vie privée ou contient du matériel illégal. »',
        '« Tenter de perturber, de surcharger ou d’entraver le fonctionnement ou la sécurité du site. »',
        '« Procéder à l’ingénierie inverse, à la décompilation ou tenter d’extraire le code source du site. »',
        '« Utiliser des outils automatisés (bots, scrapers) pour accéder au site d’une manière qui dégrade les performances des autres utilisateurs. »',
        '« Contourner ou désactiver toute fonction de sécurité ou de contrôle d’accès. »',
        '« Usurper l’identité d’une personne ou d’une entité ou présenter de manière mensongère votre affiliation. »',
      ],
    },
    {
      heading: '« Propriété intellectuelle »',
      paragraphs: [
        '« Vous conservez la propriété du contenu que vous encodez dans les codes QR. ANQR ne revendique aucun droit de propriété sur vos données. »',
        '« Le nom, le logo, la conception de l’interface et le code source d’ANQR sont protégés par le droit d’auteur, le droit des marques et d’autres lois sur la propriété intellectuelle. Vous ne pouvez pas copier, modifier, distribuer ou créer des œuvres dérivées sans notre autorisation. »',
        '« QR Code® est une marque déposée de DENSO WAVE INCORPORATED. ANQR n’est pas affiliée à DENSO WAVE. »',
      ],
    },
    {
      heading: '« Licence de contenu utilisateur »',
      paragraphs: [
        '« En utilisant ANQR, vous ne nous accordez aucun droit sur votre contenu. Lorsque vous utilisez la génération locale (par défaut), la génération du code QR se fait entièrement dans votre navigateur et nous n’accédons pas à vos données encodées, nous ne les stockons pas et nous ne les transmettons pas. »',
        '« Lorsque vous utilisez l’API côté serveur, votre contenu est traité pour générer l’image QR, mais n’est ni stocké, ni enregistré, ni utilisé à d’autres fins que le rendu de l’image demandée. »',
      ],
    },
    {
      heading: '« Services et publicité de tiers »',
      paragraphs: [
        '« Le site affiche des publicités via Google AdSense et peut inclure des liens vers des sites web tiers. Nous ne sommes pas responsables du contenu, des services ou des pratiques de confidentialité de ces tiers. »',
        '« Vos interactions avec les annonceurs et les tiers se font exclusivement entre vous et eux. Consultez notre Politique de confidentialité pour obtenir des informations sur les pratiques en matière de données publicitaires. »',
      ],
    },
    {
      heading: '« Exclusion de garanties »',
      paragraphs: [
        '« ANQR EST FOURNI « TEL QUEL » ET « SELON DISPONIBILITÉ », SANS GARANTIE D\'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS, MAIS SANS S\'Y LIMITER, LES GARANTIES IMPLICITES DE QUALITÉ MARCHANDE, D\'ADÉQUATION À UN USAGE PARTICULIER ET D\'ABSENCE DE CONTREFAÇON. »',
        '« Nous ne garantissons pas que : a) le site sera ininterrompu, sécurisé ou exempt d’erreurs ; b) les codes QR seront scannés dans tous les environnements, sur tous les appareils ou avec toutes les applications de numérisation ; c) le site répondra à vos exigences. »',
        '« Vous devez toujours tester les codes QR dans les conditions dans lesquelles ils seront utilisés (taille d’impression, éclairage, type d’écran, distance, qualité de la caméra). »',
      ],
    },
    {
      heading: '« Limitation de responsabilité »',
      paragraphs: [
        '« DANS LA MESURE MAXIMALE PERMISE PAR LA LOI, ANQR ET SES EXPLOITANTS, SOCIÉTÉS AFFILIÉES ET CONCÉDANTS DE LICENCE NE SERONT PAS RESPONSABLES DES DOMMAGES DIRECTS, INDIRECTS, ACCESSOIRES, SPÉCIAUX, CONSÉCUTIFS, PUNITIFS OU EXEMPLAIRES, Y COMPRIS, MAIS SANS S\'Y LIMITER, LES DOMMAGES POUR PERTE DE PROFITS, DE REVENUS, DE DONNÉES, DE CLIENTÈLE, D\'UTILISATION OU D\'AUTRES PERTES IMMATÉRIELLES, DÉCOULANT DE VOTRE ACCÈS AU SERVICE OU DE SON UTILISATION (OU DE VOTRE INCAPACITÉ À Y ACCÉDER OU À L\'UTILISER). »',
        '« VOUS RECONNAISSEZ ET ACCEPTEZ EXPRESSÉMENT QUE L’UTILISATION DU SERVICE SE FAIT À VOS PROPRES RISQUES. LE SERVICE EST FOURNI GRATUITEMENT ET, PAR CONSÉQUENT, VOUS ACCEPTEZ QU’ANQR ET SES OPÉRATEURS NE SOIENT EN AUCUN CAS RESPONSABLES ENVERS VOUS DE TOUT DOMMAGE OU PERTE. EN AUCUN CAS NOTRE RESPONSABILITÉ TOTALE GLOBALE NE SAURAIT EXCÉDER ZÉRO DOLLAR (0 $ AUD). »',
        '« VOUS ACCEPTEZ DE RENONCIER, DE RENONCIER ET DE VOUS DÉCHARGER DE TOUTE RÉCLAMATION, DEMANDE ET CAUSE D’ACTION CONTRE ANQR ET SES OPÉRATEURS DÉCOULANT DE VOTRE UTILISATION DU SERVICE. »',
        '« CERTAINES JURIDICTIONS N’AUTORISENT PAS L’EXCLUSION DE CERTAINES GARANTIES OU LIMITATIONS DE RESPONSABILITÉ. DANS CES JURIDICTIONS, NOTRE RESPONSABILITÉ SERA LIMITÉE DANS LA MESURE MAXIMALE PERMISE PAR LA LOI APPLICABLE. »',
      ],
    },
    {
      heading: '« Indemnisation »',
      paragraphs: [
        '« Vous acceptez d’indemniser, de défendre et de tenir indemnes ANQR, ses exploitants, ses sociétés affiliées et leurs dirigeants, administrateurs, employés et agents respectifs contre toute réclamation, tout dommage, toute perte, toute responsabilité, tous frais et toutes dépenses (y compris les frais juridiques) découlant de : (a) votre utilisation du site ; (b) votre violation des présentes conditions ; (c) votre violation des droits de tiers ; (d) tout contenu que vous encodez dans des codes QR. »',
      ],
    },
    {
      heading: '« Règlement des différends »',
      paragraphs: [
        '« Tout différend découlant des présentes Conditions ou de votre utilisation d’ANQR devra d’abord être tenté de le résoudre par une négociation informelle en contactant ${CONTACT_EMAIL}. »',
        '« Si le règlement à l’amiable échoue, les différends seront résolus par un arbitrage exécutoire à Victoria, en Australie, sauf que l’une ou l’autre des parties peut demander une injonction devant les tribunaux en cas de violation des droits de propriété intellectuelle. »',
      ],
    },
    {
      heading: '« Renonciation aux recours collectifs »',
      paragraphs: [
        '« DANS LA MESURE PERMISE PAR LA LOI, VOUS ACCEPTEZ QUE TOUTE PROCÉDURE DE RÈGLEMENT DES LITIGES SOIT MENÉE UNIQUEMENT SUR UNE BASE INDIVIDUELLE ET NON DANS LE CADRE D\'UNE ACTION COLLECTIVE, CONSOLIDÉE OU REPRÉSENTATIVE. »',
      ],
    },
    {
      heading: '« Loi applicable »',
      paragraphs: [
        '« Les présentes conditions sont régies par les lois de l’État de Victoria, en Australie, sans égard aux principes de conflits de lois. Vous consentez à la compétence exclusive des tribunaux situés dans l’État de Victoria, en Australie. »',
      ],
    },
    {
      heading: '« Modifications et disponibilité »',
      paragraphs: [
        '« Nous pouvons modifier, suspendre ou interrompre le site (ou toute partie de celui-ci) à tout moment sans préavis ni responsabilité. »',
        '« Nous pouvons mettre à jour ces conditions à tout moment. La date de « Dernière mise à jour » indique la date de leur dernière révision. La poursuite de l’utilisation après les modifications constitue une acceptation. »',
      ],
    },
    {
      heading: '« Divisibilité »',
      paragraphs: [
        '« Si une disposition quelconque des présentes Conditions est jugée invalide ou inapplicable, cette disposition sera appliquée dans toute la mesure permise et les autres dispositions resteront pleinement en vigueur. »',
      ],
    },
    {
      heading: '« Renonciation »',
      paragraphs: [
        '« Le fait que nous n’exercions pas un droit ou une disposition quelconque des présentes Conditions ne saurait être considéré comme une renonciation à ce droit ou à cette disposition. »',
      ],
    },
    {
      heading: '« Accord complet »',
      paragraphs: [
        '« Les présentes conditions générales, ainsi que notre politique de confidentialité, constituent l’intégralité de l’accord entre vous et ANQR concernant votre utilisation du site et remplacent tout accord antérieur. »',
      ],
    },
    {
      heading: '« Force majeure »',
      paragraphs: [
        '« Nous ne serons pas responsables de tout manquement ou retard dans l’exécution dû à des circonstances hors de notre contrôle raisonnable, y compris les catastrophes naturelles, la guerre, le terrorisme, les émeutes, les actions gouvernementales ou les défaillances d’Internet/d’infrastructure. »',
      ],
    },
    {
      heading: '« Contact »',
      paragraphs: [
        '« Pour toute question concernant ces conditions, veuillez envoyer un courriel à : ${CONTACT_EMAIL} »',
      ],
    },
  ],
}

export default terms;
