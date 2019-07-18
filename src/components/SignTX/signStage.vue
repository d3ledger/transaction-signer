<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <el-form
    label-position="top"
    label-width="100px"
    :model="sign"
  >
    <el-form-item label="Private key">
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="22">
          <el-input
            v-model="sign.privateKey"
            class="form_input-upload"
            name="privateKey"
            placeholder="Upload your private key"
            type="password"
          />
        </el-col>
        <el-upload
          action=""
          class="form_upload"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onFileChosen"
        >
          <el-button>
            <fa-icon icon="upload" />
          </el-button>
        </el-upload>
      </el-row>
    </el-form-item>
    <el-form-item label="Quorum">
      <el-input
        v-model="sign.quorum"
        name="quorum"
        placeholder="Set your account quorum"
      />
    </el-form-item>
    <el-form-item label="Account ID">
      <el-input
        v-model="sign.creatorAccountId"
        name="accountId"
        placeholder="Set your account id"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    sign: {
      type: Object,
      required: true
    }
  },
  methods: {
    onFileChosen (file, fileList) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        this.sign.privateKey = (ev.target.result || '').trim()
      }
      reader.readAsText(file.raw)
    }
  }
}
</script>

<style scoped>
.form_input-upload >>> .el-input__inner {
  border-radius: 0.3rem 0 0 0.3rem;
}

.form_upload >>> .el-button,
.form_upload >>> .el-button:focus {
  width: 3.8rem;
  height: 4.5rem;
  border: 1px solid #dcdfe6;
  border-left: 0px;
  background-color: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.8);
  padding: 0;
  font-size: 1.2rem;
  border-radius: 0 0.3rem 0.3rem 0;
}

.form_upload >>> .el-button:hover {
  border: 1px solid #dcdfe6;
  border-left: 0px;
  color: rgba(0, 0, 0, 0.8);
  background-color: #ffffff;
  opacity: 1;
}
</style>
