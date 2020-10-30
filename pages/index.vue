<template>
  <ProjectView v-if="hasCurrentProject" />
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
import ProjectView from '~/components/project/ProjectView'
import CenteredBox from '~/components/structure/CenteredBox'

export default {
  components: { ProjectView, CenteredBox },
  computed: {
    hasCurrentProject() {
      return !!this.$store.state.app.currentProjectId
    },
  },
  methods: {
    openCreateProjectModal() {
      this.$bvModal.show('create-project-modal')
    },
  },
}
</script>
