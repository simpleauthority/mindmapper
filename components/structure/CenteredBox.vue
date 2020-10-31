<template>
  <div class="center-container">
    <div class="centered-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CenteredBox',
}
</script>

<style lang="scss" scoped>
.center-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .centered-box {
    width: 70%;
    border: 2px dashed #acacac;
    padding: 2.5rem;
  }
}
</style>
