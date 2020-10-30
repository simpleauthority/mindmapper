<template>
  <div>
    <NavBar />
    <AppContainer>
      <Nuxt />
    </AppContainer>
    <HelpModal />
    <CreateProjectModal />
    <CreateSubIdeaModal />
    <CreateCounterpointModal />
    <CreateRebuttalModal />
  </div>
</template>

<script>
import NavBar from '~/components/structure/NavBar'
import AppContainer from '~/components/structure/AppContainer'
import HelpModal from '~/components/modal/HelpModal'
import CreateProjectModal from '~/components/modal/CreateProjectModal'
import CreateSubIdeaModal from '~/components/modal/CreateSubIdeaModal'
import CreateCounterpointModal from '~/components/modal/CreateCounterpointModal'
import CreateRebuttalModal from '~/components/modal/CreateRebuttalModal'

export default {
  components: {
    NavBar,
    AppContainer,
    HelpModal,
    CreateProjectModal,
    CreateSubIdeaModal,
    CreateCounterpointModal,
    CreateRebuttalModal,
  },
}
</script>
