# API Documentation

## REST API Endpoints

### Health Check
```
GET /health
```

### Wallet Recovery
```
POST /api/v1/wallet/recover
Body: {
  "mnemonic": "word1 word2 ??? word4",
  "missingPositions": [2],
  "targetAddress": "0x..."
}
```

### Address Analysis
```
GET /api/v1/analyze/:chain/:address
```

### Graph Analysis
```
POST /api/v1/graph/analyze
Body: {
  "transactions": [...]
}
```
