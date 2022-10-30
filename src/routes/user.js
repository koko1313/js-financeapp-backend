import express from 'express';
import { v4 as uuid } from 'uuid';
import { deleteUser, getUsers, loginUser, registerUser } from '../functions/user.js';
import { decodeJWTToken } from '../middleware/jwtToken.js';

const router = express.Router();

router.get('/user/get', decodeJWTToken, async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const users = await getUsers();
            res.status(200).send(users);
        } else {
            res.status(403).send({ message: "Forbidden" })
        }
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

router.post('/user/register', async (req, res) => {
    try {
        const user = {
            id: uuid(),
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            isAdmin: req.body.isAdmin ?? false
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

router.delete('/user/delete/:id', decodeJWTToken, async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const id = req.params.id;

            await deleteUser(id); 
            res.status(200).send();
        } else {
            res.status(403).send({ message: "Forbidden" })
        }
    } catch (ex) {
        res.status(500).send({ message: ex.message });
    }
});

export default router;