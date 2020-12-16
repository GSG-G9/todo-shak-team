const router = require('express').Router();

const {
  loginUserController,
	getUserController,
	registerUserController,
  insertTodoController,
  getTodosController,
  deleteTodoController,
  Auth
} = require('../controllers');

router.post('/login',loginUserController);
router.get('/user', Auth, getUserController);
router.post('/register',registerUserController);
router.post('/todo', Auth, insertTodoController);
router.get('/todos',Auth, getTodosController);
router.delete('/todo', Auth, deleteTodoController);

module.exports = router;
