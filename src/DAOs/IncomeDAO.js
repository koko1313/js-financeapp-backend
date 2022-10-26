import { initDbClient } from "../../database/dbClient.js";
import { QUERIES } from "../utils/queries.js";
import { pg as queryBuilder } from 'yesql';

export default class IncomeDAO {
    static getIncomeByParams = async (params) => {
        const dbClient = initDbClient();
        let queryTemplate = QUERIES.getIncomesByUserId;
    
        // append parameters
        queryTemplate += params.fromDate ? " AND date > :fromDate" : "";
        queryTemplate += params.toDate ? " AND date < :toDate" : "";
        queryTemplate += " ORDER BY date DESC"; // TODO: find a more fancy solution
    
        const query = queryBuilder(queryTemplate)(params);
    
        const result = await dbClient.query(query);
        return result;
    }

    static addIncome = async (income) => {
        const dbClient = initDbClient();
        const query = queryBuilder(QUERIES.addIncome)(income);
        await dbClient.query(query);
    }

    static updateIncome = async (income) => {
        const dbClient = initDbClient();
        const query = queryBuilder(QUERIES.updateIncomeById)(income);
        await dbClient.query(query);
    }

    static deleteIncome = async (id) => {
        const dbClient = initDbClient();
        const query = queryBuilder(QUERIES.deleteIncomeById)({ id: id });
        await dbClient.query(query);
    }

    static getIncomeByIdAndUserId = async (id, userId) => {
        const dbClient = initDbClient();
        const getQuery = queryBuilder(QUERIES.getIncomeByIdAndUserId)({ id: id, userId: userId });
        const result = await dbClient.query(getQuery);
        const income = result.rows[0];
    
        return income;
    }
}
