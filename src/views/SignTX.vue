<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div class="sign-tx">
    <uploadStage
      v-if="stage === 1"
      :upload-func="onTxUploaded"
      style="padding: 2rem"
    />
    <div v-if="stage === 2">
      <template v-if="transactionToObject">
        <parsedTransferAsset
          v-if="transactionToShow[0].title === 'transferAsset'"
          :tx="transactionToShow"
        />
        <parsedAddSignatory
          v-if="transactionToShow[0].title === 'addSignatory'"
          :tx="transactionToShow"
        />
        <parsedSetAccountDetail
          v-if="transactionToShow[0].title === 'setAccountDetail'"
          :tx="transactionToShow"
        />
      </template>
      <div
        v-if="rawListTx.length"
        class="transaction_list-names"
      >
        <template v-for="(tx, index) in rawListTx">
          <span :key="index">{{ tx.name }}</span>
        </template>
      </div>
      <el-divider />
      <div class="content-body">
        <signStage
          :sign.sync="sign"
          style="padding: 0 2rem"
        />
        <div
          class="actions"
          style="padding: 0 2rem"
        >
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="12">
              <el-button
                class="app_button black"
                style="width: 97%"
                @click="onSignAndDownload"
              >
                Sign and download
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                class="app_button white"
                style="width: 97%; float: right"
                @click="goBack"
              >
                Cancel
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <notification :is-visible.sync="isNotificationVisible">
      <template slot="message">
        Signed transaction file (.bin) saved to “Downloads” folder.<br>
        Do not forget to remove your private key to safe storage
      </template>
    </notification>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { lazyComponent } from '@/router'
import cloneDeep from 'lodash/fp/cloneDeep'
import JSZip from 'jszip'

