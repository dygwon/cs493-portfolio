// ../models/stocks.models.js


class Stock {
    constructor(ticker, company, portfolios=[]) {
        this.portfolios = portfolios;
        this.ticker = ticker;
        this.company = company;
    }

    static fromReqBody(reqBody) {
        return new Stock(
            reqBody.ticker,
            reqBody.company
        );
    }

    static fromDatastore(data) {
        return new Stock(
            data.ticker,
            data.company,
            data.portfolios
        );
    }
}

module.exports = Stock;
