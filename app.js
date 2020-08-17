const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const render = require("./lib/htmlRenderer");

const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let employees = []

const buildManager = employee => {
    inquirer.prompt([
        {
            type: 'number',
            name: 'officeNumber',
            message: `What is the manager's office number?`
        }
    ])

        .then(({ officeNumber }) => {
            employees.push(new Manager(employee.name, employee.id, employee.email, officeNumber))
            subMenu()
        })
        .catch(err => console.log(err))
}


const buildEngineer = employee => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'gitHub',
            message: 'What is your gitHub username?'
        }
    ])
        .then(({ gitHub }) => {
            employees.push(new Engineer(employee.name, employee.id, employee.email, gitHub))
            subMenu()
        })
        .catch(err => console.log(err))
}

const buildIntern = employee => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'school',
            message: 'What school do you attend?'
        }
    ])
        .then(({ school }) => {
            employees.push(new Intern(employee.name, employee.id, employee.email, school))
            subMenu()
        })
        .catch(err => console.log(err))

}

const subMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        choices: ['Make Another Employee', 'Finish'],
        message: 'What would you like to do now?'
    })
        .then(({ action }) => {
            switch (action) {
                case 'Make Another Employee':
                    mainMenu()
                    break
                case 'Finish':
                    const html = render(employees)
                    fs.writeFileSync(path.join(__dirname, 'output',
                    // Should this be main.html or index.html
                     'index.html'), html)
                    break

            }
        })
        .catch(err => console.log(err))


}

const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            choices: ['Employee', 'Manager', 'Engineer', 'Intern'],
            message: 'Select the type of role you would like to make'
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter employee name:'
        },
        {
            type: 'number',
            name: 'id',
            message: 'Enter employee ID number:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter employee email address:'
        }
    ])
        .then(employee => {
            switch (employee.type) {
                case 'Employee':
                    employees.push(new Employee(employee.name, employee.id, employee.email))
                    subMenu()
                    break
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

        .catch(err => console.log(err))
}

mainMenu()







// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
