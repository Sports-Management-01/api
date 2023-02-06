const fieldTransformer = (field) => {
    if (field?.image) {
        const images = JSON.parse(field.image)
        const urls = images.map((img) => {
            return process.env.siteURL + '/uploads/' + img
        })
        field.image = urls
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