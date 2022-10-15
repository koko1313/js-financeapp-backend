import { mapExpenses } from '../utils/mappers.js';
import { QUERIES } from '../utils/queries.js';
import { pg as sql } from 'yesql';

export const getExpense = async (dbClient, params) => {
    let query = QUERIES.getExpenses;

    // append parameters
    query += params.fromDate ? " AND date > :fromDate" : "";
    query += params.toDate ? " AND date < :toDate" : "";

    const result = await dbClient.query(sql(query)(params));
    return mapExpenses(result);
}

export const addExpense = async (dbClient, expense) => {
    await dbClient.query(sql(QUERIES.addExpense)(expense));
}