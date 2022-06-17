# Adonis JS

---

Adonis JS - MVC Node.js Framework

See demo project with examples of using different kind on Adonis features [here](https://github.com/yurashaa/adonis-attempt).

## Features

### [Environment variables](https://docs.adonisjs.com/guides/environment-variables)

Adonis supports accessing environment variables using `process.env`, but it can lead to a couple of issue while working 
with environment variables.

Adonis recommend using **AdonisJS Env provider**. It improves server working with env variables by adding validation and
providing static type information.

```js
import Env from '@ioc:Adonis/Core/Env'

Env.get('APP_KEY')
```

Validation and other features of working with environment variables can be found in `./env.ts`

---

### [Routing](https://docs.adonisjs.com/guides/routing)

Routes are usually defined in `./start/routes.ts`. If you want to define routes somewhere else then you should import 
them in `./start/routes.ts`

#### Route parameters

- **Optional parameters**. Parameters can be marked as optional by adding `?` to the name. Optional parameters have to come
after required ones.

  ```js
  Route.get('/posts/:id?', async ({ params }) => {
    if (params.id) {
      return `Viewing post with id ${params.id}`
    }
    return 'Viewing all posts'
  })
  ```

- **Wildcard parameters**. Wildcard parameter can be defined using `*`. This param catches all the URI segments

  ```js
  Route.get('docs/*', ({ params }) => {
    console.log(params['*'])
  })
  
  // /docs/http/introduction - ['http', 'introduction']
  // /docs/api/sql/orm - ['api', 'sql', 'orm']
  ```
  
- **Params matchers**. Params matchers allow validation of the parameter against given regular expression.

  ```js
  Route
    .get('/posts/:id', async ({ params }) => {
      return `Viewing post using id ${params.id}`
    })
    .where('id', /^[0-9]+$/)
  
  Route
    .get('/posts/:slug', async ({ params }) => {
      return `Viewing post using slug ${params.slug}`
    })
    .where('slug', /^[a-z0-9_-]+$/)  
  ```

  Request passing numeric `id` will be forwarded to the first route. If passed `id` is not numeric and matches slug regex
  request will be forwarded to second route.

---

### [Database](https://docs.adonisjs.com/guides/database/introduction)

Adonis is NodeJS Framework with first-class support for SQL databases. Adonis provides separate package for working with
databases.

```
npm i @adonisjs/lucid

// command for configuring package, you will be asked to choose driver(s) for database
// all files will be auto configured
node ace configure @adonisjs/lucid
```

The configuration for all the databases is stored in `./config/database.ts`

There are two ways of making SQL queries:

- Query builder. Query builders was divided into following categories:
  - The standard query builder allows you to construct SQL queries for select, update and delete operations.
  - The insert query builder allows you to construct SQL queries for the insert operations.
  - The raw query builder let you write and execute queries from a raw SQL string. 

- ORM

### [ORM](https://docs.adonisjs.com/guides/models/introduction) 
Along with the Database query builder, Lucid also has data models built on top of the [active record pattern](https://en.wikipedia.org/wiki/Active_record_pattern).

The data models layer of Lucid makes it super easy to perform CRUD operations, manage relationships between models, 
and define lifecycle hooks.

Each database table gets its model, and each instance of that class represents a table row.
The data models clean up many database interactions since you can encode most of the behavior inside your models vs. 
writing it everywhere inside your codebase.

**Creating model**

```
node ace make:model User

# CREATE: app/Models/User.ts
```
*Note: using different kind of flags will be helpful if you want to create Controller, Migration etc. for Model at once.*

**Model config**

Lucid allows define configuration option to overwrite conventional defaults

**Hooks**

Hooks are the actions that you can perform against a model instance during a pre-defined life cycle event.

List of all available hooks can be found [here](https://docs.adonisjs.com/guides/models/hooks#available-hooks).

*Note: Understanding the $dirty property - the `$dirty` object only contains the changed values.*

---

### [Authentication](https://docs.adonisjs.com/guides/auth/introduction)

AdonisJS comes with a fully fledged authentication system to authenticate the users of your application using sessions,
basic auth or API tokens.

Install and configure package

```
npm i @adonisjs/auth

node ace configure @adonisjs/auth
```

The configuration for the auth package is stored inside the  `./config/auth.ts` file. Inside this file you can define one or 
more guards to authenticate users. A guard is a combination of a user provider and one of the available authentication 
driver.

Adonis suggest 3 ways of using Auth flow:

- **Web Guard usage**. The web guard uses sessions/cookies to login a user. You must use the web guard when creating a
server rendered application, or for an API having a first-party client running on the same domain/sub-domain.

- **API tokens Guard usage**. The API guard uses the database-backed opaque access token to authenticate the user 
requests. You may want to use the API guard when creating an API that should be accessed by a third-party client, or 
for any other system that does not support cookies.

- **Basic auth Guard usage**. The basic auth guard uses the HTTP basic authentication for authenticating the requests.
The basic auth guard relies on the underlying user provider to lookup and validate the user credentials



