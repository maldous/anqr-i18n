import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Kontaktieren Sie uns',
  description: 'Wir freuen uns über Feedback, Fehlerberichte, Funktionswünsche und allgemeine Anfragen.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'So erreichen Sie uns',
      paragraphs: ['Wir bieten Ihnen verschiedene Kontaktmöglichkeiten, je nach Ihren Bedürfnissen. Wir lesen jede Nachricht, die Antwortzeiten können jedoch je nach Nachrichtenaufkommen und Art der Anfrage variieren.'],
    },
    {
      heading: 'E-Mail',
      paragraphs: ['Für alle Anfragen: ${CONTACT_EMAIL}', 'Dies ist der zuverlässigste Weg, uns zu erreichen, und wird für detaillierte Fragen, Geschäftsanfragen oder sonstige Anfragen empfohlen.'],
    },
    {
      heading: 'Arten von Anfragen',
      bullets: ['Allgemeine Fragen: Fragen zur Verwendung von ANQR, Erläuterungen zu den Funktionen oder allgemeines Feedback.', 'Fehlerberichte: Bitte geben Sie Ihren Browser, Ihr Betriebssystem, die Schritte zur Reproduktion und alle angezeigten Fehlermeldungen an.', 'Funktionswünsche: Vorschläge für neue Funktionen oder Verbesserungen. Wir berücksichtigen alle Wünsche, können aber keine Umsetzung garantieren.', 'Geschäftsanfragen: Partnerschaftsmöglichkeiten, Lizenzfragen oder Anfragen zur kommerziellen Nutzung.', 'Anfragen zum Datenschutz: Anfragen zur Ausübung Ihrer Datenschutzrechte gemäß DSGVO, CCPA oder anderen Datenschutzgesetzen (siehe Datenschutzerklärung).', 'DMCA/Urheberrecht: Die Anforderungen an die Benachrichtigung über die Entfernung von Inhalten finden Sie im Abschnitt DMCA weiter unten.'],
    },
    {
      heading: 'Reaktionszeiten',
      paragraphs: ['Wir bemühen uns, Anfragen innerhalb von 5-7 Werktagen zu beantworten. Anfragen zum Datenschutz werden gemäß den gesetzlichen Bestimmungen innerhalb von 30 Tagen bearbeitet.', 'In Stoßzeiten kann es zu längeren Bearbeitungszeiten kommen. Bitte geben Sie bei dringenden Angelegenheiten DRINGEND in der Betreffzeile an.'],
    },
    {
      heading: 'Bevor Sie uns kontaktieren',
      paragraphs: ['Auf unserer Dokumentationsseite finden Sie Antworten auf häufig gestellte Fragen zur Verwendung der ANQR-Funktionen. Viele Fragen zur QR-Code-Generierung, zum Styling und zu den Exportoptionen werden dort behandelt.'],
    },
    {
      heading: 'DMCA-Urheberrechtshinweise',
      paragraphs: ['Wenn Sie der Ansicht sind, dass auf ANQR verfügbare Inhalte Ihr Urheberrecht verletzen, können Sie eine DMCA-Mitteilung (Digital Millennium Copyright Act) einreichen. Ihre Mitteilung muss folgende Angaben enthalten, um gültig zu sein:'],
      bullets: ['Eine physische oder elektronische Unterschrift des Urheberrechtsinhabers oder seines Bevollmächtigten.', 'Identifizierung des urheberrechtlich geschützten Werkes, dessen Verletzung behauptet wird.', 'Identifizierung des Materials, das angeblich gegen Urheberrechte verstößt, mit ausreichenden Informationen, um es aufzufinden.', 'Ihre Kontaktdaten (Adresse, Telefonnummer und E-Mail-Adresse).', 'Eine Erklärung, dass Sie nach bestem Wissen und Gewissen davon überzeugt sind, dass die Verwendung des Materials nicht vom Urheberrechtsinhaber genehmigt wurde.', 'Eine eidesstattliche Erklärung, dass die Angaben in Ihrer Mitteilung richtig sind und dass Sie der Urheberrechtsinhaber sind oder befugt sind, in dessen Namen zu handeln.'],
    },
    {
      heading: 'DMCA-Kontakt',
      paragraphs: ['DMCA-Mitteilungen senden Sie bitte an: ${CONTACT_EMAIL}', 'Bitte geben Sie DMCA-Mitteilung in der Betreffzeile an. Wir werden auf berechtigte Mitteilungen gemäß geltendem Recht reagieren. Beachten Sie, dass ANQR QR-Codes lokal auf den Geräten der Nutzer generiert und keine nutzergenerierten Inhalte hostet.'],
    },
  ],
};

export default contact;
