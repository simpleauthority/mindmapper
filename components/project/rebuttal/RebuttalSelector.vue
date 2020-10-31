<template>
  <b-row class="mb-3">
    <b-col>
      <b-card no-body>
        <b-card-header>
          <b-row>
            <b-col>Rebuttals</b-col>
            <b-col>
              <b-button
                class="d-block ml-auto"
                variant="info"
                size="sm"
                pill
                @click="openRebuttalHelpModal"
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
                {{ rebuttals.length }}
                rebuttals(s). Choose one to enter the rebuttal viewer.
              </p>
            </b-col>
            <b-col>
              <b-button
                class="d-block ml-auto"
                variant="success"
                size="sm"
                @click="openCreateRebuttalModal"
                >Create Rebuttal</b-button
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col
              v-for="(rebuttal, idx) in rebuttals"
              :key="'rebuttal-card-' + idx"
              cols="6"
              class="mb-3"
            >
              <b-card class="clickable-card" no-body>
                <b-card-header>
                  <b-row>
                    <b-col>
                      <a href="#" @click.prevent="selectRebuttal(rebuttal.id)"
                        >Rebuttal {{ idx + 1 }}</a
                      >
                    </b-col>
                    <b-col>
                      <b-button
                        class="d-block ml-auto"
                        variant="danger"
                        size="sm"
                        @click="
                          openConfirmRebuttalDeletionModal(
                            currentProjectId,
                            currentSubIdeaId,
                            currentCounterpointId,
                            rebuttal.id
                          )
                        "
                        ><fa icon="trash"
                      /></b-button>
                    </b-col>
                  </b-row>
                </b-card-header>
                <b-card-body>
                  <b-card-text>
                    <p>{{ rebuttal.text }}</p>
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
  name: 'RebuttalSelector',
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
      currentSubIdeaId: (state) => state.app.currentSubIdeaId,
      currentCounterpointId: (state) => state.app.currentCounterpointId,
    }),
    ...mapGetters([
      'getProjectById',
      'getSubIdeaById',
      'getCounterpointById',
      'getRebuttalById',
    ]),
    currentProject() {
      return this.getProjectById(this.currentProjectId)
    },
    currentSubIdea() {
      return this.getSubIdeaById(this.currentProjectId, this.currentSubIdeaId)
    },
    currentCounterpoint() {
      return this.getCounterpointById(
        this.currentProjectId,
        this.currentSubIdeaId,
        this.currentCounterpointId
      )
    },
    rebuttals() {
      return this.currentCounterpoint.rebuttals
    },
  },
  methods: {
    openRebuttalHelpModal() {
      this.$bvModal.show('rebuttal-help-modal')
    },
    openCreateRebuttalModal() {
      this.$bvModal.show('create-rebuttal-modal')
    },
    selectRebuttal(rebuttalId) {
      this.$store.commit('updateCurrentRebuttalId', rebuttalId)
    },
    async openConfirmRebuttalDeletionModal(
      projectId,
      subIdeaId,
      counterpointId,
      rebuttalId
    ) {
      try {
        const resp = await this.$bvModal.msgBoxConfirm(
          `Are you sure you want to delete this rebuttal? There is no going back.`
        )
        if (resp) {
          this.$store.commit('removeRebuttal', {
            projectId,
            subIdeaId,
            counterpointId,
            rebuttalId,
          })
        }
      } catch {
        this.$bvModal.msgBoxOk(
          'There was an error deleting the rebuttal. Please try again later.'
        )
      }
    },
  },
}
</script>
