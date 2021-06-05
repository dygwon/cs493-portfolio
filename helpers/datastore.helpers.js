// ../helpers/datastore.helpers.js


const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();


module.exports = {

    // generate a key for the given entity type
    getKey: async (type) => {
        let key = await datastore.key(type);
        return key;
    },

    // save the entity to the datastore
    createEntity: async (key, data) => {
        await datastore.save({
            "key": key,
            "data": data
        });
    }
};
