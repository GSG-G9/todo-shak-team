const router = require('express').Router();

const {
  loginUserController,
	getUserController,
	registerUserController,
  insertTodoController,
  getTodosController,
  deleteTodoController
} = require('../controllers');

router.post('/login', loginUserController);
router.get('/user', getUserController);
router.post('/register', registerUserController);
router.post('/todo', insertTodoController);
router.get('/todos',getTodosController);
router.delete('/todo', deleteTodoController);

module.exports = router;
