import express from 'express';
import { v4 as uuid } from 'uuid';
import { addIncome, deleteIncome, getIncomes, updateIncome } from '../functions/income.js';
import { decodeJWTToken } from '../middleware/jwtToken.js';

const router = express.Router();

router.get('/income/get', decodeJWTToken, async (req, res) => {
    try {
        const params = {
            userId: req.user.id,
            fromDate: req.query.fromDate,
            toDate: req.query.toDate,
        };

        const result = await getIncomes(params); 
        res.status(200).send(result);
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.post('/income/add', decodeJWTToken, async (req, res) => {
    try {
        const income = {
            id: uuid(),
            userId: req.user.id,
            date: req.body.date,
            amount: req.body.amount,
            comment: req.body.comment,
        };

        await addIncome(income);
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.put('/income/update/:id', decodeJWTToken, async (req, res) => {
    try {
        const updatedIncome = {};
        const userId = req.user.id;

        if (req.body.date) {
            updatedIncome.date = req.body.date;
        }

        if (req.body.amount) {
            updatedIncome.amount = req.body.amount;
        }

        if (req.body.comment) {
            updatedIncome.comment = req.body.comment;
        }

        await updateIncome(req.params.id, userId, updatedIncome);
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.delete('/income/delete/:id', decodeJWTToken, async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        await deleteIncome(id, userId); 
        res.status(200).send();
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

export default router;