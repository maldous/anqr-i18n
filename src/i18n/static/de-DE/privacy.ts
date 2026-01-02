import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Datenschutzrichtlinie',
  description:
    'Informationen, die ANQR sammelt, wie diese verwendet werden und Ihre Rechte gemäß den geltenden Datenschutzgesetzen.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Zusammenfassung',
      paragraphs: [
        'ANQR ist ein QR-Code-Generator mit einem kundenorientierten Ansatz. Sie müssen kein Konto erstellen. Standardmäßig werden QR-Codes lokal in Ihrem Browser generiert – wir haben keinen Zugriff auf die von Ihnen kodierten Inhalte.',
        'Für den professionellen Einsatz bietet ANQR eine serverseitige API, die QR-Codes aus URL-Parametern generiert. Bei Verwendung der API werden Ihre QR-Inhalte auf unseren Servern verarbeitet, um das Bild darzustellen, jedoch nicht gespeichert oder protokolliert.',
        'Wir nutzen Google AdSense für Werbezwecke und setzen gegebenenfalls Analysedienste ein. Diese Dienste erfassen Informationen mithilfe von Cookies und ähnlichen Technologien. Diese Richtlinie erläutert, welche Daten erfasst werden, wie sie verwendet werden und welche Rechte Sie haben.',
      ],
    },
    {
      heading: 'Informationen, die wir sammeln',
      bullets: [
        'Von Ihnen bereitgestellte Informationen: Wenn Sie uns per E-Mail oder über unser Kontaktformular kontaktieren, erfassen wir Ihren Namen, Ihre E-Mail-Adresse und den Inhalt Ihrer Nachricht.',
        'Automatisch erfasste Informationen: Unser Hosting-Anbieter (Netlify), unsere Werbepartner und Analysedienste können folgende Daten erfassen: IP-Adresse, Browsertyp und -version, Betriebssystem, Gerätetyp, verweisende URL, besuchte Seiten, Verweildauer auf der Website und ungefähre geografische Lage.',
        'Cookies von Drittanbietern: Unsere Werbepartner (Google AdSense) verwenden Cookies und ähnliche Technologien, um Werbung auszuliefern und deren Erfolg zu messen. ANQR selbst setzt keine Erstanbieter-Cookies.',
      ],
    },
    {
      heading: 'Cookies und Technologien von Drittanbietern',
      paragraphs: [
        'ANQR setzt keine Erstanbieter-Cookies. Ihre Einstellungen (wie z. B. der Dunkelmodus) werden lokal auf Ihrem Gerät gespeichert und nicht an einen Server übertragen.',
        'Unsere Werbepartner (Google AdSense) und unser Hosting-Anbieter verwenden jedoch möglicherweise Cookies und ähnliche Tracking-Technologien:',
      ],
      bullets: [
        'Werbe-Cookies (Drittanbieter): Werden von Google AdSense und Werbepartnern gesetzt, um relevante Anzeigen auszuliefern, die Anzeigenleistung zu messen und die Interessen der Nutzer zu verstehen. Diese Cookies können Ihre Aktivitäten auf verschiedenen Websites verfolgen.',
        'Analyse-Cookies (Drittanbieter): Können von unserem Hosting-Anbieter oder Analysediensten verwendet werden, um anonymisierte Nutzungsdaten zu erfassen.',
      ],
    },
    {
      heading: 'Google AdSense und Werbung',
      paragraphs: [
        'Wir schalten Anzeigen über Google AdSense. Google und seine Partner verwenden Cookies, um Anzeigen basierend auf Ihrem Browserverlauf auf dieser und anderen Websites zu schalten (interessenbezogene Werbung).',
        'Erfahren Sie, wie Google Ihre Daten verwendet: https://policies.google.com/technologies/partner-sites',
        'Anzeigenpersonalisierung verwalten: https://adssettings.google.com',
        'Abmeldung über die Network Advertising Initiative: https://optout.networkadvertising.org',
        'Abmeldung über die Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Wie wir Informationen nutzen',
      bullets: [
        'Um Ihre Anfragen zu beantworten und Unterstützung zu leisten.',
        'Um über unsere Werbepartner relevante Werbung anzuzeigen.',
        'Um die Nutzung der Website zu analysieren und unsere Dienstleistungen zu verbessern.',
        'Betrug, Missbrauch und Sicherheitsprobleme aufzudecken, zu verhindern und zu beheben.',
        'Um rechtlichen Verpflichtungen nachzukommen.',
      ],
    },
    {
      heading: 'Dienstleistungen von Drittanbietern',
      bullets: [
        'Google AdSense: Empfängt Daten, um Anzeigen auszuliefern und deren Wirksamkeit zu messen.',
        'Analyseanbieter: Erhalten Sie anonymisierte Nutzungsdaten.',
        'Netlify (Hosting): Verarbeitet Anfragen und protokolliert möglicherweise IP-Adressen.',
        'Wir verkaufen Ihre personenbezogenen Daten nicht. Die Weitergabe von Daten an Werbepartner kann jedoch gemäß CCPA als Verkauf gelten (siehe unten).',
      ],
    },
    {
      heading: 'Datenaufbewahrung',
      bullets: [
        'Kontaktangaben: Bis zu 2 Jahre.',
        'Serverprotokolle: Bis zu 30 Tage (Hosting-Anbieter).',
        'Analysedaten: Bis zu 26 Monate (anonymisiert).',
        'Werbe-Cookies: In der Regel 13 Monate (variiert je nach Partner).',
      ],
    },
    {
      heading: 'Ihre Rechte gemäß DSGVO (Nutzer aus dem EWR)',
      paragraphs: [
        'Wenn Sie sich im Europäischen Wirtschaftsraum befinden, haben Sie gemäß der Datenschutz-Grundverordnung folgende Rechte:',
      ],
      bullets: [
        'Recht auf Auskunft: Fordern Sie eine Kopie der personenbezogenen Daten an, die wir über Sie speichern.',
        'Recht auf Berichtigung: Verlangen Sie die Berichtigung unrichtiger Daten.',
        'Recht auf Löschung: Beantragen Sie die Löschung Ihrer Daten (Recht auf Vergessenwerden).',
        'Recht auf Einschränkung der Verarbeitung: Verlangen Sie Einschränkungen hinsichtlich der Art und Weise, wie wir Ihre Daten verwenden.',
        'Recht auf Datenübertragbarkeit: Fordern Sie Ihre Daten in einem portablen Format an.',
        'Widerspruchsrecht: Widerspruch gegen die Verarbeitung von Daten, auch für Direktmarketingzwecke.',
        'Recht auf Widerruf der Einwilligung: Sie können Ihre Einwilligung jederzeit widerrufen, sofern die Verarbeitung auf Ihrer Einwilligung beruht.',
        'Recht auf Beschwerde: Reichen Sie eine Beschwerde bei Ihrer Datenschutzbehörde ein.',
      ],
    },
    {
      heading: 'Rechtsgrundlage der DSGVO',
      paragraphs: [
        'Wir verarbeiten Daten auf folgenden Grundlagen: (a) Einwilligung – für personalisierte Werbung (verwaltet von unseren Werbepartnern); (b) Berechtigte Interessen – für Analysen, Sicherheit und Verbesserung; (c) Vertrag – zur Beantwortung von Anfragen.',
        'Um Ihre Rechte auszuüben, kontaktieren Sie uns unter ${CONTACT_EMAIL}. Wir antworten innerhalb von 30 Tagen.',
      ],
    },
    {
      heading: 'Ihre Rechte gemäß CCPA (Nutzer in Kalifornien)',
      bullets: [
        'Recht auf Information: Auskunft verlangen über die erhobenen Daten, deren Quellen, Zwecke und Dritte.',
        'Recht auf Löschung: Beantragen Sie die Löschung Ihrer personenbezogenen Daten.',
        'Recht auf Widerspruch: Widerspruch gegen den Verkauf personenbezogener Daten (die Weitergabe an Werbepartner kann darunter fallen).',
        'Recht auf Nichtdiskriminierung: Wir werden Sie nicht diskriminieren, wenn Sie Ihre Rechte ausüben.',
      ],
    },
    {
      heading: 'Erfasste CCPA-Kategorien',
      paragraphs: [
        'Kategorien: Kennungen (IP-Adresse, Geräte-ID), Internetaktivitäten (Browsing, Interaktionen mit Werbung), Geolokalisierung (ungefähr), Rückschlüsse (Interessen aus dem Browsing).',
        'Um Ihre Rechte auszuüben oder sich abzumelden: ${CONTACT_EMAIL} oder passen Sie die Cookie-Einstellungen an.',
      ],
    },
    {
      heading: 'Internationale Transfers',
      paragraphs: [
        'Ihre Daten können in Länder mit unterschiedlichen Datenschutzgesetzen, einschließlich der Vereinigten Staaten, übermittelt werden. Wir verwenden geeignete Schutzmaßnahmen wie Standardvertragsklauseln.',
      ],
    },
    {
      heading: 'Schutz der Privatsphäre von Kindern',
      paragraphs: [
        'ANQR richtet sich nicht an Kinder unter 13 Jahren (bzw. unter 16 Jahren im EWR). Wir erheben wissentlich keine Daten von Kindern. Kontaktieren Sie uns unter ${CONTACT_EMAIL}, wenn Sie glauben, dass ein Kind Informationen angegeben hat.',
      ],
    },
    {
      heading: 'Sicherheit',
      paragraphs: [
        'Wir setzen geeignete technische und organisatorische Maßnahmen zum Schutz von Daten ein, einschließlich HTTPS-Verschlüsselung. Allerdings ist keine Internetübertragung zu 100 % sicher.',
      ],
    },
    {
      heading: 'Nicht verfolgen',
      paragraphs: [
        'Wir respektieren die Do Not Track-Signale der Browser, soweit dies möglich ist, allerdings reagieren Werbepartner möglicherweise nicht auf DNT.',
      ],
    },
    {
      heading: 'Änderungen an dieser Richtlinie',
      paragraphs: [
        'Wir können diese Richtlinie regelmäßig aktualisieren. Das Datum Letzte Aktualisierung gibt die aktuellste Version an. Wesentliche Änderungen werden gegebenenfalls über ein Banner auf der Website bekannt gegeben.',
      ],
    },
    {
      heading: 'Kontaktieren Sie uns',
      paragraphs: [
        'Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte: ${CONTACT_EMAIL} oder nutzen Sie unser Kontaktformular. Wir beantworten Datenschutzanfragen innerhalb von 30 Tagen.',
      ],
    },
  ],
};

export default privacy;
