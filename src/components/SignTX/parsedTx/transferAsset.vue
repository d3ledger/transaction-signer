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
      v-if="tx[0].params.srcAccountId"
      class="row"
    >
      <span>Sender</span>
      <span>{{ tx[0].params.srcAccountId }}</span>
    </div>
    <div
      v-if="tx[0].params.destAccountId"
      class="row"
    >
      <span>Receiver</span>
      <span>{{ tx[0].params.destAccountId }}</span>
    </div>
    <el-divider />
    <div
      v-if="tx[0].params.amount"
      class="row"
    >
      <span>Amount <span v-if="tx[2]">(give)</span></span>
      <span>{{ tx[0].params.amount }} {{ getAssetName(tx[0].params.assetId) }}</span>
    </div>
    <div
      v-if="tx[0].params.amount"
      class="row"
    >
      <span>Fee</span>
      <span>{{ feeAmount }} {{ getAssetName(tx[0].params.assetId) }}</span>
    </div>
    <el-divider />
    <div
      v-if="total > 0"
      class="row last"
    >
      <span>Total <span v-if="tx[2]">give</span></span>
      <span>{{ total }} {{ getAssetName(tx[0].params.assetId) }}</span>
    </div>
    <div
      v-if="tx[2]"
      class="row last"
    >
      <span>Total recieve</span>
      <span>{{ tx[2].params.amount }} {{ getAssetName(tx[2].params.assetId) }}</span>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import BigNumber from 'bignumber.js'
BigNumber.set({ EXPONENTIAL_AT: [-19, 20] })

export default {
  props: {
    tx: {
      type: Array,
      required: true,
      default: () => [{}]
    }
  },
  computed: {
    feeAmount () {
      return this.tx[1] ? this.tx[1].params.amount : 0
    },
    total () {
      return BigNumber(this.tx[0].params.amount || 0).plus(this.feeAmount)
    }
  },
  methods: {
    format (...args) {
      return format(...args)
    },
    getAssetName (assetId) {
      return assetId ? assetId.split('#')[0] : ''
    },
  }
}
</script>
