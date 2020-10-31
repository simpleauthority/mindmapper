<template>
  <b-container v-if="hasAnyProjects">
    <b-row class="mb-3">
      <b-col>
        <p>
          You have {{ projects.length }} project(s). Choose one to enter the
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
        <b-card class="clickable-card" no-body>
          <b-card-header>
            <b-row>
              <b-col>
                <a href="#" @click.prevent="selectProject(project.id)"
                  >{{ project.name }} ({{
                    project.subIdeas.length
                  }}
                  sub-ideas)</a
                >
              </b-col>
              <b-col>
                <b-button
                  class="d-block ml-auto"
                  variant="danger"
                  size="sm"
                  @click="openConfirmProjectDeletionModal(project.id)"
                  ><fa icon="trash"
                /></b-button>
              </b-col>
            </b-row>
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
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
import CenteredBox from '~/components/structure/CenteredBox'

export default {
  name: 'ProjectSelector',
  components: { CenteredBox },
  computed: {
    ...mapState({
      projects: (state) => state.ls.projects,
    }),
    ...mapGetters(['getProjectById']),
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
    async openConfirmProjectDeletionModal(projectId) {
      try {
        const resp = await this.$bvModal.msgBoxConfirm(
          `Are you sure you want to delete the project "${
            this.getProjectById(projectId).name
          }"? This will also delete all sub-ideas, counterpoints, and rebuttals. There is no going back.`
        )
        // eslint-disable-next-line no-console
        console.log(resp)
        if (resp) {
          this.$store.commit('removeProject', projectId)
        }
      } catch {
        this.$bvModal.msgBoxOk(
          'There was an error deleting the project. Please try again later.'
        )
      }
    },
  },
}
</script>
