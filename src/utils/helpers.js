import {
  txHelper
} from 'iroha-helpers'
import Transaction from 'iroha-helpers/lib/proto/transaction_pb'

export function createCommand (commandName, params) {
  const tx = txHelper.addCommand(
    txHelper.emptyTransaction(),
    commandName,
    {
      ...params
    }
  )
  return tx
}

export function transactionToBinary (tx) {
  return tx.serializeBinary()
}

export function binaryToTransaction (bytes) {
  return Transaction.Transaction.deserializeBinary(bytes)
}
