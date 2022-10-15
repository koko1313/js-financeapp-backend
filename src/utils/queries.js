export const QUERIES = {
    getExpenses: 'SELECT * from expense WHERE user_id = :userId',
    addExpense: 'INSERT INTO expense (id, user_id, date, amount, comment) VALUES ($1, $2, $3, $4, $5)',
};