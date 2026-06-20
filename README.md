# Math Course Platform

## Opis Projektu

Math Course to nowoczesna aplikacja webowa do nauki matematyki. Platforma oferuje dostęp do kursów matematycznych, umożliwia prowadzenie koszyka zakupów. Aplikacja obsługuje uwierzytelnianie użytkowników z rejestracją i logowaniem.

## Technologie

Projekt został zbudowany przy użyciu następujących technologii:

- **Next.js** - Framework React do budowy aplikacji fullstack
- **React** - Biblioteka do budowy interfejsu użytkownika
- **TypeScript** - Superset JavaScript z typowaniem statycznym
- **MongoDB** - NoSQL baza danych
- **Tailwind CSS** - Framework CSS do stylizacji
- **bcrypt** - Biblioteka do haszowania haseł
- **Node.js** - Runtime JavaScript na serwerze
- **Docker** - Konteneryzacja aplikacji

## Wymagania Systemowe

Przed uruchomieniem aplikacji należy mieć zainstalowane:

- **Node.js** - [Pobierz](https://nodejs.org)
- **npm** - zazwyczaj instalowany wraz z Node.js
- **Docker** i **Docker Compose** - [Pobierz](https://www.docker.com/products/docker-desktop)

## Instrukcja Instalacji i Uruchomienia

### Opcja 1: Uruchomienie z Docker Compose (Rekomendowane)

Docker Compose automatycznie uruchomi zarówno aplikację jak i bazę danych MongoDB.

**Krok 1:** Klonuj repozytorium
```bash
git clone https://github.com/Nikko05/math-course.git
cd math-course
```

**Krok 2:** Utwórz plik `.env` w głównym katalogu projektu
```bash
cp .env.example .env
```

Jeśli plik `.env.example` nie istnieje, utwórz plik `.env` z następującymi zmiennymi:
```
MONGODB_URI=mongodb://mongo:27017/mathapp
NODE_ENV=development
```

**Krok 3:** Uruchom aplikację za pomocą Docker Compose
```bash
docker-compose up
```

Aplikacja automatycznie:
- Zainstaluje dependencje
- Uruchomi seed bazy danych (`npm run seed`)
- Uruchomi serwer deweloperski

Aplikacja będzie dostępna pod adresem: http://localhost:3000

Baza danych MongoDB będzie dostępna pod adresem: `mongodb://localhost:27017`

### Opcja 2: Uruchomienie Lokalne (bez Docker)

Jeśli chcesz uruchomić aplikację bezpośrednio na swoim komputerze, potrzebujesz lokalnie uruchomionej bazy danych MongoDB.

**Krok 1:** Klonuj repozytorium
```bash
git clone https://github.com/Nikko05/math-course.git
cd math-course
```

**Krok 2:** Zainstaluj dependencje
```bash
npm install
```

**Krok 3:** Utwórz plik `.env`
```bash
MONGODB_URI=mongodb://localhost:27017/mathapp
NODE_ENV=development
```

**Krok 4:** Uruchom serwer MongoDB

Upewnij się, że MongoDB jest uruchomiona na porcie 27017. Jeśli nie masz zainstalowanej bazy danych MongoDB lokalnie, zainstaluj ją zgodnie z [oficjalną dokumentacją](https://docs.mongodb.com/manual/installation/).

**Krok 5:** Załaduj dane do bazy danych (opcjonalne)
```bash
npm run seed
```

**Krok 6:** Uruchom serwer deweloperski
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

## Dostępne Skrypty

W projekcie dostępne są następujące skrypty npm:

- `npm run dev` - Uruchomia serwer deweloperski na porcie 3000
- `npm run build` - Buduje aplikację do produkcji
- `npm start` - Uruchamia aplikację w trybie produkcji
- `npm run seed` - Załaduje dane testowe do bazy danych
- `npm run lint` - Uruchamia linter do sprawdzenia kodu

## Struktura Projektu

```
src/
├── app/              # Strony aplikacji i API
│   ├── (auth)/      # Strony autoryzacji (logowanie, rejestracja)
│   ├── (main)/      # Główne strony aplikacji
│   ├── api/         # Endpointy API
│   ├── layout.tsx   # Layout główny
│   └── page.tsx     # Strona główna
├── components/       # Komponenty React
├── lib/             # Funkcje pomocnicze (cart, mongodb)
├── styles/          # Style CSS
└── types/           # Definicje typów TypeScript
```

## Rozwiązywanie Problemów

### Problem: Port 3000 jest już w użyciu
```bash
# Linux/Mac: Znalezienie procesu
lsof -i :3000

# Windows: Znalezienie procesu
netstat -ano | findstr :3000

# Zabicie procesu (zamień PID na ID procesu)
kill -9 <PID>
```

### Problem: MongoDB nie uruchamia się
- Upewnij się, że Docker Desktop jest uruchomiony
- Sprawdź, czy port 27017 nie jest zajęty
- Spróbuj przebudować kontenery: `docker-compose down && docker-compose up --build`

### Problem: Błędy podczas instalacji dependencji
```bash
# Usuń node_modules i package-lock.json
rm -rf node_modules package-lock.json

# Zainstaluj ponownie
npm install
```

## Dodatkowe Zasoby

- [Dokumentacja Next.js](https://nextjs.org/docs)
- [Dokumentacja MongoDB](https://docs.mongodb.com/)
- [Dokumentacja Tailwind CSS](https://tailwindcss.com/docs)
- [Dokumentacja Docker](https://docs.docker.com/)
