// ../models/crypto.models.js


class Crypto {
    constructor(ticker, name, portfolios=[]) {
        this.portfolios = portfolios;
        this.ticker = ticker;
        this.name = name;
    }

    static fromReqBody(reqBody) {
        return new Crypto(
            reqBody.ticker,
            reqBody.name
        );
    }

    static fromDatastore(data) {
        return new Crypto(
            data.ticker,
            data.name,
            data.portfolios
        );
    }
}

module.exports = Crypto;
