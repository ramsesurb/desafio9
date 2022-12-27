const {faker} = require('@faker-js/faker')
 
 
 function generateRandomProducts(cant) {
   const listProducts = []
    for (let index = 0; index < cant; index++) {
       
        const product = {
            id: index + 1,
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        }
       
        listProducts.push(product)
    }
    return listProducts
}
 
 
module.exports = generateRandomProducts