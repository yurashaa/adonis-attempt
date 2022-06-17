import Route from '@ioc:Adonis/Core/Route'
import Product from "App/Models/Product";

/**
 * Route for logging user in by email and password
 */

Route.post('auth/login', async ({auth, request, response}) => {
  const email = request.input('email')
  const password = request.input('password')

  return auth.use('api').attempt(email, password)
})

/**
 * Route using auth middleware
 * Pass token from /auth/login request as Authorization header to get access to routes
 * protected by auth middleware
 */

Route
  .get('auth/products', async ({ logger }) => {
    logger.info('Auth protected route was called')
    return Product.all()
  })
  .middleware('auth')

/**
 * Route for logging user out
 */

Route.post('auth/logout', async ({auth, request, response}) => {
  return auth.use('api').logout()
})
