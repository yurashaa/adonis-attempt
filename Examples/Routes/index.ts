import Route from '@ioc:Adonis/Core/Route'

/**
 * HTTP methods
 */

Route.get('example', ({ request, response, logger}) => {
  logger.info('Making GET /example request')
  return 'Making GET /example request'
})

Route.post('example', ({ request, response, logger}) => {
  logger.info('Making POST /example request')
  return 'Making POST /example request'
})

Route.put('example', ({ request, response, logger}) => {
  logger.info('Making PUT /example request')
  return 'Making PUT /example request'
})

Route.delete('example', ({ request, response, logger}) => {
  logger.info('Making DELETE /example request')
  return 'Making DELETE /example request'
})


/**
 * Request params
 */

// Optional param
Route.get('example/:id?', async ({ params, logger }) => {
  if (params.id) {
    logger.info(`Received optional param id ${params.id}`)
    return `Received optional param id ${params.id}`
  }
  logger.info(`Not received optional param id ${params.id}`)
  return `Not received optional param id ${params.id}`
})

// Wildcard param
Route.get('example/*', async ({ params}) => {
  return params
})

// Params matchers
Route
  .get('/example/matchers/:id', async ({ params }) => {
    return `Param matched numeric id ${params.id}`
  })
  .where('id', {
    match: /^\d+$/,
    cast: value => Number(value) // Adonis allows casting param value while matching
  })

Route
  .get('/example/matchers/:slug', async ({ params }) => {
    return `Param matched slug regex id ${params.slug}`
  })
  .where('slug', /^[a-z\d_-]+$/)
