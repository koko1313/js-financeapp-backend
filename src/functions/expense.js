import { v4 as uuid } from 'uuid';
import { mapExpenses } from '../utils/mappers.js';

export const getExpense = async (dbClient) => {
    const result = await dbClient.query('SELECT * from expense');
    return mapExpenses(result);
}

export const addExpense = async (dbClient, expense) => {
    const id = uuid();
    await dbClient.query(`INSERT INTO expense (id, user_id, date, amount, comment) VALUES ('${id}', '${expense.userId}', '${expense.date}', ${expense.amount}, '${expense.comment}')`);
}