# Adonis JS

---

Adonis JS - MVC Node.js Framework

See demo project with examples of using different kind on Adonis features [here](https://github.com/yurashaa/adonis-attempt).

## Features

### Environment variables

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

### Routing

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
