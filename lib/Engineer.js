const Employee = require('./Employee.js')

class Engineer extends Engineer {
  constructor(name, id, email, github) {
    super(name, email, phone)
    this.role = 'Engineer'
    this.github = github
  }

  getGithub () {
    return this.github
  }

  getRole () {
    return 'Engineer'
  }
}

module.exports = Engineer
