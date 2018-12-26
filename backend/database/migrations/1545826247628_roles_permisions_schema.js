'use strict'

const Schema = use('Schema')

class RolesPermisionsSchema extends Schema {
  up () {
    this.create('roles_permisions', (table) => {
      table.increments()
      table.integer('role_id').unsigned()
      table.foreign('role_id').references('roles.id')
      table.integer('permision_id').unsigned()
      table.foreign('permision_id').references('permisions.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('roles_permisions')
  }
}

module.exports = RolesPermisionsSchema
