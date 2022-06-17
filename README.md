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

---

### [Security](https://docs.adonisjs.com/guides/security/web-security)

#### CSRF protection

AdonisJS generates a unique token (known as CSRF token) for every HTTP request and associates it with the user session 
for later verification. Since, the token is generated on the backend, the malicious website has no way of getting 
access to it.

The token must be present alongside the other form fields in order for CSRF check to pass. You can access it using the 
`csrfField` inside your Edge templates.

#### CSP

CSP (Content security policy) helps you define the trusted sources for loading and executing scripts, styles, fonts, etc.
and reduce the risk of XSS attacks.

#### DNS prefetching

Using the `dnsPrefetch` setting from the `./config/shield.ts` file, you can control the behavior for the 
X-DNS-Prefetch-Control header.

#### Configuration

List of configuration options can be found in `./config/shield.ts`

### [Encryption](https://docs.adonisjs.com/guides/security/encryption)

You can make use of the AdonisJS encryption module to encrypt and decrypt values in your application.

```ts
import Encryption from '@ioc:Adonis/Core/Encryption'

const encrypted = Encryption.encrypt('hello-world')
```

### [Hashing](https://docs.adonisjs.com/guides/security/hashing)

AdonisJS Hash module allows you to hash the values using bcrypt or Argon2, along with the option to add a custom
hashing driver.

List of configuration options can be found in `./config/hash.ts`

Example of using hashing in ORM Hooks:
```ts
import Hash from '@ioc:Adonis/Core/Hash';

@beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
```

### [Signed URLs](https://docs.adonisjs.com/guides/security/signed-urls)

Adonis provides ability to generate URL with a hash signature appended to it. Hash is created to be sure that URL is not 
modified or tampered with.

Example:

```ts
Route.makeSignedUrl('verifyEmail', {
  email: 'foo@bar.com',
})

// /verify/foo@bar.com?signature=eyJtZXNzYWdlIjoiL3Zlcmlme
```

---

## Comparison with ExpressJS

### *Architecture*

**Adonis**

AdonisJS is an MVC framework. MVC stands for Model, Views, and Controllers.

Every AdonisJS project ships with a set of folders and files. We need to understand the folder structure first in order 
to work with it.

**Express**

ExpressJS is a minimalist web framework. It gives you the freedom and flexibility to work with any database, ORM or 
folder structure.

### *Routing*

**Adonis**

Adonis gives us the option to bind routes to controllers, group routes, create REST resources with them.

**Express**

Express router is pretty basic, but it does the job.

### *ORM*

ORM stands for Object Relational Mapping. Evry modern full-featured framework ships with its own ORM.

ORM is very helpful while working with database queries, tables, table relationships.

**Adonis**

AdonisJS has its own ORM called [Lucid](https://preview.adonisjs.com/guides/database/introduction). It’s a very powerful
tool that can quickly build queries, create and handle migrations, can run seeds and factories, and also provides data
modeling.

**Express**

Express does not ship with an ORM. However, there are multiple 3rd party ORM available for NodeJS which can be used with Express.

Sequelize is a really good ORM for NodeJS and can work with Express.

### *Authentication*

**Adonis**

Adonis 5 ships with its own authentication system that can save your time in production.

It supports 3 different types of authentication – Web sessions, API tokens, and basic HTTP authentication as well.

**Express**

Express JS does not have an inbuilt authentication system. There are tools like Okta which can be integrated with 
ExpressJS to handle authentication.

### *Templating*

**Adonis**

AdonisJS ships with its own templating engine called Edge. You can use loops, add conditions, create layouts, create 
components, and a few more.

Edge also provides a tool to inspect and debug templates with it.

**Express**

Express does not have any templating engine out of the box. However, you can create your own templating engine with the
app.engine(ext, callback)method.

Creating your own templating engine may sound interesting but it’s a time-consuming process.

### *Sending mails*

You can use the official [adonisjs/mail](https://preview.adonisjs.com/guides/mail) package to send emails from your 
application. It uses [NodeMailer](https://nodemailer.com/) internally to send emails.

Also, it has inbuilt support for SMTP, AWS SES, Mailgun, and Sparkpost.

We can also use Nodemailer with Express. However, with Express we need the set the drivers manually.

### *Performance*

AdonisJS 5 has added a lot of amazing features and improvements.

The HTTP server is one of those. It’s almost as fast as Fastify.


| Framework | Version | Router | Req/sec |
|-----------|---------|--------|---------|
| Fastify   | 2.0.0   | Yes    | 58,740  |
| Adonis    | 1.8.1   | Yes    | 54,832  |

