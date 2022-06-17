import { DateTime } from 'luxon'
import {BaseModel, column, beforeCreate, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import User from 'App/Models/User';

export default class Product extends BaseModel {
  public static table = 'ap.products'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: string

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = uuid()
  }
}
