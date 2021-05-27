const Router = require('@koa/router');
const booksController = require('./../../controllers/books')

const router = new Router({prefix: '/api'})

const noop = (ctx, next) => {
  ctx.status = 501;
  return next();
}

router.get('/books', booksController.getAll);
router.get('/books/:id', booksController.getById); // /books/1, /books/2342, /books/create
router.post('/books', booksController.create);
router.put('/books/:id', noop);
router.delete('/books/:id', noop);
// router.patch
// router.all

module.exports = router;
