<template>
  <b-modal
    id="create-rebuttal-modal"
    title="Create a new Rebuttal"
    size="lg"
    ok-only
    :ok-title="
      formComplete ? 'Create my rebuttal' : 'Finish filling in the form, please'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <p>
      To form a solid argument, you should be able to rebut each counterpoint
      <em>at least</em> once. Enter your rebuttal to the counterpoint here.
    </p>
    <b-form ref="form">
      <b-form-group
        id="rebuttal-group"
        label="Rebuttal"
        label-for="rebuttal-input"
        description="Type your rebuttal here. You can always edit this later as needed."
      >
        <b-form-textarea
          id="rebuttal-input"
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
  name: 'CreateRebuttalModal',
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
      currentCounterpointId: (state) => state.app.currentCounterpointId,
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
        this.$store.commit('addRebuttal', {
          projectId: this.currentProjectId,
          subIdeaId: this.currentSubIdeaId,
          counterpointId: this.currentCounterpointId,
          text: this.text,
        })

        this.$nextTick(() => {
          this.$bvModal.hide('create-rebuttal-modal')
        })
      }
    },
  },
}
</script>
