const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let dbInstance = null;

async function getDB() {
    if (!dbInstance) {
        dbInstance = await open({
            filename: './finance.db',
            driver: sqlite3.Database
        });
    }
    return dbInstance;
}

async function initDB() {
    const db = await getDB();
    
    // Enable Foreign Keys for data integrity
    await db.get("PRAGMA foreign_keys = ON");

    // Users Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            role TEXT CHECK(role IN ('Admin', 'Analyst', 'Viewer')) NOT NULL,
            status TEXT DEFAULT 'active'
        )
    `);

    // Transactions Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            type TEXT CHECK(type IN ('income', 'expense')),
            category TEXT NOT NULL,
            date TEXT DEFAULT (date('now')),
            description TEXT
        )
    `);

    console.log(" Database & Tables Initialized.");
}

module.exports = { initDB, getDB };