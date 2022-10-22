import express from 'express';
import dbClient from './database/dbClient.js';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import { addExpense, deleteExpense, getExpense, updateExpense } from './src/functions/expense.js';
import { registerUser } from './src/functions/user.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors()); // enable cors
await dbClient.connect();

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.get('/expense/get', async (req, res) => {
    const params = {
        userId: req.query.userId,
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

app.put('/expense/update/:id', async (req, res) => {
    const updatedExpense = {};

    if (req.body.date) {
        updatedExpense.date = req.body.date;
    }

    if (req.body.amount) {
        updatedExpense.amount = req.body.amount;
    }

    if (req.body.comment) {
        updatedExpense.comment = req.body.comment;
    }

    try {
        const message = await updateExpense(dbClient, req.params.id, updatedExpense);

        if (message) {
            res.status(404).send({ message: message })
        } else {
            res.status(200).send();
        }
    } catch (ex) {
        console.log(ex);
        res.status(500).send({ message: "Something went wrong" });
    }
});

app.delete('/expense/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await deleteExpense(dbClient, id); 
        res.status(200).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send({ message: "Something went wrong" });
    }
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