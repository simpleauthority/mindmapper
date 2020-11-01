<template>
  <b-modal
    id="update-main-idea-modal"
    title="Update project main idea"
    size="lg"
    ok-only
    :ok-title="
      formComplete
        ? 'Update project main idea'
        : 'Can\'t update to the same value'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <b-form ref="form" @submit.prevent="handleSubmit">
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
  name: 'UpdateMainIdeaModal',
  data() {
    return {
      text: '',
      oldText: '',
    }
  },
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
    }),
    ...mapGetters(['getProjectById']),
    formComplete() {
      return !!this.text && this.text !== this.oldText
    },
  },
  mounted() {
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      if (modalId === 'update-main-idea-modal') {
        const text = this.getProjectById(this.currentProjectId).mainIdea
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
