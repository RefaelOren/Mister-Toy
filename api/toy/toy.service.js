const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy) {
    try {
        const criteria = {};
        const collection = await dbService.getCollection('Toy');
        var toys = await collection.find(criteria).toArray();
        return toys;
    } catch (err) {
        logger.error('cannot find toys', err);
        throw err;
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('Toy');
        const toy = collection.findOne({ _id: ObjectId(toyId) });
        return toy;
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err);
        throw err;
    }
}

async function remove(toyId) {
    console.log(toyId);
    try {
        const collection = await dbService.getCollection('Toy');
        await collection.deleteOne({ _id: ObjectId(toyId) });
        return toyId;
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err);
        throw err;
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('Toy');
        const addedToy = await collection.insertOne(toy);
        toy._id = addedToy.insertedId;
        return toy;
    } catch (err) {
        logger.error('cannot insert toy', err);
        throw err;
    }
}
async function update(toy) {
    try {
        var id = ObjectId(toy._id);
        var temp = toy._id;
        delete toy._id;
        const collection = await dbService.getCollection('Toy');
        await collection.updateOne({ _id: id }, { $set: { ...toy } });
        toy._id = temp;
        return toy;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err);
        throw err;
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
};