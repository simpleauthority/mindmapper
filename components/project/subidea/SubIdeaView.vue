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
        <b-button
          class="d-block ml-auto"
          variant="secondary"
          @click="goBackToProjectView"
          >Back to Project View</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <b-card no-body>
          <b-card-header>
            <b-row>
              <b-col>Main Idea / Thesis </b-col>
              <b-col>
                <b-button
                  size="sm"
                  pill
                  variant="info"
                  class="d-block ml-auto"
                  @click.prevent="openUpdateMainIdeaModal"
                  ><fa icon="edit"
                /></b-button>
              </b-col> </b-row
          ></b-card-header>
          <b-card-body>
            <b-card-text>
              <p>{{ project.mainIdea }}</p>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <b-card no-body>
          <b-card-header>
            <b-row>
              <b-col>Sub-idea</b-col>
              <b-col>
                <b-button
                  size="sm"
                  pill
                  variant="info"
                  class="d-block ml-auto"
                  @click.prevent="openUpdateSubIdeaModal"
                  ><fa icon="edit"
                /></b-button>
              </b-col> </b-row
          ></b-card-header>
          <b-card-body>
            <b-card-text>
              {{ subIdea.text }}
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <CounterpointSelector />
  </b-container>
</template>

<script>
import CounterpointSelector from '~/components/project/counterpoint/CounterpointSelector'

export default {
  name: 'SubIdeaView',
  components: { CounterpointSelector },
  props: {
    project: {
      type: Object,
      required: true,
    },
    subIdea: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goBackToProjectView() {
      this.$store.commit('resetSubIdeaId')
    },
    openUpdateProjectNameModal() {
      this.$bvModal.show('update-project-name-modal')
    },
    openUpdateMainIdeaModal() {
      this.$bvModal.show('update-main-idea-modal')
    },
    openUpdateSubIdeaModal() {
      this.$bvModal.show('update-sub-idea-modal')
    },
  },
}
</script>
