<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <el-form
    label-position="top"
    label-width="100px"
    :model="params"
  >
    <el-form-item label="Account ID">
      <el-input v-model="params.accountId" />
    </el-form-item>
    <el-form-item label="Public key">
      <el-input v-model="params.publicKey" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
