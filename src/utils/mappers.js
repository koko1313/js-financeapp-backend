export const mapExpenses = (dbExpenses) => {
    const expenses = [];

    for(const expense of dbExpenses) {
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

export const mapIncome = (dbIncomes) => {
    const incomes = [];

    for(const income of dbIncomes) {
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

export const mapUser = (user, jwtToken) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        jwtToken: jwtToken,
    };
}
