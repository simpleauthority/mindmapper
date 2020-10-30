<template>
  <b-container>
    <main id="app-container">
      <slot></slot>
    </main>
  </b-container>
</template>

<style lang="scss">
#app-container {
  width: 100%;
  height: 740px;
  border: 2px dotted #aeaeae;
  border-radius: 5px;
  padding: 2rem;
}
</style>
