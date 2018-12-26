'use strict'

const Schema = use('Schema')

class PermisionSchema extends Schema {
  up () {
    this.create('permisions', (table) => {
      table.increments()
      table.string('name')
      table.string('slug').unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('permisions')
  }
}

module.exports = PermisionSchema
