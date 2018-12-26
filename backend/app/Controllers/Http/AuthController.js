'use strict'

const User = use("App/Models/User")

class AuthenticateController {
  async authenticate ({request, auth, response}) {
    const {email, password} = request.all()

    const attempt = await auth.withRefreshToken().attempt(email, password)

    const user = await User.query().where('email', email).fetch()

    return {user, attempt}
  }

  async register({ request }) {
    const data = request.only(["username", "email", "password"])

    const user = await User.create(data)

    return user
  }
}

module.exports = AuthenticateController
