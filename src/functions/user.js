import { QUERIES } from "../utils/queries.js";
import { pg as queryBuilder } from 'yesql';
import { initDbClient } from "../../database/dbClient.js";

const dbClient = initDbClient();

export const registerUser = async (user) => {
    let queryTemplate = QUERIES.registerUser;
    const query = queryBuilder(queryTemplate)(user);
    await dbClient.query(query);
}