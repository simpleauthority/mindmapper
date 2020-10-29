<template>
  <b-container>
    <header class="text-center mb-3">
      <h1>mindmapper</h1>
      <h4>module two project</h4>
    </header>
    <section id="main-idea" class="mb-3">
      <MainInput class="mx-auto" @update="onMainIdea" />
    </section>
    <section id="offshoots">
      <OffshootContainer :has-main-idea="hasMainIdea" />
    </section>
  </b-container>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import MainInput from '~/components/MainInput'
import OffshootContainer from '~/components/OffshootContainer'

export default {
  components: { MainInput, OffshootContainer },
  computed: {
    ...mapState(['main_idea']),
    hasMainIdea() {
      return _.isString(this.main_idea)
    },
  },
  methods: {
    onMainIdea(data) {
      this.$store.dispatch('setMainIdea', data)
    },
  },
}
</script>
