const inquirer = require('inquirer');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  PORT: "3306",
  user: "root",
  password: "Good1234",
  database: "employees_db"
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connected")
});


inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
      name: 'doWhat'
    },
  ])

  .then (function(answers){
    console.log(answers);
  });