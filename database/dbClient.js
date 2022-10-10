import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbClient = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "d8bnvi8bfc3gdk",
    port: 5432,
    host: "ec2-54-228-218-84.eu-west-1.compute.amazonaws.com",
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    },
});

export default dbClient;