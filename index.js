const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')
const PubSub = require('./app/pubsub')
const Pool = require('./wallet/pool')
const Wallet = require('./wallet')
const Miner = require('./app/miner')
const path = require('path')
const cors = require('cors')


const app = express()
const blockchain = new Blockchain()
const wallet = new Wallet()
const pool = new Pool()
const pubsub = new PubSub({ blockchain, pool })
const miner = new Miner({ blockchain, pool, wallet, pubsub })


const DEFAULT_PORT = 8000
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

setTimeout(() => pubsub.broadcastChain(), 1000)

app.use(bodyParser.json())
app.use(cors())


app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain)
})

app.post('/api/mine', (req, res) => {
    const { data } = req.body
    blockchain.addBlock({ data })
    pubsub.broadcastChain()
    res.redirect('/api/blocks')
})

app.post('/api/transact', (req, res) => {
    const { amount, recipient } = req.body
    let transaction = pool.existingTransaction({ inputAddress: wallet.publicKey })
    try {
        if(transaction){
            transaction.update({ senderWallet: wallet, recipient, amount, chain: blockchain.chain })
        } else {
            transaction = wallet.createTransaction({ recipient, amount, chain: blockchain.chain })
        }
    } catch (error) {
        return res.status(400).json({ type: 'error', message: error.message })
    }
    
    pool.setTransaction(transaction)
    pubsub.broadcastTransaction(transaction)
    res.status(200).json({ transaction })  
})

app.get('/api/tx-pool-map', (req, res) => {
    res.json(pool.transactionMap)
})

app.get('/api/mine-txs', (req, res) => {
    console.log(`HIT /api/mine-txs on PORT=${PORT} wallet=${wallet.publicKey}`)
    miner.mineTransactions()
    res.redirect('/api/blocks')
})

app.get('/api/wallet-info', (req, res) => {
    const address = wallet.publicKey
    res.json({ 
            address, 
            balance: Wallet.calculateBalance({ chain: blockchain.chain, address }) 
        })
})

app.get('/api/wallet-info/:address', (req, res) => {
    const { address } = req.params;

    const balance = Wallet.calculateBalance({
        chain: blockchain.chain,
        address
    });

    res.json({ address, balance })
})

app.use(express.static(path.join(__dirname, 'client/dist')))

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

const syncWithRoot = () => {

    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks`}, (error, response, body) => {
        if(!error && response.statusCode === 200){
            const rootChain = JSON.parse(body)
            console.log('Replace chain on a sync with', rootChain)
            blockchain.replaceChain(rootChain)
        }
    })

    request({ url: `${ROOT_NODE_ADDRESS}/api/tx-pool-map`}, (error, response, body) => {
        if(!error && response.statusCode === 200){
            const rootTXPoolMap = JSON.parse(body)
            console.log('Replace TX Pool Map on a sync with', rootTXPoolMap)

            pool.setMap(rootTXPoolMap)
        }
    })
}


let PEER_PORT

if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 2000)
}

const PORT = PEER_PORT || DEFAULT_PORT
app.listen(PORT, () => {
    console.log(`Listining on port: ${PORT}`)

    if(PORT !== DEFAULT_PORT) {
        syncWithRoot()
    }
})


// BUILD DUMMY WALLETS AND TXS
// const wallet_X = new Wallet()
// const wallet_Y = new Wallet()
// const wallet_Z = new Wallet()

// const generateWalletTransaction = ({ recipient, amount }) => {
//     const transaction = wallet.createTransaction({
//         recipient, amount, chain: blockchain.chain
//     });

//     pool.setTransaction(transaction)
// }

// const walletAction = () => generateWalletTransaction({
//     wallet, recipient: wallet_Z.publicKey, amount: 5
// })

// const walletXAction = () => generateWalletTransaction({
//     wallet: wallet_X, recipient: wallet_Y.publicKey, amount: 4
// })

// const walletYAction = () => generateWalletTransaction({
//     wallet: wallet_Y, recipient: wallet_X.publicKey, amount: 3
// })

// const walletZAction = () => generateWalletTransaction({
//     wallet: wallet_Z, recipient: wallet.publicKey, amount: 7
// })

// for(let i=0 ; i<10; i++){
//     if(i%3 === 0){
//         walletXAction()
//         walletZAction()
        
//     } else if(i%3 === 1){
//         walletYAction()
//     } else {
//         walletAction()
//     }

//     miner.mineTransactions()
// }
