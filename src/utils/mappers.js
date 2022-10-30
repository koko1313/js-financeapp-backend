export const mapExpense = (expense) => {
    return {
        id: expense.id,
        userId: expense.user_id ?? expense.userId,
        date: expense.date,
        amount: parseFloat(expense.amount),
        comment: expense.comment,
    };
}

export const mapExpenses = (dbExpenses) => {
    const expenses = [];

    for(const expense of dbExpenses) {
        expenses.push(mapExpense(expense));
    }

    return expenses;
}

export const mapIncome = (income) => {
    return {
        id: income.id,
        userId: income.user_id ?? income.userId,
        date: income.date,
        amount: parseFloat(income.amount),
        comment: income.comment,
    };
}

export const mapIncomes = (dbIncomes) => {
    const incomes = [];

    for(const income of dbIncomes) {
        incomes.push(mapIncome(income));
    }

    return incomes;
}

export const mapUser = (user, jwtToken) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.is_admin ?? user.isAdmin,
        jwtToken: jwtToken,
    };
}

export const mapUsers = (dbUsers) => {
    const users = [];

    for (const user of dbUsers) {
        users.push(mapUser(user));
    }

    return users;
}