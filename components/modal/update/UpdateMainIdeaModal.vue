<template>
  <b-modal
    id="update-main-idea-modal"
    title="Update project main idea"
    size="lg"
    ok-only
    :ok-title="
      formComplete
        ? 'Update project main idea'
        : 'Finish filling in the form, please'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <b-form ref="form">
      <b-form-group
        id="main-idea-group"
        label="Main Idea / Thesis"
        label-for="main-idea-input"
        description="Type the new main idea or thesis statement."
      >
        <b-form-textarea
          id="main-idea-input"
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
  name: 'UpdateProjectNameModal',
  data() {
    return {
      text: '',
    }
  },
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
    }),
    ...mapGetters(['getProjectById']),
    formComplete() {
      return !!this.text
    },
  },
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId === 'update-main-idea-modal') {
        this.text = this.getProjectById(this.currentProjectId).mainIdea
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
        this.$store.commit('updateMainIdea', {
          projectId: this.currentProjectId,
          mainIdea: this.text,
        })

        this.$nextTick(() => {
          this.$bvModal.hide('update-main-idea-modal')
        })
      }
    },
  },
}
</script>
