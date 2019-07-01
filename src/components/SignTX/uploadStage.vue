<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <el-upload
    v-if="!rawTx"
    class="upload-transaction fullwidth"
    drag
    action=""
    :multiple="false"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="(f, l) => uploadFunc(f, l)"
    list-type="text"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text fullwidth">Drop file here or <em>click to upload</em></div>
  </el-upload>
  <div
    v-else
    class="transaction"
  >{{ parsedTx }}</div>
</template>

<script>
export default {
  props: {
    rawTx: {
      type: Object
    },
    uploadFunc: {
      type: Function,
      required: true
    },
    parsedTx: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
