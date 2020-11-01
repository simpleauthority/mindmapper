<template>
  <div>
    <b-navbar variant="transparent">
      <b-container>
        <b-navbar-brand>
          <h1 class="brand" @click.prevent="resetView">mindmapper</h1>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click.prevent="resetView">My Projects</b-nav-item>
          <b-nav-item @click.prevent="openHelp">Help</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    resetView() {
      this.$store.commit('resetAllCurrentIds')
    },
    openHelp() {
      this.$bvModal.show('help-modal')
    },
  },
}
</script>

<style lang="scss" scoped>
.brand {
  font-family: 'Grandstander', cursive;
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
}
</style>
