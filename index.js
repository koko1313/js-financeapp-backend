import express from 'express';
import dbClient from './database/dbClient.js';
import { v4 as uuid } from 'uuid';
import { addExpense, getExpense } from './src/functions/expense.js';
import { registerUser } from './src/functions/user.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
await dbClient.connect();

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.get('/expense/get', async (req, res) => {
    const params = {
        userId: req.body.userId,
        fromDate: req.query.fromDate,
        toDate: req.query.toDate,
    };

    const result = await getExpense(dbClient, params); 
    res.status(200).send(result);
});

app.post('/expense/add', async (req, res) => {
    const expense = {
        id: uuid(),
        userId: req.body.userId,
        date: req.body.date,
        amount: req.body.amount,
        comment: req.body.comment,
    };

    await addExpense(dbClient, expense);
    res.status(200).send();
});

app.post('/user/register', async (req, res) => {
    // TODO: currently register dummy user
    const user = {
        id: uuid(),
        email: 'dummy@mail.com',
        name: 'Dummy User',
        password: '1234',
    };

    await registerUser(dbClient, user);
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});