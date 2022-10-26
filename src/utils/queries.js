export const QUERIES = {
    getExpensesByUserId: 'SELECT * FROM "expense" WHERE user_id = :userId',
    getExpenseByIdAndUserId: 'SELECT * FROM "expense" WHERE id = :id AND user_id = :userId',
    addExpense: 'INSERT INTO "expense" (id, user_id, date, amount, comment) VALUES (:id, :userId, :date, :amount, :comment)',
    updateExpenseById: 'UPDATE "expense" SET date = :date, amount = :amount, comment = :comment WHERE id = :id',
    deleteExpenseById: 'DELETE FROM "expense" WHERE id = :id',

    getIncomesByUserId: 'SELECT * FROM "income" WHERE user_id = :userId',
    getIncomeByIdAndUserId: 'SELECT * FROM "income" WHERE id = :id AND user_id = :userId',
    addIncome: 'INSERT INTO "income" (id, user_id, date, amount, comment) VALUES (:id, :userId, :date, :amount, :comment)',
    updateIncomeById: 'UPDATE "income" SET date = :date, amount = :amount, comment = :comment WHERE id = :id',
    deleteIncomeById: 'DELETE FROM "income" WHERE id = :id',
    
    getUserByEmail: 'SELECT id, email, name FROM "user" WHERE email = :email',
    getUserByEmailAndPassword: 'SELECT id, email, name FROM "user" WHERE email = :email AND password = :password',
    addUser: 'INSERT INTO "user" (id, email, name, password) VALUES (:id, :email, :name, :password)',
};