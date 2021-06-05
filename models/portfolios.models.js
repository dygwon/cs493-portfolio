// ../models/portfolios.models.js


class Portfolio {
    constructor(owner=null, stocks=[], cryptos=[]) {
        this.owner = owner;
        this.stocks = stocks;
        this.cryptos = cryptos;
    }

    static fromReqBody(reqBody) {
        return new Portfolio(
            reqBody.owner
        );
    }

    static fromDatastore(data) {
        return new Portfolio(
            data.owner,
            data.stocks,
            data.cryptos
        );
    }
}

module.exports = Portfolio;
