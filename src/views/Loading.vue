<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div class="loading_wrapper">
    <div class="logo">
      <img
        src="@/assets/icons/logo-sora.svg"
      >
      <!-- <img
        v-else
        src="@/assets/icons/logo-d3.svg"
      > -->
    </div>
    <div class="loader">
      <div class="loader_title">
        <span class="loader_icon">{{ loadingText.icon }}</span>
        <div class="loader_text">
          {{ loadingText.text }}
        </div>
        <div
          v-if="loadingText.description"
          class="loader_desc"
        >
          {{ loadingText.description }}
        </div>
      </div>
      <el-progress
        class="loader_percent"
        :stroke-width="10"
        :percentage="currentPercent"
        color="rgba(216, 216, 216, 1)"
        :show-text="false"
      />
      <div
        v-if="currentPercent >= 100 && isApplicationOnlineTemp"
        class="loader_error"
      >
        <el-button
          class="app_button"
          @click="checkConnection"
        >
          <img
            src="@/assets/icons/reload.svg"
            class="app_button_icon"
          >
          Try again
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Loading',
  data () {
    return {
      currentPercent: 0,
      loadingInterval: null,
      isApplicationOnlineTemp: true
    }
  },
  computed: {
    ...mapGetters([
      'isApplicationOnline'
    ]),
    loadingText () {
      const title = [
        {
          text: 'Loading...',
          icon: '⏳'
        }, {
          text: 'Checking...',
          icon: '🔍'
        }, {
          text: 'Preparing...',
          icon: '🛠️'
        }, {
          text: 'Ready',
          icon: '🚀'
        }, {
          text: 'Please turn off internet connection',
          icon: '📡',
          description: 'You are now online. To ensure the safety of your pricate keys, please turn off Wi-Fi or LAN connection.'
        }
      ]

      if (this.currentPercent <= 50) return title[0]
      if (this.currentPercent <= 75) return title[1]
      if (this.currentPercent < 100) return title[2]
      if (this.currentPercent === 100 && !this.isApplicationOnlineTemp) return title[3]
      if (this.currentPercent === 100 && this.isApplicationOnlineTemp) return title[4]
      return title[4]
    }
  },
  created () {
    this.checkConnection()
  },
  methods: {
    checkConnection () {
      this.currentPercent = 0

      this.isApplicationOnlineTemp = this.isApplicationOnline

      this.loadingInterval = setInterval(() => {
        if (this.currentPercent >= 100) {
          clearInterval(this.loadingInterval)

          if (this.isApplicationOnline) {
            return
          }

          if (!this.isApplicationOnline) {
            this.$router.push('/information')
          }

          return
        }
        this.currentPercent += 10
      }, 1 * 250)
    }
  }
}
</script>

<style scoped>
.loading_wrapper {
  background: #000000;
  height: 100vh;
}
.logo {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.loader {
  margin-top: 5%;
}
.loader_title {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.loader_icon {
  text-align: center;
  font-size: 1.2rem;
}
.loader_text {
  text-align: center;
  padding: 1rem;
  color: white;
  font-size: 1.2rem;
}
.loader_desc {
  font-family: 'IBM Plex Sans Regular';
  text-align: center;
  color: white;
  font-size: 1rem;
  padding: 0 25% 1rem;
}
.loader_percent {
  width: 40%;
  margin: 0 auto;
}
.loader_error {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.loader >>> .el-progress-bar__outer {
  background: #333333;
}
</style>
