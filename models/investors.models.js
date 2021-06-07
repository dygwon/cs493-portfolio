// ../models/investors.models.js


class Investor {
    constructor(firstName, lastName, location, bullish=null, portfolio=null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.location = location;
        this.bullish = bullish;
        this.portfolio = portfolio;
    }

    static fromReqBody(reqBody) {
        return new Investor(
            reqBody.firstName,
            reqBody.lastName,
            reqBody.location
        );
    }

    static fromDatastore(data) {
        return new Investor(
            data.firstName,
            data.lastName,
            data.location,
            data.bullish,
            data.portfolio
        );
    }
}

module.exports = Investor;