export default {
  name: 'SignTx',
  components: {
    uploadStage: lazyComponent('SignTX/uploadStage'),
    signStage: lazyComponent('SignTX/signStage'),

    parsedTransferAsset: lazyComponent('SignTX/parsedTx/transferAsset'),
    parsedAddSignatory: lazyComponent('SignTX/parsedTx/addSignatory'),
    parsedSetAccountDetail: lazyComponent('SignTX/parsedTx/setAccountDetail'),

    Notification: lazyComponent('common/Notification')
  },
  data () {
    return {
      txFileName: '',
      rawTx: undefined,
      rawListTx: [],
      isZipFile: false,
      stage: 1,
      indexToSign: 0,
      sign: {
        privateKey: ''
      },
      isNotificationVisible: false
    }
  },
  computed: {
    transactionToObject () {
      return this.rawTx ? this.rawTx.toObject() : undefined
    },
    transactions () {
      const tx = cloneDeep(this.transactionToObject)
      if (tx.transactionsList) {
        let txList = tx.transactionsList
        if (txList[0].signaturesList.length === Math.round(txList[0].payload.reducedPayload.quorum / 2)) {
          [txList[0], txList[1]] = [txList[1], txList[0]]
          this.$set(this, 'indexToSign', 1)
        }

        return txList
      } else {
        return [tx]
      }
    },
    transactionToShow () {
      return this.transactions.reduce((result, tx) => {
        const commandsList = tx.payload.reducedPayload.commandsList
        const time = tx.payload.reducedPayload.createdTime
        if (commandsList.length === 2) {
          // swap transfer and billing commands
          [commandsList[0], commandsList[1]] = [commandsList[1], commandsList[0]]
        } else {
          commandsList.push({ params: { amount: 0 } })
        }
        return result.concat(commandsList.map(c => {
          const keys = Object.keys(c).filter(key => c[key])
          const title = keys[0]
          return {
            title,
            time,
            params: c[title]
          }
        }))
      }, [])
    }
  },
  methods: {
    ...mapActions([
      'parseTransaction',
      'parseTransactions',
      'signTransaction',
      'signTransactionInList',
      'saveRawTransaction',
      'saveRawTransactions'
    ]),
    goBack () {
      this.stage = 1
    },
    onTxUploaded (file, fileList) {
      this.isZipFile = file.raw.type === 'application/zip'
      const reader = new FileReader()
      reader.onload = async (ev) => {
        this.txFileName = file.name.split('-').slice(-6).join('-').split('.')[0]
        const bytesArray = ev.target.result || []
        if (this.isZipFile) {
          const zip = await JSZip.loadAsync(bytesArray)
          for (const key of Object.keys(zip.files)) {
            const UintArray = await zip.files[key].async('uint8array')
            try {
              this.rawListTx.push({ name: key, tx: await this.parseTransaction(UintArray) })
            } catch (error) {
              this.rawListTx.push({ name: key, tx: await this.parseTransactions(UintArray) })
            }
          }
          this.stage = 2
        } else {
          const UintArray = new Uint8Array(bytesArray)
          this.parseBinaryTransaction(UintArray)
        }
      }
      reader.readAsArrayBuffer(file.raw)
    },
    parseBinaryTransaction (UintArray) {
      const next = (tx) => {
        this.rawTx = tx
        this.stage = 2
        this.sign.privateKey = ''
      }
      try {
        this.parseTransaction(UintArray)
          .then(next)
      } catch (error) {
        this.parseTransactions(UintArray)
          .then(next)
      }
    },
    onReset () {
      this.rawTx = undefined
      this.rawListTx = []
      this.stage = 1
      this.indexToSign = 0
      this.sign.privateKey = ''
      this.isZipFile = false
    },
    onSignAndDownload () {
      if (!this.sign.privateKey.length) {
        this.$message.error('Private key can\'t be empty!')
        return
      }
      if (this.isZipFile) {
        this.onSignZip()
          .then(txs => this.onSaveTransactions(txs))
          .then(() => {
            this.isNotificationVisible = true
            this.onReset()
          })
      } else {
        this.onSign()
          .then(tx => this.onSaveTransaction(tx))
          .then(() => {
            this.isNotificationVisible = true
            this.onReset()
          })
      }
    },
    async onSignZip () {
      const txs = []
      for (const { tx } of this.rawListTx) {
        const transaction = tx.toObject()
        if (!transaction.transactionList) {
          const signTx = await this.signTransaction({
            transaction: tx,
            privateKey: this.sign.privateKey
          })
          txs.push(signTx)
        } else {
          const txList = transaction.getTransactionsList()
          if (txList[0].signaturesList.length === Math.round(txList[0].payload.reducedPayload.quorum / 2)) {
            [txList[0], txList[1]] = [txList[1], txList[0]]
            this.$set(this, 'indexToSign', 1)
          }
          txList.forEach(tx => tx.clearSignaturesList())
          const signTx = await this.signTransactionInList({
            transactionList: txList,
            index: this.indexToSign,
            privateKey: this.sign.privateKey
          })
          txs.push(signTx)
        }
      }
      return txs
    },
    onSign () {
      if (this.transactions.length === 1) {
        return this.signTransaction({
          transaction: this.rawTx,
          privateKey: this.sign.privateKey
        })
      } else {
        const txList = this.rawTx.getTransactionsList()
        txList.forEach(tx => tx.clearSignaturesList())
        return this.signTransactionInList({
          transactionList: txList,
          index: this.indexToSign,
          privateKey: this.sign.privateKey
        })
      }
    },
    onSaveTransaction (tx) {
      const path = this.$electron.remote.app.getPath('downloads')
      this.saveRawTransaction({ tx, path, date: this.txFileName })
    },
    onSaveTransactions (txs) {
      const path = this.$electron.remote.app.getPath('downloads')
      this.saveRawTransactions({ txs, path, date: this.txFileName })
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 80vh;
  padding: 2rem 0;
}
.key {
  padding: 1rem;
}
.key_label {
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
}

.upload-transaction >>> .el-upload-dragger,
.upload-transaction >>> .el-upload {
  height: 80vh;
  width: 100%;
}

.upload-transaction >>> .el-icon-upload {
  margin: 20% 0 1rem;
}

.upload-transaction >>> .el-upload-dragger:hover {
  border-color: #000000;
}

.sign-tx >>> .el-divider {
  background: #ebebeb !important;
  margin: 0px;
}

.actions {
  margin-top: 4.5rem;
}

.transaction_list-names {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
}
</style>
