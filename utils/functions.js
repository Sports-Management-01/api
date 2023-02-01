const models = require('../models')
const dayjs = require('dayjs')

const reservationTotalCost = async (reservation, equipments = [])=>{
    const field = await models.Field.findByPk(reservation.fieldId)
    const from = dayjs(reservation.from)
    const to = dayjs(reservation.to)
    const duration = to.diff(from, 'h')
    const fieldCost = duration * field.hourPrice
    let eqCost = 0
    for (const eq of equipments) {
        const equipment = await models.Equipment.findByPk(eq.id)
        eqCost += (eq.count * equipment.price)
    }
    return eqCost + fieldCost
}

module.exports = {
    reservationTotalCost
}