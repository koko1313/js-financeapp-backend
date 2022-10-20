import { mapExpenses } from '../utils/mappers.js';
import { QUERIES } from '../utils/queries.js';
import { pg as queryBuilder } from 'yesql';

export const getExpense = async (dbClient, params) => {
    let queryTemplate = QUERIES.getExpensesByUserId;

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

export const updateExpense = async (dbClient, id, updatedExpense) => {
    const getQuery = queryBuilder(QUERIES.getExpenseById)({ id: id });
    const result = await dbClient.query(getQuery);
    const expense = result.rows[0];

    if (!expense) {
        return `Expense with id ${id} was not found`;
    }
    
    for(const key of Object.keys(updatedExpense)) {
        expense[key] = updatedExpense[key];
    }

    const updateQuery = queryBuilder(QUERIES.updateExpenseById)(expense);
    await dbClient.query(updateQuery);
}

export const deleteExpense = async (dbClient, id) => {
    const query = queryBuilder(QUERIES.deleteExpenseById)({ id: id });
    await dbClient.query(query);
}