import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const _categories = [
  'sustainability',
  'nature',
  'animal welfare',
  'housing',
  'education',
  'food',
  'community'
]

export default {
  getEvents(perPage, page) {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`/events?_limit=${perPage}&_page=${page}`)
        .then(res => {
          resolve({
            data: res.data,
            pagination: res.headers['x-total-count']
          })
        })
        .catch(res => reject(res))
    })
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  },
  updateEvent(id, data) {
    return apiClient.patch(`/events/${id}`, data)
  },
  getCategories() {
    return _categories
  }
}
