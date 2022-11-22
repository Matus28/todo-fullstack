# Backend stories

## Initialize a node package in this folder

- the test command should be `npm run test`

## Design and create your database

The database should store the user's tasks. Every task should have a unique,
auto increment id, a title and a state (done or not). The task's name needs to
be at least 3 characters long, but not longer than 100 characters.

## Create the given [endpoints](todo-endpoints.md) in Express.js

According to the specification create the endpoints on the server side.

## Create database queries

Write the MySQL queries that return live data from your database.

## Test with Jest

Create tests for the new todo inputs:

- Insert a new todo item to the DB, check if it's inserted
- Test if the insert endpoint accepts todos with length out of range (3-100)
- Test whether SQL keywords like `CREATE`, `DROP`, `INSERT`, `SELECT` in a
  todo item's title are properly escaped (don't result in SQL injection)