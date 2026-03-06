const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./notes.db");

db.serialize(() => {

db.run(`CREATE TABLE IF NOT EXISTS users(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT,
password TEXT,
role TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS notes(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT,
content TEXT,
user_id INTEGER
)`);

});

module.exports = db;