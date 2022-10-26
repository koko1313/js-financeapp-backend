import { initDbClient } from "../../database/dbClient.js";
import { QUERIES } from "../utils/queries.js";
import { pg as queryBuilder } from 'yesql';

export default class UserDAO {
    constructor () {
        this.dbClient = initDbClient();
    }

    getUserByEmail = async (email) => {
        const query = queryBuilder(QUERIES.getUserByEmail)({ email: email });
        const result = await this.dbClient.query(query);
        return result.rows[0];
    }

    getUserByEmailAndPassword = async (email, password) => {
        const query = queryBuilder(QUERIES.getUserByEmailAndPassword)({ email: email, password: password });
        const result = await this.dbClient.query(query);
        return result.rows[0];
    }

    addUser = async (user) => {
        const query = queryBuilder(QUERIES.addUser)(user);
        const result = await this.dbClient.query(query);
        if (result.rowCount > 0) {
            return user;
        }
    }
}
