<template>
  <div class="wrapper">
    <el-card>
      <div slot="header" class="clearfix">
        <span>Sign transaction</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">
          Back
        </el-button>
      </div>
      <div class="content">
        <div class="content-body">
          <transition name="slide-fade" mode="out-in">
            <uploadStage v-if="stage === 1" :rawTx="rawTx" :uploadFunc="onTxUploaded" :parsedTx="transactionToShow" />
            <signStage v-if="stage === 2" :sign.sync="signForm"/>
          </transition>
        </div>
        <transition name="slide-fade" mode="out-in">
          <div v-if="rawTx" class="actions">
            <el-button
              class="sora-button red"
              @click="onReset"
            >
              Reset
            </el-button>
            <el-button
              v-if="stage === 1"
              class="sora-button black"
              @click="nextStage"
            >
              Next
            </el-button>
            <el-button
              v-if="stage === 2"
              class="sora-button black"
              @click="onSignAndDownload"
            >
              Sign and Download
            </el-button>
          </div>
        </transition>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { lazyComponent } from '@/router'

export default {
  name: 'sign-tx',
  components: {
    uploadStage: lazyComponent('SignTX/uploadStage'),
    signStage: lazyComponent('SignTX/signStage')
  },
  data () {
    return {
      rawTx: undefined,
      stage: 1,

      signForm: {
        privateKey: ''
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
      this.$router.push('/dashboard')
    },
    onTxUploaded (file, fileList) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const bytesArray = ev.target.result || []
        const UintArray = new Uint8Array(bytesArray)
        this.parseTransaction(UintArray)
          .then((tx) => {
            this.rawTx = tx
          })
      }
      reader.readAsArrayBuffer(file.raw)
    },
    onReset () {
      this.rawTx = undefined
      this.stage = 1
      this.signForm = {
        privateKey: ''
      }
    },
    nextStage () {
      this.stage = 2
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
        privateKey: this.signForm.privateKey
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
.actions {
  padding: 1rem 0;
  float: right;
}
.key {
  padding: 1rem;
}
.key_label {
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
}
.content-body {
  height: 12rem;
}

.transaction {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 180px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.upload-transaction >>> .el-upload-dragger,
.upload-transaction >>> .el-upload {
  width: 100%
}
</style>
