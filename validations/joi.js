const Joi = require('joi')

exports.signup = Joi.object({ username: Joi.string().min(6).required(), email: Joi.string().email().required(), password: Joi.string().pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{8,15})/)).message({ "string.pattern.base": "Password is not valid" }) })

exports.signin = Joi.object({ email: Joi.string().email().required(), password: Joi.string().pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{8,15})/)).message({ "string.pattern.base": "Password is not valid" }) })

exports.forgotEmail = Joi.object({ email: Joi.string().email().required() })

exports.forgotPass = Joi.object({ email: Joi.string().email().required(), password: Joi.string().pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{8,15})/)).message({ "string.pattern.base": "Password is not valid" }), confirmationToken: Joi.string().required() })

exports.confirm = Joi.object({ email: Joi.string().email().required(), code: Joi.string().pattern(new RegExp(/^(\d\s*){6}$/)).message({ "string.pattern.base": "Code is not valid" }) })