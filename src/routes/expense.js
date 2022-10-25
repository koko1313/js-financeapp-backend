import express from 'express';
import { v4 as uuid } from 'uuid';
import { addExpense, deleteExpense, getExpense, updateExpense } from '../functions/expense.js';
import { decodeJWTToken } from '../utils/jwtToken.js';

const router = express.Router();

router.get('/expense/get', decodeJWTToken, async (req, res) => {
    try {
        const params = {
            userId: req.user.id, // get the user from req - middleware function (decodeJWTToken) attaches the user to the req
            fromDate: req.query.fromDate,
            toDate: req.query.toDate,
        };

        const result = await getExpense(params); 
        res.status(200).send(result);
    } catch (ex) {
        res.status(500).send({ message: "Something went wrong" });
    }
});

router.post('/expense/add', async (req, res) => {
    const expense = {
        id: uuid(),
        userId: req.body.userId,
        date: req.body.date,
        amount: req.body.amount,
        comment: req.body.comment,
    };

    try {
        await addExpense(expense);
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: "Something went wrong" });
    }
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
        await updateExpense(req.params.id, updatedExpense);
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.delete('/expense/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await deleteExpense(id); 
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: "Something went wrong" });
    }
});

export default router;