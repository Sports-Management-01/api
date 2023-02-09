const models = require('../models')
const dayjs = require('dayjs')

const reservationTotalCost = async (fieldId, from, to, equipments = [])=>{
    const field = await models.Field.findByPk(fieldId)
    const start = dayjs(from)
    const end = dayjs(to)
    const duration = end.diff(start, 'h')
    const fieldCost = duration * field.hourPrice
    let eqCost = 0
    for (const eq of equipments) {
        const equipment = await models.Equipment.findByPk(eq.id)
        eqCost += (eq.count * equipment.price)
    }
    return eqCost + fieldCost
}

const getTimePlusHour = (time) => {
    const hour = (+time.split(':')[0]) + 1
    if (hour < 10) {
        hour = '0' + hour
    }
    return hour + ':00'
}

module.exports = {
    reservationTotalCost,
    getTimePlusHour
}