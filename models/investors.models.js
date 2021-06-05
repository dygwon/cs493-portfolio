// ../models/investors.models.js


class Investor {
    constructor(firstName, lastName, portfolio=null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.portfolio = portfolio;
    }

    static fromReqBody(reqBody) {
        return new Investor(
            reqBody.firstName,
            reqBody.lastName
        );
    }

    static fromDatastore(data) {
        return new Investor(
            data.firstName,
            data.lastName,
            data.portfolio
        );
    }
}

module.exports = Investor;
