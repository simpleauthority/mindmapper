import _ from 'lodash'

export default {
  setMainIdea({ commit }, mainIdea) {
    commit('updateMainIdea', mainIdea)
  },
  addOffshoot({ commit }, offshoot) {
    if (!_.isObject(offshoot)) {
      throw new TypeError('Offshoot must be an object')
    }

    if (!Object.prototype.hasOwnProperty.call(offshoot, 'text')) {
      throw new Error(
        "Offshoot object is malformed; must have 'text' attribute"
      )
    }

    commit('addOffshoot', offshoot)
  },
}
