<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div class="dashboard">
    <Menu />
    <router-view />
  </div>
</template>

<script>
import { lazyComponent } from '@/router'

export default {
  name: 'Dashboard',
  components: {
    Menu: lazyComponent('Dashboard/Menu')
  }
}
</script>

<style scoped>
.dashboard {
  background-color: #ffffff;
}
</style>
