'use strict'

const Permision = use('App/Models/Permision')

/**
 * Resourceful controller for interacting with permisions
 */
class PermisionController {
  /**
   * Show a list of all permisions.
   * GET permisions
   */
  async index ({ request, response, view }) {
    const data = await Permision.all()

    return data
  }

  /**
   * Create/save a new permision.
   * POST permisions
   */
  async store ({ request, response }) {
    const values = request.all()

    const data = await Permision.create(values)

    return data
  }

  /**
   * Display a single permision.
   * GET permisions/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update permision details.
   * PUT or PATCH permisions/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a permision with id.
   * DELETE permisions/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PermisionController
