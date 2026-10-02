const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();
const fs = require("fs/promises");

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    });

app.get('/', (req, res) => {
    res.send("Diák szerver működik.");
});

async function testConnection() {
    try {
    const connection = await pool.getConnection();
    console.log("Sikeres MySQL kapcsolat!");
    connection.release();
    } catch (err) {
    console.error("MySQL hiba:", err.message);
    }
    }
    testConnection();

app.listen(PORT, () => {
    console.log(`A szerver fut a ${PORT} porton`);
});

app.get("/diakok", async (req, res) => {
    try {
    const [rows] = await pool.query(
    "SELECT * FROM diakok"
    );
    res.json(rows);
    } catch (error) {
    res.status(500).json({
    hiba: error.message
    });
    }
    });
