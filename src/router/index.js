const router = require('express').Router();

const {
  loginUserController,
	getUserController,
	registerUserController,
  insertTodoController,
  getTodosController,
  deleteTodoController,
  logoutUserController,
  Auth
} = require('../controllers');

const {
  getHomePage,
  getLoginPage,
  getSingUpPage
} = require('../controllers/pageControllers')

router.get('/home',getHomePage)
router.get(['/','/login'],getLoginPage)
router.get('/singup',getSingUpPage)

router.get('/logout',logoutUserController)

router.post('/login',loginUserController);
router.get('/user', Auth, getUserController);
router.post('/register',registerUserController);
router.post('/todo', Auth, insertTodoController);
router.get('/todos',Auth, getTodosController);
router.delete('/todo', Auth, deleteTodoController);

module.exports = router;
