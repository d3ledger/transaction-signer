<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div class="menu">
    <div class="logo">
      <img src="@/assets/icons/logo.svg"/>
    </div>
    <div>
      <el-row class="menu-list">
        <el-col :span="8" class="menu-list_col">
          <div class="grid-content white" @click="goTo('/keypair')">
            <div class="action-tab">
              <p class="action-tab_title">Create key-pair</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="menu-list_col">
          <div class="grid-content white" @click="goTo('/create-tx')">
            <div class="action-tab">
              <p class="action-tab_title">Create transaction</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="menu-list_col">
          <div class="grid-content white" @click="goTo('/sign-tx')">
            <div class="action-tab">
              <p class="action-tab_title">Sign transaction</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  methods: {
    goTo (to) {
      this.$router.push(to)
    }
  }
}
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  padding: 2rem;
  margin-bottom: 1rem;
}
.white {
  background: #ffffff;
}
.grid-content {
  display: flex;
  justify-content: center;
  border-radius: 50px 0;
  height: 10rem;
  width: 13rem;
  animation: zoomOut 1s cubic-bezier(0.280, 0.840, 0.420, 1) forwards;
}
.grid-content:hover {
  cursor: pointer;
  animation: zoomIn 1s cubic-bezier(0.280, 0.840, 0.420, 1) forwards;
}
.icon {
  padding-top: 0.5rem;
  padding-left: 9.5rem;
  font-size: 1.5rem;
  text-align: center;
  color: #e43e33;
}
.action-tab {
  text-align: center;
  width: 13rem;
  margin: auto;
  font-size: 0.7rem;
  text-transform: uppercase;
  background-color: #000000;
  color: #ffffff;
}
.action-tab_title {
  padding: 0.7rem;
}
.menu-list {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}
.menu-list_col {
  width: unset;
}

@keyframes zoomIn {
  0% {
    transform: scale(1,1)
  }
  20% {
    transform: scale(0.90,0.90)
  }
  100% {
    transform: scale(1.2,1.2)
  }
}
@keyframes zoomOut {
  0% {
    transform: scale(1.2,1.2)
  }
  100% {
    tranform: scale(1,1)
  }
}
</style>
