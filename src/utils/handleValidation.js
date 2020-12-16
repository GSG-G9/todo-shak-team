Joi = require('joi');

module.exports.validateTextContent = ({ text_content }) => {
	const schema = Joi.object().keys({
		text_content: Joi.string().min(3).max(250).required(),
	});
	const { error } = schema.validate({ text_content }, { abortEarly: false });
	return error;
};

module.exports.validateSignUp = ({
	userName,
	email,
	password,
	confirmPassword,
}) => {
	const schema = Joi.object().keys({
		userName: Joi.string().min(3).max(50).required(),
		email: Joi.string().email().required(),
		password: Joi.string()
			.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
			.required(),
		confirmPassword: Joi.ref('password'),
	});

	const { error } = schema.validate(
		{ userName, email, password, confirmPassword },
		{ abortEarly: false }
	);
	return error;
};

module.exports.validateLogin = ({ email, password }) => {
	const schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string()
			.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
			.required(),
	});

  const { error } = schema.validate({ email, password }, { abortEarly: false });
  return error
};
