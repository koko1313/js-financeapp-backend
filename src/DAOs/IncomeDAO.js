import { initDbClient } from "../../database/dbClient.js";
import { QUERIES } from "../utils/queries.js";
import { pg as queryBuilder } from 'yesql';

export default class IncomeDAO {
    constructor () {
        this.dbClient = initDbClient();
    }

    getIncomesByParams = async (params) => {
        let queryTemplate = QUERIES.getIncomesByUserId;
    
        // append parameters
        queryTemplate += params.fromDate ? " AND date > :fromDate" : "";
        queryTemplate += params.toDate ? " AND date < :toDate" : "";
        queryTemplate += " ORDER BY date DESC"; // TODO: find a more fancy solution
    
        const query = queryBuilder(queryTemplate)(params);
    
        const result = await this.dbClient.query(query);
        return result.rows;
    }

    addIncome = async (income) => {
        const query = queryBuilder(QUERIES.addIncome)(income);
        await this.dbClient.query(query);
    }

    updateIncome = async (income) => {
        const query = queryBuilder(QUERIES.updateIncomeById)(income);
        await this.dbClient.query(query);
    }

    deleteIncome = async (id) => {
        const query = queryBuilder(QUERIES.deleteIncomeById)({ id: id });
        await this.dbClient.query(query);
    }

    getIncomeByIdAndUserId = async (id, userId) => {
        const getQuery = queryBuilder(QUERIES.getIncomeByIdAndUserId)({ id: id, userId: userId });
        const result = await this.dbClient.query(getQuery);
        return result.rows[0];
    }
}
