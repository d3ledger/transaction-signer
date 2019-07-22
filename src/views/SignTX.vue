<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div class="wrapper">
    <div class="content">
      <div class="content-body">
        <uploadStage
          v-if="stage === 1"
          :upload-func="onTxUploaded"
          :parsed-tx="transactionToShow"
        />
        <signStage
          v-if="stage === 2"
          :sign.sync="signForm"
        />
      </div>
      <div
        v-if="stage === 2"
        class="actions"
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
</template>

<script>
import { mapActions } from 'vuex'
import { lazyComponent } from '@/router'

export default {
  name: 'SignTx',
  components: {
    uploadStage: lazyComponent('SignTX/uploadStage'),
    signStage: lazyComponent('SignTX/signStage')
  },
  data () {
    return {
      rawTx: undefined,
      stage: 1,

      signForm: {
        privateKey: '',
        quorum: 0,
        creatorAccountId: ''
      }
    }
  },
  computed: {
    transactionToObject () {
      return this.rawTx ? this.rawTx.toObject() : undefined
    },
    transactionToShow () {
      if (this.transactionToObject) {
        const commandsList = this.transactionToObject.payload.reducedPayload.commandsList
        return commandsList.map(c => {
          const keys = Object.keys(c).filter(key => c[key])
          const title = keys[0]
          return {
            title,
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
          this.$message('Signed and saved to download folder!')
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
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 2rem;
}
.content {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 80vh;
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
</style>
