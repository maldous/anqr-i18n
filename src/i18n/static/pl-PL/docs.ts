import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: '"Podręcznik użytkownika ANQR”',
  description: '"Kompletny przewodnik dotyczący korzystania z ANQR do tworzenia kodów QR”.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Pierwsze kroki”',
      paragraphs: [
        '"ANQR to generator kodów QR, który stawia klienta na pierwszym miejscu. Domyślnie kody QR są generowane lokalnie w przeglądarce — nie jest wymagane konto, a dane pozostają prywatne. Do profesjonalnego osadzania można również skorzystać z API po stronie serwera”.',
        '"Interfejs ma trzy poziomy: Podstawowy, Zaawansowany i Profesjonalny. Wybierz swój poziom za pomocą zakładek w nagłówku. Każdy poziom odblokowuje dodatkowe funkcje, jednocześnie skupiając interfejs na tym, czego potrzebujesz.”',
      ],
      bullets: [
        '"Podstawowe: Proste tworzenie kodu QR z zawartością w postaci zwykłego tekstu/adresu URL i nakładką obrazkową”.',
        '"Zaawansowane: opcje kodowania QR, style renderowania, animacje, formaty wyjściowe, rozszerzone typy treści i dostosowywanie nakładek”.',
        '"Profesjonalne: znaki wodne, metadane, udostępnianie, analiza bezpieczeństwa, kody QR do płatności i funkcje korporacyjne”.',
      ],
    },
    {
      heading: '"Szybki start”',
      paragraphs: [
        '"Aby utworzyć swój pierwszy kod QR:”',
      ],
      bullets: [
        '"1. Wybierz typ zawartości (URL, tekst, Wi-Fi itp.) z listy rozwijanej Typ zawartości”.',
        '"2. Wprowadź swoje dane w wyznaczonych polach.”',
        '"3. Opcjonalnie dostosuj kolory, style i dodaj nakładkę obrazu”.',
        '"4. Kliknij Eksportuj, aby pobrać kod QR w formacie PNG, GIF, WebP lub SVG”.',
      ],
    },
    {
      heading: '"Podstawowe funkcje”',
      paragraphs: [
        '"Poziom podstawowy zapewnia uproszczony interfejs do tworzenia kodów QR z treścią i nakładkami graficznymi. To najprostszy sposób na rozpoczęcie pracy”.',
      ],
    },
    {
      heading: '"Typy treści (podstawowe)”',
      paragraphs: [
        '"Zwykły tekst: Zakoduj dowolny tekst do limitu pojemności kodu QR. Idealne do krótkich wiadomości, kodów lub identyfikatorów”.',
        '"URL: Kodowanie adresów internetowych. Kod QR otworzy adres URL po zeskanowaniu. Obsługuje protokoły http:// i https://.”',
      ],
    },
    {
      heading: '"Nakładka obrazu (podstawowa)”',
      paragraphs: [
        '"Prześlij obraz (JPG, PNG, GIF, WebP), który połączy się z kodem QR. Podstawowe funkcje nakładki obejmują:”',
      ],
      bullets: [
        '"Prześlij z pliku: Wybierz obraz ze swojego urządzenia”.',
        '"Wczytaj z adresu URL: Wprowadź adres URL obrazu (musi zezwalać na CORS).”',
        '"Logo centralne: umieszcza obraz w centrum, polegając na korekcie błędów”.',
        '"Blend: Proste mieszanie alfa obrazu ze wzorem QR”.',
        '"Intensywność: kontroluje, jak mocno nakładka wpływa na kod QR (0–100%)”.',
        '"Tryb koloru: Pełny kolor, Skala szarości lub Czarno-biały”.',
        '"Zachowaj wzory wyszukiwania: zachowuje niezmienione wzory narożników, zapewniając niezawodne skanowanie”.',
      ],
    },
    {
      heading: '"Zaawansowane funkcje”',
      paragraphs: [
        '"Poziom zaawansowany odblokowuje opcje kodowania QR, style renderowania, animacje, formaty wyjściowe, rozszerzone typy treści i zaawansowaną personalizację nakładek”.',
      ],
    },
    {
      heading: '"Ustawienia kodowania QR”',
      paragraphs: [
        '"Wersja: Kody QR występują w wersjach 1–40, przy czym wyższe wersje zawierają więcej danych, ale są większe. Ustaw na 0 (Auto), aby ANQR wybrał najmniejszą wersję pasującą do Twojej zawartości”.',
        '"Korekcja błędów: Określa, jak duże uszkodzenia może wytrzymać kod QR, aby pozostać możliwym do zeskanowania”.',
      ],
      bullets: [
        '"L (niski): 7% korekcji błędów – najmniejszy rozmiar, najmniejsza redundancja”.',
        '"M (Średnia): 15% korekcji błędów – opcja zrównoważona”.',
        '"Q (kwartyl): 25% korekcji błędów – dobre dla kodów drukowanych”.',
        '"H (wysoka): 30% korekcji błędów – najlepsza w przypadku kodów z nakładkami lub w trudnych warunkach”.',
      ],
    },
    {
      heading: '"Strefa ciszy (margines)”',
      paragraphs: [
        '"Strefa ciszy to biała przestrzeń wokół kodu QR. Skanery potrzebują tego marginesu, aby wykryć, gdzie zaczyna się kod. Norma zaleca co najmniej 4 moduły. Zmniejszenie poniżej 4 może spowodować problemy ze skanowaniem”.',
      ],
    },
    {
      heading: '"Styl modułowy”',
      paragraphs: [
        '"Moduły to pojedyncze kwadraty tworzące kod QR. ANQR oferuje pięć stylów:”',
      ],
      bullets: [
        '"Kwadrat: Klasyczny wygląd kodu QR z ostrymi narożnikami”.',
        '"Zaokrąglone: Zmiękczone rogi dla bardziej przyjaznego wyglądu.”',
        '"Kropki: Okrągłe moduły dla nowoczesnej estetyki”.',
        '"Diament: kwadraty obrócone o 45° tworzą charakterystyczny wzór”.',
        '"Połączenie: Moduły łączą się ze sobą, gdy sąsiadują ze sobą, tworząc organiczne kształty”.',
      ],
    },
    {
      heading: '"Styl wzoru wyszukiwarki”',
      paragraphs: [
        '"Wzory Findera to trzy duże kwadraty w narożnikach kodu QR, które pomagają skanerom zorientować kod. Dostępne style:”',
      ],
      bullets: [
        '"Kwadrat: Standardowe kwadratowe narożniki”.',
        '"Zaokrąglone: Zmiękczone rogi pasujące do zaokrąglonego stylu modułu”.',
        '"Koło: Wzory wyszukiwania kołowego dla kodów kropkowych”.',
      ],
    },
    {
      heading: '"Wzory wyrównania i synchronizacji”',
      paragraphs: [
        '"Wzory wyrównania pojawiają się w większych kodach QR (wersja 2+), aby pomóc w korekcie zniekształceń. Wzorce czasowe to naprzemienne linie łączące wzorce wizjera”.',
      ],
      bullets: [
        '"Styl wyrównania: Wyszukiwarka dopasowań, Kwadrat, Zaokrąglenie lub Okrąg”.',
        '"Styl pomiaru czasu: moduł dopasowania, linia ciągła lub linia przerywana”.',
      ],
    },
    {
      heading: '"Kolorów”',
      paragraphs: [
        '"Pierwszy plan: Kolor modułów QR. Standardowo czarny (#000000) jest kolorem czarnym, ale sprawdzi się każdy ciemny kolor.”',
        '"Tło: Kolor tła. Standardowo stosuje się kolor biały (#ffffff). Należy zapewnić odpowiedni kontrast z pierwszym planem”.',
        '"Przezroczyste tło: Aby zastosować na kolorowych powierzchniach, całkowicie usuń tło. Upewnij się, że powierzchnia zapewnia odpowiedni kontrast”.',
      ],
    },
    {
      heading: '"Rozmiar modułu i odstęp”',
      paragraphs: [
        '"Rozmiar modułu: Kontroluje, jak duży jest renderowany każdy moduł w pikselach. Większe wartości tworzą większe, łatwiejsze do skanowania kody”.',
        '"Odstęp między modułami: Dodaje odstęp między modułami w procentach. Małe odstępy (5–15%) mogą poprawić skanowalność w niektórych warunkach, ale duże odstępy zmniejszają niezawodność”.',
      ],
    },
    {
      heading: '"Ustawienia wyjściowe”',
      paragraphs: [
        '"Format: Wybierz format eksportu w zależności od przypadku użycia”.',
      ],
      bullets: [
        '"PNG: Bezstratny format rastrowy, idealny do większości zastosowań. Najlepszy do druku i formatów cyfrowych”.',
        '"WebP: Nowoczesny format o mniejszych rozmiarach plików. Dobry do użytku w internecie”.',
        '"GIF: Wymagany dla animowanych kodów QR. Obsługuje przezroczystość”.',
        '"SVG: Format wektorowy, który można skalować w nieskończoność. Najlepszy do dużych wydruków lub do edycji kodu.”',
      ],
    },
    {
      heading: '"Wymiary wyjściowe”',
      paragraphs: [
        '"Szerokość/Wysokość: Ustaw rozmiar wydruku w pikselach. W przypadku druku, oblicz na podstawie DPI (np. 300 DPI przy 1 calu = 300 pikseli). Większe rozmiary skanują się bardziej niezawodnie z większej odległości”.',
      ],
    },
    {
      heading: '"Ustawienia animacji (zaawansowane)”',
      paragraphs: [
        '"Kontroluj zachowanie animowanego kodu QR:”',
      ],
      bullets: [
        '"Prędkość: Liczba klatek na sekundę animacji w milisekundach”.',
        '"Pętla: Animacja ciągła lub jednorazowa”.',
        '"Bounce: Reżyseria animacji ping-ponga”.',
        '"Klatka początkowa: Rozpocznij animację od określonej klatki”.',
        '"Maksymalna liczba klatek: Ogranicz całkowitą liczbę klatek w animacji”.',
        '"Krok klatki: Pomiń klatki, aby przyspieszyć animację”.',
        '"Interpolacja: Brak, Przejście lub Morfowanie między klatkami”.',
      ],
    },
    {
      heading: '"Typy treści (zaawansowane)”',
      paragraphs: [
        '"Poziom zaawansowany odblokowuje dodatkowe formaty ładunku:”',
      ],
      bullets: [
        '"Numer telefonu (tel:): Tworzy łącze telefoniczne, pod którym można nawiązać połączenie”.',
        '"E-mail (mailto:): Otwiera klienta poczty e-mail z opcjonalnym tematem i treścią.”',
        '"SMS: Wstępnie wypełniona wiadomość tekstowa wysyłana na numer telefonu”.',
        '"vCard: Pełna wizytówka kontaktowa zawierająca imię i nazwisko, organizację, numer telefonu, adres e-mail i adres.”',
        '"MeCard: Kompaktowy format kontaktowy popularny w Japonii”.',
        '"BizCard: tradycyjny format wizytówki”.',
        '"Geolokalizacja: współrzędne GPS otwierane na mapach”.',
        '"WiFi: dane uwierzytelniające sieci do automatycznego połączenia (SSID, hasło, typ zabezpieczeń)”.',
        '"Wydarzenie kalendarzowe: format iCalendar z tytułem, lokalizacją, datą/godziną”.',
        '"Potwierdzenie uczestnictwa w wydarzeniu: Link do strony rejestracji na wydarzenie”.',
        '"Subskrybuj kalendarz: Subskrybuj kanał ICS/WebCal”.',
        '"Adres URL pliku/dokumentu: Bezpośredni link do plików do pobrania”.',
        '"Link do przechowywania danych w chmurze: Linki do Google Drive, Dropbox, OneDrive itp.”',
        '"Profil społecznościowy: Linki do serwisów LinkedIn, Twitter, Instagram itp.”',
        '"Link do wiadomości: głębokie linki WhatsApp, Telegram, Signal”.',
      ],
    },
    {
      heading: '"Zaawansowane funkcje nakładki”',
      paragraphs: [
        '"Dodatkowe możliwości nakładki:”',
      ],
      bullets: [
        '"Przycinanie: Włącz przycinanie, aby wybrać kwadratowy obszar obrazu”.',
        '"Półtony: Klasyczny wzór kropek w stylu druku, bazujący na jasności obrazu”.',
        '"Dithering: dithering z rozpraszaniem błędów w celu uzyskania szczegółowej reprodukcji”.',
      ],
    },
    {
      heading: '"Tryby nakładania mieszanki (zaawansowane)”',
      paragraphs: [
        '"Dodatkowe tryby mieszania na poziomie zaawansowanym:”',
      ],
      bullets: [
        '"Subpiksel: Dzieli każdy moduł na subpiksele w celu uzyskania większej szczegółowości”.',
        '"Blue Noise: Wykorzystuje dithering z niebieskim szumem w celu uzyskania wzorów bez artefaktów”.',
        '"Mozaika: Efekt oparty na kafelkach, zachowujący strukturę obrazu”.',
        '"Wypełnianie luk: umieszcza obrazy w lukach między modułami”.',
        '"Jasność: zmienia rozmiar modułu w zależności od jasności obrazu”.',
        '"Duotone: obraz jest mapowany na dwa kolory, co zapewnia uderzający kontrast”.',
      ],
    },
    {
      heading: '"Intensywność nakładki”',
      paragraphs: [
        '"Kontroluje, jak mocno nakładka wpływa na kod QR (0–100%). Wyższe wartości pokazują więcej szczegółów obrazu, ale mogą pogorszyć jego skanowalność. Zacznij od około 70% i dostosuj na podstawie testów”.',
      ],
    },
    {
      heading: '"Tryb kolorów”',
      paragraphs: [
        '"Jak przetwarzany jest obraz nałożony:”',
      ],
      bullets: [
        '"Pełny kolor: zachowuje oryginalne kolory obrazu”.',
        '"Skala szarości: Konwertuje na odcienie czerni i bieli”.',
        '"Czerń i biel: konwersja binarna o wysokim kontraście”.',
      ],
    },
    {
      heading: '"Zachowaj wzorce wyszukiwania”',
      paragraphs: [
        '"Po włączeniu, nakładka zachowuje trzy wzory wyszukiwania narożników bez zmian. Zdecydowanie zalecane dla niezawodnego skanowania.”',
      ],
    },
    {
      heading: '"Wstępne przetwarzanie obrazu”',
      paragraphs: [
        '"Zastosuj filtry do nałożonego obrazu przed jego zmieszaniem. Te zmiany mogą poprawić wygląd obrazu w ostatecznym kodzie QR”.',
      ],
      bullets: [
        '"Jasność (-100 do +100): Rozjaśnij lub przyciemnij obraz”.',
        '"Kontrast (-100 do +100): Zwiększ lub zmniejsz zakres tonalny”.',
        '"Gamma (0,2 do 3,0): Nieliniowa regulacja jasności. Wartości poniżej 1 rozjaśniają półcienie, powyżej 1 przyciemniają je”.',
        '"Nasycenie (-100 do +100): Intensywność koloru. -100 oznacza skalę szarości, +100 oznacza przesycenie.”',
        '"Obrót odcienia (0–360°): Przesunięcie wszystkich kolorów na kole kolorów”.',
        '"Rozmycie (0–20 pikseli): Zmiękczenie szczegółów obrazu”.',
        '"Wyostrz (0–100%): Uwydatnij krawędzie i szczegóły”.',
        '"Posteryzacja (poziomy 0–16): Zmniejsz poziomy kolorów, aby uzyskać efekt plakatu”.',
        '"Próg (0–255): Konwersja na binarny obraz czarno-biały w punkcie odcięcia”.',
        '"Wykrywanie krawędzi: algorytmy Sobela i Canny’ego pozwalające na wyświetlanie wyłącznie krawędzi”.',
        '"Odwróć: Odwróć wszystkie kolory”.',
      ],
    },
    {
      heading: '"Tryb dopasowania”',
      paragraphs: [
        '"Jak nałożony obraz pasuje do obszaru kodu QR:”',
      ],
      bullets: [
        '"Okładka: Obraz wypełnia cały obszar, w razie potrzeby przycinany”.',
        '"Zawiera: Cały obraz widoczny, może mieć marginesy”.',
        '"Rozciąganie: Obraz zniekształca się, aby dokładnie wypełnić”.',
      ],
    },
    {
      heading: '"Opcje transformacji”',
      paragraphs: [
        '"Obrót: Obróć nakładkę o 90°.”',
        '"Odwróć X/Y: Odbij obraz w poziomie lub w pionie”.',
      ],
    },
    {
      heading: '"Algorytmy ditheringu”',
      paragraphs: [
        '"Dithering konwertuje obrazy o płynnych przejściach tonalnych na wzory, które mogą być reprezentowane przez kody QR. Dostępne w trybach mieszania Dithering, Blue Noise lub True Dithering”.',
      ],
      bullets: [
        '"Dyfuzja błędów: Klasyczny styl Floyda-Steinberga. Rozprzestrzenia błąd kwantyzacji na sąsiednie piksele”.',
        '"Uporządkowane (Bayer): Używa macierzy progowej dla regularnych wzorców”.',
        '"Klastrowane kropki: symuluje drukowanie półtonowe”.',
        '"Pustka i klaster: zoptymalizowane uporządkowane dithering”.',
        '"Blue Noise: wizualnie przyjemny, losowo wyglądający wzór”.',
        '"Próg szumu niebieskiego: dithering progowy z teksturą szumu niebieskiego”.',
        '"Biały szum: losowe dithering progowy”.',
        '"Szum gaussowski/trójkątny: szum o różnych rozkładach”.',
        '"Blue Noise + Error Diffusion: hybryda łącząca obie techniki”.',
        '"Ekranowany niebieski szum: Wzór niebieskiego szumu przypominający ekran”.',
        '"Percepcyjne: Ważone pod względem luminancji dla lepszych efektów wizualnych”.',
        '"Edge-Aware: zachowuje krawędzie obrazu podczas ditheringu”.',
        '"Próg adaptacyjny: progowanie lokalnie adaptacyjne”.',
        '"Czasowy niebieski szum: w przypadku animowanych plików GIF wzór zmienia się w zależności od klatki”.',
      ],
    },
    {
      heading: '"Jądra dyfuzyjne”',
      paragraphs: [
        '"W przypadku korzystania z ditheringu rozpraszania błędów wybierz sposób rozprowadzania błędów:”',
      ],
      bullets: [
        '"Floyd-Steinberg: Klasyczna dyfuzja 4-sąsiedzka. Dobry wybór na ogół.”',
        '"Jarvis-Judice-Ninke: 12-sąsiad, płynniejszy, ale wolniejszy.”',
        '"Stucki: Podobny do JJN, ale o innej wadze.”',
        '"Burkes: Uproszczony JJN, szybszy.”',
        '"Sierra: Rodzina ziaren łącząca jakość i szybkość”.',
        '"Atkinson: Rozproszenie światła, zachowuje szczegóły, ale może być ziarniste.”',
      ],
    },
    {
      heading: '"Siła wahania”',
      paragraphs: [
        '"Kontroluje stopień ditheringu (0–100%). Niższe wartości zachowują więcej oryginalnego wzoru, wyższe wartości pokazują więcej szczegółów obrazu”.',
      ],
    },
    {
      heading: '"Ustawienia subpikseli”',
      paragraphs: [
        '"Podczas korzystania z trybu mieszania subpikseli:”',
      ],
      bullets: [
        '"Rozmiar siatki: 2×2, 3×3 lub 4×4 subpikseli na moduł. Większy = więcej szczegółów”.',
        '"Zasada środka: Ścisła wymaga, aby środkowy subpiksel pasował do modułu. Środek półtonu dopuszcza zmienność”.',
        '"Kolor neutralny: kolor używany w przypadku nieokreślonych subpikseli”.',
        '"Nadpisywanie wzorców wyszukiwania: sposób renderowania wzorców wyszukiwania (jednolite lub stylizowane)”.',
      ],
    },
    {
      heading: '"Ustawienia półtonów”',
      paragraphs: [
        '"Podczas korzystania z trybu mieszania półtonów:”',
      ],
      bullets: [
        '"Rozmiar komórki: na moduł lub siatkę N×N”.',
        '"Kształt kropki: okrąg, kwadrat lub linia”.',
        '"Krzywa jasności: liniowa, krzywa S lub gamma”.',
      ],
    },
    {
      heading: '"Kolory dwutonowe”',
      paragraphs: [
        '"W przypadku korzystania z trybu mieszania Duotone ustaw kolor cienia (ciemne obszary) i kolor podświetlenia (jasne obszary).”',
      ],
    },
    {
      heading: '"Ustawienia animacji GIF”',
      paragraphs: [
        '"Podczas korzystania z nakładek animowanych GIF:”',
      ],
      bullets: [
        '"Użyj opóźnień klatek: Szanuj oryginalny czas trwania pliku GIF”.',
        '"Maksymalna liczba klatek na sekundę: Ogranicz liczbę klatek na sekundę (1–60 kl./s).”',
        '"Postępowanie z odpadami: Przestrzegaj lub upraszczaj metody utylizacji ram”.',
      ],
    },
    {
      heading: '"Zaawansowane opcje renderowania”',
      paragraphs: [
        '"Dodatkowe elementy sterujące renderowaniem:”',
      ],
      bullets: [
        '"Tryb odstępu: Brak, Wstawka, Obrys lub Styl odstępu z negatywną spacją”.',
        '"Promień narożnika: Procent zaokrąglonych narożników dla modułów”.',
        '"Gradient: Brak, gradient liniowy, promieniowy lub stożkowy na modułach”.',
        '"Styl zewnętrzny/wewnętrzny oka: Niezależne stylizowanie pierścieni z wzorem szukacza”.',
        '"Obrót kropki: Obróć moduły diamentowe/kropkowe”.',
        '"Skala oka: Dostosowywanie rozmiaru dla wzorów wizjera”.',
        '"Styl ramki: Dodaj ozdobne ramki (ramkę zaokrągloną, naklejkę, etykietę)”.',
        '"Tekst ramki: Dodaj tekst, taki jak "Skanuj mnie!” do ramek.”',
      ],
    },
    {
      heading: '"Zaawansowane kodowanie QR”',
      paragraphs: [
        '"Dopracuj kodowanie QR:”',
      ],
      bullets: [
        '"Tryb kodowania: automatyczny, numeryczny, alfanumeryczny, bajtowy/UTF-8 lub kanji”.',
        '"Wymuś minimalną cichą strefę: Zapewnij co najmniej 4-modułowy margines”.',
      ],
    },
    {
      heading: '"Zaawansowane opcje wyjściowe”',
      paragraphs: [
        '"Dodatkowe ustawienia eksportu:”',
      ],
      bullets: [
        '"Nazwa pliku: Niestandardowa nazwa pliku do pobrania”.',
        '"Rozmiar palety GIF: 2–256 kolorów w wynikach GIF”.',
        '"Kwantizator GIF: redukcja kolorów Median Cut, NeuQuant lub Octree”.',
        '"Dithering GIF: wyłączony, Floyd-Steinberg czy uporządkowany”.',
        '"Kolor przezroczysty GIF: Ustaw kolor jako przezroczysty”.',
        '"SVG True Vector: Użyj ścieżek zamiast osadzonego rastra”.',
        '"Dokładność kształtu SVG: renderowanie pikseli lub precyzyjnej ścieżki”.',
        '"Nakładka rastrowa SVG: Dołącz nakładkę jako osadzony obraz”.',
        '"Nadpisanie tła: Wymuś określony kolor tła w danych wyjściowych”.',
      ],
    },
    {
      heading: '"Opcje walidacji”',
      paragraphs: [
        '"Ustawienia przetwarzania wejściowego:”',
      ],
      bullets: [
        '"Sprawdź dane wejściowe: sprawdź format zawartości przed kodowaniem”.',
        '"Przytnij odstępy: Usuń spacje na początku i na końcu”.',
        '"Normalizacja nowych linii: Konwertuj wszystkie zakończenia linii na LF”.',
        '"Ochrona maksymalnej długości: Ostrzegaj, jeśli zawartość przekroczy limit kodu QR”.',
      ],
    },
    {
      heading: '"Funkcje profesjonalne”',
      paragraphs: [
        '"Poziom Professional dodaje znaki wodne, metadane, opcje udostępniania, analizę bezpieczeństwa, kody QR płatności i funkcje korporacyjne”.',
      ],
    },
    {
      heading: '"Znak wodny”',
      paragraphs: [
        '"Dodaj znaki wodne do swoich kodów QR:”',
      ],
      bullets: [
        '"Rodzaj: Tekst, Obraz lub Wzór znaku wodnego”.',
        '"Pozycja: środek, rogi, krawędzie, tył lub cicha strefa”.',
        '"Krycie: Przezroczystość znaku wodnego (0–100%)”.',
        '"Tryb mieszania: Normalny, Mnożenie, Ekran lub Nakładka”.',
      ],
    },
    {
      heading: '"Metadane”',
      paragraphs: [
        '"Osadź metadane w eksportowanych plikach:”',
      ],
      bullets: [
        '"Pola Tytuł, Autor, Prawa autorskie, Licencja, Opis”.',
        '"Czas utworzenia: Umieść znacznik czasu generacji”.',
        '"Niestandardowa wartość klucza: Dodaj dowolne pary metadanych”.',
      ],
    },
    {
      heading: '"Udostępnianie”',
      paragraphs: [
        '"Udostępnij konfiguracje kodów QR:”',
      ],
      bullets: [
        '"Bezpośredni link: Wygeneruj udostępnialny adres URL przy użyciu bieżących ustawień”.',
        '"Osadź HTML: Pobierz kod do osadzenia na stronach internetowych”.',
        '"Kodowanie parametrów: uwzględnij wszystkie ustawienia w udostępnianym adresie URL”.',
        '"Uwaga: Nakładek na obrazy z plików lokalnych nie można udostępniać za pośrednictwem adresu URL”.',
      ],
    },
    {
      heading: '"Analiza bezpieczeństwa”',
      paragraphs: [
        '"Zapewnij, że kody QR pozostaną możliwe do zeskanowania”:',
      ],
      bullets: [
        '"Tryb bezpieczeństwa: wyłączony, zrównoważony lub rygorystyczny – wymagania skanowania”.',
        '"Min. rozmiar modułu: minimalny rozmiar piksela na moduł”.',
        '"Minimalna strefa ciszy: minimalne moduły marginesu”.',
        '"Wyszukiwarki zamków/Czas/Wyrównanie/Format/Wersja: Chroń określone elementy”.',
        '"Maksymalna intensywność nakładki według ECC: automatyczne limity intensywności w oparciu o poziom korekcji błędów”.',
      ],
    },
    {
      heading: '"Typy treści (profesjonalne)”',
      paragraphs: [
        '"Poziom profesjonalny dodaje typy treści płatnych i korporacyjnych:”',
      ],
      bullets: [
        '"EPC/SEPA (UE): Europejskie kody QR do przelewów bankowych z numerami IBAN, BIC, kwotą i numerem referencyjnym”.',
        '"UPI (Indie): Unified Payments Interface z VPA, nazwą odbiorcy płatności, kwotą”.',
        '"PayNow (Singapur): szybka płatność w Singapurze za pomocą UEN lub numeru telefonu komórkowego”.',
        '"PromptPay (Tajlandia): tajski krajowy system płatniczy”.',
        '"PIX (Brazylia): Brazylijska płatność natychmiastowa za pomocą klucza PIX”.',
        '"Krypto: adresy płatności Bitcoin, Ethereum, Litecoin z opcjonalną kwotą”.',
        '"Link do kampanii marketingowej: adresy URL z pełnym śledzeniem parametrów UTM (tagi marketingowe)”.',
        '"Krótki link: Do stosowania ze skracaczami adresów URL w przypadku dynamicznych/śledzonych kodów QR”.',
        '"GS1 Digital Link: Identyfikacja produktu za pomocą GTIN, numeru seryjnego, partii i daty ważności”.',
        '"Głęboki link do aplikacji: głębokie linki do aplikacji iOS/Android z niestandardowymi schematami”.',
        '"Format niestandardowy: surowe dane bez formatowania i walidacji”.',
      ],
    },
    {
      heading: '"Płatności uwzględniające język w trybie zaawansowanym”',
      paragraphs: [
        '"W trybie zaawansowanym ANQR automatycznie wyświetla metody płatności odpowiednie dla wybranego języka. Na przykład użytkownicy wietnamscy widzą VietQR, użytkownicy tajscy widzą PromptPay, a użytkownicy indyjscy widzą UPI i BharatQR. Globalne metody płatności (kryptowaluty, PayPal, Cash App) są dostępne we wszystkich językach. Tryb profesjonalny odblokowuje wszystkie standardy płatności, niezależnie od języka.”',
      ],
    },
    {
      heading: '"Europejskie standardy płatności”',
      bullets: [
        '"EPC/SEPA (UE): Europejskie kody QR do przelewów bankowych zgodne ze standardem EPC QR Code. Obsługuje IBAN, BIC (opcjonalnie dla przelewów krajowych), kwoty w EUR oraz strukturalne i niestrukturalne referencje płatności. Stosowane w całej strefie SEPA, w tym w krajach UE oraz w Szwajcarii, Norwegii, Islandii, Liechtensteinie, Monako i San Marino”.',
        '"Szwajcarski rachunek QR: Szwajcarski standard płatności zgodny z wytycznymi implementacji SIX. Obsługuje CHF i EUR, kod QR (QRR), kod referencyjny wierzyciela (ISO 11649), ustrukturyzowane adresy wierzyciela/dłużnika oraz informacje o rachunku. Wymagany dla szwajcarskich faktur od 2022 roku”.',
      ],
    },
    {
      heading: '"Indyjskie standardy płatności”',
      bullets: [
        '"UPI (Indie): Zunifikowany Interfejs Płatności zgodny ze Specyfikacją Głębokiego Linkowania NPCI. Obsługuje VPA (wirtualny adres płatności), nazwę odbiorcy, kwotę w rupiach indyjskich, notę transakcyjną, identyfikator referencyjny, kod kategorii sprzedawcy i tryb transakcji”.',
        '"BharatQR (Indie): Zunifikowany standard QR obsługujący płatności UPI i kartami. Łączy UPI VPA z numerem PAN karty dla zapewnienia maksymalnej kompatybilności. Zawiera nazwę sprzedawcy, miasto, MCC, dane GST oraz numery faktur/referencyjne”.',
      ],
    },
    {
      heading: '"Standardy płatności w Azji Południowo-Wschodniej”',
      bullets: [
        '"PayNow (Singapur): Singapurski system szybkich płatności wykorzystujący specyfikację EMVCo QR z profilem SGQR. Obsługuje UEN (rejestrację firmy), numer telefonu komórkowego lub NRIC jako identyfikatory proxy. Zawiera flagę edycji kwoty i datę ważności.”',
        '"PromptPay (Tajlandia): Tajski krajowy system płatności oparty na profilu EMV Banku Tajlandii. Obsługuje numer telefonu komórkowego, dowód osobisty, identyfikator podatkowy, identyfikator portfela elektronicznego i płatności rachunków z wieloma polami referencyjnymi”.',
        '"QRIS (Indonezja): Indonezyjski standard szybkiego kodu odpowiedzi. Krajowy standard płatności oparty na standardzie EMV, obsługujący identyfikator sprzedawcy, NMID (National Merchant ID), klasyfikację kryteriów sprzedawcy oraz opłaty za wygodę (stałe lub procentowe).”',
        '"DuitNow (Malezja): Malezyjski system płatności natychmiastowych. Obsługuje wiele typów serwerów proxy, w tym numery NRIC, numery telefonów komórkowych, paszporty, identyfikatory wojskowe i numery rejestracyjne firm”.',
        '"VietQR (Wietnam): wietnamski standard przelewów międzybankowych. Wymaga numeru BIN banku (identyfikator NAPAS) i numeru konta. Obsługuje wiele kodów usług dla różnych typów przelewów (QRPUSH, QRIBFTTA, QRIBFTTC).”',
        '"QR Ph (Filipiny): Filipiński standard płatności QR dla InstaPay i PESONet. Używa numerów kont z identyfikacją sprzedawcy w transakcjach P2M (osoba-sprzedawca).”',
      ],
    },
    {
      heading: '"Standardy płatności w Azji Wschodniej”',
      bullets: [
        '"TWQR (Tajwan): Tajwański standard płatności QR. Obsługuje identyfikator sprzedawcy, identyfikator podatkowy i kwoty TWD”.',
        '"HKQR/FPS (Hongkong): Kody QR systemu szybkich płatności w Hongkongu. Obsługuje identyfikator FPS, numer telefonu komórkowego lub adres e-mail jako identyfikatory płatności. Kwoty w HKD.”',
        '"JPQR (Japonia): Japoński ujednolicony standard płatności kodem QR. Używa identyfikatora sklepu do identyfikacji sprzedawcy za pomocą kwot JPY”.',
      ],
    },
    {
      heading: '"Inne regionalne standardy płatności”',
      bullets: [
        '"PIX (Brazylia): System natychmiastowych płatności brazylijskiego banku centralnego, zgodny ze specyfikacją kodu BR. Obsługuje klucze PIX (CPF, CNPJ, adres e-mail, numer telefonu lub klucz losowy), nazwę/miasto sprzedawcy, identyfikator transakcji oraz kwoty BRL”.',
        '"AusPayNet/NPP PayID (Australia): Australijski system PayID nowej platformy płatniczej. Obsługuje typy PayID (adres e-mail, numer telefonu komórkowego, ABN, identyfikator organizacji) lub tradycyjny numer BSB + numer konta. Nazwa sprzedawcy jest opcjonalna, ponieważ płatnicy widzą zarejestrowaną nazwę w wyszukiwarce NPP”.',
      ],
    },
    {
      heading: '"Płatności kryptowalutowe”',
      bullets: [
        '"Bitcoin/Litecoin (BIP-21): Standardowe identyfikatory URI płatności kryptowalutowych z adresem portfela, opcjonalną kwotą i etykietą. Kompatybilne ze wszystkimi głównymi portfelami Bitcoin i Litecoin.”',
        '"Lightning Network (BOLT11): Faktury za płatności w sieci Lightning Network. Wklej zakodowany ciąg faktury w BOLT11, aby uzyskać natychmiastowe płatności Bitcoin z minimalnymi opłatami”.',
        '"Ethereum (EIP-681): Identyfikatory URI żądań transakcji Ethereum obsługujące natywne transfery ETH i transfery tokenów ERC-20. Zawiera identyfikator łańcucha dla obsługi wielu sieci (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), parametry gazu i wywołania funkcji kontraktu”.',
      ],
    },
    {
      heading: '"Usługi linków płatniczych”',
      bullets: [
        '"PayPal.Me: Linki do płatności PayPal z nazwą użytkownika i opcjonalną, wstępnie wypełnioną kwotą. Odbiorcy mogą płacić za pomocą salda PayPal, karty lub konta bankowego.”',
        '"Aplikacja Cash: Linki do płatności w aplikacji Cash z użyciem $cashtag z opcjonalną kwotą. Popularne w Stanach Zjednoczonych w przypadku płatności peer-to-peer”.',
      ],
    },
    {
      heading: '"Ogólny kod QR EMV”',
      bullets: [
        '"EMV Generic: Twórz niestandardowe kody QR w trybie prezentowanym przez sprzedawcę (EMV Merchant-Presented Mode) dla systemów płatności, które nie są wymienione. Skonfiguruj nazwę sprzedawcy, miasto, kod kraju (ISO 3166-1), kod waluty (numeryczny ISO 4217), MCC, opcje napiwków/opłat za wygodę oraz dodatkowe pola danych. Przydatne do testowania lub integracji niestandardowych.”',
      ],
    },
    {
      heading: '"Tryby nakładania (profesjonalne)”',
      paragraphs: [
        '"Dodatkowe tryby mieszania na poziomie profesjonalnym:”',
      ],
      bullets: [
        '"Pikselacja: Efekt nakładki z pikselami”.',
        '"Kontur: nakładka wykrywania krawędzi pokazująca tylko kontury”.',
        '"Fala: Efekt zniekształcenia falistego”.',
        '"Rozmiar subpiksela: zmienny rozmiar subpiksela w zależności od obrazu”.',
        '"Prawdziwy dithering: Zaawansowany dithering z uporządkowanym wyborem macierzy”.',
        '"Ekstremalne: Maksymalna widoczność obrazu, może mieć wpływ na możliwość skanowania”.',
      ],
    },
    {
      heading: '"Ustawienia ochrony”',
      paragraphs: [
        '"Szczegółowa kontrola nad tym, które elementy QR są chronione przed modyfikacją nakładki:”',
      ],
      bullets: [
        '"Zachowaj synchronizację: Utrzymuj wzorce synchronizacji niezmienione”.',
        '"Zachowaj wyrównanie: Utrzymuj wzorce wyrównania bez zmian”.',
        '"Chroń informacje o formacie: Osłaniaj moduły informacji o formacie”.',
        '"Chroń informacje o wersji: moduły informacji o wersji tarczy”.',
      ],
    },
    {
      heading: '"Tryb uwzględniający ECC”',
      paragraphs: [
        '"Inteligentnie rozkłada intensywność nakładki w oparciu o możliwości korekcji błędów. System analizuje, które moduły można modyfikować, zachowując jednocześnie możliwość skanowania”.',
      ],
      bullets: [
        '"Budżet ryzyka: Procent możliwości korekcji błędów do wykorzystania (0–100%)”.',
        '"Większy budżet = bardziej widoczna nakładka, ale większe ryzyko skanowania”.',
        '"Niższy budżet = bezpieczniejsze skanowanie, ale mniej widoczna nakładka”.',
      ],
    },
    {
      heading: '"Opcje profesjonalnego renderowania”',
      paragraphs: [
        '"Zaawansowane sterowanie renderowaniem:”',
      ],
      bullets: [
        '"Wyraźne krawędzie: Użyj pikselowego renderowania obrazu, aby uzyskać ostre krawędzie modułów”.',
        '"Pixel Snap: wyrównanie pikseli na podłodze, wokół lub na suficie”.',
        '"Tryb kolorów dla każdego modułu: jednolity, według jasności, według pozycji, według nakładki, według klastra”.',
        '"Paleta kolorów: Zdefiniuj niestandardową paletę kolorów dla kolorowania poszczególnych modułów”.',
        '"Contrast Guard: Zapewnij minimalny współczynnik kontrastu między kolorami”.',
        '"Minimalny współczynnik kontrastu: Wymagania dotyczące kontrastu w stylu WCAG (1:1 do 21:1).”',
        '"Moduły poza granicą: Dodatkowa granica poza strefą ciszy”.',
      ],
    },
    {
      heading: '"Opcje profesjonalnego wydruku”',
      paragraphs: [
        '"Ustawienia eksportu przedsiębiorstwa:”',
      ],
      bullets: [
        '"DPI: Ustaw rozdzielczość druku (72–600 DPI). Zalecana rozdzielczość druku to 300 DPI”.',
        '"Uwzględnij strefę ciszy: Przełącz strefę ciszy w wymiarach wyjściowych”.',
        '"Eksportuj jako dodatkowy: Generuj plik PDF obok formatu podstawowego”.',
      ],
    },
    {
      heading: '"Ustawienia animacji (profesjonalne)”',
      paragraphs: [
        '"Dodatkowe funkcje animacji profesjonalnej:”',
      ],
      bullets: [
        '"Dither czasowy: wyłączony, szum niebieski lub dithering bezpieczny dla migotania na klatkę”.',
        '"Wzór: Brak, Efekty pulsu, fali, linii skanowania, migotania lub dryfu”.',
      ],
    },
    {
      heading: '"Odwołanie do API”',
      paragraphs: [
        '"ANQR udostępnia API po stronie serwera do generowania kodów QR za pomocą parametrów adresu URL. Jest to idealne rozwiązanie do osadzania kodów QR na stronach internetowych, w wiadomościach e-mail, dokumentach lub zautomatyzowanych obiegach pracy bez JavaScriptu po stronie klienta”.',
        '"Adres URL bazowy: https://anqr.link/api/qr”',
      ],
    },
    {
      heading: '"Parametry podstawowe”',
      paragraphs: [
        '"Parametry wymagane i wspólne (nazwy parametrów nie są tłumaczone):”',
      ],
      bullets: [
        '"dane (wymagane): Zawartość do zakodowania w kodzie QR. Znaki specjalne w kodzie URL”.',
        '"rozmiar: Rozmiar obrazu w pikselach (domyślnie: 400, maks.: 2000). Używane, jeśli nie określono rozmiaru obrazu.”',
        '"szer., wys.: Szerokość i wysokość wyjściowa w pikselach. Zastępuje parametr rozmiaru”.',
        '"format: Format wyjściowy — png, webp lub gif (domyślnie: png).”',
        '"ec: Poziom korekcji błędów — L, M, Q lub H (domyślnie: H).”',
        '"fg: Kolor pierwszego planu jako kod szesnastkowy bez znaku # (domyślnie: 000000).”',
        '"bg: Kolor tła jako kod szesnastkowy bez znaku # (domyślnie: ffffff).”',
        '"przezroczysty: Ustaw na 1, aby uzyskać przezroczyste tło”.',
        '"margines: Cicha strefa w modułach (domyślnie: 4).”',
      ],
    },
    {
      heading: '"Parametry stylizacji”',
      paragraphs: [
        '"Stylizacja modułów i wzorów:”',
      ],
      bullets: [
        '"styl: Styl modułowy — kwadratowy, zaokrąglony, w kropki, w romby, połączony”.',
        '"Finder: Styl wzoru Findera — kwadrat, zaokrąglony, okrągły”.',
        '"align: Styl wzorca wyrównania — match_finder, kwadrat, zaokrąglony, okrągły”.',
        '"timing: Styl wzorca czasowego — match_module, ciągły, przerywany”.',
        '"promień: Promień narożnika w procentach 0–100”.',
        '"przerwa: Procent odstępu między modułami 0–50”.',
        '"gapMode: Tryb odstępu — brak, wstawka, obrys, negatywna_przestrzeń”.',
        '"eyeOuter, eyeInner: Style oczu — kwadratowe, zaokrąglone, okrągłe”.',
        '"eyeScale: Procent skali oka (domyślnie: 100).”',
        '"grad: Typ gradientu — brak, liniowy, promieniowy, stożkowy.”',
        '"gradAngle: Kąt nachylenia dla gradientów liniowych.”',
        '"gradStops: Gradient zatrzymuje się jako color1,pos1,color2,pos2,… (np. ff0000,0,0000ff,1).”',
      ],
    },
    {
      heading: '"Parametry nakładki”',
      paragraphs: [
        '"Opcje nakładania obrazu (nakładany obraz jest pobierany po stronie serwera):”',
      ],
      bullets: [
        '"img: adres URL do nakładki na obraz (musi być publicznie dostępny).”',
        '"tryb: Tryb nakładki — środek, półton, mieszanie, jasność, mozaika, dithering, szum niebieski, subpiksel”.',
        '"intensywność: intensywność nakładki 0-100 (domyślnie: 100).”',
        '"colorMode: Nakładka trybu kolorów — kolor, skala szarości, czerń i biel”.',
        '"Dopasowanie: Jak nakładka pasuje — zakrywa, zawiera, rozciąga.”',
        '"rot: Obrót nakładki w stopniach”.',
        '"flipX, flipY: Ustaw na 1, aby odwrócić nakładkę”.',
        '"keepFinders: Zachowaj wzorce wyszukiwarki (domyślnie: 1).”',
        '"keepTiming, keepAlign: Ustaw na 1, aby zachować wzorce synchronizacji/wyrównania”.',
      ],
    },
    {
      heading: '"Parametry wstępnego przetwarzania”',
      paragraphs: [
        '"Wstępne przetwarzanie obrazu zastosowane do nakładki:”',
      ],
      bullets: [
        '"jasność: Regulacja od -100 do 100 (domyślnie: 0).”',
        '"kontrast: Regulacja od -100 do 100 (domyślnie: 0).”',
        '"gamma: wartość od 0,1 do 3 (domyślnie: 1).”',
        '"nasycenie: Regulacja od -100 do 100 (domyślnie: 0).”',
        '"odcień: obrót odcienia w stopniach”.',
        '"rozmycie: Rozmycie w pikselach”.',
        '"wyostrzanie: Stopień wyostrzenia 0–100”.',
        '"Pasteryzacja: Poziomy posteryzacji”.',
        '"próg: Próg binarny 0–255”.',
        '"krawędź: Wykrywanie krawędzi — wyłączone, ostrożne, sprytne”.',
        '"odwróć: Ustaw na 1, aby odwrócić kolory”.',
      ],
    },
    {
      heading: '"Parametry znaku wodnego”',
      paragraphs: [
        '"Dodaj znaki wodne do wygenerowanych kodów QR:”',
      ],
      bullets: [
        '"wmEn: Ustaw na 1, aby włączyć znak wodny”.',
        '"wmKind: Typ znaku wodnego — tekst, obraz, wzór.”',
        '"wmText: Tekst znaku wodnego (zakodowany w formacie URL).”',
        '"wmImg: adres URL do znaku wodnego na obrazie”.',
        '"wmPos: Pozycja — środek, rogi, krawędzie, tył, cicha strefa.”',
        '"wmOpacity: Krycie 0-100 (domyślnie: 50).”',
        '"wmBlend: Tryb mieszania — normalny, mnożenie, ekran, nakładka”.',
      ],
    },
    {
      heading: '"Parametry animacji”',
      paragraphs: [
        '"W przypadku animowanego pliku GIF (wymaga formatu=gif):”',
      ],
      bullets: [
        '"animPattern: Wzór animacji — brak, pulsowanie, fala, linia skanowania, migotanie, dryf, cykl kolorów”.',
        '"animFrames: Liczba klatek 1-60 (domyślnie: 24).”',
        '"animSpeed: Opóźnienie klatki w milisekundach 10–1000 (domyślnie: 100).”',
        '"animSeed: Losowe ziarno animacji”.',
        '"łagodzenie: łagodzenie animacji — liniowe, ease_in, ease_out, ease_in_out, bounce.”',
      ],
    },
    {
      heading: '"Parametry wyjściowe”',
      paragraphs: [
        '"Opcje formatu wyjściowego:”',
      ],
      bullets: [
        '"jakość: jakość WebP 0-1 (domyślnie: 0,9).”',
        '"webpQ: jakość WebP 0-100 (domyślnie: 90).”',
        '"gifColors: rozmiar palety GIF 2-256 (domyślnie: 256).”',
        '"dpi: Wyjściowa rozdzielczość DPI dla PNG (domyślna: 72).”',
        '"metaTitle, metaAuthor, metaCopy, metaDesc: pola metadanych PNG”.',
      ],
    },
    {
      heading: '"Przykładowe użycie”',
      paragraphs: [
        '"Podstawowy kod QR:”',
        '"https://anqr.link/api/qr?data=https://example.com”',
        '"Stylizowany kod QR z niestandardowymi kolorami:”',
        '"https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30”',
        '"Kod QR z nałożonym obrazem:”',
        '"https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70”',
        '"Animowany GIF:”',
        '"https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out”',
      ],
    },
    {
      heading: '"Osadzanie kodów QR”',
      paragraphs: [
        '"W trybie profesjonalnym funkcja udostępniania generuje osadzalny kod HTML i adresy URL. Oto jak działa osadzanie:”',
      ],
      bullets: [
        '"Link do udostępniania: Tworzy adres URL do aplikacji ANQR ze wszystkimi ustawieniami zakodowanymi jako parametry adresu URL. Odbiorcy mogą wyświetlać i modyfikować kod QR”.',
        '"Osadź obraz: Generuje tag wskazujący na API serwera. Kod QR jest renderowany po stronie serwera i wyświetlany jako obraz”.',
        '"Osadź Markdown: Tworzy składnię obrazów Markdown dla dokumentacji i plików README”.',
        '"Bezpośredni adres URL API: Surowy adres URL API do wykorzystania w aplikacjach, skryptach lub innych integracjach”.',
      ],
    },
    {
      heading: '"Przykład HTML”',
      paragraphs: [
        '"Aby osadzić kod QR na swojej stronie internetowej:”',
        '"<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=200" alt="Kod QR" />”',
        '"Aby dostosować rozmiar:”',
        '"<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=400" alt="Kod QR" style="max-width: 100%; height: auto;" />”',
        '"Serwer buforuje odpowiedzi z długimi nagłówkami pamięci podręcznej, dzięki czemu powtarzające się żądania dotyczące tego samego adresu URL są szybkie”.',
      ],
    },
    {
      heading: '"Format udostępnianego adresu URL”',
      paragraphs: [
        '"Po kliknięciu "Udostępnij” w trybie profesjonalnym, ANQR koduje bieżące ustawienia do parametrów adresu URL. Format jest następujący:”',
        '"https://anqr.link/?data=…&ec=H&style=rounded&….”',
        '"Parametry te odzwierciedlają parametry API, dzięki czemu możesz przekonwertować udostępniony adres URL na adres URL API, zmieniając ścieżkę bazową z / na /api/qr i dostosowując parametry w/h w razie potrzeby”.',
        '"Uwaga: Nakładek graficznych przesłanych z plików lokalnych nie można udostępniać za pośrednictwem adresu URL — w udostępnianych linkach i wywołaniach API działają tylko nakładki oparte na adresie URL (parametr img).”',
      ],
    },
    {
      heading: '"Limit prędkości i wykorzystanie”',
      paragraphs: [
        '"Interfejs API jest darmowy w rozsądnych ilościach. W przypadku dużego obciążenia lub zastosowań komercyjnych wymagających gwarantowanego czasu sprawności prosimy o kontakt.”',
        '"Odpowiedzi API zawierają agresywne nagłówki buforujące. Aby uzyskać najlepszą wydajność, buforuj odpowiedzi po swojej stronie lub używaj tego samego adresu URL dla identycznych kodów QR”.',
      ],
    },
    {
      heading: '"Najlepsze praktyki”',
      paragraphs: [
        '"Aby kody QR były niezawodne, postępuj zgodnie z poniższymi wskazówkami:”',
      ],
      bullets: [
        '"Zawsze testuj kody QR za pomocą kilku aplikacji skanujących przed drukowaniem.”',
        '"Podczas dodawania nakładek należy używać funkcji korekcji błędów H (wysokiej)”.',
        '"Zachowaj co najmniej 4 moduły strefy ciszy (marginesu).”',
        '"Zapewnij wysoki kontrast między pierwszym planem a tłem.”',
        '"W przypadku druku należy użyć rozdzielczości co najmniej 300 DPI i wykonać test w rzeczywistym rozmiarze wydruku”.',
        '"Włącz opcję Zachowaj wzorce wyszukiwarki podczas korzystania z nakładek”.',
        '"Zacznij od niższej intensywności nakładki i stopniowo ją zwiększaj”.',
        '"W przypadku zastosowań na zewnątrz należy rozważyć większe rozmiary modułów i wyższą korekcję błędów.”',
      ],
    },
    {
      heading: '"Rozwiązywanie problemów”',
      paragraphs: [
        '"Typowe problemy i rozwiązania:”',
      ],
      bullets: [
        '"Nie można zeskanować kodu QR: zmniejsz intensywność nakładki, zwiększ korekcję błędów, sprawdź kontrast”.',
        '"Kod jest za długi: zmniejsz długość treści, użyj skracacza adresów URL, wybierz niższą wersję”.',
        '"Niewyraźny obraz: Zwiększ rozmiar modułu, użyj PNG zamiast formatów skompresowanych”.',
        '"Kolory wyglądają nieprawidłowo: Sprawdź kontrast kolorów, wypróbuj tryb nakładania skali szarości”.',
        '"GIF nie jest animowany: Upewnij się, że używasz wyjścia w formacie GIF, sprawdź liczbę klatek.”',
        '"Nakładka obrazu się nie ładuje: sprawdź uprawnienia CORS dla obrazów zdalnych”.',
      ],
    },
    {
      heading: '"Skróty klawiaturowe”',
      paragraphs: [
        '"ANQR obsługuje standardowe skróty klawiaturowe. Użyj Ctrl/Cmd+S, aby uruchomić eksport (po ustawieniu fokusu na podglądzie).”',
      ],
    },
    {
      heading: '"Udostępnianie i osadzanie”',
      paragraphs: [
        '"W trybie profesjonalnym kliknij przycisk Udostępnij, aby skopiować adres URL z bieżącymi ustawieniami. Odbiorcy mogą otworzyć ten adres URL, aby zobaczyć dokładną konfigurację. Uwaga: Nakładek z plików lokalnych nie można udostępniać za pośrednictwem adresu URL”.',
      ],
    },
  ],
};

export default docs;
