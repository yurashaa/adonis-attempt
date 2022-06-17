import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ap.users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary({ constraintName: 'users_pk' })

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.string('name')
      table.string('password')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
