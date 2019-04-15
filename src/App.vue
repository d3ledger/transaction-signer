<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {}
  },
  created () {
    window.addEventListener('online', this.onHandleOnlineStatus)
    window.addEventListener('offline', this.onHandleOnlineStatus)

    // this.handleOnlineStatus(navigator.onLine)
    this.handleOnlineStatus(false)
  },
  methods: {
    ...mapActions([
      'handleOnlineStatus'
    ]),
    onHandleOnlineStatus () {
      this.handleOnlineStatus(navigator.onLine)
        .then(isOnline => {
          console.warn('APPLICATION ' + (isOnline ? 'ONLINE' : 'OFFLINE'))
          if (isOnline) this.$router.push('/')
        })
    }
  },
  computed: {
    ...mapGetters([
      'isApplicationOnline'
    ])
  }
}
</script>

<style>
@font-face {
  font-family: "IBM Plex Sans";
  src: url("assets/fonts/IBM_Plex_Sans/IBMPlexSans-Medium.ttf");
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.el-icon {
  font-family: element-icons !important;
}

[class^="el-"]:not(i):not([class*='el-icon']),
[class*="el-"]:not(i):not([class*='el-icon']) {
  font-family: 'IBM Plex Sans', sans-serif !important;
}

#app {
  font-family: 'IBM Plex Sans', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: #363636;
}

a {
  color: black;
  transition: opacity .15s ease-in-out;
  cursor: pointer;
  text-decoration: none;
}

a:hover {
  opacity: 0.8;
}

.sora-button {
  background-color: #ffffff !important;
  color: #000000            !important;
  border: 0                   !important;
  text-transform: uppercase   !important;
  border-radius: 2px          !important;
  font-size: 0.8rem           !important;
  line-height: 1rem           !important;
}

.sora-button.red {
  background-color: #e43e33 !important;
  color: #ffffff            !important;
}
.sora-button.black {
  background-color: #000000 !important;
  color: #ffffff            !important;
}

/*
 * Input
 */
#app .el-select {
  width: 100%;
}

#app .el-input__inner {
  background-color: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.8);
  border: 1px solid #dcdfe6;
  font-weight: 700;
  height: 4.5rem;
  padding-left: 1.2rem;
  padding-top: 1.2rem;
  line-height: 0;
  font-size: 1rem;
}

#app .el-input__inner:focus {
  border: 1px solid #dcdfe6;
  color: rgba(0, 0, 0, 0.8);
  background-color: #ffffff;
  opacity: 1;
}

#app .el-form-item {
  height: 4.4rem;
  margin-bottom: 32px;
}

#app .el-form-item__label {
  line-height: 1;
  position: relative;
  top: 2.5rem;
  z-index: 10;
  margin-left: 1.2rem;
  font-size: 0.8rem;
  opacity: 0.56;
  color: rgba(0, 0, 0, 0.8);;
}

/* #app .el-input--suffix input {
  padding-top: 0px;
} */

#app .el-input-group__append {
  background-color: #2d2d2d;
}

#app .el-input-group__append input {
  font-weight: normal
}

.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
</style>
