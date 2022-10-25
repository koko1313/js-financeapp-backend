import { QUERIES } from "../utils/queries.js";
import { pg as queryBuilder } from 'yesql';
import { initDbClient } from "../../database/dbClient.js";
import { generateJWTToken } from "../utils/jwtToken.js";
import { mapUser } from "../utils/mappers.js";
import crypto from 'crypto';

const dbClient = initDbClient();

export const registerUser = async (user) => {
    if (await emailExists(user.email)) {
        throw new Error("User with this email already exist");
    }

    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;

    let queryTemplate = QUERIES.registerUser;
    const query = queryBuilder(queryTemplate)(user);
    await dbClient.query(query);
}

export const loginUser = async (credentials) => {
    credentials.password = hashPassword(credentials.password);

    let queryTemplate = QUERIES.getUserByEmailAndPassword;
    const query = queryBuilder(queryTemplate)(credentials);
    const dbResult = await dbClient.query(query);
    const user = mapUser(dbResult);

    if (!user) {
        throw new Error("User with these credentials was not found");
    }

    const jwtToken = generateJWTToken(user);
    return {
        ...user,
        jwtToken: jwtToken // attach jwtToken to the response
    };
}

const emailExists = async (email) => {
    let queryTemplate = QUERIES.getUserByEmail;
    const query = queryBuilder(queryTemplate)({ email: email });
    const dbResult = await dbClient.query(query);
    return dbResult.rows.length > 0; // return true if there is already user with this email
}

const hashPassword = (plainPassword) => {
    return crypto.createHash('md5').update(plainPassword).digest('hex');
}