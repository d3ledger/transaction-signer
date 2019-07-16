/*
 * Copyright D3 Ledger, Inc. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import map from 'lodash/fp/map'
import flatMap from 'lodash/fp/flatMap'
import concat from 'lodash/fp/concat'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'

import {
  cryptoHelper,
  txHelper,
  signWithArrayOfKeys
} from 'iroha-helpers'
import {
  createCommand,
  transactionToBinary,
  binaryToTransaction
} from '@/utils/helpers'

import format from 'date-fns/format'
import fs from 'fs'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'RESET',

    'ONLINE_STATUS_UPDATED',
    'GENERATE_KEYPAIR',
    'SAVE_KEYS_FILE',
    'SAVE_TRANSACTION_FILE',
    'SAVE_RAW_TRANSACTION_FILE',
    'PARSE_TRANSACTION',
    'SIGN_TRANSACTION'
  ]),
  map(x => [x, x]),
  fromPairs
)([
  'LOADING'
])

function initialState () {
  return {
    isApplicationOnline: true
  }
}

const state = initialState()

const getters = {
  isApplicationOnline (state) {
    return state.isApplicationOnline
  }
}

// function handleError (state, err) {
//   console.error(err)
//   throw err
// }

const mutations = {
  [types.RESET] (state) {
    const s = initialState()

    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },

  [types.ONLINE_STATUS_UPDATED] (state, status) {
    // state.isApplicationOnline = status
    state.isApplicationOnline = false
  },
  [types.GENERATE_KEYPAIR] (state) {},
  [types.SAVE_KEYS_FILE] (state) {},
  [types.SAVE_TRANSACTION_FILE] (state) {},
  [types.SAVE_RAW_TRANSACTION_FILE] (state) {},
  [types.PARSE_TRANSACTION] (state) {},
  [types.SIGN_TRANSACTION] (state) {}
}

const actions = {
  handleOnlineStatus ({ commit }, status) {
    commit(types.ONLINE_STATUS_UPDATED, status)
    return Promise.resolve(status)
  },
  generateKeyPair ({ commit }) {
    commit(types.GENERATE_KEYPAIR)
    const keys = cryptoHelper.generateKeyPair()
    const data = {
      ...keys
    }
    return Promise.resolve(data)
  },
  saveKeys ({ commit }, info) {
    commit(types.SAVE_KEYS_FILE)
    const downloadsPath = info.path

    const date = format(new Date(), 'MM-DD-YYYY-HH-mm-ss')

    const privateFileName = `D3-OTS-${date}.priv`
    const publicFileName = `D3-OTS-${date}.pub`

    fs.writeFile(`${downloadsPath}/${privateFileName}`, info.privateKey, (err) => {
      if (err) throw err
    })
    fs.writeFile(`${downloadsPath}/${publicFileName}`, info.publicKey, (err) => {
      if (err) throw err
    })
  },
  saveTransaction ({ commit }, info) {
    commit(types.SAVE_TRANSACTION_FILE)
    const downloadsPath = info.path

    const date = format(new Date(), 'MM-DD-YYYY-HH-mm-ss')

    const transactionFile = `D3-OTS-Transaction-${date}.bin`

    const tx = createCommand(info.commandType, info.params)
    const binaryArray = transactionToBinary(tx)

    fs.writeFile(`${downloadsPath}/${transactionFile}`, Buffer.from(binaryArray), (err) => {
      if (err) throw err
    })
  },
  saveRawTransaction ({ commit }, info) {
    commit(types.SAVE_RAW_TRANSACTION_FILE)
    const downloadsPath = info.path

    const date = format(new Date(), 'MM-DD-YYYY-HH-mm-ss')

    const transactionFile = `D3-OTS-Transaction-Signed-${date}.bin`

    const binaryArray = transactionToBinary(info.tx)

    fs.writeFile(`${downloadsPath}/${transactionFile}`, Buffer.from(binaryArray), (err) => {
      if (err) throw err
    })
  },
  parseTransaction ({ commit }, UintArray) {
    commit(types.PARSE_TRANSACTION)
    return Promise.resolve(
      binaryToTransaction(UintArray)
    )
  },
  signTransaction ({ commit }, info) {
    commit(types.SIGN_TRANSACTION)
    const { transaction, privateKey, creatorAccountId, quorum } = info
    const tx = txHelper.addMeta(transaction, {
      quorum: quorum * 2,
      creatorAccountId
    })
    const signed = signWithArrayOfKeys(tx, [privateKey])
    return Promise.resolve(signed)
  }
}

export default {
  types,
  state,
  getters,
  mutations,
  actions
}
