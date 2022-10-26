import { initDbClient } from "../../database/dbClient.js";
import { QUERIES } from "../utils/queries.js";
import { pg as queryBuilder } from 'yesql';

export default class ExpenseDAO {
    constructor () {
        this.dbClient = initDbClient();
    }

    getExpensesByParams = async (params) => {
        let queryTemplate = QUERIES.getExpensesByUserId;
    
        // append parameters
        queryTemplate += params.fromDate ? " AND date > :fromDate" : "";
        queryTemplate += params.toDate ? " AND date < :toDate" : "";
        queryTemplate += " ORDER BY date DESC"; // TODO: find a more fancy solution
    
        const query = queryBuilder(queryTemplate)(params);
    
        const result = await this.dbClient.query(query);
        return result.rows;
    }

    getExpenseByIdAndUserId = async (id, userId) => {
        const getQuery = queryBuilder(QUERIES.getExpenseByIdAndUserId)({ id: id, userId: userId });
        const result = await this.dbClient.query(getQuery);
        return result.rows[0];
    }

    addExpense = async (expense) => {
        const query = queryBuilder(QUERIES.addExpense)(expense);
        const result = await this.dbClient.query(query);
        if (result.rowCount > 0) {
            return expense;
        }
    }

    updateExpense = async (expense) => {
        const query = queryBuilder(QUERIES.updateExpenseById)(expense);
        const result = await this.dbClient.query(query);
        if (result.rowCount > 0) {
            return expense;
        }
    }

    deleteExpense = async (id) => {
        const query = queryBuilder(QUERIES.deleteExpenseById)({ id: id });
        const result = await this.dbClient.query(query);
        return result.rowCount > 0;
    }
}
