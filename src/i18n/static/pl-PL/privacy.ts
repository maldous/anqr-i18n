import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Polityka prywatności',
  description: 'Informacje gromadzone przez ANQR, sposób ich wykorzystania oraz Twoje prawa wynikające z obowiązujących przepisów o ochronie prywatności.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Podsumowanie',
      paragraphs: ['ANQR to generator kodów QR, który stawia klienta na pierwszym miejscu. Nie wymagamy od Ciebie zakładania konta. Domyślnie kody QR są generowane lokalnie w Twojej przeglądarce — nie mamy dostępu do kodowanej przez Ciebie treści.', 'Do użytku profesjonalnego ANQR udostępnia API po stronie serwera, które generuje kody QR na podstawie parametrów adresu URL. Podczas korzystania z API zawartość kodu QR jest przetwarzana na naszych serwerach w celu renderowania obrazu, ale nie jest przechowywana ani rejestrowana.', 'Korzystamy z Google AdSense do celów reklamowych i możemy korzystać z usług analitycznych. Usługi te gromadzą informacje za pomocą plików cookie i podobnych technologii. Niniejsza polityka wyjaśnia, jakie dane są gromadzone, w jaki sposób są wykorzystywane oraz jakie przysługują Ci prawa.'],
    },
    {
      heading: 'Informacje, które zbieramy',
      bullets: ['Informacje, które nam przekazujesz: Jeśli skontaktujesz się z nami za pośrednictwem poczty elektronicznej lub formularza kontaktowego, zbieramy Twoje imię i nazwisko, adres e-mail i treść wiadomości.', 'Informacje gromadzone automatycznie: Nasz dostawca hostingu (Netlify), partnerzy reklamowi i usługi analityczne mogą gromadzić: adres IP, typ i wersję przeglądarki, system operacyjny, typ urządzenia, adres URL odsyłający, odwiedzane strony, czas spędzony na stronie oraz przybliżoną lokalizację geograficzną.', 'Pliki cookie stron trzecich: Nasi partnerzy reklamowi (Google AdSense) używają plików cookie i podobnych technologii do wyświetlania i pomiaru reklam. Sam ANQR nie ustawia żadnych plików cookie stron trzecich.'],
    },
    {
      heading: 'Pliki cookie i technologie stron trzecich',
      paragraphs: ['ANQR nie ustawia żadnych plików cookie własnych. Twoje preferencje (takie jak tryb ciemny) są przechowywane lokalnie na Twoim urządzeniu i nie są przesyłane na żaden serwer.', 'Nasi partnerzy reklamowi (Google AdSense) i dostawca hostingu mogą jednak używać plików cookie i podobnych technologii śledzenia:'],
      bullets: ['Pliki cookie reklamowe (stron trzecich): ustawiane przez Google AdSense i partnerów reklamowych w celu wyświetlania trafnych reklam, pomiaru skuteczności reklam i zrozumienia zainteresowań użytkowników. Te pliki cookie mogą śledzić Twoją aktywność na różnych stronach internetowych.', 'Pliki cookie analityczne (stron trzecich): Mogą być używane przez naszego dostawcę hostingu lub usługi analityczne w celu zbierania anonimowych danych o użytkowaniu.'],
    },
    {
      heading: 'Google AdSense i reklama',
      paragraphs: ['Wyświetlamy reklamy za pośrednictwem Google AdSense. Google i jego partnerzy używają plików cookie do wyświetlania reklam na podstawie historii przeglądania tej witryny i innych witryn (reklamy oparte na zainteresowaniach).', 'Dowiedz się, jak Google wykorzystuje Twoje dane: https://policies.google.com/technologies/partner-sites', 'Zarządzaj personalizacją reklam: https://adssettings.google.com', 'Rezygnacja za pośrednictwem Network Advertising Initiative: https://optout.networkadvertising.org', 'Rezygnacja za pośrednictwem Digital Advertising Alliance: https://optout.aboutads.info'],
    },
    {
      heading: 'Jak wykorzystujemy informacje',
      bullets: ['Aby odpowiedzieć na Państwa zapytania i zapewnić wsparcie.', 'Aby wyświetlać trafne reklamy za pośrednictwem naszych partnerów reklamowych.', 'Aby analizować wykorzystanie witryny i ulepszać nasze usługi.', 'Wykrywanie, zapobieganie i rozwiązywanie problemów związanych z oszustwami, nadużyciami i bezpieczeństwem.', 'Aby wypełnić obowiązki prawne.'],
    },
    {
      heading: 'Usługi stron trzecich',
      bullets: ['Google AdSense: Otrzymuje dane w celu wyświetlania i pomiaru reklam.', 'Dostawcy usług analitycznych: Otrzymuj zanonimizowane dane o użytkowaniu.', 'Netlify (hosting): przetwarza żądania i może rejestrować adresy IP.', 'Nie sprzedajemy Twoich danych osobowych. Udostępnianie danych partnerom reklamowym może jednak zostać uznane za sprzedaż w rozumieniu CCPA (patrz poniżej).'],
    },
    {
      heading: 'Przechowywanie danych',
      bullets: ['Przesyłanie danych kontaktowych: do 2 lat.', 'Logi serwera: do 30 dni (dostawca hostingu).', 'Dane analityczne: do 26 miesięcy (anonimizowane).', 'Pliki cookie reklamowe: Zwykle 13 miesięcy (w zależności od partnera).'],
    },
    {
      heading: 'Twoje prawa na mocy RODO (użytkownicy z EOG)',
      paragraphs: ['Jeśli znajdujesz się na terenie Europejskiego Obszaru Gospodarczego, przysługują Ci następujące prawa na mocy ogólnego rozporządzenia o ochronie danych:'],
      bullets: ['Prawo dostępu: Żądanie kopii danych osobowych, które o Tobie przechowujemy.', 'Prawo do sprostowania: Żądanie sprostowania nieprawidłowych danych.', 'Prawo do usunięcia: Żądanie usunięcia swoich danych (prawo do bycia zapomnianym).', 'Prawo do ograniczenia przetwarzania: Żądanie ograniczenia sposobu, w jaki wykorzystujemy Twoje dane.', 'Prawo do przenoszenia danych: Żądanie udostępnienia danych w formacie przenośnym.', 'Prawo do sprzeciwu: Sprzeciw wobec przetwarzania, w tym przetwarzania na potrzeby marketingu bezpośredniego.', 'Prawo do cofnięcia zgody: Cofnij zgodę w dowolnym momencie, jeżeli przetwarzanie odbywa się na podstawie zgody.', 'Prawo do wniesienia skargi: Złóż skargę do organu ochrony danych.'],
    },
    {
      heading: 'Podstawa prawna RODO',
      paragraphs: ['Przetwarzamy dane na następujących podstawach: (a) Zgoda — w celu wyświetlania spersonalizowanych reklam (zarządzanych przez naszych partnerów reklamowych); (b) Uzasadnione interesy — w celu przeprowadzania analiz, zapewniania bezpieczeństwa i ulepszeń; (c) Umowa — w celu odpowiadania na zapytania.', 'Aby skorzystać ze swoich praw, skontaktuj się z adresem ${CONTACT_EMAIL}. Odpowiemy w ciągu 30 dni.'],
    },
    {
      heading: 'Twoje prawa na mocy CCPA (użytkownicy z Kalifornii)',
      bullets: ['Prawo do wiedzy: Żądanie informacji o gromadzonych danych, źródłach, celach i stronach trzecich.', 'Prawo do usunięcia: Żądanie usunięcia swoich danych osobowych.', 'Prawo do rezygnacji: Zrezygnuj ze sprzedaży danych osobowych (udostępnianie ich partnerom reklamowym może być dopuszczalne).', 'Prawo do niedyskryminacji: Nie będziemy dyskryminować w związku z korzystaniem z Twoich praw.'],
    },
    {
      heading: 'Zebrano kategorie CCPA',
      paragraphs: ['Kategorie: Identyfikatory (adres IP, ID urządzenia), Aktywność w Internecie (przeglądanie, interakcje z reklamami), Geolokalizacja (przybliżona), Wnioski (zainteresowania na podstawie przeglądania).', 'Aby skorzystać z praw lub zrezygnować: ${CONTACT_EMAIL} lub zmienić ustawienia plików cookie.'],
    },
    {
      heading: 'Przelewy międzynarodowe',
      paragraphs: ['Twoje dane mogą być przekazywane do krajów o innych przepisach o ochronie danych, w tym do Stanów Zjednoczonych. Stosujemy odpowiednie zabezpieczenia, takie jak standardowe klauzule umowne.'],
    },
    {
      heading: 'Prywatność dzieci',
      paragraphs: ['ANQR nie jest skierowany do dzieci poniżej 13. roku życia (lub 16. w EOG). Nie zbieramy świadomie danych od dzieci. Skontaktuj się z ${CONTACT_EMAIL}, jeśli uważasz, że dziecko przekazało informacje.'],
    },
    {
      heading: 'Bezpieczeństwo',
      paragraphs: ['Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony danych, w tym szyfrowanie HTTPS. Jednak żadna transmisja internetowa nie jest w 100% bezpieczna.'],
    },
    {
      heading: 'Nie śledź',
      paragraphs: ['W miarę możliwości honorujemy sygnały przeglądarki Do Not Track, jednak partnerzy reklamowi mogą nie reagować na sygnały DNT.'],
    },
    {
      heading: 'Zmiany w niniejszej polityce',
      paragraphs: ['Możemy okresowo aktualizować niniejszą politykę. Data Ostatniej aktualizacji oznacza najnowszą wersję. Istotne zmiany mogą być komunikowane za pośrednictwem baneru na stronie.'],
    },
    {
      heading: 'Skontaktuj się z nami',
      paragraphs: ['W przypadku pytań dotyczących prywatności lub chęci skorzystania z przysługujących Państwu praw: ${CONTACT_EMAIL} lub skorzystaj z naszej strony kontaktowej. Odpowiadamy na prośby dotyczące prywatności w ciągu 30 dni.'],
    },
  ],
};

export default privacy;
