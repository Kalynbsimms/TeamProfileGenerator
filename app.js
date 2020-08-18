
// 

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

// Array that will house the Role types

let employees = []

// // Function creating the Manager Role type.

const buildManager = employee => {
    inquirer.prompt([
        {
            type: 'number',
            name: 'officeNumber',
            message: `What is the manager's office number?`
        }
    ])
// Pushes the Office Number into the Manager Role
        .then(({ officeNumber }) => {
            employees.push(new Manager(employee.name, employee.id, employee.email, officeNumber))
            subMenu()
        })
        .catch(err => console.log(err))
}


// Function creating the Engineer Role type.
const buildEngineer = employee => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'What is your gitHub username?'
        }
    ])
    // Pushes the github username into the Energineer Role
        .then(({ github }) => {
            employees.push(new Engineer(employee.name, employee.id, employee.email, github))
            subMenu()
        })
        .catch(err => console.log(err))
}

// // Function creating the Intern Role type.
const buildIntern = employee => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'school',
            message: 'What school do you attend?'
        }
    ])
    // Pushes school into the Intern Role
        .then(({ school }) => {
            employees.push(new Intern(employee.name, employee.id, employee.email, school))
            subMenu()
        })
        .catch(err => console.log(err))

}

// Sub Menu dedicated to excute once all the question for the Role type have been answered. Allows you to continue to build your team or finish. 
const subMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        choices: ['Make Another Employee', 'Finish'],
        message: 'What would you like to do now?'
    })
    // If user selects to create another Employee, the main menu will restart
        .then(({ action }) => {
            switch (action) {
                case 'Make Another Employee':
                    mainMenu()
                    break
                    // If user selects Finish, HTML is created with the output data
                case 'Finish':
                    console.log(employees)
                    const html = render(employees)
                    console.log(html)
                    fs.writeFileSync(path.join(__dirname, 'output',
                        'index.html'), html)
                    break

            }
        })
        .catch(err => console.log(err))


}

// First Question to ask user which role type should be selected. All employees require a name, id, and email 
const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            choices: [ 'Manager', 'Engineer', 'Intern'],
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
    // Once the employee type is selected, the function will begin that particular role
        .then(employee => {
            switch (employee.type) {
                
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

// Intial Function
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
