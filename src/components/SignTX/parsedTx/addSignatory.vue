<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div style="padding: 2rem">
    <div class="row first">
      <span>Time</span>
      <span>{{ format(tx[0].time, 'HH:mm:ss MM/DD/YYYY') }} </span>
    </div>
    <el-divider />
    <div
      v-if="tx[0].params.accountId"
      class="row"
    >
      <span>Sender</span>
      <span>{{ tx[0].params.accountId }}</span>
    </div>
    <el-divider />
    <div
      v-if="tx[0].params.publicKey"
      class="row"
    >
      <span>Public key</span>
      <span>{{ tx[0].params.publicKey }}</span>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'

export default {
  props: {
    tx: {
      type: Array,
      required: true,
      default: () => [{}]
    }
  },
  methods: {
    format (...args) {
      return format(...args)
    }
  }
}
</script>
