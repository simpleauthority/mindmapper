<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h2>
          {{ project.name }}
          <span
            ><b-button
              size="sm"
              pill
              variant="info"
              @click.prevent="openUpdateProjectNameModal"
              ><fa icon="edit" /></b-button
          ></span>
        </h2>
      </b-col>
      <b-col>
        <div class="text-right">
          <b-button variant="secondary" @click="goBackToAllProjects"
            >Back to All Projects</b-button
          >
          <b-button variant="success" @click="openExportProjectToPdfModal"
            >Export Project to PDF</b-button
          >
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <b-card no-body>
          <b-card-header>
            <b-row>
              <b-col>Main Idea / Thesis</b-col>
              <b-col>
                <b-button
                  size="sm"
                  pill
                  variant="info"
                  class="d-block ml-auto"
                  @click.prevent="openUpdateMainIdeaModal"
                  ><fa icon="edit"
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
    openExportProjectToPdfModal() {
      this.$bvModal.show('export-project-to-pdf-modal')
    },
    openUpdateProjectNameModal() {
      this.$bvModal.show('update-project-name-modal')
    },
    openUpdateMainIdeaModal() {
      this.$bvModal.show('update-main-idea-modal')
    },
  },
}
</script>
