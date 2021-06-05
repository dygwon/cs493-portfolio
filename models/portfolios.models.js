// ../models/portfolios.models.js


class Portfolio {
    constructor(owner=null, stocks=[], cryptos=[]) {
        this.owner = owner;
        this.stocks = stocks;
        this.cryptos = cryptos;
    }

    static fromReqBody(sub, reqBody) {
        return new Portfolio(
            sub,
            reqBody.stocks,
            reqBody.cryptos
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
