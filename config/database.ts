import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  /**
   *   Defines the default connection to use for making database queries
   */
  connection: Env.get('DB_CONNECTION'),

  /**
   *   Defines one or more database connections you want to use in your application.
   *   You can define multiple connections using the same or the different database driver.
   */
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('DB_HOST'),
        port: Env.get('DB_PORT'),
        user: Env.get('DB_USER'),
        password: Env.get('DB_PASSWORD'),
        database: Env.get('DB_NAME'),
      },

      migrations: {
        // array of paths to look up for migrations
        paths: ['./database/migrations'],
        // run migrations in the same order as you see them listed in your editor
        naturalSort: false,
        // name of the table for storing the migrations state. Defaults to 'adonis_schema'
        tableName: 'app_migrations',
        // disable migration rollback in production. It is recommended that you should never rollback migrations in production.
        disableRollbacksInProduction: false,
        // set the value to 'true' to not wrap migration statements inside a transaction. By default, Lucid will run each migration file in its own transaction.
        disableTransactions: true,
      },
      // boolean to enable/disable health checks.
      healthCheck: true,
      // boolean to globally enable query debugging
      debug: false,
      // allows you to define the paths for loading the database seeder files
      seeders: {
        paths: []
      }
    },
  }
}

export default databaseConfig
