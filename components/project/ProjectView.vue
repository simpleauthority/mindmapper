<template>
  <p>Currently viewing project: {{ project.id }}</p>
</template>

<script>
export default {
  name: 'ProjectView',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
}
</script>
