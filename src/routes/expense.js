import express from 'express';
import { v4 as uuid } from 'uuid';
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../functions/expense.js';
import { decodeJWTToken } from '../middleware/jwtToken.js';

const router = express.Router();

router.get('/expense/get', decodeJWTToken, async (req, res) => {
    try {
        const params = {
            userId: req.user.id, // get the user from req - middleware function (decodeJWTToken) attaches the user to the req
            fromDate: req.query.fromDate,
            toDate: req.query.toDate,
        };

        const result = await getExpenses(params); 
        res.status(200).send(result);
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.post('/expense/add', decodeJWTToken, async (req, res) => {
    try {
        const expense = {
            id: uuid(),
            userId: req.user.id,
            date: req.body.date,
            amount: req.body.amount,
            comment: req.body.comment,
        };

        const addedExpense = await addExpense(expense);
        res.status(200).send(addedExpense);
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.put('/expense/update/:id', decodeJWTToken, async (req, res) => {
    try {
        const updatedExpenseData = {};
        const userId = req.user.id;

        if (req.body.date) {
            updatedExpenseData.date = req.body.date;
        }

        if (req.body.amount) {
            updatedExpenseData.amount = req.body.amount;
        }

        if (req.body.comment) {
            updatedExpenseData.comment = req.body.comment;
        }

        const updatedExpense = await updateExpense(req.params.id, userId, updatedExpenseData);
        res.status(200).send(updatedExpense);
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.delete('/expense/delete/:id', decodeJWTToken, async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        await deleteExpense(id, userId); 
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

export default router;