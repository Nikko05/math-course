import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is not defined');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedClient: MongoClient | null = null;

async function connectClient() {
  if (!cachedClient) {
    await client.connect();
    cachedClient = client;
  }
  return cachedClient;
}

export async function getDb() {
  const client = await connectClient();
  return client.db('mathapp');
}

