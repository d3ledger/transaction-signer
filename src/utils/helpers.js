/*
 * Copyright D3 Ledger, Inc. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  txHelper
} from 'iroha-helpers'
import Transaction from 'iroha-helpers/lib/proto/transaction_pb'
import TxList from 'iroha-helpers/lib/proto/endpoint_pb'

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

export function binaryToTxList (bytes) {
  return TxList.TxList.deserializeBinary(bytes)
}
