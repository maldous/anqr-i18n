import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Skontaktuj się z nami',
  description:
    'Z przyjemnością przyjmiemy opinie, zgłoszenia błędów, prośby o dodanie funkcji i ogólne zapytania.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Jak do nas dotrzeć',
      paragraphs: [
        'Oferujemy kilka sposobów kontaktu, w zależności od Państwa potrzeb. Czytamy każdą wiadomość, jednak czas odpowiedzi może się różnić w zależności od ilości i rodzaju zapytania.',
      ],
    },
    {
      heading: 'E-mail',
      paragraphs: [
        'W przypadku wszelkich zapytań: ${CONTACT_EMAIL}',
        'To najpewniejszy sposób skontaktowania się z nami, zalecany w przypadku szczegółowych pytań, zapytań biznesowych lub innych zapytań.',
      ],
    },
    {
      heading: 'Rodzaje zapytań',
      bullets: [
        'Pytania ogólne: Pytania dotyczące sposobu korzystania z ANQR, objaśnienia funkcji lub ogólne opinie.',
        'Zgłaszanie błędów: Prosimy o dołączenie informacji o przeglądarce, systemie operacyjnym, krokach umożliwiających odtworzenie błędu oraz wszelkich wyświetlanych komunikatach o błędach.',
        'Prośby o nowe funkcje: Sugestie dotyczące nowych funkcji lub ulepszeń. Rozważamy wszystkie prośby, ale nie możemy obiecać ich wdrożenia.',
        'Zapytania biznesowe: możliwości partnerstwa, pytania dotyczące licencji lub zapytania dotyczące wykorzystania komercyjnego.',
        'Żądania dotyczące prywatności: Żądania dotyczące skorzystania z praw do prywatności wynikających z RODO, CCPA lub innych przepisów o ochronie prywatności (patrz Polityka prywatności).',
        'DMCA/Prawa autorskie: Zobacz sekcję DMCA poniżej, aby zapoznać się z wymaganiami dotyczącymi powiadomienia o usunięciu treści.',
      ],
    },
    {
      heading: 'Czasy reakcji',
      paragraphs: [
        'Staramy się odpowiadać na zapytania w ciągu 5–7 dni roboczych. Zapytania dotyczące prywatności będą rozpatrywane w ciągu 30 dni, zgodnie z wymogami prawa.',
        'W okresach wzmożonego ruchu czas reakcji może być dłuższy. W sprawach pilnych prosimy o wpisanie w temacie wiadomości PILNE.',
      ],
    },
    {
      heading: 'Przed skontaktowaniem się z nami',
      paragraphs: [
        'Zajrzyj na naszą stronę Dokumentacji, aby uzyskać odpowiedzi na często zadawane pytania dotyczące korzystania z funkcji ANQR. Wiele pytań dotyczących generowania, stylizacji i opcji eksportu kodów QR jest tam omówionych.',
      ],
    },
    {
      heading: 'Informacje o prawach autorskich DMCA',
      paragraphs: [
        'Jeśli uważasz, że treści dostępne w ANQR naruszają Twoje prawa autorskie, możesz przesłać zawiadomienie o usunięciu treści zgodnie z ustawą Digital Millennium Copyright Act (DMCA). Aby zawiadomienie było ważne, musi zawierać:',
      ],
      bullets: [
        'Fizyczny lub elektroniczny podpis właściciela praw autorskich lub upoważnionego przedstawiciela.',
        'Identyfikacja utworu chronionego prawem autorskim, które rzekomo zostało naruszone.',
        'Identyfikacja materiału, który rzekomo narusza prawa, wraz z informacjami wystarczającymi do jego zlokalizowania.',
        'Twoje dane kontaktowe (adres, numer telefonu i adres e-mail).',
        'Oświadczenie, że w dobrej wierze uważasz, że wykorzystanie materiału nie zostało autoryzowane przez właściciela praw autorskich.',
        'Oświadczenie złożone pod groźbą kary za krzywoprzysięstwo, że informacje zawarte w zawiadomieniu są prawdziwe i że jesteś właścicielem praw autorskich lub osobą upoważnioną do działania w jego imieniu.',
      ],
    },
    {
      heading: 'Kontakt DMCA',
      paragraphs: [
        'Wyślij powiadomienia DMCA na adres: ${CONTACT_EMAIL}',
        'Prosimy o wpisanie w temacie wiadomości Powiadomienie DMCA. Odpowiemy na ważne powiadomienia zgodnie z obowiązującym prawem. Należy pamiętać, że ANQR generuje kody QR lokalnie na urządzeniach użytkowników i nie hostuje treści generowanych przez użytkowników.',
      ],
    },
  ],
};

export default contact;
