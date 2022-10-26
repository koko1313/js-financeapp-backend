import { generateJWTToken } from "../middleware/jwtToken.js";
import { mapUser } from "../utils/mappers.js";
import UserDAO from "../DAOs/UserDAO.js";
import { hashPassword } from "../utils/utils.js";

const userDAO = new UserDAO();

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

    const jwtToken = generateJWTToken(user);

    return mapUser(user, jwtToken);
}
