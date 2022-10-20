import { QUERIES } from "../utils/queries.js";
import { pg as queryBuilder } from 'yesql';

export const registerUser = async (dbClient, user) => {
    let queryTemplate = QUERIES.registerUser;
    const query = queryBuilder(queryTemplate)(user);
    await dbClient.query(query);
}