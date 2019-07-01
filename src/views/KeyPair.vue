<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div class="wrapper">
    <el-card>
      <div slot="header" class="clearfix">
        <span>Generate key pair</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">
          Back
        </el-button>
      </div>
      <div class="content">
        <el-form label-position="top" :model="info">
          <el-form-item label="Private key">
            <el-input v-model="info.privateKey" disabled></el-input>
          </el-form-item>
          <el-form-item label="Public key">
            <el-input v-model="info.publicKey" disabled></el-input>
          </el-form-item>
        </el-form>
        <div class="actions">
          <el-button class="sora-button red" @click="onGenerateKeyPair">Generate new</el-button>
          <el-button class="sora-button black" @click="onSaveKeys">Save</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'keypair',
  data () {
    return {
      info: {
        privateKey: '',
        publicKey: ''
      }
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
    goBack () {
      this.$router.push('/dashboard')
    },
    onGenerateKeyPair () {
      this.generateKeyPair()
        .then(info => {
          this.info = { ...info }
          this.$message('New key pair generated!')
        })
    },
    onSaveKeys () {
      const path = this.$electron.remote.app.getPath('downloads')
      this.saveKeys({
        ...this.info,
        path
      })
        .then(() => {
          this.$message('Saved to download folder!')
        })
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 2rem
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
</style>
