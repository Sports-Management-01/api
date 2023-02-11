const models = require("../models");
const { getInstanceById } = require("../services/modelService");
const { Op, where } = require("sequelize");
const { sequelize } = require("../models");
const { reservationTotalCost, getTimePlusHour } = require("../utils/functions");
const store = async (req, res, next) => {
  const user = await models.User.findByPk(req.user.id);
  const { fieldId, times = [], equipment = [] } = req.body;
  const field = await getInstanceById(fieldId, "Field");
  var err = 0;
  if (field.success) {
    if (Array.isArray(times) && times.length > 0) {
      // ["09:00", "13:00"]
      for (const time of times) {
        const from = req.body.date + " " + time + ":00";
        const to = req.body.date + " " + getTimePlusHour(time) + ":00";
        const [reservation, created] = await models.Reservation.findOrCreate({
          where: {
            userId: req.user.id,
            fieldId,
            from,
            to,
          },
          defaults: {
            total: await reservationTotalCost(fieldId, from, to, equipment),
          },
        });
        if (created) {
          if (Array.isArray(req.body.equipment)) {
            req.body.equipment.forEach(async (eq) => {
              const [equipments, created] =
                await models.ReservationEquipment.findOrCreate({
                  where: {
                    reservationId: reservation.id,
                    equipmentId: eq.id,
                  },
                  defaults: {
                    count: eq.count,
                  },
                });
            });
          }
        } else {
          err++;
        }
      }
    }

    if (err == 0) {
      return res.send({
        success: true,
        messages: ["Reservation created successfuly" + err],
      });
    } else {
      return res.send({
        success: false,
        messages: [`Could noe create ${err} reservation`],
      });
    }
  }
  return res.send({
    success: false,
    messages: ["The field you are trying to add is invalid"],
  });
};
const index = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const reservations = await models.Reservation.findAll({});
  result.data = reservations;
  return res.send(result);
};
const update = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  // const field = await getInstanceById(req.body.fieldId, "Field")
  // const user = await models.User.findByPk(req.user.id)
  const { from, to, total } = req.body;
  // if (!field.success) {
  //     item.status = 422;
  //     result.messages.push("Please enter a valid field id");
  //   } else if (!user.success) {
  //     item.status = 422;
  //     result.messages.push("Please enter a valid user id");
  //   }
  const item = await getInstanceById(req.params.id, "Reservation");
  if (item.success) {
    const { equipments } = req.body;
    await models.ReservationEquipment.destroy({
      where: { reservationId: [item.instance.id] },
    });
    if (Array.isArray(req.body.equipments)) {
      req.body.equipments.forEach(async (eq) => {
        const [equipments, created] =
          await models.ReservationEquipment.findOrCreate({
            where: {
              reservationId: item.instance.id,
              equipmentId: eq.id,
            },
            defaults: {
              count: eq.count,
            },
          });
      });
    }
    await item.instance.update({
      total: await reservationTotalCost(
        item.instance.fieldId,
        item.instance.from,
        item.instance.to,
        equipments
      ),
    });
    result.data = item.instance;
    result.messages.push("Reservation updated successfully");
    return res.send(result);
  } else {
    result.messages = [...item.messages];
    res.status(item.status);
  }
};
const show = async (req, res, next) => {
  const result = {
    success: false,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "Reservation");
  if (item.success) {
    result.success = true;
    result.data = item.instance.dataValues;
  }
  result.messages = [...item.messages];
  res.status(item.status);
  return res.send(result);
};
const destroy = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "Reservation");
  if (item.success) {
    await item.instance.destroy();
    result.messages.push("Reservation deleted successfully");
  } else {
    res.status(item.status);
    result.success = false;
    result.messages = [...item.messages];
  }
  return res.send(result);
};

const getUserReservation = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const reservations = await models.Reservation.findAll({
    paranoid: false,
    where: {
      userId: req.user.id,
    },

    include: [
      {
        model: models.ReservationEquipment,
        include: [models.Equipment],
      },
      {
        model: models.Field,
        include: [models.Category],
      },
    ],
  });
  result.data = reservations;

  return res.send(result);
};
const companyReservations = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const fields = await models.Field.findAll({where: { companyId: req.user.id } , 
    include:[
      {model:models.Category},
    {model:models.Reservation,
      where: {
      deletedAt : null
    },
    include : [
      {model:models.User},
      

        {
          model: models.ReservationEquipment,
          include: [models.Equipment],
        },
        // {
        //   model: models.Field,
        //   include: [models.Category],
        // },
      ],
  }
  ]});

  return res.send(fields);
 
};
module.exports = {
  store,
  index,
  update,
  show,
  destroy,
  getUserReservation,
  companyReservations,
  // reservationEquipment
};
