const fieldTransformer = (field) => {
    if (field?.image) {
        field.image = process.env.siteURL + '/uploads/' + field.image
    }
    return field;
};

const fieldsTransformer = (fields) => {
    return fields.map((field) => fieldTransformer(field))
}

module.exports = {
    fieldTransformer,
    fieldsTransformer
}