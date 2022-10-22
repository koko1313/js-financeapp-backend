import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let dbClient = null;

// Singleton
export const initDbClient = () => {
  if (!dbClient) {
    dbClient = new pg.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
    });

    dbClient.connect();

    return dbClient;
  } else {
    return dbClient;
  }
}

export default dbClient;