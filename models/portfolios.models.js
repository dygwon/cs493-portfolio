// ../models/portfolios.models.js


class Portfolio {
    constructor(classification, yearStarted, industryFocus, owner=null, stocks=[], cryptos=[]) {
        this.owner = owner;
        this.classification = classification;
        this.yearStarted = yearStarted;
        this.industryFocus = industryFocus;
        this.stocks = stocks;
        this.cryptos = cryptos;
    }

    static fromReqBody(reqBody) {
        return new Portfolio(
            reqBody.classification,
            reqBody.yearStarted,
            reqBody.industryFocus,
            reqBody.owner
        );
    }

    static fromDatastore(data) {
        return new Portfolio(
            data.classification,
            data.yearStarted,
            data.industryFocus,
            data.owner,
            data.stocks,
            data.cryptos
        );
    }
}

module.exports = Portfolio;
