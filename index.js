import express from 'express';
import dbClient from './database/dbClient.js';
import { v4 as uuid } from 'uuid';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
await dbClient.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/getEntries', async (req, res) => {
    const result = await dbClient.query('SELECT * from test_table'); 
    res.send(result.rows);
});

app.post('/insertEntry', async (req, res) => {
    const id = uuid();
    const name = req.body.name;
    await dbClient.query(`INSERT INTO test_table (id, name) VALUES ('${id}', '${name}')`); 
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});