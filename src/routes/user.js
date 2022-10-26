import express from 'express';
import { v4 as uuid } from 'uuid';
import { loginUser, registerUser } from '../functions/user.js';

const router = express.Router();

router.post('/user/register', async (req, res) => {
    try {
        const user = {
            id: uuid(),
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        };

        const registeredUser = await registerUser(user);
        res.status(200).send(registeredUser);
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        };

        const loggedUser = await loginUser(credentials);
        res.status(200).send(loggedUser);
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

export default router;