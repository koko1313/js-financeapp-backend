export const QUERIES = {
    getExpenses: 'SELECT * from expense WHERE user_id = :userId ORDER BY date DESC',
    addExpense: 'INSERT INTO expense (id, user_id, date, amount, comment) VALUES (:id, :userId, :date, :amount, :comment)',
};