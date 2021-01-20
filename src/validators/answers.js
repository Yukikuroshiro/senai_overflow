const {
    celebrate,
    Joi,
    Segments
} = require('celebrate');

module.exports = {
    create: celebrate({
        // [Segments.HEADERS]: Joi.object({
        //     authorization: Joi.string().required()
        // }).unknown(),
        [Segments.BODY]: Joi.object().keys({
            description: Joi.string().required().min(10).max(255),
        }),
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    })
}