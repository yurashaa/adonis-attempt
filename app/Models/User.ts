import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany, HasMany, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash';
import { v4 as uuid } from 'uuid'
import Product from "App/Models/Product";

export default class User extends BaseModel {
  public static table = 'ap.users'
  public static selfAssignPrimaryKey = true

  @column({isPrimary: true})
  public id: string

  @column()
  name: string

  @column()
  email: string

  @column()
  password: string

  @column()
  rememberMeToken: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @hasMany(() => Product)
  products: HasMany<typeof Product>

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
