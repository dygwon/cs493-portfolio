// ../models/stocks.models.js


class Stock {
    constructor(ticker, company, ceo, bulls=[], portfolios=[]) {
        this.portfolios = portfolios;
        this.ticker = ticker;
        this.company = company;
        this.ceo = ceo;
        this.bulls = bulls;
    }

    static fromReqBody(reqBody) {
        return new Stock(
            reqBody.ticker,
            reqBody.company,
            reqBody.ceo
        );
    }

    static fromDatastore(data) {
        return new Stock(
            data.ticker,
            data.company,
            data.ceo,
            data.bulls,
            data.portfolios
        );
    }
}

module.exports = Stock;
