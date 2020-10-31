<template>
  <b-container>
    <b-row class="mb-3">
      <b-col>
        <h2>Sub-idea of Project "{{ project.name }}"</h2>
      </b-col>
      <b-col>
        <b-button
          class="d-block ml-auto"
          variant="info"
          @click="goBackToProjectView"
          >Back to Project View</b-button
        >
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
  },
}
</script>
