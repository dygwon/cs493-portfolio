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
    },

    createQuery: (type, pagelimit=null) => {
        let query;
        
        // check if page limit given
        if (!pagelimit) {
            query = datastore.createQuery(type);
        } else {
            query = datastore.createQuery(type).limit(pagelimit);
        }

        return query;
    },

    runQuery: async (query) => {
        let results = await datastore.runQuery(query);
        return {
            data: results[0],
            info: results[1]
        };
    },

    getEntityId: (entity) => {
        return entity[Datastore.KEY].id;
    },

    noMoreResults: (queryResultsInfo) => {
        return (queryResultsInfo.moreResults === Datastore.NO_MORE_RESULTS);
    }
};
