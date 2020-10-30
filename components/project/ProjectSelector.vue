<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <p>
          You have {{ projects.length }} project(s). Click one to enter the
          project viewer.
        </p>
      </b-col>
      <b-col>
        <b-button
          class="d-block ml-auto"
          variant="success"
          @click="openCreateProjectModal"
          >Create another project</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="(project, idx) in projects"
        :key="'project-card-' + idx"
        cols="6"
        class="mb-3"
      >
        <b-card>
          {{ project }}
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProjectSelector',
  computed: mapState({
    projects: (state) => state.ls.projects,
  }),
  methods: {
    openCreateProjectModal() {
      this.$bvModal.show('create-project-modal')
    },
  },
}
</script>
