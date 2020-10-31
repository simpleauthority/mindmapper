<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h2>Counterpoint of Sub-idea of Project "{{ project.name }}"</h2>
      </b-col>
      <b-col>
        <b-button
          class="d-block ml-auto"
          variant="info"
          @click="goBackToSubIdeaView"
        >
          Back to Sub-idea View
        </b-button>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <b-card no-body>
          <b-card-header>Main Idea / Thesis</b-card-header>
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
          <b-card-header>Sub-idea</b-card-header>
          <b-card-body>
            <b-card-text>
              {{ subIdea.text }}
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <b-card no-body>
          <b-card-header>Counterpoint</b-card-header>
          <b-card-body>
            <b-card-text>
              {{ counterpoint.text }}
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <RebuttalSelector />
  </b-container>
</template>

<script>
import RebuttalSelector from '~/components/project/rebuttal/RebuttalSelector'

export default {
  name: 'CounterpointView',
  components: { RebuttalSelector },
  props: {
    project: {
      type: Object,
      required: true,
    },
    subIdea: {
      type: Object,
      required: true,
    },
    counterpoint: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goBackToSubIdeaView() {
      this.$store.commit('resetCounterpointId')
    },
  },
}
</script>
