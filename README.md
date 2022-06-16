# Adonis JS

---

Adonis JS - MVC Node.js Framework

See demo project with examples of using different kind on Adonis features [here](https://github.com/yurashaa/adonis-attempt).

## Features

### Environment variables

Adonis supports accessing environment variables using `process.env`, but it can lead to a couple of issue while working with environment variables.

Adonis recommend using **AdonisJS Env provider**. It improves server working with env variables by adding validation and providing static type information.

```js
import Env from '@ioc:Adonis/Core/Env'

Env.get('APP_KEY')
```

Validation and other features of working with environment variables can be found in `./env.ts`

---
