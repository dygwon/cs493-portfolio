// ../models/investors.models.js


class Investor {
    constructor(firstName, lastName, location, portfolio=null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.location = location;
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
            data.portfolio
        );
    }
}

module.exports = Investor;
