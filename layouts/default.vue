<template>
  <div>
    <NavBar />
    <b-container>
      <main>
        <Nuxt v-if="loaded" />
        <div v-else>
          <p>Loading your data...please wait!</p>
          <b-spinner />
        </div>
      </main>
    </b-container>
    <HelpModal />
    <SubIdeaHelpModal />
    <CounterpointHelpModal />
    <RebuttalHelpModal />
    <CreateProjectModal />
    <CreateSubIdeaModal />
    <CreateCounterpointModal />
    <CreateRebuttalModal />
    <UpdateProjectNameModal />
    <UpdateMainIdeaModal />
    <UpdateSubIdeaModal />
    <UpdateCounterpointModal />
    <UpdateRebuttalModal />
    <ExportProjectToPdfModal />
  </div>
</template>

<script>
import NavBar from '~/components/structure/NavBar'
import HelpModal from '~/components/modal/help/HelpModal'
import SubIdeaHelpModal from '~/components/modal/help/SubIdeaHelpModal'
import CounterpointHelpModal from '~/components/modal/help/CounterpointHelpModal'
import RebuttalHelpModal from '~/components/modal/help/RebuttalHelpModal'
import CreateProjectModal from '~/components/modal/create/CreateProjectModal'
import CreateSubIdeaModal from '~/components/modal/create/CreateSubIdeaModal'
import CreateCounterpointModal from '~/components/modal/create/CreateCounterpointModal'
import CreateRebuttalModal from '~/components/modal/create/CreateRebuttalModal'
import UpdateProjectNameModal from '~/components/modal/update/UpdateProjectNameModal'
import UpdateMainIdeaModal from '~/components/modal/update/UpdateMainIdeaModal'
import UpdateSubIdeaModal from '~/components/modal/update/UpdateSubIdeaModal'
import UpdateCounterpointModal from '~/components/modal/update/UpdateCounterpointModal'
import UpdateRebuttalModal from '~/components/modal/update/UpdateRebuttalModal'
import ExportProjectToPdfModal from '~/components/modal/ExportProjectToPdfModal'

export default {
  components: {
    NavBar,
    HelpModal,
    SubIdeaHelpModal,
    CounterpointHelpModal,
    RebuttalHelpModal,
    CreateProjectModal,
    CreateSubIdeaModal,
    CreateCounterpointModal,
    CreateRebuttalModal,
    UpdateProjectNameModal,
    UpdateMainIdeaModal,
    UpdateSubIdeaModal,
    UpdateCounterpointModal,
    UpdateRebuttalModal,
    ExportProjectToPdfModal,
  },
  computed: {
    loaded() {
      return this.$store.state.ls.status
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 840px;
  border: 2px dotted #aeaeae;
  border-radius: 5px;
  padding: 2rem;
  overflow-y: auto;
}
</style>
