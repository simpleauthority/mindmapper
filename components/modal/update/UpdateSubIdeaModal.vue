<template>
  <b-modal
    id="update-sub-idea-modal"
    title="Update sub idea"
    size="lg"
    ok-only
    :ok-title="
      formComplete ? 'Update sub idea' : 'Finish filling in the form, please'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <b-form ref="form">
      <b-form-group
        id="sub-idea-group"
        label="Sub idea"
        label-for="sub-idea-input"
        description="Type the new sub idea here."
      >
        <b-form-textarea
          id="sub-idea-input"
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
  name: 'UpdateSubIdeaModal',
  data() {
    return {
      text: '',
    }
  },
  computed: {
    ...mapState({
      currentProjectId: (state) => state.app.currentProjectId,
      currentSubIdeaId: (state) => state.app.currentSubIdeaId,
    }),
    ...mapGetters(['getProjectById', 'getSubIdeaById']),
    formComplete() {
      return !!this.text
    },
  },
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId === 'update-sub-idea-modal') {
        this.text = this.getSubIdeaById(
          this.currentProjectId,
          this.currentSubIdeaId
        ).text
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
        this.$store.commit('updateSubIdeaText', {
          projectId: this.currentProjectId,
          subIdeaId: this.currentSubIdeaId,
          text: this.text,
        })

        this.$nextTick(() => {
          this.$bvModal.hide('update-sub-idea-modal')
        })
      }
    },
  },
}
</script>
