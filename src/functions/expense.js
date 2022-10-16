import { mapExpenses } from '../utils/mappers.js';
import { QUERIES } from '../utils/queries.js';
import { pg as queryBuilder } from 'yesql';

export const getExpense = async (dbClient, params) => {
    let queryTemplate = QUERIES.getExpenses;

    // append parameters
    queryTemplate += params.fromDate ? " AND date > :fromDate" : "";
    queryTemplate += params.toDate ? " AND date < :toDate" : "";
    queryTemplate += " ORDER BY date DESC"; // TODO: find a more fancy solution

    const query = queryBuilder(queryTemplate)(params);

    const result = await dbClient.query(query);
    return mapExpenses(result);
}

export const addExpense = async (dbClient, expense) => {
    const query = queryBuilder(QUERIES.addExpense)(expense);
    await dbClient.query(query);
}