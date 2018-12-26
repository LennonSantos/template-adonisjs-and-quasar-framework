'use strict'

const Role = use('App/Models/Role')
const RolesPermisions = use('App/Models/RolesPermision')

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   */
  async index ({ request, response, view }) {
    const data = await Role.all()

    return data
  }

  /**
   * Create/save a new role.
   * POST roles
   */
  async store ({ request, response }) {
    const values = request.except(['permisions'])

    const data = await Role.create(values)

    let permisions = request.only(['permisions'])

    let obj = permisions.permisions.map(e => {
     return {permision_id: e, role_id: data.id}
    })

    await RolesPermisions.createMany(obj)

    return data
  }

  /**
   * Display a single role.
   * GET roles/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update role details.
   * PUT or PATCH roles/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a role with id.
   * DELETE roles/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RoleController
