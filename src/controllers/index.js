const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSign = (msg, secret) =>
  new Promise((resolve, reject) => {
    jwt.sign(msg, secret, { expiresIn: "24h" }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
const jwtVerify = (token, secret) =>
   new Promise((resolve, reject)=>{
    jwt.verify(token,secret, (err, payload)=>{
      if(err) return reject(err);
      return resolve(payload);
    })
  })

const {
  getUserId,
  insertUser,
  getTodos,
  deleteTodo,
  insertTodo,
  checkEmail,
} = require("../database/queries");
module.exports.Auth = (req, res, next)=>{
  if(!req.cookies.userToken) return next(new Error ('No token!'))
  return jwtVerify(req.cookies.userToken, "asdfghjlhf'124662ewrh")
  .then((payload) =>{
    req.userId = payload.userId
    return next()
  })
  .catch((err)=> next(err))
}
module.exports.getUserController = (req, res, next) => {
  const userId = req.userId
  getUserId(userId)
    .then(({ rows }) =>
      res.json({ data: rows[0].user_name, msg: "success", status: 200 })
    )
    .catch(next);
};
// validate (server)
// check email
// hash password (bcrypt.hash(password,10)).then((hash) => {})
// store user
// create token
// send to user


module.exports.loginUserController = (req, res, next) =>{
	const { email, password } = req.body;
//validate server
// check email ()=>{stored hash password}
// bcrypt.compare (password, stored)
// create token
// send token to user
  
	checkEmail(email)
	.then(({rowCount, rows}) => {
		if(!rowCount){
			throw new Error("you are not registered yet");
		}
		return Promise.all([bcrypt.compare(password, rows[0].password), Promise.resolve(rows[0].id)])
	})
	.then((result) => {
		if (!result[0]){
			throw new Error("incorrect password");
		}
		return jwtSign({ userId: result[1]}, "asdfghjlhf'124662ewrh")
	})
	.then((token) =>
	res
		.cookie("userToken", token, {
			expires: new Date(Date.now() + 3600000),
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		})
		.json({ data: null, msg: "logged in successfully", status: 200 })
)
.catch(next);

}
module.exports.registerUserController = (req, res, next) => {
  const { userName, email, password, confirmPassword } = req.body;
  checkEmail(email)
    .then(({ rowCount }) => {
      if (rowCount) {
        throw new Error("You are registered");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      return insertUser(userName, email, hash);
    })
    .then((results) =>
      jwtSign({ userId: results.rows[0].id }, "asdfghjlhf'124662ewrh")
    )
    .then((token) =>
      res
        .cookie("userToken", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .json({ data: null, msg: "registration successfully", status: 200 })
    )
    .catch(next);
};

module.exports.insertTodoController = (req, res, next) => {
//check request token 
//if not exiest (OUT) if exest ()
//jwp.verify(userToken,secret key) if ture (Yes you verified) if false (OUT)
//payload.id
const { text_content } = req.body;
insertTodo(req.userId, text_content)
  .then(() => res.json({ data: null, msg: "success", status: 200 }))
  .catch(next);
};


module.exports.getTodosController = (req, res, next) => {
getTodos(req.userId)
  .then(({ rows }) => {
    return res.json({ data: rows, msg: "success", status: 200 }
  )})
  .catch(next);
};

module.exports.deleteTodoController = (req, res, next) => {
  const { todoId } = req.body;
deleteTodo(req.userId, todoId)
  .then(({rows}) => res.json({ data: rows, msg: "success", status: 200 }))
  .catch(next);
};
