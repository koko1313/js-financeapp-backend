import express from 'express';
import cors from 'cors';
import expenseRoutes from './src/routes/expense.js';
import incomeRoutes from './src/routes/income.js';
import userRoutes from './src/routes/user.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors()); // enable cors

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use(expenseRoutes);
app.use(incomeRoutes);
app.use(userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});