<template>
  <b-modal
    id="update-counterpoint-modal"
    title="Update counterpoint"
    size="lg"
    ok-only
    :ok-title="
      formComplete ? 'Update counterpoint' : 'Can\'t update to the same value'
    "
    :ok-disabled="!formComplete"
    @show="reset"
    @hidden="reset"
    @ok="handleSubmit"
  >
    <b-form ref="form" @submit.prevent="handleSubmit">
      <b-form-group
        id="counterpoint-group"
        label="Counterpoint"
        label-for="counterpoint-input"
        description="Type the new counterpoint here."
      >
        <b-form-textarea
          id="counterpoint-input"
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
  name: 'UpdateCounterpointModal',
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
    }),
    ...mapGetters(['getProjectById', 'getSubIdeaById', 'getCounterpointById']),
    formComplete() {
      return !!this.text && this.text !== this.oldText
    },
  },
  mounted() {
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      if (modalId === 'update-counterpoint-modal') {
        const text = this.getCounterpointById(
          this.currentProjectId,
          this.currentSubIdeaId,
          this.currentCounterpointId
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
        this.$store.commit('updateCounterpointText', {
          projectId: this.currentProjectId,
          subIdeaId: this.currentSubIdeaId,
          counterpointId: this.currentCounterpointId,
          text: this.text,
        })

        this.$nextTick(() => {
          this.$bvModal.hide('update-counterpoint-modal')
        })
      }
    },
  },
}
</script>
