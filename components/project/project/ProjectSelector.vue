<template>
  <b-container v-if="hasAnyProjects">
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
        <b-card
          class="clickable-card"
          no-body
          @click="selectProject(project.id)"
        >
          <b-card-header>
            {{ project.name }} ({{ project.subIdeas.length }} sub-ideas)
          </b-card-header>
          <b-card-body>
            <b-card-text>
              <p>{{ project.mainIdea }}</p>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
  <CenteredBox v-else>
    <h2>You have no projects yet.</h2>
    <p>
      Usually this screen will show you all your projects, but it looks like you
      don't have any yet.
    </p>
    <b-button variant="success" @click="openCreateProjectModal"
      >Create one?</b-button
    >
  </CenteredBox>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import CenteredBox from '~/components/structure/CenteredBox'

export default {
  name: 'ProjectSelector',
  components: { CenteredBox },
  computed: {
    ...mapState({
      projects: (state) => state.ls.projects,
    }),
    hasAnyProjects() {
      return !_.isEmpty(this.projects)
    },
  },
  methods: {
    openCreateProjectModal() {
      this.$bvModal.show('create-project-modal')
    },
    selectProject(projectId) {
      this.$store.commit('updateCurrentProjectId', projectId)
    },
  },
}
</script>
