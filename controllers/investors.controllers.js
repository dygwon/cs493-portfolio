// ../controllers/investors.controllers.js


module.exports = {
    createInvestor: async (req, res) => {
        res.status(200).send("creating an investor").end();
    },

    getInvestor: async (req, res) => {
        res.status(200).send("getting specified investor").end();
    },

    listInvestors: async (req, res) => {
        res.status(200).send("list investors").end();
    },

    // TODO: put, patch, and delete investor should be done by authenticated user?
    putInvestor: async (req, res) => {
        res.status(200).send("update an investor (put)").end();
    },

    patchInvestor: async (req, res) => {
        res.status(200).send("update an investor (patch)").end();
    },

    deleteInvestor: async (req, res) => {
        res.status(200).send("delete an investor").end();
    }
};
