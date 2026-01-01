import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const terms: PageDefinition = {
  title: '"Användarvillkor”',
  description: '”Genom att besöka eller använda webbplatsen godkänner du att vara bunden av dessa villkor.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Godkännande av villkor”',
      paragraphs: [
        '”Genom att besöka eller använda ANQR (anqr.link) godkänner du att vara bunden av dessa användarvillkor och vår integritetspolicy. Om du inte godkänner dessa villkor ska du inte använda webbplatsen.”',
        '”Vi kan komma att uppdatera dessa villkor från tid till annan. Fortsatt användning av webbplatsen efter ändringar innebär godkännande av de nya villkoren.”',
      ],
    },
    {
      heading: '"Behörighet”',
      paragraphs: [
        '”Du måste vara minst 13 år för att använda ANQR. Genom att använda webbplatsen intygar du att du uppfyller detta ålderskrav. Om du är under 18 år intygar du att du har din förälders eller vårdnadshavares tillstånd att använda webbplatsen.”',
      ],
    },
    {
      heading: '"Tillåten användning”',
      paragraphs: [
        '”Du får endast använda ANQR för lagliga ändamål. Du är ensam ansvarig för innehållet du kodar in i QR-koder och för hur du använder eventuella QR-koder du genererar.”',
      ],
    },
    {
      heading: '"Förbjudet beteende”',
      paragraphs: [
        '”Du samtycker till att inte:”',
      ],
      bullets: [
        '”Använd ANQR för att skapa QR-koder som underlättar nätfiske, distribution av skadlig programvara, bedrägerier, trakasserier, förtal eller annan olaglig aktivitet.”',
        '”Kodar innehåll som kränker immateriella rättigheter, kränker integriteten eller innehåller olagligt material.”',
        '”Försök att störa, överbelasta eller störa webbplatsens drift eller säkerhet.”',
        '"Utför bakåtkompilera, dekompilera eller försök att extrahera källkod från webbplatsen.”',
        '”Använd automatiserade verktyg (botar, scrapers) för att komma åt webbplatsen på ett sätt som försämrar prestandan för andra användare.”',
        '"Kringgå eller inaktivera säkerhets- eller åtkomstkontrollfunktioner.”',
        '”Utge dig för att vara någon annan person eller enhet eller ge en felaktig bild av din anknytning.”',
      ],
    },
    {
      heading: '"Immateriella rättigheter”',
      paragraphs: [
        '”Du behåller äganderätten till innehållet du kodar in i QR-koder. ANQR gör inte anspråk på äganderätt till dina data.”',
        '”ANQR-namnet, logotypen, gränssnittsdesignen och den underliggande koden är skyddade av upphovsrätt, varumärkesrätt och andra immateriella rättigheter. Du får inte kopiera, modifiera, distribuera eller skapa härledda verk utan vårt tillstånd.”',
        '”QR Code® är ett registrerat varumärke som tillhör DENSO WAVE INCORPORATED. ANQR är inte anslutet till DENSO WAVE.”',
      ],
    },
    {
      heading: '"Licens för användarinnehåll”',
      paragraphs: [
        '”Genom att använda ANQR ger du oss inga rättigheter till ditt innehåll. När du använder lokal generering (standard) sker all QR-kodgenerering i din webbläsare och vi varken kommer åt, lagrar eller överför dina kodade data.”',
        '”När du använder server-side API:et bearbetas ditt innehåll för att generera QR-bilden men det lagras, loggas eller används inte för något annat ändamål utöver att rendera den begärda bilden.”',
      ],
    },
    {
      heading: '"Tjänster och reklam från tredje part”',
      paragraphs: [
        '”Webbplatsen visar annonser via Google AdSense och kan innehålla länkar till webbplatser från tredje part. Vi ansvarar inte för innehåll, tjänster eller sekretessrutiner från tredje part.”',
        '”Dina interaktioner med annonsörer och tredje parter sker uteslutande mellan dig och dem. Se vår integritetspolicy för information om hur vi hanterar annonseringsdata.”',
      ],
    },
    {
      heading: '"Garantifriskrivning”',
      paragraphs: [
        '”ANQR TILLHANDAHÅLLS I BEFINTLIGT SKICK OCH I TILLGÄNGLIGHET UTAN NÅGOT SLAG AV GARANTIER, UTTRYCKLIGA ELLER UNDERFÖRSTÅDDA, INKLUSIVE MEN INTE BEGRÄNSAT TILL UNDERFÖRSTÅDDA GARANTIER OM SÄLJBARHET, LÄMPLIGHET FÖR ETT SÄRSKILT ÄNDAMÅL OCH ICKE-INTRÅNG.”',
        '”Vi garanterar inte att: (a) webbplatsen kommer att vara oavbruten, säker eller felfri; (b) QR-koder kommer att skannas i alla miljöer, på alla enheter eller med alla skannerapplikationer; (c) webbplatsen kommer att uppfylla dina krav.”',
        '”Du bör alltid testa QR-koder under de förhållanden där de ska användas (utskriftsstorlek, ljus, skärmtyp, avstånd, kamerakvalitet).”',
      ],
    },
    {
      heading: '"Ansvarsbegränsning”',
      paragraphs: [
        '”I DEN UTSTRÄCKNING DET ÄR TILLÅTET ENLIGT LAG SKA ANQR OCH DESS OPERATÖRER, DOTTERBOLAG OCH LICENSGIVARE INTE VARA ANSVARIGA FÖR NÅGRA DIREKTA, INDIREKTA, TILLFÄLLIGA, SÄRSKILDA, FÖLJDSKADOR, STRAFFSKADOR ELLER EXEMPLARISKA SKADOR, INKLUSIVE MEN INTE BEGRÄNSAT TILL SKADESTÅND FÖR FÖRLUST AV VINST, INTÄKTER, DATA, GOODWILL, ANVÄNDNING ELLER ANDRA IMMATERIELLA FÖRLUSTER, SOM UPPSTÅR FRÅN ELLER ÄR RELATERADE TILL DIN ÅTKOMST TILL ELLER ANVÄNDNING AV (ELLER OFÖRMÅGA ATT ÅTKOMMA TILL ELLER ANVÄNDA) TJÄNSTEN.”',
        '”DU FÖRSTÅR OCH GODKÄNNER UTTRYCKLIGEN ATT DIN ANVÄNDNING AV TJÄNSTEN SKER PÅ EGEN RISK. TJÄNSTEN TILLHANDAHÅLLS KOSTNADSFRIA OCH FÖLJLIGT GODKÄNNER DU ATT ANQR OCH DESS OPERATÖRER NÅGOT ANSVAR GENTEMOT DIG FÖR NÅGRA SKADOR ELLER FÖRLUSTER. VÅRT TOTALA SAMMANLAGDA ANSVAR SKA UNDER INGA OMSTÄNDIGHETER ÖVERSTIGA NOLL DOLLAR ($0 AUD).”',
        '”DU GODKÄNNER ATT FRISKRIVA, AVSTÅ FRÅN OCH AVSKRIVA ALLA KRAV, ANSVAR OCH ÅTGÄRDER MOT ANQR OCH DESS OPERATÖRER SOM UPPSTÅR TILL FÖLJD AV DIN ANVÄNDNING AV TJÄNSTEN.”',
        '”VISSA JURISDIKTIONER TILLÅTER INTE UNDANTAG FRÅN VISSA GARANTIER ELLER ANSVARSBEGRÄNSNINGAR. I SÅDANA JURISDIKTIONER SKA VÅRT ANSVAR BEGRÄNSAS TILL DEN UTSTRÄCKNING SOM TILLÅTS ENLIGT GÄLLANDE LAG.”',
      ],
    },
    {
      heading: '"Skadeersättning”',
      paragraphs: [
        '”Du samtycker till att gottgöra, försvara och hålla ANQR, dess operatörer, dotterbolag och deras respektive tjänstemän, styrelseledamöter, anställda och ombud skadeslösa från alla anspråk, skador, förluster, skulder, kostnader och utgifter (inklusive juridiska avgifter) som uppstår på grund av: (a) din användning av webbplatsen; (b) ditt brott mot dessa villkor; (c) ditt brott mot tredje parts rättigheter; (d) allt innehåll som du kodar till QR-koder.”',
      ],
    },
    {
      heading: '"Tvistlösning”',
      paragraphs: [
        '”Alla tvister som uppstår gällande dessa villkor eller din användning av ANQR ska först försökas lösas genom informell förhandling genom att kontakta ${CONTACT_EMAIL}.”',
        '”Om informell lösning misslyckas ska tvister lösas genom bindande skiljedom i Victoria, Australien, med undantag för att endera parten kan begära förbudsföreläggande i domstol för intrång i immateriella rättigheter.”',
      ],
    },
    {
      heading: '”Avstående från grupptalan”',
      paragraphs: [
        '”I DEN UTSTRÄCKNING DET ÄR TILLÅTET ENLIGT LAG GODKÄNNER DU ATT ALLA TVISTLÖSNINGSFÖRFARANDEN ENDAST KOMMER ATT GENOMFÖRAS PÅ ENSKILD GRUND OCH INTE SOM GRUPPTALAN, SAMMANFATTNINGSTALAN ELLER REPRESENTATIV TALAN.”',
      ],
    },
    {
      heading: '"Gällande lag”',
      paragraphs: [
        '”Dessa villkor regleras av lagarna i Victoria, Australien, utan hänsyn till principer om lagkonflikter. Du samtycker till exklusiv jurisdiktion för domstolarna i Victoria, Australien.”',
      ],
    },
    {
      heading: '"Ändringar och tillgänglighet”',
      paragraphs: [
        '”Vi kan när som helst ändra, stänga av eller avbryta webbplatsen (eller någon del av den) utan föregående meddelande eller ansvar.”',
        '”Vi kan komma att uppdatera dessa villkor när som helst. Datumet ”Senast uppdaterad” anger när de senast reviderades. Fortsatt användning efter ändringar utgör godkännande.”',
      ],
    },
    {
      heading: '"Avskiljbarhet”',
      paragraphs: [
        '”Om någon bestämmelse i dessa villkor anses ogiltig eller inte verkställbar, ska den bestämmelsen verkställas i största möjliga utsträckning, och de återstående bestämmelserna ska förbli i full kraft och verkan.”',
      ],
    },
    {
      heading: '"Avstående”',
      paragraphs: [
        '”Om vi underlåter att genomdriva någon rättighet eller bestämmelse i dessa villkor ska detta inte anses som ett avstående från sådan rättighet eller bestämmelse.”',
      ],
    },
    {
      heading: '"Hela avtalet”',
      paragraphs: [
        '”Dessa villkor, tillsammans med vår integritetspolicy, utgör hela avtalet mellan dig och ANQR gällande din användning av webbplatsen och ersätter alla tidigare avtal.”',
      ],
    },
    {
      heading: '”Övermäktig omständighet”',
      paragraphs: [
        '”Vi ansvarar inte för eventuella fel eller förseningar i utförandet på grund av omständigheter utanför vår rimliga kontroll, inklusive naturkatastrofer, krig, terrorism, upplopp, myndighetsåtgärder eller internet-/infrastrukturfel.”',
      ],
    },
    {
      heading: '"Kontakt”',
      paragraphs: [
        '"Frågor om dessa villkor kan skickas till: ${CONTACT_EMAIL}”',
      ],
    },
  ],
}

export default terms;
