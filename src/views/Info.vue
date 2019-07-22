<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div class="info_wrapper">
    <div class="logo_wrapper">
      <div class="logo">
        <img src="@/assets/icons/lock.svg">
      </div>
      <el-button
        class="app_button"
        @click="handleContinue"
      >
        Get started
      </el-button>
    </div>
    <div class="info">
      <p class="info_title">
        Please keep in mind
      </p>
      <el-divider />
      <ul class="info_list">
        <li class="info_list-msg">
          We could not reverse or refund a transaction unless there were a security breach.
        </li>
        <li class="info_list-msg">
          You are solely responsible for the safety of your private keys.
        </li>
        <li class="info_list-msg">
          That’s why we are forcing you to go offline for transaction creation and signing.
        </li>
      </ul>
    </div>
    <div class="info_actions">
      <el-switch
        v-model="isShowing"
        class="info_actions-radio"
        active-color="#1b8bff"
        inactive-color="#282828"
        :active-value="false"
        :inactive-value="true"
      />
      <span class="info_actions-msg">Don’t show it again</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Information',
  localStorage: {
    showInfoPage: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isShowing: true
    }
  },
  beforeCreate () {
    if (!this.$localStorage.get('showInfoPage')) this.$router.push('/dashboard')
  },
  methods: {
    handleContinue () {
      if (!this.isShowing) {
        this.$localStorage.set('showInfoPage', this.isShowing)
      }
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.info_wrapper {
  background: #000000;
  height: 100vh;
}
.logo_wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.logo_wrapper > .app_button {
  position: absolute;
  top: 2rem;
  right: 2rem;
}
.info_title {
  color: #d8d8d8;
  text-align: center;
  font-size: 1.3rem;
}
.info_list {
  font-family: 'IBM Plex Sans Regular';
  color: #d8d8d8;
  list-style-type: none;
  margin-bottom: 16rem;
}
.info_list > li::before {
  content: '\2022';
  position: absolute;
  left: 1.5rem;
  font-size: 1.7rem;
  line-height: 1rem;
}
.info_list > .info_list-msg {
  margin-bottom: 0.5rem;
}
.info_actions {
  display: flex;
  justify-content: center;
  align-items: center;
}
.info_actions-radio {
  transform: scale(1.2);
  margin-right: 1rem;
}
.info_actions-msg {
  text-transform: uppercase;
  color: #ffffff;
  font-size: 0.8rem;
}
</style>
