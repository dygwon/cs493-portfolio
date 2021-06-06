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

    // update an entity in the datastore
    updateEntity: async (key, data) => {
        await datastore.update({
            "key": key,
            "data": data
        });
    },

    // get a single entity
    getEntity: async (key) => {
        const [ entity ] = await datastore.get(key);
        return entity;
    },

    // create a query to be used to retrieve zero, one, or more entities
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

    // execute the query to retrieve an entity
    runQuery: async (query) => {
        let results = await datastore.runQuery(query);
        return {
            data: results[0],
            info: results[1]
        };
    },

    // uses the Datastore's key attribute to extract the id from an entity
    getEntityId: (entity) => {
        return entity[Datastore.KEY].id;
    },

    // checks if the current query has additional pages to show
    noMoreResults: (queryResultsInfo) => {
        return (queryResultsInfo.moreResults === Datastore.NO_MORE_RESULTS);
    }
};
