<template>
  <b-modal
    id="export-project-to-pdf-modal"
    title="Export project to PDF"
    size="xl"
    ok-title="Looks good, PDF please!"
    cancel-title="Nevermind"
    scrollable
    @hidden="reset"
    @ok="handleOk"
  >
    <div v-if="hasProject">
      <client-only placeholder="Loading PDF...">
        <vue-html2pdf
          ref="pdfOutput"
          :show-layout="true"
          :float-layout="false"
          :enable-download="true"
          :pdf-quality="2"
          pdf-format="letter"
          :manual-pagination="true"
          pdf-orientation="portrait"
          pdf-content-width="100%"
          :html-to-pdf-options="{
            margin: 3,
            filename: project.name + '.pdf',
          }"
        >
          <section slot="pdf-content">
            <b-container>
              <b-row class="pdf-item">
                <b-col>
                  <h3 class="mb-3">"{{ project.name }}"</h3>
                </b-col>
              </b-row>
              <b-row class="pdf-item mb-3">
                <b-col>
                  <b-card no-body>
                    <b-card-header>Main Idea / Thesis</b-card-header>
                    <b-card-body>
                      <b-card-text>{{ project.mainIdea }}</b-card-text>
                    </b-card-body>
                  </b-card>
                </b-col>
              </b-row>
              <b-row
                v-for="(subIdea, subIdeaIdx) in project.subIdeas"
                :key="'project-subidea-' + subIdeaIdx"
                class="pdf-item mb-3"
              >
                <b-col>
                  <b-card no-body>
                    <b-card-header>Sub-idea {{ subIdeaIdx + 1 }}</b-card-header>
                    <b-card-body>
                      <b-card-text>{{ subIdea.text }}</b-card-text>
                      <div v-if="subIdea.counterpoints.length">
                        <b-row
                          v-for="(counterpoint,
                          counterpointIdx) in subIdea.counterpoints"
                          :key="
                            'project-subidea-' +
                            subIdeaIdx +
                            '-counterpoint-' +
                            counterpointIdx
                          "
                          class="pdf-item mb-3"
                        >
                          <b-col>
                            <b-card no-body>
                              <b-card-header
                                >Counterpoint
                                {{ counterpointIdx + 1 }}</b-card-header
                              >
                              <b-card-body>
                                <b-card-text>{{
                                  counterpoint.text
                                }}</b-card-text>
                                <div v-if="counterpoint.rebuttals.length">
                                  <b-row
                                    v-for="(rebuttal,
                                    rebuttalIdx) in counterpoint.rebuttals"
                                    :key="
                                      'project-subidea-' +
                                      subideaIdx +
                                      '-counterpoint-' +
                                      counterpointIdx +
                                      '-rebuttal-' +
                                      rebuttalIdx
                                    "
                                    class="pdf-item mb-3"
                                  >
                                    <b-col>
                                      <b-card no-body>
                                        <b-card-header
                                          >Rebuttal
                                          {{ rebuttalIdx + 1 }}</b-card-header
                                        >
                                        <b-card-body>
                                          <b-card-text>{{
                                            rebuttal.text
                                          }}</b-card-text>
                                        </b-card-body>
                                      </b-card>
                                    </b-col>
                                  </b-row>
                                </div>
                                <div v-else>
                                  <em
                                    >This counterpoint contains no
                                    rebuttals.</em
                                  >
                                </div>
                              </b-card-body>
                            </b-card>
                          </b-col>
                        </b-row>
                      </div>
                      <div v-else>
                        <em>This sub-idea contains no counterpoints.</em>
                      </div>
                    </b-card-body>
                  </b-card>
                </b-col>
              </b-row>
            </b-container>
          </section>
        </vue-html2pdf>
      </client-only>
    </div>
    <div v-else>
      <p>An error has occurred. Please try again later.</p>
    </div>
  </b-modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ExportProjectToPdfModal',
  data() {
    return {
      project: undefined,
    }
  },
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
    }),
    ...mapGetters(['getProjectById']),
    hasProject() {
      return !!this.project
    },
  },
  mounted() {
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      if (modalId === 'export-project-to-pdf-modal') {
        this.project = this.getProjectById(this.currentProjectId)
      }
    })
  },
  methods: {
    reset() {
      this.project = undefined
    },
    handleOk() {
      this.$refs.pdfOutput.generatePdf()

      this.$nextTick(() => {
        this.$bvModal.hide('update-sub-idea-modal')
      })
    },
  },
}
</script>
