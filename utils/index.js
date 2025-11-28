const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const hash = require('./hash')

const verifySignature = ({ publicKey, data, signature }) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex')
    return keyFromPublic.verify(hash(data), signature)
}

module.exports = { ec, verifySignature, hash }