const {
	jwtSign,
	validatePassword,
	hashPassword,
	validateTextContent,
	validateSignUp,
  validateLogin,
  handleError
} = require('../utils');
const {
	getUserId,
	insertUser,
	getTodos,
	deleteTodo,
	insertTodo,
	checkEmail,
} = require('../database/queries');
const Joi = require('joi');
const e = require('express');

module.exports.getUserController = (req, res, next) => {
	const userId = req.userId;
	getUserId(userId)
		.then(({ rows }) =>
			res.json({ data: rows[0].user_name, msg: 'success', status: 200 })
		)
		.catch(next);
};
module.exports.loginUserController = (req, res, next) => {
	const { email, password } = req.body;
	const error = validateLogin({ email, password });

  if (error)
  return next(
    handleError({
      status: 400,
      message: 'Validation Error',
      data: error.details.map((el) => el.message),
    })
  );

	checkEmail(email)
		.then(({ rowCount, rows }) => {
			if (!rowCount) {
				throw handleError({status:400,message:'You are not registered yet'})
			}
			return Promise.all([
				validatePassword(password, rows[0].password),
				Promise.resolve(rows[0].id),
			]);
		})
		.then((result) => {
			if (!result[0]) {
				throw handleError({status:400,message:'Incorrect password ...'})
			}
			return jwtSign({ userId: result[1] });
		})
		.then((token) =>
			res
				.cookie('userToken', token, {
					expires: new Date(Date.now() + 3600000),
					httpOnly: true,
					secure: false,
				})
				.json({ data: null, msg: 'logged in successfully', status: 200 })
		)
		.catch(next);
};
module.exports.registerUserController = (req, res, next) => {
	const { userName, email, password, confirmPassword } = req.body;
	const error = validateSignUp({ userName, email, password, confirmPassword });
	if (error)
		return next(
			handleError({
				status: 400,
				message: 'Validation Error',
				data: error.details.map((el) => el.message),
			})
		);
	checkEmail(email)
		.then(({ rowCount }) => {
			if (rowCount) {
				throw handleError({status:401,message:'You are registered'})
			}
			return hashPassword(password);
		})
		.then((hash) => {
			return insertUser(userName, email, hash);
		})
		.then((results) => jwtSign({ userId: results.rows[0].id }))
		.then((token) =>
			res
				.cookie('userToken', token, {
					expires: new Date(Date.now() + 3600000),
					httpOnly: true,
					secure: false,
				})
				.json({ data: null, msg: 'registration successfully', status: 200 })
		)
		.catch(next);
};

module.exports.insertTodoController = (req, res, next) => {
  const { text_content } = req.body;
	const error = validateTextContent({ text_content });
  if (error)
  return next(
    handleError({
      status: 400,
      message: 'Validation Error',
      data: error.details.map((el) => el.message),
    })
  );
	insertTodo(req.userId, text_content)
		.then(() => res.json({ data: null, msg: 'success', status: 200 }))
		.catch(next);
};

module.exports.getTodosController = (req, res, next) => {
	getTodos(req.userId)
		.then(({ rows }) => {
			return res.json({ data: rows, msg: 'success', status: 200 });
		})
		.catch(next);
};

module.exports.deleteTodoController = (req, res, next) => {
	const { todoId } = req.body;
	deleteTodo(req.userId, todoId)
		.then(({ rows }) => res.json({ data: rows, msg: 'success', status: 200 }))
		.catch(next);
};

module.exports.logoutUserController = (req, res) => {
	res
		.clearCookie('userToken')
		.json({ data: null, msg: 'logout successfully', status: 200 });
};
