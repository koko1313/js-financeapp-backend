import express from 'express';
import { v4 as uuid } from 'uuid';
import { addIncome, deleteIncome, getIncome, updateIncome } from '../functions/income.js';

const router = express.Router();

router.get('/income/get', async (req, res) => {
    const params = {
        userId: req.query.userId,
        fromDate: req.query.fromDate,
        toDate: req.query.toDate,
    };

    try {
        const result = await getIncome(params); 
        res.status(200).send(result);
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.post('/income/add', async (req, res) => {
    const income = {
        id: uuid(),
        userId: req.body.userId,
        date: req.body.date,
        amount: req.body.amount,
        comment: req.body.comment,
    };

    try {
        await addIncome(income);
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.put('/income/update/:id', async (req, res) => {
    const updatedIncome = {};

    if (req.body.date) {
        updatedIncome.date = req.body.date;
    }

    if (req.body.amount) {
        updatedIncome.amount = req.body.amount;
    }

    if (req.body.comment) {
        updatedIncome.comment = req.body.comment;
    }

    try {
        await updateIncome(req.params.id, updatedIncome);
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.delete('/income/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await deleteIncome(id); 
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

export default router;