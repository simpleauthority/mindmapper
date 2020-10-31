<template>
  <b-modal
    id="update-project-name-modal"
    title="Update project name"
    size="lg"
    ok-only
    :ok-title="
      formComplete
        ? 'Update project name'
        : 'Finish filling in the form, please'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <b-form ref="form">
      <b-form-group
        id="project-name-group"
        label="New Project Name"
        label-for="project-name-input"
        description="Enter a new name for your project"
      >
        <b-form-input
          id="project-name-input"
          v-model="name"
          type="text"
          required
          autofocus
        >
        </b-form-input>
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
      name: '',
    }
  },
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
    }),
    ...mapGetters(['getProjectById']),
    formComplete() {
      return !!this.name
    },
  },
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId === 'update-project-name-modal') {
        this.name = this.getProjectById(this.currentProjectId).name
      }
    })
  },
  methods: {
    reset() {
      this.name = ''
    },
    handleSubmit(evt) {
      evt.preventDefault()
      this.submit()
    },
    submit() {
      if (this.formComplete && this.$refs.form.checkValidity()) {
        this.$store.commit('updateProjectName', {
          projectId: this.currentProjectId,
          name: this.name,
        })

        this.$nextTick(() => {
          this.$bvModal.hide('update-project-name-modal')
        })
      }
    },
  },
}
</script>
