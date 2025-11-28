# TXCOIN
TXCoin is a small blockchain network and cryptocurrency prototype built entirely from scratch. It includes a working blockchain, proof-of-work mining, wallet generation, digital signatures, transaction pooling, block propagation through Redis Pub/Sub, and a React-based explorer UI.

TXCoin runs fully locally and regenerates wallet keys on each server start. 

## Tech Stack
```
Tech Stack/
│
├── Backend (Node.js)
│   ├── Express — REST API for blockchain, mempool, mining, wallet
│   ├── Redis — Pub/Sub communication between peer nodes
│   ├── Elliptic — cryptographic keypairs + digital signatures
│   ├── UUID — transaction identifiers
│   └── Body-Parser / CORS — middleware for API handling
│
├──────── Blockchain Logic
│        ├── Proof-of-Work (adjustable difficulty)
│        ├── Dynamic difficulty adjustment
│        ├── Secure hashing (SHA-256)
│        ├── Transaction validation
│        ├── Wallet + digital signatures
│        └── Mining + block rewards
│
├── Frontend (React + Parcel)
│   ├── React 19 — UI rendering
│   ├── React Router — client-side navigation
│   ├── Axios — communication with backend API
│   ├── Parcel Bundler — build pipeline / hot reload
│   └── TailwindCSS — styling framework
│
└── Networking
    ├── Multi-peer syncing via Pub/Sub
    ├── Broadcast blockchain updates
    └── Broadcast new transactions to all nodes


```

## Project Structure
```
TXCoin/
│
├── app/
│   ├── miner.js
│   └── pubsub.js
│
├── blockchain/
│   ├── block.js
│   └── index.js
│
├── client/
│   ├── dist/               
│   └── src/
│       ├── assets/         
│       ├── components/
│       │   └── Navbar.jsx
│       ├── pages/          
│       │   ├── Home.jsx
│       │   ├── Blockchain.jsx
│       │   ├── BlockDetails.jsx
│       │   ├── TXPool.jsx
│       │   └── Wallet.jsx
│       ├── App.jsx
│       ├── index.html
│       └── index.js
│
├── utils/
│   ├── hash.js
│   └── index.js
│
├── wallet/
│   ├── index.js
│   ├── pool.js
│   └── transactions.js
│
├── config.js
├── index.js                 
├── package.json
└── README.md

```


## The App UI
The TXCoin UI is a lightweight React application built with Parcel and TailwindCSS. It provides a clear visual interface to explore the blockchain, inspect transactions, view wallet details, and interact with the network.  

### Home Page
The landing page introduces TXCoin and provides quick navigation to all major sections.

![Home Page](https://github.com/abishekmanoj/TXCoin/blob/main/ui-images/Home.png)


### Blockchain explorer Page
Displays the full blockchain in real time.

![Blockchain Explorer](https://github.com/abishekmanoj/TXCoin/blob/main/ui-images/Blockchain.png)

### Blockchain Details Page
Shows the full internal structure of a specific block.

![Blockchain Details](https://github.com/abishekmanoj/TXCoin/blob/main/ui-images/BlockDetails.png)

### Transaction Pool Page
Displays all unconfirmed transactions currently waiting to be mined.

![Transaction Pool](https://github.com/abishekmanoj/TXCoin/blob/main/ui-images/TXPool.png)

### Wallet Page

Shows the current server node’s wallet.

![Wallet](https://github.com/abishekmanoj/TXCoin/blob/main/ui-images/Wallet.png)

## Running TXCoin
1. Install dependencies:
``` npm install ```
   
2. Start Redis:
   Redis is required for Pub/Sub communication:
   ``` npm run start-redis ```
   
3. Start the main node:
   This launches the backend and the React UI:
   ``` npm run dev ```
   This runs:
   Parcel in watch mode (React frontend) ;
   Nodemon for the backend server ;
   The app will be available at:
   ```http://localhost:8000```
   

4. Start peer nodes:
   To simulate a network: 
   ```npm run dev-peer``` 
   Each peer starts on a random port and syncs with the root node.  

5. Production build:
   ```npm start```
   Parcel outputs static files to client/dist and Express serves them.
   

## Notes
+ Wallet private keys are generated in memory on server start
+ Wallets do not persist between restarts
+ There is no authentication layer
+ Anyone who runs the server gets their own temporary wallet

## Author
Abishek Manoj

