import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: '« Contactez-nous »',
  description: '« Nous accueillons favorablement les commentaires, les rapports de bogues, les demandes de fonctionnalités et les demandes de renseignements généraux. »',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '« Comment nous joindre »',
      paragraphs: ['« Nous vous proposons plusieurs moyens de nous contacter selon vos besoins. Nous lisons tous les messages, mais les délais de réponse peuvent varier en fonction du volume et du type de demande. »'],
    },
    {
      heading: '« Courriel »',
      paragraphs: ['« Pour toute demande de renseignements : ${CONTACT_EMAIL} »', '« C\'est le moyen le plus fiable de nous joindre et il est recommandé pour les questions détaillées, les demandes commerciales ou toute autre demande. »'],
    },
    {
      heading: '« Types de demandes de renseignements »',
      bullets: ['« Questions générales : Questions sur la façon d\'utiliser ANQR, explications des fonctionnalités ou commentaires généraux. »', '« Rapports de bogues : Veuillez inclure votre navigateur, votre système d\'exploitation, les étapes pour reproduire le problème et tous les messages d\'erreur que vous voyez. »', '« Demandes de fonctionnalités : Suggestions de nouvelles fonctionnalités ou d\'améliorations. Nous prenons en compte toutes les demandes, mais nous ne pouvons pas garantir leur mise en œuvre. »', '« Demandes commerciales : opportunités de partenariat, questions de licence ou demandes d\'utilisation commerciale. »', '« Demandes relatives à la protection de la vie privée : Demandes visant à exercer vos droits en matière de protection de la vie privée en vertu du RGPD, du CCPA ou d\'autres lois sur la protection de la vie privée (voir la politique de confidentialité). »', '« DMCA/Droit d\'auteur : Consultez la section DMCA ci-dessous pour connaître les exigences relatives aux notifications de retrait. »'],
    },
    {
      heading: '« Temps de réponse »',
      paragraphs: ['« Nous nous efforçons de répondre aux demandes de renseignements dans un délai de 5 à 7 jours ouvrables. Les demandes relatives à la protection de la vie privée seront traitées dans un délai de 30 jours, conformément à la loi. »', '« En période de forte activité, les délais de réponse peuvent être plus longs. Pour les demandes urgentes, veuillez indiquer « URGENT » dans l\'objet de votre courriel. »'],
    },
    {
      heading: '« Avant de nous contacter »',
      paragraphs: ['« Veuillez consulter notre page de documentation pour obtenir des réponses aux questions fréquentes sur l\'utilisation des fonctionnalités ANQR. Vous y trouverez des réponses à de nombreuses questions concernant la génération, le style et les options d\'exportation des codes QR. »'],
    },
    {
      heading: '« Avis de droit d\'auteur DMCA »',
      paragraphs: ['« Si vous estimez qu\'un contenu disponible sur ANQR porte atteinte à vos droits d\'auteur, vous pouvez soumettre une notification de retrait en vertu de la loi américaine sur le droit d\'auteur numérique (DMCA). Pour être valide, votre notification doit inclure : »'],
      bullets: ['« Une signature physique ou électronique du titulaire du droit d\'auteur ou de son mandataire autorisé. »', '« Identification de l\'œuvre protégée par le droit d\'auteur qui aurait été contrefaite. »', '« Identification du matériel qui serait contrefait, avec des informations suffisantes pour le localiser. »', '« Vos coordonnées (adresse, numéro de téléphone et adresse e-mail) ».', '« Une déclaration selon laquelle vous croyez de bonne foi que l\'utilisation du matériel n\'est pas autorisée par le titulaire du droit d\'auteur. »', '« Une déclaration, sous peine de parjure, attestant que les informations contenues dans votre notification sont exactes et que vous êtes le titulaire des droits d\'auteur ou autorisé à agir en son nom. »'],
    },
    {
      heading: '« Contact DMCA »',
      paragraphs: ['« Envoyez les notifications DMCA à : ${CONTACT_EMAIL} »', '« Veuillez indiquer « Avis DMCA » dans l\'objet de votre courriel. Nous répondrons aux avis valides conformément à la loi applicable. Veuillez noter qu\'ANQR génère des codes QR localement sur les appareils des utilisateurs et n\'héberge aucun contenu généré par les utilisateurs. »'],
    },
  ],
};

export default contact;
