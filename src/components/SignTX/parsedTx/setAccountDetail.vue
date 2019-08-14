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
      v-if="tx[0].params.key && tx[0].params.key.includes('_whitelist')"
      class="row"
    >
      <span v-if="tx[0].params.key.includes('btc')">BTC Address</span>
      <span v-if="tx[0].params.key.includes('eth')">ETH Address</span>
      <span>{{ getLastAddress(tx[0].params.value) }}</span>
    </div>
    <div
      v-if="tx[0].params.key && tx[0].params.key.includes('email')"
      class="row"
    >
      <span>Email</span>
      <span>{{ tx[0].params.value }}</span>
    </div>
    <div
      v-if="tx[0].params.key && tx[0].params.key.includes('notifications')"
      class="row"
    >
      <span>Notifications</span>
      <span>{{ tx[0].params.value ? 'ACTIVATE' : 'DIACTIVATE' }}</span>
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
    },
    getLastAddress (value) {
      // eslint-disable-next-line
      return JSON.parse(value.replace(/\\\"/g, '"')).pop()
    }
  }
}
</script>
