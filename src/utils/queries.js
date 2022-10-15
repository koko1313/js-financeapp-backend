export const queries = {
    getExpenses: 'SELECT * from expense',
    addExpense: 'INSERT INTO expense (id, user_id, date, amount, comment) VALUES ($1, $2, $3, $4, $5)',
};