import { v4 as uuid } from 'uuid';

export const getExpense = async (dbClient) => {
    const result = await dbClient.query('SELECT * from expense');

    const expenses = result.rows.map(expense => {
        return {
            userId: expense.userId,
            date: expense.date,
            amount: parseFloat(expense.amount),
            comment: expense.comment,
        };
    });

    return expenses;
}

export const addExpense = async (dbClient, expense) => {
    const id = uuid();
    await dbClient.query(`INSERT INTO expense (id, user_id, date, amount, comment) VALUES ('${id}', '${expense.userId}', '${expense.date}', ${expense.amount}, '${expense.comment}')`);
}