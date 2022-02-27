import {
  actionTree,
  getAccessorType,
  getterTree,
  mutationTree,
} from 'typed-vuex'
import * as todoApp from './todoApp'

export const state = () => ({})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {})

export const actions = actionTree({ getters, mutations, state }, {})

export const store = {
  actions,
  getters,
  modules: {
    todoApp,
  },
  mutations,
  state,
}

export const accessorType = getAccessorType(store)
