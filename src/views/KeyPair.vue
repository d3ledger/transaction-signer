<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div class="keypair">
    <div class="header">
      <p class="header_msg">
        A private key file (.priv) is used to verify the rights to spend assets from a {{ appName }} account.
      </p>
      <p class="header_msg">
        A public key file (.pub) is a cryptographical proxy for a private key.
      </p>
    </div>
    <el-divider class="divider_small" />
    <div class="content">
      <el-form
        label-position="top"
        :model="info"
      >
        <el-form-item label="Private key">
          <el-tooltip
            class="tooltip"
            placement="left"
            effect="light"
            popper-class="tooltip-popper"
          >
            <div slot="content">
              <p style="margin-bottom: 0.5rem">
                It's the most sensitive piece of data in the system: if the private key is compromised, someone else could transfer your assets.
              </p>
              <p style="margin-bottom: 0.5rem">
                Please store your private key it in a safe place like on a USB stick which you never plug into a computer while online.
              </p>
              <p>
                We'll ask your private key only to sign transactions and add adresses to your whitelist.
              </p>
            </div>
            <span><img src="@/assets/icons/help.svg"></span>
          </el-tooltip>
          <el-input
            v-model="info.privateKey"
            disabled
          />
        </el-form-item>
        <el-form-item label="Public key">
          <el-tooltip
            class="tooltip"
            placement="left"
            effect="light"
            popper-class="tooltip-popper"
          >
            <div slot="content">
              <p style="margin-bottom: 0.5rem">
                Using the public key, you can prove to a third party that you own the private key without showing it explicitly.
              </p>
              <p style="margin-bottom: 0.5rem">
                In {{ appName }} public keys are used to generate accounts pegged to outside blockchains like Bitcoin or Ethereum.
              </p>
              <p>
                You'll be asked your public key every time you need to open an account or to add an asset type in {{ appName }}.
              </p>
            </div>
            <span><img src="@/assets/icons/help.svg"></span>
          </el-tooltip>
          <el-input
            v-model="info.publicKey"
            disabled
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="actions">
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="12">
          <el-button
            class="app_button black"
            style="width: 97%"
            @click="onSaveKeys"
          >
            Download
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            class="app_button white"
            style="width: 97%; float: right"
            @click="onGenerateKeyPair"
          >
            Generate new
          </el-button>
        </el-col>
      </el-row>
    </div>
    <notification :is-visible.sync="isNotificationVisible">
      <template slot="message">
        <span>
          Key-pair files (.priv & .pub) saved to “Downloads” folder.<br>
          Keep your key-pair in a safe place before connect to the internet.
        </span>
      </template>
    </notification>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { lazyComponent } from '@/router'

export default {
  name: 'Keypair',
  components: {
    Notification: lazyComponent('common/Notification')
  },
  data () {
    return {
      appName: this.$electron.remote.process.env['APP_NAME'],
      info: {
        privateKey: '',
        publicKey: ''
      },
      isNotificationVisible: false
    }
  },
  created () {
    this.generateKeyPair()
      .then(info => {
        this.info = { ...info }
      })
  },
  methods: {
    ...mapActions([
      'generateKeyPair',
      'saveKeys'
    ]),
    onGenerateKeyPair () {
      this.generateKeyPair()
        .then(info => {
          this.info = { ...info }
        })
    },
    onSaveKeys () {
      const path = this.$electron.remote.app.getPath('downloads')
      this.saveKeys({
        ...this.info,
        path,
        appName: this.appName
      })
        .then(() => {
          this.isNotificationVisible = true
        })
    }
  }
}
</script>

<style scoped>
.keypair {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.header {
  padding: 2rem 2rem 0rem 2rem;
}
.header > .header_msg {
  font-family: 'IBM Plex Sans Regular';
  padding-bottom: 0.5rem;
}
.content {
  padding: 0rem 2rem;
}
.actions {
  padding: 2rem;
  margin-top: 9rem;
}
.tooltip {
  line-height: 1;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
}
.keypair >>> .el-divider {
  background: #ebebeb !important;
  margin: 0px;
}
</style>
