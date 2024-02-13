import * as Joi from "joi";

export const destinationSchema = Joi.object({
  payload: Joi.object().required(),
  possibleDestinations: Joi.array()
    .items(Joi.object().pattern(Joi.string(), Joi.boolean()))
    .required(),
  strategy: Joi.string(),
});
