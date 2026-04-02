const { getDB } = require('../config/db');

exports.getSummary = async (req, res) => {
    try {
        const db = await getDB();

        // 1. Calculate Total Income
        const incomeData = await db.get(`SELECT SUM(amount) as total FROM transactions WHERE type = 'income'`);
        const totalIncome = incomeData.total || 0;

        // 2. Calculate Total Expenses
        const expenseData = await db.get(`SELECT SUM(amount) as total FROM transactions WHERE type = 'expense'`);
        const totalExpenses = expenseData.total || 0;

        // 3. Calculate Net Balance
        const netBalance = totalIncome - totalExpenses;

        // 4. Get Category-wise totals (Pro move!)
        const categoryTotals = await db.all(`
            SELECT category, SUM(amount) as total 
            FROM transactions 
            GROUP BY category
        `);

        res.json({
            totalIncome,
            totalExpenses,
            netBalance,
            categoryTotals
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Analytics calculation failed" });
    }
};