import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbClient = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
});

export default dbClient;