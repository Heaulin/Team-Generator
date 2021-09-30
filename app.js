const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const {prompt} = require("inquirer");
const path = require("path");
const { writeFile } = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = []

const createManager = ({ name, id, email }) => {
  prompt({
    type: 'input',
    name: 'officeNumber',
    message: 'What is their Office Number?'
  })
    .then(({ officeNumber }) => {
      team.push(new Manager(name, id, email, officeNumber))
      menu()
    })
}

const createEngineer = ({ name, id, email }) => {
  prompt({
    type: 'input',
    name: 'github',
    message: 'What is their GitHub username?'
  })
    .then(({ github }) => {
      team.push(new Engineer(name, id, email, github))
      menu()
    })
}

const createIntern = ({ name, id, email }) => {
  prompt({
    type: 'input',
    name: 'school',
    message: 'Where did they go to school?'
  })
    .then(({ school }) => {
      team.push(new Intern(name, id, email, school))
      menu()
    })
}

const buildEmployee = () => {
  prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Which employee would you like to create?',
      choices: ['Manager', 'Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is their name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is their id?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is their email?'
    }
  ])
      .then(({ role, ...employee }) => {
      switch (role) {
        case 'Manager':
          buildManager(employee)
          break
        case 'Engineer':
          buildEngineer(employee)
          break
        case 'Intern':
          buildIntern(employee)
          break
      }
    })
}
const menu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['Create new employee', 'Finish']
  })
    .then(({ action }) => {
      switch (action) {
        case 'Create new employee':
          buildEmployee() 
          break
        case 'Finish':
          writeFile('./output/team.html', render(team), err => {
            if (err) { console.log(err) }
            console.log('Team assembled!')
          })
          break
      }
    })
}

menu()
