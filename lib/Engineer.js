// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee.js')

class Engineer extends Employee {
    constructor (name, id, email,gitHub){
    super(name, id,email)
    this.gitHub = gitHub
    }
    getGithub () {
        return this.gitHub
    }

    getType () {
        return 'engineer'
    }
}

module.exports = Engineer