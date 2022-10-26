import ExpenseDAO from '../DAOs/ExpenseDAO.js';
import { mapExpense, mapExpenses } from '../utils/mappers.js';

const expendeDAO = new ExpenseDAO();

export const getExpenses = async (params) => {
    const expenses = await expendeDAO.getExpensesByParams(params)
    return mapExpenses(expenses);
}

export const addExpense = async (expense) => {
    const addedExpense = await expendeDAO.addExpense(expense);
    return mapExpense(addedExpense);
}

export const updateExpense = async (id, userId, updatedValues) => {
    const expense = await expendeDAO.getExpenseByIdAndUserId(id, userId);

    if (!expense) {
        throw new Error(`Expense with id ${id} was not found for user ${userId}`);
    }
    
    for(const key of Object.keys(updatedValues)) {
        expense[key] = updatedValues[key];
    }

    const updatedExpense = await expendeDAO.updateExpense(expense);
    return mapExpense(updatedExpense);
}

export const deleteExpense = async (id, userId) => {
    const expense = await expendeDAO.getExpenseByIdAndUserId(id, userId);

    if (!expense) {
        throw new Error(`Expense with id ${id} was not found for user ${userId}`);
    }

    const expenseDeleted = await expendeDAO.deleteExpense(id);
    return expenseDeleted;
}
