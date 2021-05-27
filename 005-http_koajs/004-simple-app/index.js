const Koa = require('koa');

const bootstrap = require('./middleware');

/**
 * Return a list of books
 * GET /books?author_id=1&page=1&count=10
 *
 * Return a book by ID
 * GET /books/:id
 *
 * Create a new book
 * POST /books
 *
 * Update a book
 * PUT /books/:id
 * PATCH /books/:id
 *
 * Delete a book
 * DELETE /books/:id
 *
 * HATEOAS - https://ru.wikipedia.org/wiki/HATEOAS
 * JSON:API - https://jsonapi.org/
 */

const app = new Koa();

bootstrap(app);

app.listen(3000, () => {
  console.log('Server started');
});
