import IncomeDAO from '../DAOs/IncomeDAO.js';
import { mapIncome, mapIncomes } from '../utils/mappers.js';

const incomeDAO = new IncomeDAO();

export const getIncomes = async (params) => {
    const incomes = await incomeDAO.getIncomesByParams(params);
    return mapIncomes(incomes);
}

export const addIncome = async (income) => {
    const addedIncome = await incomeDAO.addIncome(income);
    return mapIncome(addedIncome);
}

export const updateIncome = async (id, userId, updatedValues) => {
    const income = await incomeDAO.getIncomeByIdAndUserId(id, userId);

    if (!income) {
        throw new Error(`Income with id ${id} was not found for user ${userId}`);
    }
    
    for(const key of Object.keys(updatedValues)) {
        income[key] = updatedValues[key];
    }

    const updatedIncome = await incomeDAO.updateIncome(income);
    return mapIncome(updatedIncome);
}

export const deleteIncome = async (id, userId) => {
    const income = await incomeDAO.getIncomeByIdAndUserId(id, userId);

    if (!income) {
        throw new Error(`Income with id ${id} was not found for user ${userId}`);
    }

    const incomeDeleted = await incomeDAO.deleteIncome(id);
    return incomeDeleted;
}
