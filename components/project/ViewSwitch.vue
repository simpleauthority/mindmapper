<template>
  <!-- View current Rebuttal, Counterpoint, SubIdea, Projectin order -->
  <RebuttalView
    v-if="hasCurrentRebuttal"
    :project="currentProject"
    :sub-idea="currentSubIdea"
    :counterpoint="currentCounterpoint"
    :rebuttal="currentRebuttal"
  />
  <CounterpointView
    v-else-if="hasCurrentCounterpoint"
    :project="currentProject"
    :sub-idea="currentSubIdea"
    :counterpoint="currentCounterpoint"
  />
  <SubIdeaView
    v-else-if="hasCurrentSubIdea"
    :project="currentProject"
    :sub-idea="currentSubIdea"
  />
  <ProjectView v-else-if="hasCurrentProject" :project="currentProject" />
  <!-- Select project otherwise -->
  <ProjectSelector v-else />
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'
import RebuttalView from '~/components/project/rebuttal/RebuttalView'
import CounterpointView from '~/components/project/counterpoint/CounterpointView'
import SubIdeaView from '~/components/project/subidea/SubIdeaView'
import ProjectView from '~/components/project/project/ProjectView'
import ProjectSelector from '~/components/project/project/ProjectSelector'

export default {
  name: 'ViewSwitch',
  components: {
    RebuttalView,
    CounterpointView,
    SubIdeaView,
    ProjectView,
    ProjectSelector,
  },
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
      currentSubIdeaId: (state) => state.app.currentSubIdeaId,
      currentCounterpointId: (state) => state.app.currentCounterpointId,
      currentRebuttalId: (state) => state.app.currentRebuttalId,
      projects: (state) => state.ls.projects,
    }),
    ...mapGetters([
      'getProjectById',
      'getSubIdeaById',
      'getCounterpointById',
      'getRebuttalById',
    ]),
    hasCurrentProject() {
      return !!this.currentProjectId
    },
    hasCurrentSubIdea() {
      return !!this.currentSubIdeaId
    },
    hasCurrentCounterpoint() {
      return !!this.currentCounterpointId
    },
    hasCurrentRebuttal() {
      return !!this.currentRebuttalId
    },
    currentProject() {
      if (!this.currentProjectId) return undefined
      return this.getProjectById(this.currentProjectId)
    },
    currentSubIdea() {
      if (!this.currentProjectId || !this.currentSubIdeaId) return undefined
      return this.getSubIdeaById(this.currentProjectId, this.currentSubIdeaId)
    },
    currentCounterpoint() {
      if (
        !this.currentProjectId ||
        !this.currentSubIdeaId ||
        !this.currentCounterpointId
      )
        return undefined
      return this.getCounterpointById(
        this.currentProjectId,
        this.currentSubIdeaId,
        this.currentCounterpointId
      )
    },
    currentRebuttal() {
      if (
        !this.currentProjectId ||
        !this.currentSubIdeaId ||
        !this.currentCounterpointId ||
        !this.currentRebuttalId
      )
        return undefined
      return this.getRebuttalById(
        this.currentProjectId,
        this.currentSubIdeaId,
        this.currentCounterpointId,
        this.currentRebuttalId
      )
    },
    hasAnyProjects() {
      return !_.isEmpty(this.projects)
    },
    hasAnySubIdeas() {
      if (!this.currentProject) return false
      return !_.isEmpty(this.currentProject.subIdeas)
    },
    hasAnyCounterpoints() {
      if (!this.currentSubIdea) return false
      return !_.isEmpty(this.currentSubIdea.counterpoints)
    },
    hasAnyRebuttals() {
      if (!this.currentCounterpoint) return false
      return !_.isEmpty(this.currentCounterpoint.rebuttals)
    },
  },
}
</script>
