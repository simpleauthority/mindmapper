import _ from 'lodash'

function findIdx(obj, id) {
  return _.findIndex(obj, (item) => item.id === id)
}

export default {
  getProjectById(state) {
    return (projectId) => {
      const projectIdx = findIdx(state.ls.projects, projectId)
      return state.ls.projects[projectIdx]
    }
  },
  getSubIdeaById(state) {
    return (projectId, subIdeaId) => {
      const projectIdx = findIdx(state.ls.projects, projectId)
      const subIdeaIdx = findIdx(
        state.ls.projects[projectIdx].subIdeas,
        subIdeaId
      )
      return state.ls.projects[projectIdx].subIdeas[subIdeaIdx]
    }
  },
  getCounterpointById(state) {
    return (projectId, subIdeaId, counterpointId) => {
      const projectIdx = findIdx(state.ls.projects, projectId)
      const subIdeaIdx = findIdx(
        state.ls.projects[projectIdx].subIdeas,
        subIdeaId
      )
      const counterpointIdx = findIdx(
        state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints,
        counterpointId
      )
      return state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
        counterpointIdx
      ]
    }
  },
  getRebuttalById(state) {
    return (projectId, subIdeaId, counterpointId, rebuttalId) => {
      const projectIdx = findIdx(state.ls.projects, projectId)
      const subIdeaIdx = findIdx(
        state.ls.projects[projectIdx].subIdeas,
        subIdeaId
      )
      const counterpointIdx = findIdx(
        state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints,
        counterpointId
      )
      const rebuttalIdx = findIdx(
        state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
          counterpointIdx
        ].rebuttals,
        rebuttalId
      )
      return state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
        counterpointIdx
      ].rebuttals[rebuttalIdx]
    }
  },
}
