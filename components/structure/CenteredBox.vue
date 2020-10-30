<template>
  <div class="centered-box--container">
    <div class="centered-box--box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CenteredBox',
}
</script>

<style lang="scss">
.centered-box--container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .centered-box--box {
    width: 70%;
    border: 2px dashed #acacac;
    padding: 2.5rem;
  }
}
</style>
