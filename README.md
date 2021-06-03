# CS 493 - Portfolio Project
 
## Data Models
### Investor
```
{
    "id": 12345,
    "firstName": "Warren",
    "lastName": "Buffett",
    "portfolio": 23456
}
```

### Portfolio
```
{
    "id": 23456,
    "owner": 12345,
    "stocks": [987, 876, 765],
    "bonds": [135, 246],
}
```

### Stock
```
{
    "id": 987,
    "portfolios": [23456, 34567],
    "ticker": "W",
    "company": "Wayfair Inc.",
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
