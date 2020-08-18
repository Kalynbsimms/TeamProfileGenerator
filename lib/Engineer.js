
// Export Engineer class, grabs github username and return its values
const Employee = require('./Employee.js')

// This class inherts from the employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github
    }
    getGithub() {
        return this.github
    }

    getRole() {
        return 'Engineer'
    }
}

module.exports = Engineer