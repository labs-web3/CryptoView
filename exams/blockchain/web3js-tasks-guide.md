# API Documentation

## 1. Fetch and Store NFT Metadata

### Description
Create an API endpoint that accepts an NFT contract address and token ID. The endpoint should retrieve metadata (name, description, image URL) from the blockchain using web3.js, store it in MongoDB, and return the metadata to the user.

### API Request
```http
GET http://localhost:{port}/api/nft/{contractAddress}/{tokenID}

response:

{
    "name": "Tst",
    "description": "A test description",
    "imageUrl": "https://..."
}
```

## 2. Simple Cryptocurrency Transaction Tracking

### Description
Create an API endpoint that accepts a cryptocurrency address (e.g., Ethereum). This endpoint should fetch the last 5 transactions for the given address from a blockchain explorer API (e.g., Etherscan) and store them in MongoDB. Users should be able to query transactions based on address and date range.

### API Request
```http
GET http://localhost:5001/api/transaction?address={walletAddress}&startDate=2024-01-01&endDate=2024-01-31

response:

[
    {
        "blockNumber": "1111",
        "timeStamp": "1722621804",
        "hash": "0x...",
        "nonce": "11",
        "blockHash": "0x...",
        "transactionIndex": "1",
        "from": "0x...",
        "to": "0x...",
        "value": "50000000000000000",
        "gas": "21000",
        "gasPrice": "2646619941",
        "isError": "0",
        "txreceipt_status": "1",
        "input": "0x",
        "contractAddress": "",
        "cumulativeGasUsed": "1",
        "gasUsed": "21000",
        "confirmations": "5679",
        "methodId": "0x",
        "functionName": ""
    },
    {
        "blockNumber": "1112",
        "timeStamp": "1722721804",
        "hash": "0x...",
        "nonce": "12",
        "blockHash": "0x...",
        "transactionIndex": "2",
        "from": "0x...",
        "to": "0x...",
        "value": "30000000000000000",
        "gas": "21000",
        "gasPrice": "2646619941",
        "isError": "0",
        "txreceipt_status": "1",
        "input": "0x",
        "contractAddress": "",
        "cumulativeGasUsed": "1",
        "gasUsed": "21000",
        "confirmations": "5680",
        "methodId": "0x",
        "functionName": ""
    }..
]

```


## 4. Token Balance Lookup

### Description
Create an API endpoint that accepts a token contract address and a wallet address. The endpoint should query the blockchain (using web3.js) to get the balance of the specified token held by the given wallet address and return the balance.

### API Request
```http
GET http://localhost:{port}/api/balance/{contractAddress}/{walletAddress}


response:

{
    "balance": "0.5"
}

```


### NOTES 

Make sure to add the following environment variables to your .env file:

ERC20_TESTNET_RPC_URL=Your ERC20 Testnet RPC URL
ETHERSCAN_API_KEY=Your Etherscan API Key

ERC20_TESTNET_RPC_URL: The URL of the RPC endpoint for the ERC20 testnet network. This is used to interact with the Ethereum blockchain.

ETHERSCAN_API_KEY: Your Etherscan API key, which is required to access the Etherscan API for retrieving transaction details and other blockchain information.

Ensure you replace <Your ERC20 Testnet RPC URL> and <Your Etherscan API Key> with your actual credentials