export const QUERIES = {
    getExpensesByUserId: 'SELECT * FROM "expense" WHERE user_id = :userId',
    getExpenseById: 'SELECT * FROM "expense" WHERE id = :id',
    addExpense: 'INSERT INTO "expense" (id, user_id, date, amount, comment) VALUES (:id, :userId, :date, :amount, :comment)',
    updateExpenseById: 'UPDATE "expense" SET date = :date, amount = :amount, comment = :comment WHERE id = :id',
    
    registerUser: 'INSERT INTO "user" (id, email, name, password) VALUES (:id, :email, :name, :password)',
};