import { v5 as uuidv5 } from 'uuid'
import _ from 'lodash'

export default {
  updateMainIdea(state, value) {
    state.main_idea = value
  },
  clearMainIdea(state) {
    this.updateMainIdea(state, undefined)
  },
  addOffshoot(state, offshoot) {
    state.offshoots.push({
      id: uuidv5(),
      ...offshoot,
    })
  },
  removeOffshoot(state, id) {
    _.remove(state.offshoots, (offshoot) => offshoot.id === id)
  },
  clearOffshoots(state) {
    state.offshoots = []
  },
  reset(state) {
    this.clearMainIdea(state)
    this.clearOffshoots(state)
  },
}
