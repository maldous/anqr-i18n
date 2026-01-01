import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: '"Integritetspolicy”',
  description: '”Information som ANQR samlar in, hur den används och dina rättigheter enligt gällande sekretesslagar.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Sammanfattning”',
      paragraphs: [
        '”ANQR är en QR-kodgenerator med ett klientfokuserat tillvägagångssätt. Vi kräver inte att du skapar ett konto. Som standard genereras QR-koder lokalt i din webbläsare – vi har inte tillgång till innehållet du kodar.”',
        '”För professionellt bruk tillhandahåller ANQR ett serversides-API som genererar QR-koder från URL-parametrar. När du använder API:et bearbetas ditt QR-innehåll på våra servrar för att rendera bilden, men det lagras eller loggas inte.”',
        '”Vi använder Google AdSense för annonsering och kan komma att använda analystjänster. Dessa tjänster samlar in information via cookies och liknande tekniker. Denna policy förklarar vilka uppgifter som samlas in, hur de används och dina rättigheter.”',
      ],
    },
    {
      heading: '"Information vi samlar in”',
      bullets: [
        '”Information du lämnar: Om du kontaktar oss via e-post eller vårt kontaktformulär samlar vi in ditt namn, din e-postadress och ditt meddelandeinnehåll.”',
        '”Automatiskt insamlad information: Vår webbhotellleverantör (Netlify), annonspartners och analystjänster kan samla in: IP-adress, webbläsartyp och version, operativsystem, enhetstyp, hänvisnings-URL, besökta sidor, tid på webbplatsen och ungefärlig geografisk plats.”',
        '”Cookies från tredje part: Våra annonspartners (Google AdSense) använder cookies och liknande tekniker för att visa och mäta annonser. ANQR ställer inte in några cookies från första part.”',
      ],
    },
    {
      heading: '"Cookies och tredjepartsteknik”',
      paragraphs: [
        '”ANQR ställer inte in några förstapartscookies. Dina inställningar (som mörkt läge) lagras lokalt på din enhet, vilken inte överförs till någon server.”',
        '”Våra annonspartners (Google AdSense) och webbhotellleverantör kan dock använda cookies och liknande spårningstekniker:”',
      ],
      bullets: [
        '”Annonscookies (tredjepart): Ställs in av Google AdSense och annonspartners för att visa relevanta annonser, mäta annonsprestanda och förstå användarintressen. Dessa cookies kan spåra din aktivitet på olika webbplatser.”',
        '”Analytiska cookies (tredjepart): Kan användas av vår webbhotellsleverantör eller analystjänster för att samla in anonymiserad användningsdata.”',
      ],
    },
    {
      heading: '"Google AdSense och annonsering”',
      paragraphs: [
        '”Vi visar annonser via Google AdSense. Google och dess partners använder cookies för att visa annonser baserade på din webbhistorik på denna webbplats och andra webbplatser (intressebaserad annonsering).”',
        '”Läs mer om hur Google använder din information: https://policies.google.com/technologies/partner-sites”',
        '”Hantera annonsanpassning: https://adssettings.google.com”',
        '"Avsluta via Network Advertising Initiative: https://optout.networkadvertising.org”',
        '"Avsluta via Digital Advertising Alliance: https://optout.aboutads.info”',
      ],
    },
    {
      heading: '"Hur vi använder information”',
      bullets: [
        '”För att svara på dina förfrågningar och ge stöd.”',
        '”För att visa relevanta annonser via våra annonspartners.”',
        '”För att analysera webbplatsanvändningen och förbättra våra tjänster.”',
        '”För att upptäcka, förebygga och åtgärda bedrägerier, missbruk och säkerhetsproblem.”',
        '”För att uppfylla rättsliga skyldigheter.”',
      ],
    },
    {
      heading: '"Tredjepartstjänster”',
      bullets: [
        '”Google AdSense: Tar emot data för att visa och mäta annonser.”',
        '”Analysleverantörer: Ta emot anonymiserad användningsdata.”',
        '"Netlify (hosting): Bearbetar förfrågningar och kan logga IP-adresser.”',
        '”Vi säljer inte dina personuppgifter. Att dela data med annonspartners kan dock betraktas som en ”försäljning” enligt CCPA (se nedan).”',
      ],
    },
    {
      heading: '"Datalagring”',
      bullets: [
        '”Kontaktansökningar: Upp till 2 år.”',
        '"Serverloggar: Upp till 30 dagar (hostingleverantör).”',
        '”Analysdata: Upp till 26 månader (anonymiserad).”',
        '”Annonscookies: Vanligtvis 13 månader (varierar beroende på partner).”',
      ],
    },
    {
      heading: '"Dina rättigheter enligt GDPR (EES-användare)”',
      paragraphs: [
        '”Om du befinner dig inom Europeiska ekonomiska samarbetsområdet har du följande rättigheter enligt den allmänna dataskyddsförordningen:”',
      ],
      bullets: [
        '”Rätt till tillgång: Begär en kopia av personuppgifter som vi har om dig.”',
        '”Rätt till rättelse: Begär rättelse av felaktiga uppgifter.”',
        '”Rätt till radering: Begära radering av dina uppgifter (”rätten att bli bortglömd”).”',
        '”Rätt att begränsa behandlingen: Begär begränsningar av hur vi använder dina uppgifter.”',
        '”Rätt till dataportabilitet: Begär dina uppgifter i ett portabelt format.”',
        '”Rätt att invända: Invända mot behandling, inklusive för direkt marknadsföring.”',
        '”Rätt att återkalla samtycke: Återkalla samtycke när som helst om behandlingen är samtyckesbaserad.”',
        '”Rätt att lämna in ett klagomål: Lämna in ett klagomål till din dataskyddsmyndighet.”',
      ],
    },
    {
      heading: '"GDPR-rättslig grund”',
      paragraphs: [
        '”Vi behandlar uppgifter på följande grunder: (a) Samtycke – för personlig annonsering (hanteras av våra annonspartners); (b) Berättigade intressen – för analys, säkerhet och förbättring; (c) Avtal – för att svara på förfrågningar.”',
        '”För att utöva dina rättigheter, kontakta ${CONTACT_EMAIL}. Vi svarar inom 30 dagar.”',
      ],
    },
    {
      heading: '"Dina rättigheter enligt CCPA (användare i Kalifornien)”',
      bullets: [
        '”Rätt att veta: Begär information om insamlade uppgifter, källor, syften och tredje parter.”',
        '”Rätt att radera: Begär radering av dina personuppgifter.”',
        '”Rätt att välja bort: Välja bort "försäljning" av personlig information (delning med annonspartners kan vara kvalificerande).”',
        '”Rätt till icke-diskriminering: Vi kommer inte att diskriminera för att du utövar dina rättigheter.”',
      ],
    },
    {
      heading: '"CCPA-kategorier insamlade”',
      paragraphs: [
        '”Kategorier: Identifierare (IP-adress, enhets-ID), internetaktivitet (surfning, annonsinteraktioner), geolokalisering (ungefärlig), slutsatser (intressen från surfning).”',
        '”För att utöva rättigheter eller välja bort: ${CONTACT_EMAIL} eller justera cookieinställningar.”',
      ],
    },
    {
      heading: '"Internationella överföringar”',
      paragraphs: [
        '”Din information kan komma att överföras till länder med andra dataskyddslagar, inklusive USA. Vi använder lämpliga skyddsåtgärder såsom standardavtalsklausuler.”',
      ],
    },
    {
      heading: '"Barns integritet”',
      paragraphs: [
        '”ANQR riktar sig inte till barn under 13 år (eller 16 år inom EES). Vi samlar inte medvetet in data från barn. Kontakta ${CONTACT_EMAIL} om du tror att ett barn har lämnat information.”',
      ],
    },
    {
      heading: '"Säkerhet”',
      paragraphs: [
        '”Vi använder lämpliga tekniska och organisatoriska åtgärder för att skydda data, inklusive HTTPS-kryptering. Ingen internetöverföring är dock 100 % säker.”',
      ],
    },
    {
      heading: '"Spåra inte”',
      paragraphs: [
        '”Vi respekterar webbläsarsignaler för spårning av Do Not Track där det är möjligt, även om annonspartners kanske inte svarar på DNT.”',
      ],
    },
    {
      heading: '"Ändringar i denna policy”',
      paragraphs: [
        '”Vi kan komma att uppdatera denna policy regelbundet. Datumet ”Senast uppdaterad” anger den senaste revisionen. Väsentliga ändringar kan meddelas via en webbplatsbanner.”',
      ],
    },
    {
      heading: '"Kontakta oss”',
      paragraphs: [
        '”För frågor om integritet eller för att utöva dina rättigheter: ${CONTACT_EMAIL} eller använd vår kontaktsida. Vi svarar på förfrågningar om integritet inom 30 dagar.”',
      ],
    },
  ],
}

export default privacy;
