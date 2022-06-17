import Route from '@ioc:Adonis/Core/Route'

/**
 * ORM
 */
Route.get('orm/products', 'ProductsController.getByUserId')

Route.post('orm/products', 'ProductsController.create')

Route.post('orm/users', 'UsersController.create')
