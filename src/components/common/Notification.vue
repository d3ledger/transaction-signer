<template>
  <div
    v-show="isVisible"
    class="notification"
  >
    <div class="logo">
      <img src="@/assets/icons/lock.svg">
    </div>
    <div class="msg_list">
      <slot name="message" />
    </div>
    <div class="actions">
      <el-button
        class="app_button white"
        @click="onClose"
      >
        Done
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    onClose () {
      this.$emit('update:isVisible', false)
    }
  }
}
</script>

<style scoped>
.notification {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 2.5%;
  top: 0%;

  width: 95%;

  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 0 0 0.6rem 0.6rem;
  padding: 0.8rem 1rem;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
}

.msg_list {
  font-family: 'IBM Plex Sans Regular';
  font-size: 1.1rem;
}
</style>
