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
      <div style="padding: 2rem">
        <div class="row first">
          <span>Time</span>
          <span>{{ transactionToShow[0].time }} </span>
        </div>
        <el-divider />
        <div class="row">
          <span>Sender</span>
          <span>{{ transactionToShow[0].params.srcAccountId }}</span>
        </div>
        <div class="row">
          <span>Receiver</span>
          <span>{{ transactionToShow[0].params.destAccountId }}</span>
        </div>
        <el-divider />
        <div class="row">
          <span>Amount</span>
          <span>{{ transactionToShow[0].params.amount }} {{ getAssetName(transactionToShow[0].params.assetId) }}</span>
        </div>
        <div class="row">
          <span>Fee</span>
          <span>0 {{ getAssetName(transactionToShow[0].params.assetId) }}</span>
        </div>
        <el-divider />
        <div class="row last">
          <span>Total</span>
          <span>{{ transactionToShow[0].params.amount }} {{ getAssetName(transactionToShow[0].params.assetId) }}</span>
        </div>
      </div>
      <el-divider />
      <div class="content-body">
        <signStage
          :sign.sync="signForm"
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

export default {
  name: 'SignTx',
  components: {
    uploadStage: lazyComponent('SignTX/uploadStage'),
    signStage: lazyComponent('SignTX/signStage'),
    Notification: lazyComponent('common/Notification')
  },
  data () {
    return {
      rawTx: undefined,
      stage: 1,

      signForm: {
        privateKey: '',
        quorum: 0,
        creatorAccountId: ''
      },

      isNotificationVisible: false
    }
  },
  computed: {
    transactionToObject () {
      return this.rawTx ? this.rawTx.toObject() : undefined
    },
    transactionToShow () {
      if (this.transactionToObject) {
        const commandsList = this.transactionToObject.payload.reducedPayload.commandsList
        const time = this.transactionToObject.payload.reducedPayload.createdTime
        return commandsList.map(c => {
          const keys = Object.keys(c).filter(key => c[key])
          const title = keys[0]
          return {
            title,
            time,
            params: c[title]
          }
        })
      }
      return []
    }
  },
  methods: {
    ...mapActions([
      'parseTransaction',
      'signTransaction',
      'saveRawTransaction'
    ]),
    goBack () {
      this.stage = 1
    },
    onTxUploaded (file, fileList) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const bytesArray = ev.target.result || []
        const UintArray = new Uint8Array(bytesArray)
        this.parseTransaction(UintArray)
          .then((tx) => {
            this.rawTx = tx
            this.stage = 2
          })
      }
      reader.readAsArrayBuffer(file.raw)
    },
    onReset () {
      this.rawTx = undefined
      this.stage = 1
      this.signForm = {
        privateKey: '',
        quorum: 0,
        creatorAccountId: ''
      }
    },
    onSignAndDownload () {
      if (!this.signForm.privateKey.length) {
        this.$message.error('Private key can\'t be empty!')
        return
      }
      this.onSign()
        .then(tx => this.onSaveTransaction(tx))
        .then(() => {
          this.isNotificationVisible = true
          this.onReset()
        })
    },
    onSign () {
      return this.signTransaction({
        transaction: this.rawTx,
        ...this.signForm
      })
    },
    onSaveTransaction (tx) {
      const path = this.$electron.remote.app.getPath('downloads')
      this.saveRawTransaction({ tx, path })
    },
    getAssetName (assetId) {
      return assetId.split('#')[0]
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

.sign-tx >>> .el-divider {
  background: #ebebeb !important;
  margin: 0px;
}

.actions {
  margin-top: 4.5rem;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0.6rem 0;
}
.row.first {
  margin-bottom: 0.6rem;
}
.row.last {
  margin-top: 0.6rem;
}
</style>
