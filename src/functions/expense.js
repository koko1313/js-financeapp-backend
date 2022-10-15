import { v4 as uuid } from 'uuid';
import { mapExpenses } from '../utils/mappers.js';
import { queries } from '../utils/queries.js';

export const getExpense = async (dbClient) => {
    const result = await dbClient.query(queries.getExpenses);
    return mapExpenses(result);
}

export const addExpense = async (dbClient, expense) => {
    const id = uuid();
    await dbClient.query(queries.addExpense, [id, expense.userId, expense.date, expense.amount, expense.comment]);
}