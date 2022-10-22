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
