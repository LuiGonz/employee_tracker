const inquirer = require("inquirer");
const cTable = require("console.table");
const dataBase = require("./db/connection");

const startMenu = [
  {
    type: "list",
    name: "startMenu",
    message: "What option will you select on this list?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee's role"
    ]
  }
]

const addRoles = [
  {
    type: "input",
    name: "title",
    message: "What is the title of the employee's new role?"
  },{
    type: "input",
    name: "salary",
    message: "What is the salary for the employe's new role?"
  },{
    type: "input",
    name: "department",
    message: "What department will the new role be in? "
  }]

const addDepartments = [
  {
    type: "input",
    name: "name",
    message: "What department will you be adding?"
  }]

const addEmployees = [
  {
    type: "input",
    name: "first_name",
    message: "What is the new employee's first name?"
  },{
    type: "input",
    name: "last_name",
    message: "What is the new employee's last name?"
  },{
    type: "input",
    name: "role_id",
    message: "What role will the new employee have?",
  },{
    type: "input",
    name: "manager_id",
    message: "Who will be the new employee's manager?"
  }]

const selectEmployees = [
  {
    type: "input",
    name: "employee_id",
    message: "Choose an employee to update."
  }]

const updateRoleQuestion = [
  {
    type: "input",
    name: "role_id",
    message: "Choose the employee's new role?"
  }
]

const menuStarter = async() => {
  const result = await inquirer.prompt(startMenu).then(function(result){
    switch (result.startMenu) {
      case "View all departments":
        dataBase.query("SELECT * FROM department", function (err, result){
          console.log("");
          console.table(result);
        });
        menuStarter();
        break;
      case "View all roles":
        //dataBase.query("SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id", function (err, results) {
        dataBase.query('SELECT * FROM role', function (err, result){  
        console.log("");
          console.table(result);
        });
        menuStarter();
        break;
      case "View all employees":
        dataBase.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (err, result){
          console.log("");
          console.table(result);
        });
        menuStarter();
        break;
      case "Add a Department":
        dataBase.query('SELECT * FROM department', function (err, result){
          console.log("");
          console.table(result);
        });
        addDepartment();
        break;
      case "Add a Role":
        //dataBase.query("SELECT * FROM department", function (err, result) {
          dataBase.query('SELECT * FROM role', function (err, result){
          console.log("");
          console.table(result);
        });
        addRole();
        break;
      case "Add an Employee":
        dataBase.query("SELECT role.*, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id", function (err, result){
          console.log("");
          console.table(result);
        });
        dataBase.query("SELECT employee.*, role.title AS role_title FROM employee LEFT JOIN role ON employee.role_id = role.id", function (err, result){
          console.log("");
          console.table(result);
        });
        addEmployee();
        break;
      case "Update an Employee's role":
        dataBase.query("SELECT employee.id, employee.first_name, employee.last_name FROM employee", function (err, result){
          console.log("");
          console.table(result);
        });
        selectedEmployee();
        break;
    }
  }); //return result;
}

const addRole = async() => {
  const result = await inquirer.prompt(addRoles)
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
  const params = [result.title, result.salary, result.department];
  dataBase.query(sql, params, function (err, result){
    console.log("");
    console.table(result);
  });
  menuStarter();
}

const addDepartment = async() => {
  const result = await inquirer.prompt(addDepartments)
  const sql = `INSERT INTO department (name) VALUES (?)`;
  const params = [result.name];
  dataBase.query(sql, params, function (err, result) {
    console.log("");
    console.table(result);
  });
  menuStarter();
}

const addEmployee = async() => {
  const result = await inquirer.prompt(addEmployees);
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [result.first_name, result.last_name, result.role_id, result.manager_id];
  dataBase.query(sql, params, function (err, result){
    console.log("");
    console.table(result);
  });
  menuStarter();
}

const selectedEmployee = async() => {
  const result = await inquirer.prompt(selectEmployees);
  dataBase.query('SELECT role.id, role.title FROM role', function (err, result){
    console.log("");
    console.table(result);
  });
  updateRole(result.employee_id);
}

const updateRole = async(employeeID) => {
  const result = await inquirer.prompt(updateRoleQuestion);
  const sql = `UPDATE employee SET role_id = ${result.role_id} WHERE id = ${employeeID}`;
  dataBase.query(sql, function (err, result){
    console.log("");
    console.table(result);
  });
  menuStarter();
}

const startApp = async() => {
  console.log("This is the Employee Tracker app!");
  menuStarter();
}
startApp();