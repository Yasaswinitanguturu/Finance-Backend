const { getDB } = require('../config/db');

// 1. Create a new record (Income or Expense)
exports.createRecord = async (req, res) => {
    try {
        const { amount, type, category, date, description } = req.body;
        
        // Simple Validation: Check if amount is a number and positive
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Amount must be a positive number" });
        }

        const db = await getDB();
        await db.run(
            `INSERT INTO transactions (amount, type, category, date, description) VALUES (?, ?, ?, ?, ?)`,
            [amount, type, category, date, description]
        );

        res.status(201).json({ message: "Record added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Database error occurred" });
    }
};

// 2. View all records
exports.getAllRecords = async (req, res) => {
    try {
        const db = await getDB();
        const records = await db.all(`SELECT * FROM transactions`);
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: "Could not fetch records" });
    }
};