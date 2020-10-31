import { v4 as uuidv4 } from 'uuid'
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
  resetSubIdeaId(state) {
    state.app.currentSubIdeaId = ''
  },
  resetCounterpointId(state) {
    state.app.currentCounterpointId = ''
  },
  resetRebuttalId(state) {
    state.app.currentRebuttalId = ''
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
  addProject(state, payload) {
    state.ls.projects.push({
      id: uuidv4(),
      name: payload.name,
      mainIdea: payload.mainIdea,
      subIdeas: [],
    })
  },
  removeProject(state, projectId) {
    delete state.ls.projects[findIdx(state.ls.projects, projectId)]
  },
  setMainIdea(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    state.ls.projects[projectIdx].mainIdea = payload.mainIdea
  },

  // === subideas === //
  addSubIdea(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    state.ls.projects[projectIdx].subIdeas.push({
      id: uuidv4(),
      text: payload.text,
      counterpoints: [],
    })
  },
  removeSubIdea(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    delete state.ls.projects[projectIdx].subIdeas[subIdeaIdx]
  },
  updateSubIdeaText(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    state.ls.projects[projectIdx].subIdeas[subIdeaIdx].text = payload.text
  },

  // === counterpoints === //
  addCounterpoint(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints.push({
      id: uuidv4(),
      text: payload.text,
      rebuttals: [],
    })
  },
  removeCounterpoint(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas[subIdeaIdx],
      payload.counterpointId
    )
    delete state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ]
  },
  updateCounterpointText(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas[subIdeaIdx],
      payload.counterpointId
    )
    state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ].text = payload.text
  },

  // === rebuttals === //
  addRebuttal(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints,
      payload.counterpointId
    )
    state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ].rebuttals.push({
      id: uuidv4(),
      text: payload.text,
    })
  },
  removeRebuttal(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints,
      payload.counterpointId
    )
    const rebuttalIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
        counterpointIdx
      ].rebuttals,
      payload.rebuttalId
    )
    delete state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ].rebuttals[rebuttalIdx]
  },
  updateRebuttalText(state, payload) {
    const projectIdx = findIdx(state.ls.projects, payload.projectId)
    const subIdeaIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas,
      payload.subIdeaId
    )
    const counterpointIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas[subIdeaIdx],
      payload.counterpointId
    )
    const rebuttalIdx = findIdx(
      state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
        counterpointIdx
      ],
      payload.rebuttalId
    )
    state.ls.projects[projectIdx].subIdeas[subIdeaIdx].counterpoints[
      counterpointIdx
    ].rebuttals[rebuttalIdx].text = payload.rebuttalText
  },
}
