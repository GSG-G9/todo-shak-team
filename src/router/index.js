const router = require('express').Router();

const {Auth} = require('../middleware')

const {
  loginUserController,
	getUserController,
	registerUserController,
  insertTodoController,
  getTodosController,
  deleteTodoController,
  logoutUserController
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

router.use((err,req,res,next)=>{
  console.log(err);
  const status = err.status || 500;
  res.status(status).json({
    data:err.data || null,
    msg:err.msg || 'Internal Server Error',
    status,
  })
})


module.exports = router;
