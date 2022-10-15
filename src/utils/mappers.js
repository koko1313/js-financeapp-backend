export const mapExpenses = (raw) => {
    const expenses = [];

    for(const expense of raw) {
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