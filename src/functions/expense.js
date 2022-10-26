import ExpenseDAO from '../DAOs/ExpenseDAO.js';
import { mapExpenses } from '../utils/mappers.js';

const expendeDAO = new ExpenseDAO();

export const getExpenses = async (params) => {
    const expenses = await expendeDAO.getExpensesByParams(params)
    return mapExpenses(expenses);
}

export const addExpense = async (expense) => {
    await expendeDAO.addExpense(expense);
}

export const updateExpense = async (id, userId, updatedValues) => {
    const expense = await expendeDAO.getExpenseByIdAndUserId(id, userId);

    if (!expense) {
        throw new Error(`Expense with id ${id} was not found for user ${userId}`);
    }
    
    for(const key of Object.keys(updatedValues)) {
        expense[key] = updatedValues[key];
    }

    await expendeDAO.updateExpense(expense);
}

export const deleteExpense = async (id, userId) => {
    const expense = await expendeDAO.getExpenseByIdAndUserId(id, userId);

    if (!expense) {
        throw new Error(`Expense with id ${id} was not found for user ${userId}`);
    }

    await expendeDAO.deleteExpense(id);
}
