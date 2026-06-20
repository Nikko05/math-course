const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const { hash } = require('bcrypt');

const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      if (value.startsWith("\"") && value.endsWith("\"")) {
        value = value.slice(1, -1);
      }
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  });
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mathapp';
const client = new MongoClient(uri);

const courses = [
  {
    title: 'Kurs Matura Matematyka – Podstawowa',
    category: 'Matura Podstawowa',
    level: 'liceum',
    price: 199,
    description: 'Przygotowanie do matury podstawowej z matematyki: teoria, zadania i ścisłe omówienia.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Matura Matematyka – Rozszerzona',
    category: 'Matura Rozszerzona',
    level: 'liceum',
    price: 299,
    description: 'Kompleksowe przygotowanie do matury rozszerzonej z matematyki.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Matura Fizyka – Podstawowa',
    category: 'Matura Podstawowa',
    level: 'liceum',
    price: 179,
    description: 'Egzamin maturalny z fizyki podstawowej: siła, energia i podstawowe prawa.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Matura Fizyka – Rozszerzona',
    category: 'Matura Rozszerzona',
    level: 'liceum',
    price: 279,
    description: 'Przygotowanie do fizyki rozszerzonej z zadaniami, teorią i przykładami.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Ósmoklasista Matematyka',
    category: 'Ósmoklasista',
    level: 'podstawówka',
    price: 149,
    description: 'Przygotowanie do egzaminu ósmoklasisty z matematyki.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Ósmoklasista Język Polski',
    category: 'Ósmoklasista',
    level: 'podstawówka',
    price: 139,
    description: 'Ćwiczenia z lektur, wypowiedzi i gramatyki przed egzaminem ósmoklasisty.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Podstawówka Matematyka',
    category: 'Podstawówka',
    level: 'podstawówka',
    price: 89,
    description: 'Nauka podstaw matematyki dla uczniów szkoły podstawowej z zabawnymi zadaniami.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Podstawówka Przyroda',
    category: 'Podstawówka',
    level: 'podstawówka',
    price: 79,
    description: 'Poznaj świat przyrody: rośliny, zwierzęta i zjawiska przyrodnicze.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Podstawówka Język Angielski',
    category: 'Podstawówka',
    level: 'podstawówka',
    price: 99,
    description: 'Prosty kurs angielskiego dla młodszych uczniów z komunikacją i gramatyką.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Technikum Matematyka',
    category: 'Technikum',
    level: 'technikum',
    price: 119,
    description: 'Matematyka dla technikum: równania, funkcje i zastosowania praktyczne.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Technikum Informatyka',
    category: 'Technikum',
    level: 'technikum',
    price: 129,
    description: 'Podstawy informatyki dla technikum: algorytmy, logika i zadania.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Technikum Chemia',
    category: 'Technikum',
    level: 'technikum',
    price: 129,
    description: 'Chemia dla technikum: reakcje, wzory i zadania praktyczne.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Liceum Statystyka',
    category: 'Liceum',
    level: 'liceum',
    price: 139,
    description: 'Wprowadzenie do statystyki: dane, średnie i prawdopodobieństwo.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Liceum Geometria',
    category: 'Liceum',
    level: 'liceum',
    price: 149,
    description: 'Geometria w liceum: figury, pola powierzchni i objętości.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
  {
    title: 'Kurs Liceum Analiza Matematyczna',
    category: 'Liceum',
    level: 'liceum',
    price: 159,
    description: 'Analiza matematyczna dla liceum: granice, pochodne i zadania.',
    image: '/logo_basic.svg',
    createdAt: new Date(),
  },
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectWithRetry(retries = 10) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      await client.connect();
      return;
    } catch (error) {
      console.warn(`Próba ${attempt} połączenia z MongoDB nie powiodła się.`);
      if (attempt === retries) {
        throw error;
      }
      await sleep(2000);
    }
  }
}

async function seed() {
  try {
    await connectWithRetry();
    const db = client.db();

    const userCollection = db.collection('users');
    const adminUser = await userCollection.findOne({ email: 'admin' });

    if (!adminUser) {
      const passwordHash = await hash('admin', 10);
      await userCollection.insertOne({
        name: 'Administrator',
        email: 'admin',
        passwordHash,
        isAdmin: true,
        createdAt: new Date(),
      });
      console.log('✅ Konto administratora utworzone: admin / admin');
    } else if (!adminUser.isAdmin) {
      await userCollection.updateOne({ _id: adminUser._id }, { $set: { isAdmin: true } });
      console.log('ℹ️ Konto admina zaktualizowane do roli administratora.');
    } else {
      console.log('ℹ️ Konto administratora już istnieje.');
    }

    const courseCollection = db.collection('courses');
    const existing = await courseCollection.countDocuments();

    if (existing === 0) {
      await courseCollection.insertMany(courses);
      console.log('✅ Seed danych kursów dodany do bazy.');
    } else {
      console.log('ℹ️ Kursy już istnieją w bazie; nie wstawiono duplikatów.');
    }
  } catch (error) {
    console.error('Błąd seedowania bazy danych:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
