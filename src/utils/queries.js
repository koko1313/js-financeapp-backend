export const QUERIES = {
    getExpenses: 'SELECT * from "expense" WHERE user_id = :userId',
    addExpense: 'INSERT INTO "expense" (id, user_id, date, amount, comment) VALUES (:id, :userId, :date, :amount, :comment)',
    
    registerUser: 'INSERT INTO "user" (id, email, name, password) VALUES (:id, :email, :name, :password)',
};