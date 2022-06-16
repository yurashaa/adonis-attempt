/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: (_key, value) =>  {  // validation use case can be defined as custom function which takes 2 args
    if (!value) {                                   // 1 - string, name of environment variable
      throw new Error('Value for PORT is required') // 2 - string, value of environment variable
    }

    if (isNaN(Number(value))) {
      throw new Error('Value for PORT must be a valid number')
    }

    return Number(value)
  },
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

  DB_CONNECTION: Env.schema.string(),
  DB_HOST: Env.schema.string({ format: 'host' }), // forcing validation to have specific format, 'host' | 'email' |
  DB_PORT: Env.schema.number(),
  DB_NAME: Env.schema.string(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string(),
})
