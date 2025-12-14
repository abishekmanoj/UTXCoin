const Transaction = require('../wallet/transactions')

class Miner {
    constructor({ blockchain, pool, wallet, pubsub }){
        this.blockchain = blockchain
        this.pool = pool
        this.wallet = wallet
        this.pubsub = pubsub
    }

    mineTransactions() {
        const validTransactions = this.pool.validTransactions()

        validTransactions.push(Transaction.rewardTransaction({ minerWallet: this.wallet }))

        this.blockchain.addBlock({ data: validTransactions })
        
        this.pubsub.broadcastChain()
        this.pool.clear()
    }
}

module.exports = Miner