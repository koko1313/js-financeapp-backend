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

export const updateIncome = async (id, updatedIncome) => {
    const getQuery = queryBuilder(QUERIES.getIncomeById)({ id: id });
    const result = await dbClient.query(getQuery);
    const income = result.rows[0];

    if (!income) {
        throw new Error(`Income with id ${id} was not found`);
    }
    
    for(const key of Object.keys(updatedIncome)) {
        income[key] = updatedIncome[key];
    }

    const updateQuery = queryBuilder(QUERIES.updateIncomeById)(income);
    await dbClient.query(updateQuery);
}

export const deleteIncome = async (id) => {
    const query = queryBuilder(QUERIES.deleteIncomeById)({ id: id });
    await dbClient.query(query);
}