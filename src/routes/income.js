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

        const addedIncome = await addIncome(income);
        res.status(200).send(addedIncome);
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.put('/income/update/:id', decodeJWTToken, async (req, res) => {
    try {
        const updatedIncomeData = {};
        const userId = req.user.id;

        if (req.body.date) {
            updatedIncomeData.date = req.body.date;
        }

        if (req.body.amount) {
            updatedIncomeData.amount = req.body.amount;
        }

        if (req.body.comment) {
            updatedIncomeData.comment = req.body.comment;
        }

        const updatedIncome = await updateIncome(req.params.id, userId, updatedIncomeData);
        res.status(200).send(updatedIncome);
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