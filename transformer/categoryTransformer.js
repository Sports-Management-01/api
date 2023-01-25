const categoryTransformer = (category) => {
    if (category?.icon) {
        category.icon = process.env.siteURL + '/uploads/' + category.icon
    }
    return category;
};

const categoriesTransformer = (categoreis) => {
    return categoreis.map((category) => categoryTransformer(category))
}

module.exports = {
    categoryTransformer,
    categoriesTransformer
}