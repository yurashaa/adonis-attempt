import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import { v4 as uuid } from 'uuid'
import Product from "App/Models/Product";
import User from "App/Models/User";


export default class ProductsController {

  /**
   * Query builder
   */
  public getByUserIdQB({ request }: HttpContextContract) {
    const { userId } = request.qs()

    return Database.from('ap.products').where('user_id', userId)
  }

  public async createQB({ request }: HttpContextContract) {
    const { name, userId } = request.body();

    return Database
      .insertQuery()
      .table('ap.products')
      .insert({
        id: uuid(),
        name,
        user_id: userId
      })
  }

  /**
   * ORM
   */
  public getByUserId({ request }: HttpContextContract) {
    const { userId } = request.qs()

    return Product.findBy('user_id', userId)
  }

  public async create({ request }: HttpContextContract) {
    const {name, userId} = request.body();

    const user = await User.find(userId)

    if (!user) {
      throw new Error('User does not exist')
    }

    return user.related('products').create({ name })
  }
}
