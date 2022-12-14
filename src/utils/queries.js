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
    
    getUsers: 'SELECT id, email, name, is_admin FROM "user"',
    getUserByEmail: 'SELECT id, email, name, is_admin FROM "user" WHERE email = :email',
    getUserByEmailAndPassword: 'SELECT id, email, name, is_admin FROM "user" WHERE email = :email AND password = :password',
    addUser: 'INSERT INTO "user" (id, email, name, password, is_admin) VALUES (:id, :email, :name, :password, :isAdmin)',
    deleteUserById: 'DELETE FROM "user" WHERE id = :id',
};