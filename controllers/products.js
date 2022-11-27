const items = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const search = 'ab'
    const products = await items.find({}).sort('name')
    res.status(200).json({products, nbHHits: products.length})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields} = req.query
    const queryObject = {}

    if(featured){
        queryObject.featured = featured == 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }
    
    // console.log(queryObject)
    let result =  items.find(queryObject)

    if(sort) {
        const sortItem = sort.split(',').join(' ');
        result = result.sort(sortItem)
    }
    else {
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldItem = fields.split(',').join(' ');
        result = result.select(fieldItem)
    }

    const page = Number(req.query.page) || 1
    const limitBy = Number(req.query.limit) || 10
    const skipBy = (page - 1) * limitBy

    result = result.skip(skipBy).limit(limitBy)

    const finalItem = await result;
    res.status(200).json({finalItem, nbHHits: finalItem.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}