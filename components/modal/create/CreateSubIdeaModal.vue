<template>
  <b-modal
    id="create-sub-idea-modal"
    title="Create a new Sub-idea"
    size="lg"
    ok-only
    :ok-title="
      formComplete ? 'Create my sub-idea' : 'Finish filling in the form, please'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <p>Had a new thought? Let's get it recorded.</p>
    <b-form ref="form" @submit.prevent="handleSubmit">
      <b-form-group
        id="sub-idea-group"
        label="Sub-idea"
        label-for="sub-idea-input"
        description="Type your sub-idea here. You can always edit this later as needed."
      >
        <b-form-textarea
          id="sub-idea-input"
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
  name: 'CreateSubIdeaModal',
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
        this.$store.commit('addSubIdea', {
          projectId: this.currentProjectId,
          text: this.text,
        })

        this.$nextTick(() => {
          this.$bvModal.hide('create-sub-idea-modal')
        })
      }
    },
  },
}
</script>
