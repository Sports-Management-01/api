permissions = [
    "company:approve",
    "company:destroy",

    "field:store",
    "field:update",
    "field:destroy",

    "category:store",
    "category:update",
    "category:destroy",

    "payment:store",
    "payment:update",
    "payment:destroy",

    "role:index",
    "role:show",
    "role:store",
    "role:update",
    "role:destroy",

    "field:index",
    "field:show",
    "field:store",
    "field:update",
    "field:destroy",

    "profile:show",
    "profile:delete",//when user send reguest to delete account Admin has to approve it THis permission is given to Admin

    "permission:assign",

]

module.exports = permissions