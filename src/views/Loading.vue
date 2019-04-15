<template>
  <div class="loading_wrapper">
    <div class="logo">
      <img src="@/assets/icons/logo.svg"/>
    </div>
    <div class="loader">
      <div class="loader_text">{{ loadingText }}</div>
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="currentPercent"
        color="rgba(255, 255, 255, 0.7)"
        :show-text="false"
      ></el-progress>
      <div class="loader_error" v-if="currentPercent >= 100 && isApplicationOnlineTemp">
        <el-button class="sora-button red" @click="checkConnection">Try again!</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'loading',
  data () {
    return {
      currentPercent: 0,

      loadingInterval: null,
      isApplicationOnlineTemp: true
    }
  },
  created () {
    this.checkConnection()
  },
  computed: {
    ...mapGetters([
      'isApplicationOnline'
    ]),
    loadingText () {
      const words = [
        'Loading... ⌛',
        'Checking...  ♾️',
        'Preparing... 🔨',
        'Ready! ❤️',
        'Connection discovered! 🤭',
        'Thinking... 🤔'
      ]
      if (this.currentPercent <= 50) return words[0]
      if (this.currentPercent <= 75) return words[1]
      if (this.currentPercent < 100) return words[2]
      if (this.currentPercent === 100 && !this.isApplicationOnlineTemp) return words[3]
      if (this.currentPercent === 100 && this.isApplicationOnlineTemp) return words[4]
      return words[5]
    }
  },
  methods: {
    checkConnection () {
      this.currentPercent = 0

      this.isApplicationOnlineTemp = this.isApplicationOnline

      this.loadingInterval = setInterval(() => {
        if (this.currentPercent >= 100) {
          clearInterval(this.loadingInterval)

          if (this.isApplicationOnline) {
            this.$message({
              type: 'error',
              dangerouslyUseHTMLString: true,
              message: `
                You connected to the Internet.</br>
                Please check that your connection is off and try again!
              `
            })
            return
          }

          if (!this.isApplicationOnline) {
            this.$router.push('/dashboard')
          }

          return
        }
        this.currentPercent += 10
      }, 1 * 500)
    }
  }
}
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.loader {
  margin-top: 10%
}
.loader_text {
  text-align: center;
  padding: 1rem;
  color: white;
  text-transform: uppercase;
}
.loader_error {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}
.loader >>> .el-progress-bar__outer {
  background-color: #565656;
  border-radius: 0;
}
.loader >>> .el-progress-bar__inner {
  border-radius: 0;
}
</style>
