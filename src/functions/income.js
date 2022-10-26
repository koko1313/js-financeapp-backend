import { mapIncome } from '../utils/mappers.js';
import { QUERIES } from '../utils/queries.js';
import { pg as queryBuilder } from 'yesql';
import { initDbClient } from '../../database/dbClient.js';

const dbClient = initDbClient();

export const getIncome = async (params) => {
    let queryTemplate = QUERIES.getIncomesByUserId;

    // append parameters
    queryTemplate += params.fromDate ? " AND date > :fromDate" : "";
    queryTemplate += params.toDate ? " AND date < :toDate" : "";
    queryTemplate += " ORDER BY date DESC"; // TODO: find a more fancy solution

    const query = queryBuilder(queryTemplate)(params);

    const result = await dbClient.query(query);
    return mapIncome(result);
}

export const addIncome = async (income) => {
    const query = queryBuilder(QUERIES.addIncome)(income);
    await dbClient.query(query);
}

export const updateIncome = async (id, userId, updatedValues) => {
    const income = await getIncomeByIdAndUserId(id, userId);

    if (!income) {
        throw new Error(`Income with id ${id} was not found for user ${userId}`);
    }
    
    for(const key of Object.keys(updatedValues)) {
        income[key] = updatedValues[key];
    }

    const updateQuery = queryBuilder(QUERIES.updateIncomeById)(income);
    await dbClient.query(updateQuery);
}

export const deleteIncome = async (id, userId) => {
    const income = await getIncomeByIdAndUserId(id, userId);

    if (!income) {
        throw new Error(`Income with id ${id} was not found for user ${userId}`);
    }

    const query = queryBuilder(QUERIES.deleteIncomeById)({ id: id });
    await dbClient.query(query);
}

const getIncomeByIdAndUserId = async (id, userId) => {
    const getQuery = queryBuilder(QUERIES.getIncomeByIdAndUserId)({ id: id, userId: userId });
    const result = await dbClient.query(getQuery);
    const income = result.rows[0];

    return income;
}
