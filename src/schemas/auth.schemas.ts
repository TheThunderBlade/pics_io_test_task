import * as Joi from "joi";

export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  userName: Joi.string().required(),
});

export const signInSchema = Joi.object({
  password: Joi.string().required(),
  userName: Joi.string().required(),
});
