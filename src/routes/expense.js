import express from 'express';
import { v4 as uuid } from 'uuid';
import { initDbClient } from '../../database/dbClient.js';
import { addExpense, deleteExpense, getExpense, updateExpense } from '../functions/expense.js';

const router = express.Router();

const dbClient = initDbClient();

router.get('/expense/get', async (req, res) => {
    const params = {
        userId: req.query.userId,
        fromDate: req.query.fromDate,
        toDate: req.query.toDate,
    };

    const result = await getExpense(dbClient, params); 
    res.status(200).send(result);
});

router.post('/expense/add', async (req, res) => {
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

router.put('/expense/update/:id', async (req, res) => {
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

router.delete('/expense/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await deleteExpense(dbClient, id); 
        res.status(200).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send({ message: "Something went wrong" });
    }
});

export default router;