<template>
  <BasicInput
    class="main-input"
    placeholder="Enter the main idea..."
    :autofocus="true"
    @update="$emit('update', $event)"
  />
</template>

<script>
import BasicInput from './BasicInput'

export default {
  name: 'MainInput',
  components: { BasicInput },
}
</script>

<style lang="scss" scoped>
.main-input {
  display: block;
  width: 60rem;
  height: 4rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 2.5rem;
  padding: 1rem;
  margin: 0;
}
</style>
