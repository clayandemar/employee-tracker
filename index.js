const inquirer = require('inquirer');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  PORT: "3306",
  user: "root",
  password: "Good1234",
  database: "employees_db"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected")
});
askQuestions();
function askQuestions() {

  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit'],
        name: 'doWhat'
      },
    ])

    .then(function (answers) {
      switch (answers.doWhat) {
        case "View all Departments":
          con.query("SELECT * FROM department", function (err, result, fields) {
            if (err) throw err;
            console.table(result);
            askQuestions();
          });
          break;

        case "View all Roles":
          con.query("SELECT * FROM role", function (err, result, fields) {
            if (err) throw err;
            console.table(result);
            askQuestions();
          });
          break;

        case "View all Employees":
          con.query("SELECT * FROM employee", function (err, result, fields) {
            if (err) throw err;
            console.table(result);
            askQuestions();
          });
          break;

        case "Add a Department":
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is the name of the Department?',
                name: 'name'
              }
            ])
            .then(function (answers) {
             con.query("INSERT INTO department (names) VALUES('" + answers.name + "')");
             askQuestions();
            });
          
          break;

        case "Add a Role":
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is your role/title?',
                name: 'title'
              },
              {
                type: 'input',
                message: 'What is your salary?',
                name: 'salary'
              },
              {
                type: 'input',
                message: 'What is your deparmtent id?',
                name: 'department_id'
              }
            ])
            .then(function (answers) {
              con.query("INSERT INTO role (title, salary, department_id) VALUES('" + answers.title + answers.salary + answers.department_id + "')");
              askQuestions();
             });
          break;

        case "Add an Employee":
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is your first name',
                name: 'first_name'
              },
              {
                type: 'input',
                message: 'What is your last name',
                name: 'last_name'
              },
              {
                type: 'input',
                message: 'What is your role id',
                name: 'role_id'
              },
              {
                type: 'input',
                message: "What is your manager's id",
                name: 'manager_id'
              },
            ])
            .then(function (answers) {
              con.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('" + answers.first_name + answers.last_name + answers.role_id + answers.manager_id + "')");
              askQuestions();
             });
          break;

        case "Update an Employee Role":

          askQuestions();
          break;
      }
    });
};