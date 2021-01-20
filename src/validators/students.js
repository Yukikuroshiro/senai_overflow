const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    create: celebrate({
        // [Segments.HEADERS]: Joi.object({
        //     authorization: Joi.string().required()
        // }).unknown(),
        [Segments.BODY]: Joi.object().keys({
            ra: Joi.string().length(7).pattern(/^[0-9]+$/).required(),
            name: Joi.string().required().min(3).max(255),
            email: Joi.string().required().min(8).max(255).email(),
            password: Joi.string().required().min(6).max(255),
        })
    })
}