'use strict';

// INITialization
const express = require('express');
const app = express();
const dbMethods = require('./db-functions')

app.use(express.json());
app.use(express.static('./main/public'));

// SENDing html file for main root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

// GETting all tasks from DB
app.get('/todos', async (req, res) => {
  try {
    let dataTable = await dbMethods.showTable();
    res.status(200).json(dataTable);
  } catch(err) {
    console.log(err);
    return;
  }
});

// GETting specific task from DB
app.get('/todos/:id', async (req, res) => {
  try {
    let dataTable = await dbMethods.showItem(req.params.id);
    if(dataTable.length === 0) {
      throw new Error(`Task Not Found!`)
    }
    res.status(200).json(dataTable);
  } catch(err) {
    res.sendStatus(404);
    console.log(err);
    return;
  }
});

// CREATING/POSTING new task to DB
app.post('/todos', async (req, res) => {
  try {
    let dataCreated = await dbMethods.createTask(req.body);
    if(dataCreated.length === 0) {
      throw new Error(`Task Not Found!`)
    }
    res.status(200).json(dataCreated);
  } catch(err) {
    res.sendStatus(404);
    console.log(err);
    return;
  }
})

// UPDATE task on DB
app.put('/todos/:id', async (req, res) => {
  try {
    let dataEdited = await dbMethods.updateTask(req.body, req.params.id);
    if(dataEdited.length === 0) {
      throw new Error(`Task Not Found!`)
    }
    res.status(200).json(dataEdited);
  } catch(err) {
    res.sendStatus(404);
    console.log(err);
    return;
  }
})

// DELETE task from DB
app.delete('/todos/:id', async (req, res) => {
  try {
    let dataDeleted = await dbMethods.deleteTask(req.params.id);
    if(dataDeleted.length === 0) {
      throw new Error(`Task Not Found!`)
    }
    res.status(200).json(dataDeleted);
  } catch(err) {
    res.sendStatus(404);
    console.log(err);
    return;
  }
})

module.exports = app;