// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, quantity, price) {
        this.name = name
        this.quantity = quantity
        this.price = price
    }
    getName() {
        return this.name
    }
    getQuantity() {
        return this.quantity
    }
    getPrice() {
        return this.price
    }
    getType() {
        return 'product'
    }
}

module.exports = Product
