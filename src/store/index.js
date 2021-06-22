import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Adrien Autcq',
    events: [],
    totalEvents: null,
    event: null,
    flashMessage: '',
    isAuthorized: false
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, totalEvents) {
      state.totalEvents = totalEvents
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_FLASH_MESSAGE(state, message) {
      state.flashMessage = message
    },
    RESET_FLASH_MESSAGE(state) {
      state.flashMessage = ''
    },
    SET_IS_AUTHORIZED(state, val) {
      state.isAuthorized = val
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return new Promise((resolve, reject) => {
        EventService.postEvent(event)
          .then(() => {
            commit('ADD_EVENT', event)
            resolve()
          })
          .catch(error => {
            console.error(error)
            reject()
          })
      })
    },
    updateEvent({ commit }, event) {
      return new Promise((resolve, reject) => {
        EventService.updateEvent(event.id, event)
          .then(() => {
            commit('SET_EVENT', event)
            resolve()
          })
          .catch(error => {
            console.error(error)
            reject()
          })
      })
    },
    fetchEvents({ commit }, pagination) {
      return new Promise((resolve, reject) => {
        EventService.getEvents(pagination.perPage, pagination.page)
          .then(response => {
            commit('SET_EVENTS', response.data)
            commit('SET_TOTAL_EVENTS', response.pagination)
            resolve()
          })
          .catch(error => {
            console.error(error)
            reject()
          })
      })
    },
    fetchEvent({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        const existingEvent = state.events.find(event => event.id === id)
        if (existingEvent) {
          commit('SET_EVENT', existingEvent)
          resolve()
        } else {
          EventService.getEvent(id)
            .then(response => {
              commit('SET_EVENT', response.data)
              resolve()
            })
            .catch(error => {
              console.error(error)
              reject()
            })
        }
      })
    },
    showFlashMessage({ commit }, message) {
      commit('SET_FLASH_MESSAGE', message)
      setTimeout(() => {
        commit('RESET_FLASH_MESSAGE')
      }, 3000)
    },
    connect({ commit }) {
      commit('SET_IS_AUTHORIZED', true)
    },
    disconnect({ commit }) {
      commit('SET_IS_AUTHORIZED', false)
    }
  },
  modules: {}
})
