'use strict'

// INITialization
const query = require('./db');
let output;

// Connection with DB
const initTable = async () => {
  output = await query(`CREATE TABLE IF NOT EXISTS tasks (
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    text VARCHAR(255) NOT NULL,
    completed BOOLEAN
    );`);
  return output;
}

// Show all tasks
const showTable = async () => {
  initTable();
  output = await query(`SELECT * FROM tasks`)
  return output;
}

// Show specific task
const showItem = async (id) => {
  initTable();
  output = await query(`SELECT * FROM tasks WHERE id = ?`, [id])
  return output;
}

// Create new task
const createTask = async (dataBody) => {
  initTable();
  let report = await query(`INSERT INTO tasks (text, completed) VALUES (?, ?)`, [dataBody.text, dataBody.completed || false]);
  output = await query(`SELECT * FROM tasks WHERE id = ?`, [report.insertId]);
  return output;
}

// Update existing task
const updateTask = async (dataBody, id) => {
  initTable();
  if (dataBody.text.length === 0) {
    let dataText = await query(`SELECT text FROM tasks WHERE id = ?`, [id]);
    dataBody.text = dataText;
  }
  let report = await query(`UPDATE tasks SET text = ?, completed = ? WHERE id = ?`, [dataBody.text, dataBody.completed, id]);
  output = await query(`SELECT * FROM tasks WHERE id = ?`, [id]);
  return output;
}

// Delete exiting task
const deleteTask = async (id) => {
  initTable();
  output = await query(`SELECT * FROM tasks WHERE id = ?`, [id]);
  let report = await query(`DELETE FROM tasks WHERE id = ?`, [id]);
  return output;
}

module.exports = {
  showTable,
  showItem,
  createTask,
  updateTask,
  deleteTask
}