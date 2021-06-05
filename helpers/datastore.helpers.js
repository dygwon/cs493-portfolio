// ../helpers/datastore.helpers.js


const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();


module.exports = {

    // generate a key for the given entity type
    getEntityKey: async (type) => {
        let key = await datastore.key(type);
        return key;
    },

    // generate a specific key given id
    getKey: async (type, id) => {
        let key = await datastore.key([type, id]);
        return key;
    },

    // save the entity to the datastore
    createEntity: async (key, data) => {
        await datastore.save({
            "key": key,
            "data": data
        });
    },

    getEntity: async (key) => {
        const [ entity ] = await datastore.get(key);
        return entity;
    }
};
