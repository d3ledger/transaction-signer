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
    <el-form-item
      label="Private key"
    >
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="24">
          <el-input
            v-model="sign.privateKey"
            class="form_input-upload"
            name="privateKey"
            placeholder="Upload your private key"
            type="password"
          />
          <el-upload
            action=""
            class="form_upload-button"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="(file, fileList) => onFileChosen(file, fileList)"
          >
            <el-button>
              <img
                src="@/assets/icons/download.svg"
                alt=""
                srcset=""
              >
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
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

.form_upload-button >>> .el-button,
.form_upload-button >>> .el-button:focus {
  width: 3.5rem;
  height: 4.2rem;
  border: 1px solid #000000;
  background: #ffffff;
  color: #000000;
  padding: 0;
  font-size: 0.8rem;
  border-radius: 0.8rem;
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
}
</style>
