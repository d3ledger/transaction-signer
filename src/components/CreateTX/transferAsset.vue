<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <el-form label-position="top" label-width="100px" :model="params">
    <el-form-item label="Source account ID">
      <el-input v-model="params.srcAccountId"></el-input>
    </el-form-item>
    <el-form-item label="Destination account ID">
      <el-input v-model="params.destAccountId"></el-input>
    </el-form-item>
    <el-form-item label="Asset ID">
      <el-input v-model="params.assetId"></el-input>
    </el-form-item>
    <el-form-item label="Description">
      <el-input v-model="params.description"></el-input>
    </el-form-item>
    <el-form-item label="Amount">
      <el-input v-model="params.amount"></el-input>
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
