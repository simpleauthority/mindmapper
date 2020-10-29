<template>
  <section v-if="hasOffshoots" :class="hasMainIdea ? 'active' : 'inactive'">
    <div
      v-for="(offshoot, idx) in offshoots"
      :key="'offshoot-' + idx"
      class="offshoot"
    >
      {{ offshoot }}
    </div>
  </section>
  <section v-else>
    <div class="centerizer">
      <div class="no-offshoots text-center">
        <h4>You have not entered any offshoot ideas yet.</h4>
        <b-button variant="success" :disabled="!hasMainIdea">{{
          hasMainIdea ? 'Add One' : 'Set your main idea first'
        }}</b-button>
      </div>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'OffshootContainer',
  props: {
    hasMainIdea: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState(['offshoots']),
    hasOffshoots() {
      return !_.isEmpty(this.offshoots)
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 740px;
  padding: 2rem;
  border: 3px dotted #383838;
  border-radius: 5px;

  .centerizer {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .no-offshoots {
      background: #efefef;
      border: 2px dashed #ccc;
      padding: 2rem;
      width: 70%;

      h4 {
        margin-bottom: 1rem;
      }

      button {
        width: 70%;
      }
    }
  }
}
</style>
