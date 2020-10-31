<template>
  <b-row class="mb-3">
    <b-col>
      <b-card no-body>
        <b-card-header>
          <b-row>
            <b-col>Counterpoints</b-col>
            <b-col>
              <b-button
                class="d-block ml-auto"
                variant="info"
                size="sm"
                pill
                @click="openCounterpointHelpModal"
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
                {{ counterpoints.length }}
                counterpoint(s). Click one to enter the counterpoint viewer.
              </p>
            </b-col>
            <b-col>
              <b-button
                class="d-block ml-auto"
                variant="success"
                size="sm"
                @click="openCreateCounterpointModal"
                >Create Counterpoint</b-button
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col
              v-for="(counterpoint, idx) in counterpoints"
              :key="'counterpoint-card-' + idx"
              cols="6"
              class="mb-3"
            >
              <b-card
                class="clickable-card"
                no-body
                @click="selectCounterpoint(counterpoint.id)"
              >
                <b-card-header
                  >Counterpoint {{ idx + 1 }} (0 rebuttals)</b-card-header
                >
                <b-card-body>
                  <b-card-text>
                    <p>{{ counterpoint.text }}</p>
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
  name: 'CounterpointSelector',
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
      currentSubIdeaId: (state) => state.app.currentSubIdeaId,
    }),
    ...mapGetters(['getProjectById', 'getSubIdeaById', 'getCounterpointById']),
    currentProject() {
      return this.getProjectById(this.currentProjectId)
    },
    currentSubIdea() {
      return this.getSubIdeaById(this.currentProjectId, this.currentSubIdeaId)
    },
    counterpoints() {
      return this.currentSubIdea.counterpoints
    },
  },
  methods: {
    openCounterpointHelpModal() {
      this.$bvModal.show('counterpoint-help-modal')
    },
    openCreateCounterpointModal() {
      this.$bvModal.show('create-counterpoint-modal')
    },
    selectCounterpoint(counterpointId) {
      this.$store.commit('updateCurrentCounterpointId', counterpointId)
    },
  },
}
</script>
