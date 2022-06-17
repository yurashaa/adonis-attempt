import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from "@ioc:Adonis/Core/Hash";
import Database from "@ioc:Adonis/Lucid/Database";
import { v4 as uuid } from 'uuid'
import User from "App/Models/User";

export default class UsersController {

  /**
   * Query builder
   */
  public async createQB({ request }: HttpContextContract) {
    const { name, password, email } = request.body()

    const hashPassword = await Hash.make(password)

    return Database
      .insertQuery()
      .table('ap.users')
      .insert({
        id: uuid(),
        name,
        email,
        password: hashPassword
      })
  }

  /**
   * ORM
   */
  public create({ request }: HttpContextContract) {
    const { name, password, email } = request.body()

    return User.create({ name, password, email });
  }
}
