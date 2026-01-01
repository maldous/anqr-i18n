import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: '«Kontakt oss»',
  description: '«Vi tar gjerne imot tilbakemeldinger, feilrapporter, funksjonsforespørsler og generelle henvendelser.»',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '«Hvordan nå oss»',
      paragraphs: [
        '«Vi tilbyr flere måter å kontakte oss på, avhengig av dine behov. Vi leser hver melding, men responstiden kan variere basert på volum og type forespørsel.»',
      ],
    },
    {
      heading: '«E-post»',
      paragraphs: [
        '«For alle henvendelser: ${CONTACT_EMAIL}»',
        '«Dette er den mest pålitelige måten å nå oss på, og anbefales for detaljerte spørsmål, forretningshenvendelser eller andre henvendelser.»',
      ],
    },
    {
      heading: '«Typer henvendelser»',
      bullets: [
        '«Generelle spørsmål: Spørsmål om hvordan man bruker ANQR, forklaringer av funksjoner eller generell tilbakemelding.»',
        '«Feilrapporter: Vennligst inkluder nettleseren din, operativsystemet ditt, trinn for å reprodusere det og eventuelle feilmeldinger du ser.»',
        '«Funksjonsforespørsler: Forslag til nye funksjoner eller forbedringer. Vi vurderer alle forespørsler, men vi kan ikke love implementering.»',
        '«Forretningshenvendelser: Partnerskapsmuligheter, lisensspørsmål eller forespørsler om kommersiell bruk.»',
        '«Personvernforespørsler: Forespørsler om å utøve dine personvernrettigheter i henhold til GDPR, CCPA eller andre personvernlover (se personvernregler).»',
        '«DMCA/opphavsrett: Se DMCA-delen nedenfor for krav til varsel om fjerning.»',
      ],
    },
    {
      heading: '«Responstider»',
      paragraphs: [
        '«Vi tar sikte på å svare på henvendelser innen 5–7 virkedager. Forespørsler om personvern vil bli behandlet innen 30 dager, slik loven krever.»',
        '«I travle perioder kan responstidene være lengre. For hastesaker, vennligst oppgi «HASTER» i emnefeltet.»',
      ],
    },
    {
      heading: '«Før du kontakter oss»',
      paragraphs: [
        '«Sjekk dokumentasjonssiden vår for svar på vanlige spørsmål om hvordan du bruker ANQR-funksjoner. Mange spørsmål om generering av QR-koder, styling og eksportalternativer dekkes der.»',
      ],
    },
    {
      heading: '«DMCA-opphavsrettsmerknader»',
      paragraphs: [
        '«Hvis du mener at innhold som er tilgjengelig på ANQR krenker opphavsretten din, kan du sende inn et varsel om fjerning i henhold til Digital Millennium Copyright Act (DMCA). For at varselet skal være gyldig, må det inneholde:»',
      ],
      bullets: [
        '«En fysisk eller elektronisk signatur fra opphavsrettsinnehaveren eller en autorisert representant.»',
        '«Identifisering av det opphavsrettsbeskyttede verket som hevdes å være krenket.»',
        '«Identifisering av materialet som hevdes å være et krenkende materiale, med tilstrekkelig informasjon til å lokalisere det.»',
        '«Din kontaktinformasjon (adresse, telefonnummer og e-postadresse).»',
        '«En erklæring om at du i god tro mener at bruken av materialet ikke er autorisert av rettighetshaveren.»',
        '«En erklæring, under straff for mened, om at informasjonen i varselet ditt er nøyaktig og at du er opphavsrettsinnehaver eller har fullmakt til å handle på deres vegne.»',
      ],
    },
    {
      heading: '«DMCA-kontakt»',
      paragraphs: [
        '«Send DMCA-varsler til: ${CONTACT_EMAIL}»',
        '«Vennligst legg til «DMCA-varsel» i emnefeltet. Vi vil svare på gyldige varsler i samsvar med gjeldende lov. Merk at ANQR genererer QR-koder lokalt på brukernes enheter og ikke er vert for brukergenerert innhold.»',
      ],
    },
  ],
};

export default contact;
