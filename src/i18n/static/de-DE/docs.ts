import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'ANQR-Benutzerhandbuch',
  description: 'Vollständiger Leitfaden zur Verwendung von ANQR zum Erstellen von QR-Codes.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Erste Schritte',
      paragraphs: [
        'ANQR ist ein QR-Code-Generator mit einem clientseitigen Ansatz. Standardmäßig werden QR-Codes lokal in Ihrem Browser generiert – kein Konto erforderlich und Ihre Daten bleiben privat. Für die professionelle Einbettung können Sie auch die serverseitige API verwenden.',
        'Die Benutzeroberfläche bietet drei Stufen: Basis, Erweitert und Professionell. Wählen Sie Ihre Stufe über die Registerkarten in der Kopfzeile. Jede Stufe schaltet zusätzliche Funktionen frei, während die Benutzeroberfläche weiterhin auf Ihre Bedürfnisse fokussiert bleibt.',
      ],
      bullets: [
        'Grundlagen: Einfache Erstellung von QR-Codes mit Klartext-/URL-Inhalten und Bildüberlagerung.',
        'Erweitert: QR-Codierungsoptionen, Darstellungsstile, Animationen, Ausgabeformate, erweiterte Inhaltstypen und Anpassungsmöglichkeiten für Overlays.',
        'Professionell: Wasserzeichen, Metadaten, Freigabe, Sicherheitsanalyse, Zahlungs-QR-Codes und Unternehmensfunktionen.',
      ],
    },
    {
      heading: 'Schnellstart',
      paragraphs: [
        'So erstellen Sie Ihren ersten QR-Code:',
      ],
      bullets: [
        '1. Wählen Sie einen Inhaltstyp (URL, Text, WLAN usw.) aus dem Dropdown-Menü Inhaltstyp aus.',
        '2. Geben Sie Ihre Daten in die dafür vorgesehenen Felder ein.',
        '3. Farben und Stile können optional angepasst und ein Overlay-Bild hinzugefügt werden.',
        '4. Klicken Sie auf Exportieren, um Ihren QR-Code als PNG, GIF, WebP oder SVG herunterzuladen.',
      ],
    },
    {
      heading: 'Grundfunktionen',
      paragraphs: [
        'Die Basisversion bietet eine optimierte Benutzeroberfläche zum Erstellen von QR-Codes mit Nutzdaten und Bildüberlagerungen. Dies ist der einfachste Weg, um loszulegen.',
      ],
    },
    {
      heading: 'Inhaltstypen (Grundlagen)',
      paragraphs: [
        'Klartext: Codieren Sie beliebigen Text bis zur Kapazitätsgrenze des QR-Codes. Ideal für kurze Nachrichten, Codes oder Kennungen.',
        'URL: Webadressen kodieren. Der QR-Code öffnet die URL beim Scannen. Unterstützt die Protokolle http:// und https://.',
      ],
    },
    {
      heading: 'Bildüberlagerung (Grundlagen)',
      paragraphs: [
        'Laden Sie ein Bild (JPG, PNG, GIF, WebP) hoch, das mit Ihrem QR-Code kombiniert werden soll. Zu den grundlegenden Overlay-Funktionen gehören:',
      ],
      bullets: [
        'Aus Datei hochladen: Wählen Sie ein Bild von Ihrem Gerät aus.',
        'Von URL laden: Geben Sie eine Bild-URL ein (CORS muss aktiviert sein).',
        'Logo zentrieren: Platziert das Bild in der Mitte und setzt auf Fehlerkorrektur.',
        'Überblenden: Einfaches Alpha-Überblenden eines Bildes mit einem QR-Code-Muster.',
        'Intensität: Steuert, wie stark die Überlagerung den QR-Code beeinflusst (0-100%).',
        'Farbmodus: Vollfarbe, Graustufen oder Schwarzweiß.',
        'Findermuster beibehalten: Eckmuster bleiben für zuverlässiges Scannen unverändert.',
      ],
    },
    {
      heading: 'Erweiterte Funktionen',
      paragraphs: [
        'Die Advanced-Stufe schaltet QR-Codierungsoptionen, Darstellungsstile, Animationen, Ausgabeformate, erweiterte Inhaltstypen und erweiterte Overlay-Anpassungsmöglichkeiten frei.',
      ],
    },
    {
      heading: 'QR-Codierungseinstellungen',
      paragraphs: [
        'Version: QR-Codes gibt es in den Versionen 1–40, wobei höhere Versionen mehr Daten speichern, aber auch größer sind. Stellen Sie den Wert auf 0 (Auto), damit ANQR die kleinste Version auswählt, die zu Ihrem Inhalt passt.',
        'Fehlerkorrektur: Bestimmt, wie viel Schaden ein QR-Code erleiden kann, ohne an Scanbarkeit einzubüßen.',
      ],
      bullets: [
        'L (Niedrig): 7 % Fehlerkorrektur – kleinste Größe, geringste Redundanz.',
        'M (Mittel): 15 % Fehlerkorrektur – ausgewogene Option.',
        'Q (Quartil): 25 % Fehlerkorrektur – gut für gedruckte Codes.',
        'H (Hoch): 30 % Fehlerkorrektur – am besten geeignet für Codes mit Überlagerungen oder unter schwierigen Bedingungen.',
      ],
    },
    {
      heading: 'Ruhezone (Marge)',
      paragraphs: [
        'Die Ruhezone ist der weiße Bereich um den QR-Code herum. Scanner benötigen diesen Rand, um den Beginn des Codes zu erkennen. Der Standard empfiehlt mindestens 4 Module. Eine Reduzierung auf unter 4 kann zu Scanproblemen führen.',
      ],
    },
    {
      heading: 'Modulstil',
      paragraphs: [
        'Module sind die einzelnen Quadrate, aus denen ein QR-Code besteht. ANQR bietet fünf Stile an:',
      ],
      bullets: [
        'Quadratisch: Klassisches QR-Code-Design mit scharfen Ecken.',
        'Abgerundet: Weiche Ecken für ein freundlicheres Aussehen.',
        'Punkte: Kreisförmige Module für eine moderne Ästhetik.',
        'Diamant: Um 45° gedrehte Quadrate für ein unverwechselbares Muster.',
        'Verbunden: Angrenzende Module verschmelzen und bilden so organische Formen.',
      ],
    },
    {
      heading: 'Finder Pattern Style',
      paragraphs: [
        'Die Suchmuster sind die drei großen Quadrate in den Ecken des QR-Codes, die Scannern helfen, den Code auszurichten. Verfügbare Stile:',
      ],
      bullets: [
        'Quadratisch: Standardmäßige quadratische Ecken.',
        'Abgerundet: Abgerundete Ecken, passend zum abgerundeten Modulstil.',
        'Kreis: Kreisförmige Suchmuster für punktförmige Codes.',
      ],
    },
    {
      heading: 'Ausrichtungs- und Timingmuster',
      paragraphs: [
        'In größeren QR-Codes (Version 2+) werden Ausrichtungsmuster verwendet, um Verzerrungen zu korrigieren. Timing-Muster sind die abwechselnden Linien, die die Suchmuster verbinden.',
      ],
      bullets: [
        'Ausrichtungsstil: Passfinder, Quadrat, Abgerundet oder Kreis.',
        'Zeitstil: Modulgleich, durchgezogen oder gestrichelt.',
      ],
    },
    {
      heading: 'Farben',
      paragraphs: [
        'Vordergrund: Die Farbe der QR-Module. Schwarz (#000000) ist Standard, aber jede dunkle Farbe ist möglich.',
        'Hintergrund: Die Hintergrundfarbe. Weiß (#ffffff) ist Standard. Achten Sie auf ausreichenden Kontrast zum Vordergrund.',
        'Transparenter Hintergrund: Entfernen Sie den Hintergrund vollständig, wenn Sie die Anwendung auf farbigen Oberflächen durchführen. Stellen Sie sicher, dass die Oberfläche einen ausreichenden Kontrast bietet.',
      ],
    },
    {
      heading: 'Modulgröße & Lücke',
      paragraphs: [
        'Modulgröße: Steuert, wie groß jedes Modul in Pixeln dargestellt wird. Größere Werte erzeugen größere, besser lesbare Codes.',
        'Modulabstand: Fügt den Abstand zwischen Modulen als Prozentsatz hinzu. Kleine Abstände (5-15 %) können die Scanbarkeit unter bestimmten Bedingungen verbessern, aber zu große Abstände verringern die Zuverlässigkeit.',
      ],
    },
    {
      heading: 'Ausgabeeinstellungen',
      paragraphs: [
        'Format: Wählen Sie Ihr Exportformat je nach Anwendungsfall.',
      ],
      bullets: [
        'PNG: Verlustfreies Rasterformat, ideal für die meisten Anwendungen. Am besten geeignet für Druck und digitale Medien.',
        'WebP: Modernes Format mit kleineren Dateigrößen. Gut geeignet für die Webnutzung.',
        'GIF: Erforderlich für animierte QR-Codes. Unterstützt Transparenz.',
        'SVG: Vektorformat, das sich unendlich skalieren lässt. Am besten geeignet für große Ausdrucke oder wenn der Code bearbeitet werden muss.',
      ],
    },
    {
      heading: 'Ausgabedimensionen',
      paragraphs: [
        'Breite/Höhe: Legen Sie die Ausgabegröße in Pixeln fest. Für den Druck berechnen Sie die Größe anhand der DPI-Zahl (z. B. 300 DPI bei 1 Zoll = 300 px). Größere Formate lassen sich aus der Entfernung zuverlässiger scannen.',
      ],
    },
    {
      heading: 'Animationseinstellungen (Erweitert)',
      paragraphs: [
        'Steuerung des Verhaltens animierter QR-Codes:',
      ],
      bullets: [
        'Geschwindigkeit: Animationsbildrate in Millisekunden.',
        'Schleife: Kontinuierliche oder einmalig abgespielte Animation.',
        'Bounce: Regieanweisung für Ping-Pong-Animationen.',
        'Startbild: Animation ab einem bestimmten Bild beginnen.',
        'Maximale Frameanzahl: Begrenzen Sie die Gesamtzahl der Frames in der Animation.',
        'Frame Step: Frames überspringen für schnellere Animation.',
        'Interpolation: Keine, Überblendung oder Morphing zwischen den Frames.',
      ],
    },
    {
      heading: 'Inhaltstypen (Fortgeschritten)',
      paragraphs: [
        'Fortgeschrittenes Level schaltet zusätzliche Nutzlastformate frei:',
      ],
      bullets: [
        'Telefonnummer (tel:): Stellt eine anrufbare Telefonverbindung her.',
        'E-Mail (mailto:): Öffnet den E-Mail-Client mit optionalem Betreff und Nachrichtentext.',
        'SMS: Vorausgefüllte Textnachricht an eine Telefonnummer.',
        'vCard: Vollständige Kontaktkarte mit Name, Organisation, Telefonnummer, E-Mail-Adresse und Anschrift.',
        'MeCard: Kompaktes Kontaktformat, das in Japan beliebt ist.',
        'BizCard: Das traditionelle Visitenkartenformat.',
        'Geolokalisierung: GPS-Koordinaten, die sich in Karten öffnen.',
        'WiFi: Netzwerkzugangsdaten für die automatische Verbindung (SSID, Passwort, Sicherheitstyp).',
        'Kalenderereignis: iCalendar-Format mit Titel, Ort, Datum/Uhrzeit.',
        'Veranstaltungs-RSVP: Link zur Veranstaltungsregistrierungsseite.',
        'Kalender abonnieren: Abonnieren Sie einen ICS/WebCal-Feed.',
        'Datei-/Dokument-URL: Direkter Link zu herunterladbaren Dateien.',
        'Cloud-Speicher-Link: Links zu Google Drive, Dropbox, OneDrive usw.',
        'Soziales Profil: Links zu LinkedIn, Twitter, Instagram usw.',
        'Messaging-Link: WhatsApp, Telegram, Signal Deep Links.',
      ],
    },
    {
      heading: 'Erweiterte Overlay-Funktionen',
      paragraphs: [
        'Zusätzliche Overlay-Funktionen:',
      ],
      bullets: [
        'Zuschneiden: Aktivieren Sie die Zuschneidefunktion, um einen quadratischen Bereich Ihres Bildes auszuwählen.',
        'Halbton: Klassisches Punktmuster im Druckstil, basierend auf der Bildhelligkeit.',
        'Dithered: Error-diffusion dithering for detailed reproduction.',
      ],
    },
    {
      heading: 'Überlagerungsmodi (Erweitert)',
      paragraphs: [
        'Zusätzliche Mischmodi im fortgeschrittenen Modus:',
      ],
      bullets: [
        'Subpixel: Unterteilt jedes Modul in Subpixel für eine höhere Detailgenauigkeit.',
        'Blaues Rauschen: Nutzt blaues Rauschen-Dithering für artefaktfreie Muster.',
        'Mosaik: Kachelbasierter Effekt zur Erhaltung der Bildstruktur.',
        'Lückenfüllung: Fügt Bilder in die Lücken zwischen den Modulen ein.',
        'Helligkeit: Die Modulgröße variiert je nach Bildhelligkeit.',
        'Duoton: Bild wird in zwei Farben umgewandelt, um einen markanten Kontrast zu erzielen.',
      ],
    },
    {
      heading: 'Overlay-Intensität',
      paragraphs: [
        'Steuert, wie stark die Überlagerung den QR-Code beeinflusst (0–100 %). Höhere Werte zeigen mehr Bilddetails, können aber die Scanbarkeit beeinträchtigen. Beginnen Sie mit etwa 70 % und passen Sie den Wert basierend auf Tests an.',
      ],
    },
    {
      heading: 'Farbmodus',
      paragraphs: [
        'Wie das Overlay-Bild verarbeitet wird:',
      ],
      bullets: [
        'Vollfarbe: Erhält die Originalfarben des Bildes.',
        'Graustufen: Wandelt in Schwarz- und Weißtöne um.',
        'Schwarzweiß: Binärkonvertierung mit hohem Kontrast.',
      ],
    },
    {
      heading: 'Findermuster beibehalten',
      paragraphs: [
        'Wenn diese Option aktiviert ist, bleiben die drei Ecksuchmuster durch die Überlagerung unverändert. Für zuverlässiges Scannen dringend empfohlen.',
      ],
    },
    {
      heading: 'Bildvorverarbeitung',
      paragraphs: [
        'Wenden Sie Filter auf Ihr Overlay-Bild an, bevor Sie es überblenden. Diese Anpassungen können das Erscheinungsbild des Bildes im endgültigen QR-Code verbessern.',
      ],
      bullets: [
        'Helligkeit (-100 bis +100): Bild aufhellen oder abdunkeln.',
        'Kontrast (-100 bis +100): Tonwertumfang erhöhen oder verringern.',
        'Gamma (0,2 bis 3,0): Nichtlineare Helligkeitsanpassung. Werte unter 1 hellen die Mitteltöne auf, Werte über 1 dunkeln sie ab.',
        'Sättigung (-100 bis +100): Farbintensität. -100 entspricht Graustufen, +100 entspricht Übersättigung.',
        'Farbton drehen (0-360°): Alle Farben auf dem Farbkreis verschieben.',
        'Weichzeichnen (0-20px): Bilddetails weicher machen.',
        'Schärfen (0-100%): Kanten und Details hervorheben.',
        'Posterisieren (0-16 Stufen): Reduzieren Sie die Farbstufen für einen Postereffekt.',
        'Schwellenwert (0-255): Umwandlung in binäres Schwarz/Weiß am Grenzwert.',
        'Kantenerkennung: Sobel- oder Canny-Algorithmen zur Anzeige von Kanten.',
        'Invertieren: Alle Farben umkehren.',
      ],
    },
    {
      heading: 'Fit-Modus',
      paragraphs: [
        'Wie das Overlay-Bild in den QR-Code-Bereich passt:',
      ],
      bullets: [
        'Titelbild: Das Bild füllt die gesamte Fläche aus, bei Bedarf wird es beschnitten.',
        'Enthalten: Das gesamte Bild ist sichtbar, kann Ränder haben.',
        'Strecken: Das Bild wird verzerrt, um die Fläche exakt auszufüllen.',
      ],
    },
    {
      heading: 'Transformationsoptionen',
      paragraphs: [
        'Rotation: Drehen Sie die Überlagerung in 90°-Schritten.',
        'X/Y spiegeln: Spiegeln Sie das Bild horizontal oder vertikal.',
      ],
    },
    {
      heading: 'Dithering-Algorithmen',
      paragraphs: [
        'Dithering wandelt Bilder mit kontinuierlichen Farbtönen in Muster um, die QR-Codes darstellen können. Verfügbar bei Verwendung der Mischmodi Dithered, Blue Noise oder True Dither.',
      ],
      bullets: [
        'Fehlerdiffusion: Klassischer Floyd-Steinberg-Stil. Verteilt den Quantisierungsfehler auf benachbarte Pixel.',
        'Geordnet (Bayer): Verwendet eine Schwellenwertmatrix für regelmäßige Muster.',
        'Clustered Dot: Simuliert Halbtondruck.',
        'Void & Cluster: Optimiertes geordnetes Dithering.',
        'Blaues Rauschen: Optisch angenehmes, zufällig wirkendes Muster.',
        'Blue Noise Threshold: Threshold dithering with blue noise texture.',
        'Weißes Rauschen: Zufälliges Schwellenwertdithering.',
        'Gaußsches/Dreiecksrauschen: Rauschen mit unterschiedlichen Verteilungen.',
        'Blaues Rauschen + Fehlerdiffusion: Hybrid, der beide Techniken kombiniert.',
        'Geschirmtes blaues Rauschen: Bildschirmähnliches blaues Rauschmuster.',
        'Wahrnehmung: Luminanzgewichtet für bessere visuelle Ergebnisse.',
        'Kantenbewusst: Erhält Bildkanten beim Dithering.',
        'Adaptive Schwellenwertbestimmung: Lokal-adaptive Schwellenwertbildung.',
        'Temporales blaues Rauschen: Bei animierten GIFs variiert das Muster pro Frame.',
      ],
    },
    {
      heading: 'Diffusionskerne',
      paragraphs: [
        'Bei Verwendung von Error Diffusion Dithering wählen Sie, wie der Fehler verteilt wird:',
      ],
      bullets: [
        'Floyd-Steinberg: Klassische 4-Nachbar-Diffusion. Eine gute allgemeine Wahl.',
        'Jarvis-Judice-Ninke: 12-Nachbar, glatter, aber langsamer.',
        'Stucki: Ähnlich wie JJN, jedoch mit unterschiedlichen Gewichten.',
        'Burkes: Vereinfachtes JJN, schneller.',
        'Sierra: Eine Familie von Maiskörnern, die Qualität und Geschwindigkeit in Einklang bringen.',
        'Atkinson: Lichtstreuung, erhält Details, kann aber körnig wirken.',
      ],
    },
    {
      heading: 'Ditherstärke',
      paragraphs: [
        'Steuert, wie stark das Dithering angewendet wird (0-100%). Niedrigere Werte erhalten mehr vom ursprünglichen Muster, höhere Werte zeigen mehr Bilddetails.',
      ],
    },
    {
      heading: 'Subpixel-Einstellungen',
      paragraphs: [
        'Bei Verwendung des Subpixel-Überblendmodus:',
      ],
      bullets: [
        'Rastergröße: 2×2, 3×3 oder 4×4 Subpixel pro Modul. Höher = mehr Details.',
        'Mittlere Regel: Streng erfordert, dass das mittlere Subpixel dem Modul entspricht. Halbton-Mittlere Regel erlaubt Abweichungen.',
        'Neutrale Farbe: Farbe, die für nicht bestimmte Subpixel verwendet wird.',
        'Finder-Override: Wie Suchmuster gerendert werden (Vollton oder Stilisiert).',
      ],
    },
    {
      heading: 'Halbtoneinstellungen',
      paragraphs: [
        'Bei Verwendung des Halbton-Überblendmodus:',
      ],
      bullets: [
        'Zellengröße: Pro Modul oder N×N-Gitter.',
        'Punktform: Kreis, Quadrat oder Linie.',
        'Helligkeitskurve: Linear, S-Kurve oder Gamma.',
      ],
    },
    {
      heading: 'Duotone Farben',
      paragraphs: [
        'Bei Verwendung des Duotone-Mischmodus müssen die Schattenfarbe (dunkle Bereiche) und die Lichterfarbe (helle Bereiche) festgelegt werden.',
      ],
    },
    {
      heading: 'GIF-Animationseinstellungen',
      paragraphs: [
        'Bei der Verwendung animierter GIF-Overlays:',
      ],
      bullets: [
        'Frameverzögerungen verwenden: Das ursprüngliche GIF-Timing beachten.',
        'Maximale FPS: Begrenzen Sie die Bildrate (1-60 fps).',
        'Entsorgung: Bestehende Entsorgungsmethoden für Rahmen beachten oder vereinfachen.',
      ],
    },
    {
      heading: 'Erweiterte Rendering-Optionen',
      paragraphs: [
        'Zusätzliche Rendering-Steuerungsoptionen:',
      ],
      bullets: [
        'Spaltmodus: Kein Spalt, Eingesetzter Spalt, Kontur oder Negativer Raum als Spaltgestaltung.',
        'Eckenradius: Prozentsatz der abgerundeten Ecken für Module.',
        'Gradient: Keiner, linearer, radialer oder konischer Gradient auf Modulen.',
        'Äußere/innere Ösen: Unabhängige Gestaltung für Finder-Musterringe.',
        'Punktrotation: Diamant-/Punktmodule drehen.',
        'Augenskala: Größenanpassung für Suchermuster.',
        'Rahmenstil: Dekorative Rahmen hinzufügen (Abgerundeter Rahmen, Aufkleber, Anhänger).',
        'Rahmentext: Fügen Sie Rahmen Text wie Scannen Sie mich! hinzu.',
      ],
    },
    {
      heading: 'Erweiterte QR-Codierung',
      paragraphs: [
        'Feinabstimmung der QR-Codierung:',
      ],
      bullets: [
        'Kodierungsmodus: Auto, Numerisch, Alphanumerisch, Byte/UTF-8 oder Kanji.',
        'Mindestruhezone einhalten: Mindestens 4 Module Abstand gewährleisten.',
      ],
    },
    {
      heading: 'Erweiterte Ausgabeoptionen',
      paragraphs: [
        'Zusätzliche Exporteinstellungen:',
      ],
      bullets: [
        'Dateiname: Benutzerdefinierter Dateiname für Downloads.',
        'GIF-Palettegröße: 2–256 Farben in der GIF-Ausgabe.',
        'GIF-Quantisierung: Median Cut, NeuQuant oder Octree-Farbreduktion.',
        'GIF-Dithering: Aus, Floyd-Steinberg oder bestellt.',
        'GIF Transparente Farbe: Legen Sie fest, dass eine Farbe transparent sein soll.',
        'SVG True Vector: Verwenden Sie Pfade anstelle von eingebettetem Raster.',
        'SVG-Formpräzision: Pixelgenaues oder präzises Pfadrendering.',
        'SVG-Rasterüberlagerung einbetten: Überlagerung als eingebettetes Bild einbinden.',
        'Hintergrundüberschreibung: Erzwingt eine bestimmte Hintergrundfarbe in der Ausgabe.',
      ],
    },
    {
      heading: 'Validierungsoptionen',
      paragraphs: [
        'Einstellungen für die Eingabeverarbeitung:',
      ],
      bullets: [
        'Eingabe validieren: Inhaltsformat vor der Kodierung prüfen.',
        'Leerzeichen entfernen: Führende und nachfolgende Leerzeichen beseitigen.',
        'Zeilenumbrüche normalisieren: Alle Zeilenenden in LF umwandeln.',
        'Maximale Längenkontrolle: Warnung, wenn der Inhalt die QR-Kapazität überschreitet.',
      ],
    },
    {
      heading: 'Professionelle Funktionen',
      paragraphs: [
        'Die Professional-Version bietet zusätzlich Wasserzeichen, Metadaten, Freigabeoptionen, Sicherheitsanalysen, Zahlungs-QR-Codes und Enterprise-Funktionen.',
      ],
    },
    {
      heading: 'Wasserzeichen',
      paragraphs: [
        'Fügen Sie Ihren QR-Codes Wasserzeichen hinzu:',
      ],
      bullets: [
        'Art: Wasserzeichen in Form von Text, Bild oder Muster.',
        'Position: Mitte, Ecken, Ränder, dahinter oder Ruhezone.',
        'Deckkraft: Transparenz des Wasserzeichens (0-100%).',
        'Überblendungsmodus: Normal, Multiplizieren, Negativ multiplizieren oder Überlagern.',
      ],
    },
    {
      heading: 'Metadaten',
      paragraphs: [
        'Metadaten in exportierte Dateien einbetten:',
      ],
      bullets: [
        'Felder für Titel, Autor, Urheberrecht, Lizenz und Beschreibung.',
        'Erstellungszeitpunkt: Zeitstempel der Einbettung.',
        'Benutzerdefinierte Schlüssel-Wert-Paare: Fügen Sie beliebige Metadatenpaare hinzu.',
      ],
    },
    {
      heading: 'Teilen',
      paragraphs: [
        'Teilen Sie Ihre QR-Code-Konfigurationen:',
      ],
      bullets: [
        'Direktlink: Generieren Sie eine teilbare URL mit Ihren aktuellen Einstellungen.',
        'HTML einbetten: Einbettungscode für Webseiten abrufen.',
        'Parameter kodieren: Alle Einstellungen in die Freigabe-URL einbeziehen.',
        'Hinweis: Overlay-Bilder aus lokalen Dateien können nicht über eine URL geteilt werden.',
      ],
    },
    {
      heading: 'Sicherheitsanalyse',
      paragraphs: [
        'Sicherstellen, dass QR-Codes scannbar bleiben:',
      ],
      bullets: [
        'Sicherheitsmodus: Aus, Ausgewogen oder Strenge Scananforderungen.',
        'Minimale Modulgröße: Minimale Pixelgröße pro Modul.',
        'Mindestruhezone: Module mit minimaler Marge.',
        'Schlossfinder/Timing/Ausrichten/Format/Version: Bestimmte Elemente schützen.',
        'Maximale Überlagerungsintensität durch ECC: Automatische Intensitätsbegrenzungen basierend auf dem Fehlerkorrekturniveau.',
      ],
    },
    {
      heading: 'Inhaltsarten (Professionell)',
      paragraphs: [
        'Professionelles Niveau fügt kostenpflichtige und unternehmensweite Inhaltstypen hinzu:',
      ],
      bullets: [
        'EPC/SEPA (EU): Europäische Banküberweisungs-QR-Codes mit IBAN, BIC, Betrag, Verwendungszweck.',
        'UPI (Indien): Einheitliche Zahlungsschnittstelle mit VPA, Zahlungsempfängername, Betrag.',
        'PayNow (Singapur): Schnelles Bezahlen in Singapur mit UEN oder Handynummer.',
        'PromptPay (Thailand): Thailändisches nationales Zahlungssystem.',
        'PIX (Brasilien): Brasilianische Sofortzahlung mit PIX-Schlüssel.',
        'Krypto: Bitcoin-, Ethereum- und Litecoin-Zahlungsadressen mit optionalem Betrag.',
        'Link zur Marketingkampagne: URLs mit vollständigem UTM-Parameter-Tracking (Marketing-Tags).',
        'Kurzlink: Zur Verwendung mit URL-Kürzern für dynamische/verfolgbare QR-Codes.',
        'GS1 Digital Link: Produktidentifizierung mit GTIN, Seriennummer, Charge, Verfallsdatum.',
        'App Deep Link: iOS/Android App Deep Links mit benutzerdefinierten Schemata.',
        'Benutzerdefiniertes Format: Rohdaten ohne Formatierung oder Validierung.',
      ],
    },
    {
      heading: 'Sprachrelevante Zahlungen im erweiterten Modus',
      paragraphs: [
        'Im erweiterten Modus zeigt ANQR automatisch die für Ihre gewählte Sprache relevanten Zahlungsmethoden an. Vietnamesische Nutzer sehen beispielsweise VietQR, thailändische Nutzer PromptPay und Nutzer indischer Sprachen UPI und BharatQR. Globale Zahlungsmethoden (Kryptowährungen, PayPal, Cash App) stehen in allen Sprachen zur Verfügung. Der professionelle Modus schaltet alle Zahlungsstandards unabhängig von der Sprache frei.',
      ],
    },
    {
      heading: 'Europäische Zahlungsstandards',
      bullets: [
        'EPC/SEPA (EU): Europäische QR-Codes für Banküberweisungen gemäß dem EPC-QR-Code-Standard. Unterstützt IBAN, BIC (optional für Inlandsüberweisungen), Betrag in EUR sowie strukturierte und unstrukturierte Zahlungsreferenzen. Wird in der gesamten SEPA-Zone verwendet, einschließlich der EU-Länder sowie der Schweiz, Norwegens, Islands, Liechtensteins, Monacos und San Marinos.',
        'Schweizer QR-Rechnung: Schweizer Zahlungsstandard gemäß den SIX-Implementierungsrichtlinien. Unterstützt CHF und EUR, QR-Referenz (QRR), Gläubigerreferenz (ISO 11649), strukturierte Gläubiger-/Schuldneradressen und Rechnungsinformationen. Seit 2022 für Schweizer Rechnungen erforderlich.',
      ],
    },
    {
      heading: 'Indische Zahlungsstandards',
      bullets: [
        'UPI (Indien): Einheitliche Zahlungsschnittstelle gemäß NPCI Deep Linking Spezifikation. Unterstützt VPA (Virtuelle Zahlungsadresse), Empfängernamen, Betrag in INR, Transaktionsnotiz, Referenz-ID, Händlerkategoriecode und Transaktionsmodus.',
        'BharatQR (Indien): Einheitlicher QR-Standard, der sowohl UPI- als auch kartenbasierte Zahlungen unterstützt. Kombiniert UPI VPA mit der Karten-PAN für maximale Kompatibilität. Enthält Händlername, Stadt, MCC, GST-Details und Rechnungs-/Referenznummern.',
      ],
    },
    {
      heading: 'Zahlungsstandards in Südostasien',
      bullets: [
        'PayNow (Singapur): Singapurs schnelles Zahlungssystem, das die EMVCo-QR-Spezifikation mit SGQR-Profil nutzt. Unterstützt UEN (Unternehmensregistrierung), Mobiltelefonnummer oder NRIC als Proxy-Identifikatoren. Enthält eine Option zur Bearbeitung des Betrags und ein Ablaufdatum.',
        'PromptPay (Thailand): Thailändisches nationales Zahlungssystem gemäß dem EMV-Profil der Bank von Thailand. Unterstützt Mobiltelefonnummer, nationale ID, Steuer-ID, E-Wallet-ID und Rechnungszahlung mit mehreren Referenzfeldern.',
        'QRIS (Indonesien): Quick Response Code Indonesian Standard. EMV-basierter nationaler Zahlungsstandard, der Händler-ID, NMID (National Merchant ID), Händlerkriterienklassifizierung und Servicegebühren (fest oder prozentual) unterstützt.',
        'DuitNow (Malaysia): Malaysisches Sofortzahlungssystem. Unterstützt verschiedene Proxy-Typen, darunter NRIC, Mobiltelefonnummer, Reisepass, Armeeausweis und Handelsregisternummer.',
        'VietQR (Vietnam): Vietnamesischer Interbanken-Überweisungsstandard. Erfordert die Bank-BIN (NAPAS-Identifikation) und die Kontonummer. Unterstützt mehrere Servicecodes für verschiedene Überweisungsarten (QRPUSH, QRIBFTTA, QRIBFTTC).',
        'QR Ph (Philippinen): Philippinischer QR-Zahlungsstandard für InstaPay und PESONet. Verwendet Kontonummern mit Händleridentifikation für P2M-Transaktionen (Person-zu-Händler).',
      ],
    },
    {
      heading: 'Ostasiatische Zahlungsstandards',
      bullets: [
        'TWQR (Taiwan): Taiwanesischer QR-Zahlungsstandard. Unterstützt Händler-ID, Steuer-ID und TWD-Beträge.',
        'HKQR/FPS (Hongkong): QR-Codes des Hong Kong Faster Payment System. Unterstützt FPS-ID, Mobiltelefonnummer oder E-Mail-Adresse als Zahlungsidentifikatoren. Beträge in HKD.',
        'JPQR (Japan): Japanischer einheitlicher QR-Code-Zahlungsstandard. Verwendet die Händler-ID zur Händleridentifizierung mit JPY-Beträgen.',
      ],
    },
    {
      heading: 'Andere regionale Zahlungsstandards',
      bullets: [
        'PIX (Brasilien): Sofortzahlungssystem der brasilianischen Zentralbank gemäß BR-Code-Spezifikation. Unterstützt PIX-Schlüssel (CPF, CNPJ, E-Mail, Telefonnummer oder Zufallsschlüssel), Händlername/Stadt, Transaktions-ID und BRL-Beträge.',
        'AusPayNet/NPP PayID (Australien): Australisches PayID-System der neuen Zahlungsplattform. Unterstützt PayID-Typen (E-Mail, Mobiltelefonnummer, ABN, Organisations-ID) oder die traditionelle BSB + Kontonummer. Der Händlername ist optional, da Zahler den registrierten Namen aus der NPP-Suche sehen.',
      ],
    },
    {
      heading: 'Zahlungen mit Kryptowährung',
      bullets: [
        'Bitcoin/Litecoin (BIP-21): Standardisierte Kryptowährungs-Zahlungs-URIs mit Wallet-Adresse, optionalem Betrag und Bezeichnung. Kompatibel mit allen gängigen Bitcoin- und Litecoin-Wallets.',
        'Lightning Network (BOLT11): Zahlungsrechnungen für Lightning Network. Fügen Sie eine BOLT11-kodierte Rechnungszeichenfolge ein, um Bitcoin-Zahlungen sofort und mit minimalen Gebühren zu erhalten.',
        'Ethereum (EIP-681): Ethereum-Transaktionsanforderungs-URIs zur Unterstützung nativer ETH-Transfers und ERC-20-Token-Transfers. Enthält die Chain-ID für die Unterstützung mehrerer Netzwerke (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), Gasparameter und Vertragsfunktionsaufrufe.',
      ],
    },
    {
      heading: 'Zahlungsverbindungsdienste',
      bullets: [
        'PayPal.Me: PayPal-Zahlungslinks mit Benutzername und optional vorausgefülltem Betrag. Empfänger können per PayPal-Guthaben, Karte oder Bankkonto bezahlen.',
        'Cash App: Zahlungslinks der Cash App verwenden $cashtag mit optionalem Betrag. Beliebt in den Vereinigten Staaten für Peer-to-Peer-Zahlungen.',
      ],
    },
    {
      heading: 'Generischer EMV-QR-Code',
      bullets: [
        'EMV Generic: Erstellen Sie benutzerdefinierte EMV-QR-Codes im Händler-Präsentationsmodus für nicht explizit aufgeführte Zahlungssysteme. Konfigurieren Sie Händlername, Stadt, Ländercode (ISO 3166-1), Währungscode (ISO 4217 numerisch), MCC, Trinkgeld-/Bearbeitungsgebührenoptionen und zusätzliche Datenfelder. Nützlich für Tests oder benutzerdefinierte Integrationen.',
      ],
    },
    {
      heading: 'Überlagerungsmodi (Professionell)',
      paragraphs: [
        'Zusätzliche Mischmodi in der Profi-Stufe:',
      ],
      bullets: [
        'Pixelate: Pixelierter Überlagerungseffekt.',
        'Übersicht: Kantendetektionsüberlagerung, die nur Konturen anzeigt.',
        'Welle: Wellenförmiger Verzerrungseffekt.',
        'Subpixelgröße: Variable Subpixelgröße basierend auf dem Bild.',
        'Echtes Dithering: Fortschrittliches Dithering mit geordneter Matrixauswahl.',
        'Extrem: Maximale Bildsichtbarkeit, kann die Scanbarkeit beeinträchtigen.',
      ],
    },
    {
      heading: 'Schutzeinstellungen',
      paragraphs: [
        'Feingranulare Kontrolle darüber, welche QR-Elemente vor Überlagerungsmodifikationen geschützt werden:',
      ],
      bullets: [
        'Timing beibehalten: Timingmuster unverändert lassen.',
        'Ausrichtung beibehalten: Ausrichtungsmuster unverändert lassen.',
        'Formatinformationen schützen: Formatinformationsmodule abschirmen.',
        'Versionsinformationen schützen: Versionsinformationsmodule abschirmen.',
      ],
    },
    {
      heading: 'ECC-fähiger Modus',
      paragraphs: [
        'Verteilt die Overlay-Intensität intelligent basierend auf der Fehlerkorrekturkapazität. Das System analysiert, welche Module unter Beibehaltung der Scanbarkeit modifiziert werden können.',
      ],
      bullets: [
        'Risikobudget: Prozentsatz der zu nutzenden Fehlerkorrekturkapazität (0-100%).',
        'Höheres Budget = besser sichtbare Überlagerung, aber geringeres Scanrisiko.',
        'Niedrigeres Budget = sichereres Scannen, aber weniger sichtbare Überlagerung.',
      ],
    },
    {
      heading: 'Professionelle Rendering-Optionen',
      paragraphs: [
        'Erweiterte Rendering-Steuerung:',
      ],
      bullets: [
        'Scharfe Kanten: Verwenden Sie pixelbasierte Bildwiedergabe für scharfe Modulkanten.',
        'Pixel-Snap: Pixelausrichtung am Boden, rund oder an der Decke.',
        'Farbmodus pro Modul: Einfarbig, Nach Helligkeit, Nach Position, Nach Überlagerung, Nach Cluster.',
        'Farbpalette: Definieren Sie eine benutzerdefinierte Farbpalette für die Farbgebung pro Modul.',
        'Kontrastschutz: Gewährleistet ein minimales Kontrastverhältnis zwischen den Farben.',
        'Mindestkontrastverhältnis: Kontrastanforderung gemäß WCAG (1:1 bis 21:1).',
        'Zusätzliche Grenzmodule: Zusätzliche Grenze jenseits der Ruhezone.',
      ],
    },
    {
      heading: 'Professionelle Ausgabeoptionen',
      paragraphs: [
        'Exporteinstellungen für Unternehmen:',
      ],
      bullets: [
        'DPI: Druckauflösung einstellen (72–600 DPI). Für den Druck werden 300 DPI empfohlen.',
        'Ruhezone einbeziehen: Ruhezone in den Ausgabedimensionen umschalten.',
        'Exportieren als zusätzliches Format: PDF neben dem primären Format generieren.',
      ],
    },
    {
      heading: 'Animationseinstellungen (Professionell)',
      paragraphs: [
        'Zusätzliche professionelle Animationsfunktionen:',
      ],
      bullets: [
        'Temporales Dithering: Aus, Blaues Rauschen oder Flicker-sicheres Dithering pro Frame.',
        'Muster: Keins, Puls, Welle, Scanlinie, Schimmer oder Drift-Effekte.',
      ],
    },
    {
      heading: 'API-Referenz',
      paragraphs: [
        'ANQR bietet eine serverseitige API zur Generierung von QR-Codes über URL-Parameter. Dies ist ideal zum Einbetten von QR-Codes in Websites, E-Mails, Dokumente oder automatisierte Arbeitsabläufe ohne clientseitiges JavaScript.',
        'Basis-URL: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Grundlegende Parameter',
      paragraphs: [
        'Erforderliche und allgemeine Parameter (Parameternamen werden nicht übersetzt):',
      ],
      bullets: [
        'Daten (erforderlich): Der Inhalt, der im QR-Code kodiert werden soll. URL-kodierte Sonderzeichen.',
        'Größe: Bildgröße in Pixeln (Standard: 400, max.: 2000). Wird verwendet, wenn Breite/Höhe nicht angegeben sind.',
        'w, h: Ausgabebreite und -höhe in Pixeln. Überschreibt den Größenparameter.',
        'Format: Ausgabeformat — png, webp oder gif (Standard: png).',
        'ec: Fehlerkorrekturstufe — L, M, Q oder H (Standard: H).',
        'fg: Vordergrundfarbe als Hexadezimalwert ohne # (Standard: 000000).',
        'bg: Hintergrundfarbe als Hexadezimalwert ohne # (Standard: ffffff).',
        'transparent: Auf 1 setzen für transparenten Hintergrund.',
        'margin: Ruhezone in Modulen (Standard: 4).',
      ],
    },
    {
      heading: 'Styling-Parameter',
      paragraphs: [
        'Modul- und Mustergestaltung:',
      ],
      bullets: [
        'Stil: Modulstil – quadratisch, abgerundet, Punkte, Raute, verbunden.',
        'Finder: Finder-Musterstil — quadratisch, abgerundet, kreisförmig.',
        'align: Ausrichtungsmusterstil — match_finder, square, rounded, circle.',
        'Timing: Timing-Musterstil — match_module, durchgezogen, gestrichelt.',
        'Radius: Eckradius in Prozent 0-100.',
        'Lücke: Modullücke in Prozent 0-50.',
        'gapMode: Gap mode — none, inset, stroke, negative_space.',
        'Äußeres Auge, inneres Auge: Augenformen – quadratisch, rund, kreisförmig.',
        'eyeScale: Prozentualer Augenskalenwert (Standardwert: 100).',
        'grad: Gradiententyp — keiner, linear, radial, konisch.',
        'gradAngle: Gradientenwinkel für lineare Gradienten.',
        'gradStops: Gradientenstopps als Farbe1,Position1,Farbe2,Position2,… (z. B. ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Overlay-Parameter',
      paragraphs: [
        'Bildüberlagerungsoptionen (Überlagerungsbild wird serverseitig abgerufen):',
      ],
      bullets: [
        'img: URL zum Überlagerungsbild (muss öffentlich zugänglich sein).',
        'Modus: Überlagerungsmodus – Zentriert, Halbton, Überblendung, Helligkeit, Mosaik, Dithering, Blaurauschen, Subpixel.',
        'Intensität: Overlay-Intensität 0-100 (Standard: 100).',
        'colorMode: Overlay-Farbmodus — Farbe, Graustufen, Schwarzweiß.',
        'Passform: Wie die Überlagerung passt – abdecken, umschließen, dehnen.',
        'rot: Overlay-Rotation in Grad.',
        'flipX, flipY: Auf 1 setzen, um die Überlagerung zu spiegeln.',
        'keepFinders: Suchmuster beibehalten (Standard: 1).',
        'keepTiming, keepAlign: Auf 1 setzen, um Timing-/Ausrichtungsmuster beizubehalten.',
      ],
    },
    {
      heading: 'Vorverarbeitungsparameter',
      paragraphs: [
        'Bildvorverarbeitung angewendet auf Overlay:',
      ],
      bullets: [
        'Helligkeit: Einstellung -100 bis 100 (Standard: 0).',
        'Kontrast: Anpassung -100 bis 100 (Standard: 0).',
        'Gamma: Wert 0,1 bis 3 (Standardwert: 1).',
        'Sättigung: Einstellung -100 bis 100 (Standard: 0).',
        'Farbton: Farbtondrehung in Grad.',
        'Unschärfe: Unschärfe in Pixeln.',
        'Schärfen: Schärfmenge 0-100.',
        'Posterisieren: Posterisieren Sie Ebenen.',
        'Schwellenwert: Binärer Schwellenwert 0-255.',
        'Kante: Kantenerkennung — aus, Sobel, Canny.',
        'invertieren: Auf 1 stellen, um die Farben umzukehren.',
      ],
    },
    {
      heading: 'Wasserzeichenparameter',
      paragraphs: [
        'Wasserzeichen zu generierten QR-Codes hinzufügen:',
      ],
      bullets: [
        'wmEn: Auf 1 setzen, um das Wasserzeichen zu aktivieren.',
        'wmKind: Wasserzeichentyp — Text, Bild, Muster.',
        'wmText: Wasserzeichentext (URL-codiert).',
        'wmImg: URL zum Wasserzeichenbild.',
        'wmPos: Position — Mitte, Ecken, Kanten, hinter, Ruhezone.',
        'wmOpacity: Deckkraft 0-100 (Standard: 50).',
        'wmBlend: Mischmodus – Normal, Multiplizieren, Negativ multiplizieren, Überlagern.',
      ],
    },
    {
      heading: 'Animationsparameter',
      paragraphs: [
        'Für die Ausgabe animierter GIFs (erfordert Format=gif):',
      ],
      bullets: [
        'animPattern: Animationsmuster — keine, Puls, Welle, Scanlinie, Schimmer, Drift, Farbzyklus.',
        'animFrames: Anzahl der Frames 1-60 (Standard: 24).',
        'animSpeed: Frame-Verzögerung in Millisekunden 10-1000 (Standard: 100).',
        'animSeed: Zufallsgenerator für Animationen.',
        'Easing: Animations-Easing — linear, ease_in, ease_out, ease_in_out, bounce.',
      ],
    },
    {
      heading: 'Ausgabeparameter',
      paragraphs: [
        'Ausgabeformatoptionen:',
      ],
      bullets: [
        'Qualität: WebP-Qualität 0-1 (Standard: 0,9).',
        'webpQ: WebP-Qualität 0-100 (Standard: 90).',
        'gifColors: GIF-Palette Größe 2-256 (Standard: 256).',
        'dpi: Ausgabe-DPI für PNG (Standard: 72).',
        'metaTitle, metaAuthor, metaCopy, metaDesc: PNG-Metadatenfelder.',
      ],
    },
    {
      heading: 'Beispielhafte Verwendung',
      paragraphs: [
        'Einfacher QR-Code:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Gestalteter QR-Code mit benutzerdefinierten Farben:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30”',
        'QR-Code mit überlagertem Bild:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70”',
        'Animiertes GIF:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out”',
      ],
    },
    {
      heading: 'Einbetten von QR-Codes',
      paragraphs: [
        'Im Profi-Modus generiert die Teilen-Funktion einbettbaren HTML-Code und URLs. So funktioniert das Einbetten:',
      ],
      bullets: [
        'Link teilen: Erstellt eine URL zur ANQR-App, in der alle Ihre Einstellungen als URL-Parameter codiert sind. Empfänger können den QR-Code anzeigen und bearbeiten.',
        'Bild einbetten: Erzeugt ein Tag, das auf die Server-API verweist. Der QR-Code wird serverseitig gerendert und als Bild bereitgestellt.',
        'Markdown einbetten: Erzeugt Markdown-Bildsyntax für Dokumentations- und README-Dateien.',
        'Direkte API-URL: Die rohe API-URL zur Verwendung in Anwendungen, Skripten oder anderen Integrationen.',
      ],
    },
    {
      heading: 'HTML-Beispiel',
      paragraphs: [
        'So betten Sie einen QR-Code in Ihre Website ein:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR-Code />”',
        'Für eine flexible Größenanpassung:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR-Code style=max-width: 100%; height: auto; />”',
        'Der Server speichert Antworten mit langen Cache-Headern im Cache, sodass wiederholte Anfragen an dieselbe URL schnell beantwortet werden.',
      ],
    },
    {
      heading: 'Share-URL-Format',
      paragraphs: [
        'Wenn Sie im Profi-Modus auf Teilen klicken, kodiert ANQR Ihre aktuellen Einstellungen in URL-Parameter. Das Format ist:',
        'https://anqr.link/?data=…&ec=H&style=rounded&….”',
        'Diese Parameter entsprechen den API-Parametern. Sie können also eine Freigabe-URL in eine API-URL umwandeln, indem Sie den Basispfad von / auf /api/qr ändern und die Breiten- und Längenparameter nach Bedarf anpassen.',
        'Hinweis: Overlay-Bilder, die von lokalen Dateien hochgeladen wurden, können nicht über eine URL geteilt werden – nur URL-basierte Overlays (img-Parameter) funktionieren in geteilten Links und API-Aufrufen.',
      ],
    },
    {
      heading: 'Ratenbegrenzungen und Nutzung',
      paragraphs: [
        'Die API kann bei angemessenem Datenaufkommen kostenlos genutzt werden. Für Anwendungen mit hohem Datenaufkommen oder kommerzielle Anwendungen, die eine garantierte Verfügbarkeit erfordern, kontaktieren Sie uns bitte.',
        'API-Antworten enthalten aggressive Caching-Header. Um die beste Leistung zu erzielen, sollten Sie die Antworten auf Ihrer Seite zwischenspeichern oder für identische QR-Codes immer dieselbe URL verwenden.',
      ],
    },
    {
      heading: 'Bewährte Verfahren',
      paragraphs: [
        'Beachten Sie diese Richtlinien für zuverlässige QR-Codes:',
      ],
      bullets: [
        'Testen Sie Ihre QR-Codes vor dem Drucken immer mit mehreren Scanner-Apps.',
        'Verwenden Sie die Fehlerkorrektur H (Hoch) beim Hinzufügen von Overlays.',
        'Halten Sie mindestens 4 Module Ruhezone (Marge) ein.',
        'Sorgen Sie für einen hohen Kontrast zwischen Vorder- und Hintergrund.',
        'Für den Druck verwenden Sie mindestens 300 DPI und testen Sie in der tatsächlichen Druckgröße.',
        'Suchermuster bei Verwendung von Überlagerungen beibehalten aktivieren.',
        'Beginnen Sie mit einer geringeren Overlay-Intensität und erhöhen Sie diese schrittweise.',
        'Für den Einsatz im Freien sollten größere Modulgrößen und eine höhere Fehlerkorrektur in Betracht gezogen werden.',
      ],
    },
    {
      heading: 'Fehlerbehebung',
      paragraphs: [
        'Häufige Probleme und Lösungen:',
      ],
      bullets: [
        'QR-Code kann nicht gescannt werden: Überlagerungsintensität reduzieren, Fehlerkorrektur erhöhen, Kontrast prüfen.',
        'Code zu groß: Reduzieren Sie die Inhaltslänge, verwenden Sie einen URL-Kürzer, niedrigere Version.',
        'Unscharfe Ausgabe: Modulgröße erhöhen, PNG anstelle komprimierter Formate verwenden.',
        'Die Farben sehen falsch aus: Überprüfen Sie den Farbkontrast, versuchen Sie es mit dem Graustufen-Überlagerungsmodus.',
        'GIF wird nicht animiert: Stellen Sie sicher, dass Sie das GIF-Ausgabeformat verwenden, überprüfen Sie die Anzahl der Einzelbilder.',
        'Bildüberlagerung wird nicht geladen: Überprüfen Sie die CORS-Berechtigungen für Remote-Images.',
      ],
    },
    {
      heading: 'Tastenkombinationen',
      paragraphs: [
        'ANQR unterstützt Standard-Tastenkombinationen. Verwenden Sie Strg/Cmd+S, um den Export auszulösen (wenn der Fokus auf der Vorschau liegt).',
      ],
    },
    {
      heading: 'Teilen & Einbetten',
      paragraphs: [
        'Im Profi-Modus können Sie über die Schaltfläche Teilen eine URL mit Ihren aktuellen Einstellungen kopieren. Empfänger können diese URL öffnen, um Ihre genaue Konfiguration einzusehen. Hinweis: Overlay-Bilder aus lokalen Dateien können nicht per URL geteilt werden.',
      ],
    },
  ],
};

export default docs;
