import Route from '@ioc:Adonis/Core/Route'

/**
 * Query builder examples
 */

Route.get('qb/products', 'ProductsController.getByUserIdQB')

Route.post('qb/products', 'ProductsController.createQB')

Route.post('qb/users', 'UsersController.createQB')
