<template>
  <b-modal
    id="update-rebuttal-modal"
    title="Update rebuttal"
    size="lg"
    ok-only
    :ok-title="
      formComplete ? 'Update rebuttal' : 'Can\'t update to the same value'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <b-form ref="form" @submit.prevent="handleSubmit">
      <b-form-group
        id="rebuttal-group"
        label="Rebuttal"
        label-for="rebuttal-input"
        description="Type the new rebuttal here."
      >
        <b-form-textarea
          id="rebuttal-input"
          v-model="text"
          rows="4"
          no-resize
          autofocus
        >
        </b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'UpdateRebuttalModal',
  data() {
    return {
      text: '',
      oldText: '',
    }
  },
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
      currentSubIdeaId: (state) => state.app.currentSubIdeaId,
      currentCounterpointId: (state) => state.app.currentCounterpointId,
      currentRebuttalId: (state) => state.app.currentRebuttalId,
    }),
    ...mapGetters([
      'getProjectById',
      'getSubIdeaById',
      'getCounterpointById',
      'getRebuttalById',
    ]),
    formComplete() {
      return !!this.text && this.text !== this.oldText
    },
  },
  mounted() {
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      if (modalId === 'update-rebuttal-modal') {
        const text = this.getRebuttalById(
          this.currentProjectId,
          this.currentSubIdeaId,
          this.currentCounterpointId,
          this.currentRebuttalId
        ).text

        this.text = text
        this.oldText = text
      }
    })
  },
  methods: {
    reset() {
      this.text = ''
    },
    handleSubmit(evt) {
      evt.preventDefault()
      this.submit()
    },
    submit() {
      if (this.formComplete && this.$refs.form.checkValidity()) {
        this.$store.commit('updateRebuttalText', {
          projectId: this.currentProjectId,
          subIdeaId: this.currentSubIdeaId,
          counterpointId: this.currentCounterpointId,
          rebuttalId: this.currentRebuttalId,
          text: this.text,
        })

        this.$nextTick(() => {
          this.$bvModal.hide('update-rebuttal-modal')
        })
      }
    },
  },
}
</script>
