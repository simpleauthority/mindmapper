<template>
  <b-modal
    id="create-counterpoint-modal"
    title="Create a new Counterpoint"
    size="lg"
    ok-only
    :ok-title="
      formComplete
        ? 'Create my counterpoint'
        : 'Finish filling in the form, please'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <p>
      Think somebody might be able to counter your sub-idea? Fill in what you
      expect that they <em>might</em> say.
    </p>
    <b-form ref="form">
      <b-form-group
        id="counterpoint-group"
        label="Counterpoint"
        label-for="counterpoint-input"
        description="Type your counterpoint here. You can always edit this later as needed."
      >
        <b-form-textarea
          id="counterpoint-input"
          v-model="text"
          rows="6"
          no-resize
          autofocus
        >
        </b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CreateCounterpointModal',
  data() {
    return {
      text: '',
    }
  },
  computed: {
    formComplete() {
      return !!this.text
    },
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
      currentSubIdeaId: (state) => state.app.currentSubIdeaId,
    }),
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
        this.$store.commit('addCounterpoint', {
          projectId: this.currentProjectId,
          subIdeaId: this.currentSubIdeaId,
          text: this.text,
        })

        this.$nextTick(() => {
          this.$bvModal.hide('create-counterpoint-modal')
        })
      }
    },
  },
}
</script>
