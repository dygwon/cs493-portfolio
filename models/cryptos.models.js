// ../models/crypto.models.js


class Crypto {
    constructor(ticker, name, supply, portfolios=[]) {
        this.portfolios = portfolios;
        this.ticker = ticker;
        this.name = name;
        this.supply = supply;
    }

    static fromReqBody(reqBody) {
        return new Crypto(
            reqBody.ticker,
            reqBody.name,
            reqBody.supply
        );
    }

    static fromDatastore(data) {
        return new Crypto(
            data.ticker,
            data.name,
            data.supply,
            data.portfolios
        );
    }
}

module.exports = Crypto;
