<template>
  <b-row class="mb-3">
    <b-col>
      <b-card no-body>
        <b-card-header>
          <b-row>
            <b-col>Sub-ideas</b-col>
            <b-col>
              <b-button
                class="d-block ml-auto"
                variant="info"
                size="sm"
                pill
                @click="openSubIdeaHelpModal"
                ><fa icon="question-circle"
              /></b-button>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body>
          <b-row class="mb-3">
            <b-col>
              <p>
                You have
                {{ subIdeas.length }}
                sub-idea(s). Click one to enter the sub-idea viewer.
              </p>
            </b-col>
            <b-col>
              <b-button
                class="d-block ml-auto"
                variant="success"
                size="sm"
                @click="openCreateSubIdeaModal"
                >Create Sub-idea</b-button
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col
              v-for="(subIdea, idx) in subIdeas"
              :key="'sub-idea-card-' + idx"
              cols="6"
              class="mb-3"
            >
              <b-card
                class="clickable-card"
                no-body
                @click="selectSubIdea(subIdea.id)"
              >
                <b-card-header
                  >Sub-idea {{ idx + 1 }} (0 counterpoints)</b-card-header
                >
                <b-card-body>
                  <b-card-text>
                    <p>{{ subIdea.text }}</p>
                  </b-card-text>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'SubIdeaSelector',
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
    }),
    ...mapGetters(['getProjectById', 'getSubIdeaById']),
    currentProject() {
      return this.getProjectById(this.currentProjectId)
    },
    subIdeas() {
      return this.currentProject.subIdeas
    },
  },
  methods: {
    openSubIdeaHelpModal() {
      this.$bvModal.show('sub-idea-help-modal')
    },
    openCreateSubIdeaModal() {
      this.$bvModal.show('create-sub-idea-modal')
    },
    selectSubIdea(subIdeaId) {
      this.$store.commit('updateCurrentSubIdeaId', subIdeaId)
    },
  },
}
</script>
