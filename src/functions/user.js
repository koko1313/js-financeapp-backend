import { generateJWTToken } from "../middleware/jwtToken.js";
import { mapUser, mapUsers } from "../utils/mappers.js";
import UserDAO from "../DAOs/UserDAO.js";
import { hashPassword } from "../utils/utils.js";

const userDAO = new UserDAO();

export const getUsers = async () => {
    const users = await userDAO.getUsers();
    return mapUsers(users);
}

export const registerUser = async (user) => {
    const existingUser = await userDAO.getUserByEmail(user.email);
    if (existingUser) {
        throw new Error("User with this email already exist");
    }

    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;

    const registeredUser = await userDAO.addUser(user);
    return mapUser(registeredUser);
}

export const loginUser = async (credentials) => {
    const email = credentials.email;
    const password = hashPassword(credentials.password)

    const user = await userDAO.getUserByEmailAndPassword(email, password);

    if (!user) {
        throw new Error("User with these credentials was not found");
    }

    const mappedUser = mapUser(user); // map the user from db to user format that we want from our side

    const jwtToken = generateJWTToken(mappedUser);

    return mapUser(mappedUser, jwtToken); // map the user again to attach the jwt token
}
