import IncomeDAO from '../DAOs/IncomeDAO.js';
import { mapIncome } from '../utils/mappers.js';

const incomeDAO = new IncomeDAO();

export const getIncome = async (params) => {
    const result = await incomeDAO.getIncomeByParams(params);
    return mapIncome(result);
}

export const addIncome = async (income) => {
    await incomeDAO.addIncome(income);
}

export const updateIncome = async (id, userId, updatedValues) => {
    const income = await incomeDAO.getIncomeByIdAndUserId(id, userId);

    if (!income) {
        throw new Error(`Income with id ${id} was not found for user ${userId}`);
    }
    
    for(const key of Object.keys(updatedValues)) {
        income[key] = updatedValues[key];
    }

    await incomeDAO.updateIncome(income);
}

export const deleteIncome = async (id, userId) => {
    const income = await incomeDAO.getIncomeByIdAndUserId(id, userId);

    if (!income) {
        throw new Error(`Income with id ${id} was not found for user ${userId}`);
    }

    await incomeDAO.deleteIncome(id);
}
