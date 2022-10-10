import express from 'express';
import dbClient from './database/dbClient.js';

const app = express();
const port = process.env.PORT || 3000;
await dbClient.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test', async (req, res) => {
    const result = await dbClient.query('SELECT * from test_table'); 
    res.send(result.rows);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});