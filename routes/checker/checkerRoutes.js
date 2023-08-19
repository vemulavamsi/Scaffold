/**
 * Sample responder to `/hello` route :)
 */
const logger = require('../../logger/logger')

/**
 * Returns a sample message
 * @param {*} req - request object
 * @param {*} res - response object
 */
const sayHello = (req, res) => {
    logger.info(`Checker route! Saying hello from ${req.originalUrl}`)
    res.status(200).json({ "message": "Hello vamsi! I am ready for work 08-19-2023!!!@@@" })
}

module.exports = {
    sayHello
}
