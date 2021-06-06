# CS 493 - Portfolio Project
A RESTful API with protected routes.
 
## Data Models
### Investor
```
{
    "id": 12345,
    "firstName": "Warren",
    "lastName": "Buffett",
    "location": "Omaha, NE"
    "portfolio": 23456
}
```

### Portfolio
```
{
    "id": 23456,
    "owner": "auth0|609efb758088040069629b85",
    "classification": "value",
    "yearStarted": 1951,
    "industryFocus": "industrials",
    "stocks": [987, 876, 765],
    "cryptocurrencies": [135, 246],
}
```

### Stock
```
{
    "id": 987,
    "portfolios": [23456, 34567],
    "ticker": "W",
    "company": "Wayfair Inc.",
    "ceo": "Niraj Shah"
}
```

### Cryptocurrency
```
{
    "id": 135,
    "portfolios": [23456, 45678],
    "ticker": "BTC",
    "name": "Bitcoin"
}
```
