import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'O ANQR',
  description:
    'ANQR to darmowy generator kodów QR, który stawia klienta na pierwszym miejscu — generuj kody QR lokalnie lub korzystaj z naszego API do osadzania.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Co to jest ANQR?',
      paragraphs: [
        'ANQR (wymawiane anchor) to darmowy generator kodów QR, który tworzy skanowalne kody dla adresów URL, tekstów, danych uwierzytelniających Wi-Fi, wizytówek, wydarzeń w kalendarzu i nie tylko.',
        'Jest on przeznaczony dla osób prywatnych, małych firm, marketerów i deweloperów, którzy potrzebują zaawansowanych narzędzi QR bez konieczności rejestracji. Projekt zorientowany na klienta oznacza, że kody QR są domyślnie generowane lokalnie w przeglądarce, z opcjonalnym serwerowym API do profesjonalnego osadzania i integracji.',
      ],
    },
    {
      heading: 'Kluczowe cechy',
      bullets: [
        'Generuj kody QR natychmiast w swojej przeglądarce — nie musisz zakładać konta.',
        'Dostosuj kolory, style modułów, wzory wyszukiwarki i dodaj nakładki graficzne.',
        'Eksportuj do wielu formatów: PNG, SVG, WebP i animowany GIF.',
        'Zaawansowane sterowanie poziomem korekcji błędów, wersją QR, trybem kodowania i wyborem maski.',
        'Wskazówki dotyczące bezpieczeństwa skanowania i podgląd na żywo pomagają zachować czytelność kodów w wersji drukowanej i na ekranie.',
        'Interfejs API po stronie serwera do profesjonalnego osadzania z pełną obsługą parametrów.',
        'Działa w trybie offline po załadowaniu — jest to statyczna aplikacja internetowa, którą można uruchomić w dowolnym miejscu.',
      ],
    },
    {
      heading: 'Jak działa ANQR',
      paragraphs: [
        'ANQR działa w przeglądarce i koduje wprowadzone dane do standardowej macierzy QR z korekcją błędów Reeda-Solomona, a następnie renderuje je do wybranego formatu.',
        'Domyślnie generowanie odbywa się lokalnie w przeglądarce. W zastosowaniach profesjonalnych można również użyć API po stronie serwera do generowania kodów QR za pomocą parametrów adresu URL — idealne do osadzania w witrynach internetowych, wiadomościach e-mail lub zautomatyzowanych przepływach pracy.',
        'Gdy dodajesz nakładki lub animacje, ANQR zachowuje równowagę między stylem a niezawodnością skanowania, dzięki czemu wynik pozostaje możliwy do zeskanowania.',
        'ANQR koncentruje się na kodach statycznych (dane znajdują się w kodzie QR). Jeśli potrzebujesz kodu dynamicznego (edytowalnego miejsca docelowego), możesz zakodować własny adres URL przekierowania lub krótki link.',
      ],
    },
    {
      heading: 'Kto obsługuje ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Reklama i jak zachować wolność',
      paragraphs: [
        'ANQR jest darmowy i wspierany reklamami. Możemy wyświetlać reklamy za pośrednictwem Google AdSense i/lub innych partnerów reklamowych.',
        'Dostawcy reklam mogą używać plików cookie lub podobnych technologii do personalizacji reklam na podstawie Twoich zainteresowań i aktywności w sieci. Możesz zarządzać preferencjami reklamowymi w ustawieniach urządzenia oraz w ustawieniach reklam Google. Więcej informacji znajdziesz w naszej Polityce Prywatności.',
        'Nie sprzedajemy treści, które kodujesz w kodach QR. Reklamy pomagają pokryć koszty prowadzenia i ulepszania projektu.',
      ],
    },
    {
      heading: 'Otwarte standardy',
      paragraphs: [
        'ANQR generuje kody QR w oparciu o normę ISO/IEC 18004 i ma na celu zapewnienie szerokiej kompatybilności między skanerami, aparatami i procesami drukowania.',
      ],
    },
    {
      heading: 'Informacja o znaku towarowym',
      paragraphs: [
        'QR Code® jest zastrzeżonym znakiem towarowym firmy DENSO WAVE INCORPORATED. ANQR nie jest powiązany, wspierany ani sponsorowany przez firmę DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Opinie i uwagi',
      paragraphs: [
        'Z przyjemnością przyjmujemy opinie, zgłoszenia błędów i sugestie dotyczące funkcji. Prosimy o kontakt mailowy lub za pośrednictwem strony kontaktowej — czytamy każdą wiadomość, choć czas odpowiedzi może się różnić.',
      ],
    },
  ],
};

export default about;
