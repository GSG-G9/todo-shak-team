const {
	getUserId,
	insertUser,
	getTodos,
	deleteTodo,
	insertTodo,
} = require('../database/queries');

module.exports.getUserController = (req, res, next) => {
	const userId = 1;
	return getUserId(userId)
		.then(({ rows }) =>
			res.json({ data: rows[0].user_name, msg: 'success', status: 200 })
		)
		.catch(next);
};

module.exports.registerUserController = (req, res, next) => {
	const { userName, email, Password, confirmPassword } = req.body;
	return insertUser(userName, email, Password, confirmPassword)
		.then(() => res.json({ data: null, msg: 'success', status: 200 }))
		.catch(next);
};

module.exports.insertTodoController = (req, res, next) => {
	const userId = 1;
	const { text_content } = req.body;
	return insertTodo(userId, text_content)
		.then(() => res.json({ data: null, msg: 'success', status: 200 }))
		.catch(next);
};

module.exports.getTodosController = (req, res, next) => {
	const userId = 1;
	return getTodos(userId)
		.then(({ rows }) => res.json({ data: rows, msg: 'success', status: 200 }))
		.catch(next);
};

module.exports.deleteTodoController = (req, res, next) => {
	const userId = 1;
	const { todoId } = req.body;
	return deleteTodo(userId, todoId)
		.then(() => res.json({ data: rows, msg: 'success', status: 200 }))
		.catch(next);
};

