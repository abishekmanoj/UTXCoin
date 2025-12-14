const { createClient } = require('redis');
const Transaction = require('../wallet/transactions');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'
};

class PubSub {
  constructor({ blockchain, pool }) {
    this.blockchain = blockchain
    this.pool = pool;

    this.publisher = createClient()
    this.subscriber = createClient()

    this.init();
  }

  async init() {
    await this.publisher.connect()
    await this.subscriber.connect()

    await this.subscribeToChannels()

    setTimeout(() => {
      this.publish({
        channel: CHANNELS.TEST,
        message: JSON.stringify({ msg: 'test-message' })
      })
    }, 1000)
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}, Message: ${message}`)

    try {
      const parsedMessage = JSON.parse(message)

      switch (channel) {
        case CHANNELS.BLOCKCHAIN:
          this.blockchain.replaceChain(parsedMessage, true, () => {
            this.pool.clearBlockchainTransactions({
              chain: parsedMessage
            })
          })
          break

        case CHANNELS.TRANSACTION:
          // this.transactionPool.setTransaction(parsedMessage)
          const transaction = Transaction.from(parsedMessage)
          this.pool.setTransaction(transaction)
          break

        default:
          console.log('Non-JSON message received.')
          break
      }

    } catch (err) {
      console.error(`Failed to parse message on channel ${channel}:`, message)
    }
  }

  async subscribeToChannels() {
    for (const channel of Object.values(CHANNELS)) {
      console.log(`Subscribed to channel: ${channel}`)

      await this.subscriber.subscribe(channel, (message) => {
        this.handleMessage(channel, message)
      })
    }
  }

  async publish({ channel, message }) {
    await this.publisher.publish(channel, message)
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    })
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction)
    })
  }
}

module.exports = PubSub;
