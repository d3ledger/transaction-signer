<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'isApplicationOnline'
    ])
  },
  created () {
    window.addEventListener('online', this.onHandleOnlineStatus)
    window.addEventListener('offline', this.onHandleOnlineStatus)

    this.handleOnlineStatus(navigator.onLine)
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
  }
}
</script>

<style>
@font-face {
  font-family: "IBM Plex Sans";
  src: url("assets/fonts/IBM_Plex_Sans/IBMPlexSans-Medium.ttf");
}

@font-face {
  font-family: "IBM Plex Sans Regular";
  src: url("assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf");
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

.el-tooltip__popper.is-light {
  border-radius: 0.5rem;
  /* border: solid 1px #cdcdcd !important; */
}

[id^="el-tooltip-"],
[id*="el-tooltip-"] {
  font-family: 'IBM Plex Sans Regular' !important;
  width: 24rem;
  font-size: 1rem !important;
}

[class^="el-"]:not(i):not([class*='el-icon']):not([class*='el-tooltip']),
[class*="el-"]:not(i):not([class*='el-icon']):not([class*='el-tooltip']) {
  font-family: 'IBM Plex Sans', sans-serif;
}

#app {
  font-family: 'IBM Plex Sans', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: #ffffff;
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
  background: #ffffff !important;
  color: #000000            !important;
  border: 0                   !important;
  text-transform: uppercase   !important;
  border-radius: 2px          !important;
  font-size: 0.8rem           !important;
  line-height: 1rem           !important;
}

.sora-button.red {
  background: #e43e33 !important;
  color: #ffffff            !important;
}
.sora-button.black {
  background: #000000 !important;
  color: #ffffff            !important;
}

.app_button {
  background: #282828  !important;
  color: #FFFFFF             !important;
  border: 0                    !important;
  text-transform: uppercase    !important;
  border-radius: 10px          !important;
  font-size: 0.8rem            !important;
  line-height: 1rem            !important;
  padding: 1.2rem 1.5rem       !important;
}

.app_button.black {
  background: #000000 !important;
  border: solid 1px #000000 !important;
}

.app_button.white {
  background: #ffffff !important;
  border: solid 1px #000000 !important;
  color: #000000            !important;
}

.app_button:hover {
  transform: scale(1.05);
}

.app_button:hover .app_button_icon {
  animation: spin 0.1s linear forwards;
}

@keyframes spin {
  100% {
    transform: rotate(180deg);
  }
}

.app_button span {
  display: flex;
  justify-content: center;
}

.app_button_icon {
  display: block;
  height: 1rem;
  width: 1rem;
  margin-right: 0.9rem;
}

.fullwidth {
  width: 100%;
}

#app .el-divider {
  background: #333333;
}

/*
 * Input
 */
#app .el-select {
  width: 100%;
}

#app .el-input__inner {
  background: #f2f2f2;
  color: #000000;
  border: 1px solid #cdcdcd;
  border-radius: 0.8rem;
  font-weight: 500;
  height: 4.2rem;
  padding-left: 1.2rem;
  padding-top: 1.2rem;
  line-height: 0;
  font-size: 0.9rem;
}

#app .el-input__inner:focus {
  border: 1px solid #cdcdcd;
  color: rgba(0, 0, 0, 0.8);
  background: #ffffff;
  opacity: 1;
}

#app .el-form-item {
  height: 4.4rem;
  margin-bottom: 0.9rem;
}

#app .el-form-item__label {
  font-family: 'IBM Plex Sans Regular';
  line-height: 1;
  position: relative;
  top: 2.5rem;
  z-index: 10;
  margin-left: 1.2rem;
  font-size: 0.9rem;
  color: #000000;
}

/* #app .el-input--suffix input {
  padding-top: 0px;
} */

#app .el-input-group__append {
  background: #2d2d2d;
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
