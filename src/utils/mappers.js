export const mapExpenses = (dbResponse) => {
    const expenses = [];

    for(const expense of dbResponse.rows) {
        expenses.push({
            id: expense.id,
            userId: expense.user_id,
            date: expense.date,
            amount: parseFloat(expense.amount),
            comment: expense.comment,
        });
    }

    return expenses;
}

export const mapIncome = (dbResponse) => {
    const incomes = [];

    for(const income of dbResponse.rows) {
        incomes.push({
            id: income.id,
            userId: income.user_id,
            date: income.date,
            amount: parseFloat(income.amount),
            comment: income.comment,
        });
    }

    return incomes;
}

export const mapUser = (dbResponse) => {
    const dbUser = dbResponse.rows[0];
    
    let user = undefined;

    if (dbUser) {
        user = {
            id: dbUser?.id,
            email: dbUser?.email,
            name: dbUser?.name,
        };
    }

    return user;
}
