<template>
  <client-only>
    <ViewSwitch v-if="loaded" />
  </client-only>
</template>

<script>
export default {
  computed: {
    loaded() {
      return this.$store.state.ls.status
    },
  },
}
</script>
