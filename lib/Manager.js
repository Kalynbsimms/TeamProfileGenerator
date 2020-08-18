// Export Manager class, grabs office number and return its values
const Employee = require('./Employee.js')

// This class inherts from the employee class

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email, officeNumber)
        this.officeNumber = officeNumber
    }

    getOfficeNumber() {
        return this.officeNumber
    }
    getRole() {
        return 'Manager'
    }
}

module.exports = Manager
