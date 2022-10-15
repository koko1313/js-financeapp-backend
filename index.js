import express from 'express';
import dbClient from './database/dbClient.js';
import { v4 as uuid } from 'uuid';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
await dbClient.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/expense/get', async (req, res) => {
    const result = await dbClient.query('SELECT * from expense'); 
    res.send(result.rows);
});

app.post('/expense/add', async (req, res) => {
    const id = uuid();
    const userId = req.body.userId;
    const date = req.body.date;
    const amount = req.body.amount;
    const comment = req.body.comment;
    await dbClient.query(`INSERT INTO expense (id, user_id, date, amount, comment) VALUES ('${id}', '${userId}', '${date}', ${amount}, '${comment}')`);
    res.status(200).send();
});

// register dummy user
app.post('/user/register', async (req, res) => {
    const id = 'ca7c5d1a-b06b-419e-bf5c-0981ea53bff4';
    const email = 'dummy@mail.com';
    const name = 'Dummy User'
    const password = '1234';
    await dbClient.query(`INSERT INTO "user" (id, email, name, password) VALUES ('${id}', '${email}', '${name}', '${password}')`); 
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});