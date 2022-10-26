import { initDbClient } from "../../database/dbClient.js";
import { QUERIES } from "../utils/queries.js";
import { pg as queryBuilder } from 'yesql';

export default class ExpenseDAO {
    static getExpenseByParams = async (params) => {
        const dbClient = initDbClient();
        let queryTemplate = QUERIES.getExpensesByUserId;
    
        // append parameters
        queryTemplate += params.fromDate ? " AND date > :fromDate" : "";
        queryTemplate += params.toDate ? " AND date < :toDate" : "";
        queryTemplate += " ORDER BY date DESC"; // TODO: find a more fancy solution
    
        const query = queryBuilder(queryTemplate)(params);
    
        const result = await dbClient.query(query);
        return result;
    }

    static addExpense = async (expense) => {
        const dbClient = initDbClient();
        const query = queryBuilder(QUERIES.addExpense)(expense);
        await dbClient.query(query);
    }

    static updateExpense = async (expense) => {
        const dbClient = initDbClient();
        const query = queryBuilder(QUERIES.updateExpenseById)(expense);
        await dbClient.query(query);
    }

    static deleteExpense = async (id) => {
        const dbClient = initDbClient();
        const query = queryBuilder(QUERIES.deleteExpenseById)({ id: id });
        await dbClient.query(query);
    }

    static getExpenseByIdAndUserId = async (id, userId) => {
        const dbClient = initDbClient();
        const getQuery = queryBuilder(QUERIES.getExpenseByIdAndUserId)({ id: id, userId: userId });
        const result = await dbClient.query(getQuery);
        const expense = result.rows[0];
    
        return expense;
    }
}
