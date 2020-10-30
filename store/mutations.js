import { v5 as uuidv5 } from 'uuid'
import _ from 'lodash'

function findIdx(obj, id) {
  return _.findIndex(obj, (item) => item.id === id)
}

export default {
  // === app === //
  updateCurrentProjectId(state, projectId) {
    state.app.currentProjectId = projectId
  },
  updateCurrentSubIdeaId(state, subIdeaId) {
    state.app.currentSubIdeaId = subIdeaId
  },
  updateCurrentCounterpointId(state, counterpointId) {
    state.app.currentCounterpointId = counterpointId
  },
  updateCurrentRebuttalId(state, rebuttalId) {
    state.app.currentRebuttalId = rebuttalId
  },
  resetAllCurrentIds(state) {
    state.app = {
      currentProjectId: '',
      currentSubIdeaId: '',
      currentCounterpointId: '',
      currentRebuttalId: '',
    }
  },
  // === projects === //
  addProject(state) {
    state.projects.push({
      id: uuidv5(),
      name: '',
      mainIdea: '',
      subIdeas: [],
    })
  },
  removeProject(state, projectId) {
    delete state.projects[findIdx(state.projects, projectId)]
  },
  setMainIdea(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    state.projects[projectIdx].mainIdea = payload.mainIdea
  },

  // === subideas === //
  addSubIdea(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    state.projects[projectIdx].subIdeas.push({
      id: uuidv5(),
      text: '',
      counterpoints: [],
    })
  },
  removeSubIdea(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    delete state.projects[projectIdx].subIdeas[subIdeaIdx]
  },
  updateSubIdeaText(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    state.projects[projectIdx].subIdeas[subIdeaIdx].text = payload.text
  },

  // === counterpoints === //
  addCounterpoint(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    state.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints.push({
      id: uuidv5(),
      text: '',
      rebuttals: [],
    })
  },
  removeCounterpoint(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.projects[projectIdx].subIdeas[subIdeaIdx],
      payload.counterpointId
    )
    delete state.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ]
  },
  updateCounterpointText(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.projects[projectIdx].subIdeas[subIdeaIdx],
      payload.counterpointId
    )
    state.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ].text = payload.text
  },

  // === rebuttals === //
  addRebuttal(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.projects[projectIdx].subIdeas[subIdeaIdx],
      payload.counterpointId
    )
    state.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ].rebuttals.push({
      id: uuidv5(),
      text: '',
    })
  },
  removeRebuttal(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.projects[projectIdx].subIdeas[subIdeaIdx],
      payload.counterpointId
    )
    const rebuttalIdx = findIdx(
      state.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
        counterpointIdx
      ],
      payload.rebuttalId
    )
    delete state.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ].rebuttals[rebuttalIdx]
  },
  updateRebuttalText(state, payload) {
    const projectIdx = findIdx(state.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.projects[projectIdx].subIdeas[subIdeaIdx],
      payload.counterpointId
    )
    const rebuttalIdx = findIdx(
      state.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
        counterpointIdx
      ],
      payload.rebuttalId
    )
    state.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ].rebuttals[rebuttalIdx].text = payload.rebuttalText
  },
}
