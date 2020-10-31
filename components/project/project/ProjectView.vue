<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h2>{{ project.name }}</h2>
      </b-col>
      <b-col>
        <b-button
          class="d-block ml-auto"
          variant="info"
          @click="goBackToAllProjects"
          >Back to All Projects</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <b-card no-body>
          <b-card-header>Main Idea / Thesis</b-card-header>
          <b-card-body>
            <b-card-text>
              <p>{{ project.mainIdea }}</p>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <SubIdeaSelector />
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SubIdeaSelector from '~/components/project/subidea/SubIdeaSelector'

export default {
  name: 'ProjectView',
  components: { SubIdeaSelector },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasCurrentSubIdea() {
      return !!this.$store.state.app.currentSubIdeaId
    },
    ...mapGetters(['getProjectById', 'getSubIdeaById']),
  },
  methods: {
    goBackToAllProjects() {
      this.$store.commit('resetAllCurrentIds')
    },
  },
}
</script>
