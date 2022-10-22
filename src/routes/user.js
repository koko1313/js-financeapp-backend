import express from 'express';
import { v4 as uuid } from 'uuid';
import { initDbClient } from '../../database/dbClient.js';
import { registerUser } from '../functions/user.js';

const router = express.Router();

const dbClient = initDbClient();

router.post('/user/register', async (req, res) => {
    // TODO: currently register dummy user
    const user = {
        id: uuid(),
        email: 'dummy@mail.com',
        name: 'Dummy User',
        password: '1234',
    };

    await registerUser(dbClient, user);
    res.status(200).send();
});

export default router;