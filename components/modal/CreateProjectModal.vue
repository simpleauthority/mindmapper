<template>
  <b-modal
    id="create-project-modal"
    title="Create a new project"
    size="lg"
    ok-only
    :ok-title="
      formComplete ? 'Create my project' : 'Finish filling in the form, please'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <p>
      Ready to make a new project? Fill in this information and we'll get going.
    </p>
    <b-form ref="form">
      <b-form-group
        id="project-name-group"
        label="Project Name"
        label-for="project-name-input"
        description="Give your project a nice name so you can find it later"
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
      <b-form-group
        id="main-idea-group"
        label="Main Idea / Thesis"
        label-for="main-idea-input"
        description="Type the main idea or thesis statement. You can edit this later if you need to, but you have to enter something."
      >
        <b-form-textarea
          id="main-idea-input"
          v-model="mainIdea"
          rows="4"
          no-resize
        >
        </b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'CreateProjectModal',
  data() {
    return {
      name: '',
      mainIdea: '',
    }
  },
  computed: {
    formComplete() {
      return !!this.name && !!this.mainIdea
    },
  },
  methods: {
    reset() {
      this.name = ''
      this.mainIdea = ''
    },
    handleSubmit(evt) {
      evt.preventDefault()
      this.submit()
    },
    submit() {
      if (this.formComplete && this.$refs.form.checkValidity()) {
        this.$store.commit('addProject', {
          name: this.name,
          mainIdea: this.mainIdea,
        })

        this.$nextTick(() => {
          this.$bvModal.hide('create-project-modal')
        })
      }
    },
  },
}
</script>
