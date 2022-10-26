import ExpenseDAO from '../DAOs/ExpenseDAO.js';
import { mapExpenses } from '../utils/mappers.js';

export const getExpense = async (params) => {
    const result = await ExpenseDAO.getExpenseByParams(params)
    return mapExpenses(result);
}

export const addExpense = async (expense) => {
    await ExpenseDAO.addExpense(expense);
}

export const updateExpense = async (id, userId, updatedValues) => {
    const expense = await ExpenseDAO.getExpenseByIdAndUserId(id, userId);

    if (!expense) {
        throw new Error(`Expense with id ${id} was not found for user ${userId}`);
    }
    
    for(const key of Object.keys(updatedValues)) {
        expense[key] = updatedValues[key];
    }

    await ExpenseDAO.updateExpense(expense);
}

export const deleteExpense = async (id, userId) => {
    const expense = await ExpenseDAO.getExpenseByIdAndUserId(id, userId);

    if (!expense) {
        throw new Error(`Expense with id ${id} was not found for user ${userId}`);
    }

    await ExpenseDAO.deleteExpense(id);
}
