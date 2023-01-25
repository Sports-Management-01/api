const models = require('../models')

const getInstanceById = async (id, modelName) => {
    const result = {
        success: false,
        instance: null,
        messages: [],
        status: 404
    }
    if (models[modelName]) {
        const _id = +id
        if (typeof _id === 'number' && _id > 0) {
            const instance = await models[modelName].findByPk(_id)
            if (instance) {
                result.status = 200
                result.success = true
                result.instance = instance
            } else {
                result.messages.push(`${modelName} not found`)
            }
        } else {
            result.status = 422
            result.messages.push(`Please provide a valid id`)
        }
        return result
    } else {
        throw new Error('Model not found')
    }
}

module.exports = {
    getInstanceById
}