import { v4 as uuid } from 'uuid';
import { mapExpenses } from '../utils/mappers.js';
import { QUERIES } from '../utils/queries.js';
import { pg as sql } from 'yesql';

export const getExpense = async (dbClient, params) => {
    let query = QUERIES.getExpenses;

    // append parameters
    query += params.fromDate ? " AND date > :fromDate" : "";
    query += params.toDate ? " AND date < :toDate" : "";

    const buitQuery = sql(query)(params);

    const result = await dbClient.query(buitQuery);
    return mapExpenses(result);
}

export const addExpense = async (dbClient, expense) => {
    const id = uuid();
    await dbClient.query(QUERIES.addExpense, [id, expense.userId, expense.date, expense.amount, expense.comment]);
}