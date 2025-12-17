const MINE_RATE = 1000
const INITIAL_DIFFICULTY = 3
const STARTING_BALANCE = 100

const GENESIS_DATA = {
    timestamp: '01.12.2025', 
    lastHash: '---',
    hash: '0xHASHOFTHEGENESISBLOCKFORUTXCOINxxx',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
}

const REWARD_INPUT = { 
    address: '*Coinbase-Mining-Reward*'
}

const MINING_REWARD = 50

module.exports = { GENESIS_DATA, MINE_RATE, STARTING_BALANCE, REWARD_INPUT, MINING_REWARD }