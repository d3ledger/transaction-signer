<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div class="menu">
    <el-row>
      <el-col
        :span="12"
      >
        <div
          :class="[
            'tab',
            activeTab === 0 ? 'active' : ''
          ]"
          @click="onGoTo(0)"
        >
          <SvgIcon
            icon-name="KeyIcon"
            icon-class="menu-icon"
            height="12"
          >
            <KeyIcon />
          </SvgIcon>
          <span>Generate key-pair</span>
        </div>
      </el-col>
      <el-col
        :span="12"
      >
        <div
          :class="[
            'tab',
            activeTab === 1 ? 'active' : ''
          ]"
          @click="onGoTo(1)"
        >
          <SvgIcon
            icon-name="SignIcon"
            icon-class="menu-icon"
          >
            <SignIcon />
          </SvgIcon>
          <span>Sign transaction</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon'
import KeyIcon from '@/components/Dashboard/icons/KeyIcon'
import SignIcon from '@/components/Dashboard/icons/SignIcon'

const TABS = [{
  path: 'keypair'
}, {
  path: 'sign-tx'
}]

export default {
  name: 'MainMenu',
  components: {
    SvgIcon,
    KeyIcon,
    SignIcon
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    onGoTo (tabId) {
      this.activeTab = tabId
      this.$router.push(TABS[tabId].path)
    }
  }
}
</script>

<style scoped>
.tab {
  display: flex;
  justify-content: center;
  background: #000000;
  color: #ffffff;
  fill: #ffffff;
  padding: 0.9rem;
  height: 3rem;
  text-align: center;
  align-items: center;
  cursor: pointer;
}
.tab .menu-icon {
  display: block;
  margin-right: 0.6rem;
}
.tab.active {
  background: #ffffff;
  border-bottom: 1px solid #ebebeb;
  color: #000000;
}

</style>
