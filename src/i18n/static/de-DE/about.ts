import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'Über ANQR',
  description: 'ANQR ist ein kostenloser QR-Code-Generator mit einem clientseitigen Ansatz – generieren Sie QR-Codes lokal oder verwenden Sie unsere API zum Einbetten.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Was ist ANQR?',
      paragraphs: [
        'ANQR (ausgesprochen Anker) ist ein kostenloser QR-Code-Generator, der scannbare Codes für URLs, Texte, WLAN-Zugangsdaten, Visitenkarten, Kalenderereignisse und mehr erstellt.',
        'Es wurde für Einzelpersonen, kleine Unternehmen, Marketingfachleute und Entwickler entwickelt, die leistungsstarke QR-Tools ohne Registrierung nutzen möchten. Dank des clientseitigen Designs werden QR-Codes standardmäßig lokal im Browser generiert. Optional steht eine Server-API für die professionelle Einbettung und Integration zur Verfügung.',
      ],
    },
    {
      heading: 'Hauptmerkmale',
      bullets: [
        'Generieren Sie QR-Codes sofort in Ihrem Browser – kein Konto erforderlich.',
        'Farben, Modulstile und Suchmuster anpassen sowie Bildüberlagerungen hinzufügen.',
        'Export in mehreren Formaten: PNG, SVG, WebP und animiertes GIF.',
        'Erweiterte Steuerungsmöglichkeiten für Fehlerkorrekturstufe, QR-Version, Kodierungsmodus und Maskenauswahl.',
        'Leitlinien zur Scansicherheit und Live-Vorschau helfen dabei, dass Codes sowohl in gedruckter Form als auch auf Bildschirmen lesbar bleiben.',
        'Serverseitige API für professionelles Embedding mit vollständiger Parameterunterstützung.',
        'Funktioniert nach dem Laden auch offline – es handelt sich um eine statische Webanwendung, die Sie überall ausführen können.',
      ],
    },
    {
      heading: 'So funktioniert ANQR',
      paragraphs: [
        'ANQR läuft in Ihrem Browser und codiert Ihre Eingabe in eine Standard-QR-Matrix mit Reed-Solomon-Fehlerkorrektur und gibt sie dann in dem von Ihnen gewählten Format aus.',
        'Standardmäßig erfolgt die Generierung lokal in Ihrem Browser. Für den professionellen Einsatz können Sie auch die serverseitige API verwenden, um QR-Codes über URL-Parameter zu generieren – ideal zum Einbetten in Websites, E-Mails oder automatisierte Arbeitsabläufe.',
        'Wenn Sie Overlays oder Animationen hinzufügen, sorgt ANQR für ein ausgewogenes Verhältnis zwischen Styling und Scansicherheit, sodass das Ergebnis weiterhin scannbar bleibt.',
        'ANQR konzentriert sich auf statische Codes (die Daten befinden sich im QR-Code). Wenn Sie einen dynamischen Code (bearbeitbares Ziel) benötigen, können Sie Ihre eigene Weiterleitungs-URL oder Ihren eigenen Kurzlink kodieren.',
      ],
    },
    {
      heading: 'Wer betreibt ANQR?',
      paragraphs: [
        'ANQR wird als unabhängiges Webtool betrieben. Bei Fragen, Supportanfragen oder geschäftlichen Anfragen nutzen Sie bitte die Kontaktseite oder schreiben Sie eine E-Mail.' + CONTACT_EMAIL + '.”',
      ],
    },
    {
      heading: 'Werbung und wie wir frei bleiben',
      paragraphs: [
        'ANQR ist kostenlos nutzbar und wird durch Werbung finanziert. Wir schalten möglicherweise Anzeigen über Google AdSense und/oder andere Werbepartner.',
        'Werbeanbieter können Cookies oder ähnliche Technologien verwenden, um Anzeigen basierend auf Ihren Interessen und Ihrem Surfverhalten zu personalisieren. Sie können Ihre Anzeigeneinstellungen in den Geräteeinstellungen und über die Google-Anzeigeneinstellungen verwalten. Weitere Informationen finden Sie in unserer Datenschutzerklärung.',
        'Wir verkaufen die Inhalte, die Sie in QR-Codes kodieren, nicht. Anzeigen helfen uns, die Kosten für den Betrieb und die Verbesserung des Projekts zu decken.',
      ],
    },
    {
      heading: 'Offene Standards',
      paragraphs: [
        'ANQR generiert QR-Codes auf Basis des ISO/IEC 18004-Standards und strebt eine breite Kompatibilität mit Scannern, Kameras und Druckworkflows an.',
      ],
    },
    {
      heading: 'Markenhinweis',
      paragraphs: [
        'QR Code® ist eine eingetragene Marke von DENSO WAVE INCORPORATED. ANQR ist weder mit DENSO WAVE INCORPORATED verbunden, noch wird es von DENSO WAVE INCORPORATED unterstützt oder gesponsert.',
      ],
    },
    {
      heading: 'Feedback und Beiträge',
      paragraphs: [
        'Wir freuen uns über Feedback, Fehlerberichte und Funktionsvorschläge. Bitte kontaktieren Sie uns per E-Mail oder über das Kontaktformular – wir lesen jede Nachricht, die Antwortzeiten können jedoch variieren.',
      ],
    },
  ],
};

export default about;
