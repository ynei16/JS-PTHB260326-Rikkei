let products = [];
let nextId = 1;

const getAll = () => {
    return products;
};

const create = (data) => {
    const newProduct = { id: nextId++, ...data };
    products.push(newProduct);
    return newProduct;
};

const findById = (id) => {
    return products.find(p => p.id === parseInt(id));
};

module.exports = { getAll, create, findById };