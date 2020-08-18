// Export Intern class, grabs github school and return its values
const Employee = require('./Employee.js')

// This class inherts from the employee class
class Intern extends Employee {
    constructor (name, id, email,school){
        super(name, id, email)
        this.school = school
    }
    getSchool () {
        return this.school
    }
    getRole () {
        return 'Intern'
    }
}

module.exports = Intern