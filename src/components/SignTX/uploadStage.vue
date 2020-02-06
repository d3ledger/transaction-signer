<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <el-upload
    class="upload-transaction fullwidth"
    drag
    action=""
    :multiple="false"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="(f, l) => uploadFunc(f, l)"
    accept=".zip, .draft"
    list-type="text"
  >
    <i class="el-icon-upload" />
    <div class="el-upload__text fullwidth">
      Drop transaction draft file (.draft) here or <b>click to upload</b>
    </div>
  </el-upload>
</template>

<script>
export default {
  props: {
    uploadFunc: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
