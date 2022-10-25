import { mapExpenses } from '../utils/mappers.js';
import { QUERIES } from '../utils/queries.js';
import { pg as queryBuilder } from 'yesql';
import { initDbClient } from '../../database/dbClient.js';

const dbClient = initDbClient();

export const getExpense = async (params) => {
    let queryTemplate = QUERIES.getExpensesByUserId;

    // append parameters
    queryTemplate += params.fromDate ? " AND date > :fromDate" : "";
    queryTemplate += params.toDate ? " AND date < :toDate" : "";
    queryTemplate += " ORDER BY date DESC"; // TODO: find a more fancy solution

    const query = queryBuilder(queryTemplate)(params);

    const result = await dbClient.query(query);
    return mapExpenses(result);
}

export const addExpense = async (expense) => {
    const query = queryBuilder(QUERIES.addExpense)(expense);
    await dbClient.query(query);
}

export const updateExpense = async (id, userId, updatedExpense) => {
    const expense = await getExpenseByIdAndUserId(id, userId);

    if (!expense) {
        throw new Error(`Expense with id ${id} was not found for user ${userId}`);
    }
    
    for(const key of Object.keys(updatedExpense)) {
        expense[key] = updatedExpense[key];
    }

    const updateQuery = queryBuilder(QUERIES.updateExpenseById)(expense);
    await dbClient.query(updateQuery);
}

export const deleteExpense = async (id, userId) => {
    const expense = await getExpenseByIdAndUserId(id, userId);

    if (!expense) {
        throw new Error(`Expense with id ${id} was not found for user ${userId}`);
    }

    const query = queryBuilder(QUERIES.deleteExpenseById)({ id: id });
    await dbClient.query(query);
}

const getExpenseByIdAndUserId = async (id, userId) => {
    const getQuery = queryBuilder(QUERIES.getExpenseByIdAndUserId)({ id: id, userId: userId });
    const result = await dbClient.query(getQuery);
    const expense = result.rows[0];

    return expense;
}