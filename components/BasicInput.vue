<template>
  <input
    type="text"
    :placeholder="placeholder"
    :autofocus="autofocus"
    @input="sanitizeInput"
  />
</template>

<script>
export default {
  name: 'BasicInput',
  props: {
    placeholder: {
      type: String,
      default: 'Default placeholder',
    },
    autofocus: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    sanitizeInput({ target: { value } }) {
      this.$emit('update', value || undefined)
    },
  },
}
</script>
