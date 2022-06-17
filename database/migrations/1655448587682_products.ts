import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ap.products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary({ constraintName: 'products_pk' })

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.string('name')
      table
        .uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('ap.users')
        .onDelete('CASCADE') // delete post when user is deleted
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
