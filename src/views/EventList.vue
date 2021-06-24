<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/event-card/event-card.vue'
import store from '@/store/index.js'

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard
  },
  async beforeRouteEnter(routeTo, routeFrom, next) {
    try {
      await store.dispatch('fetchEvents', {
        perPage: 2,
        page: parseInt(routeTo.query.page) || 1
      })
      next()
    } catch {
      next({ name: 'NetworkError' })
    }

    // ça marche pas c'est de la merde
    // store
    //   .dispatch('fetchEvents', 2, parseInt(routeTo.query.page) || 1)
    //   .then(() => next())
    //   .catch(() => next({ name: 'NetworkError' }))
  },
  beforeRouteUpdate(routeTo) {
    return this.$store
      .dispatch('fetchEvents', {
        perPage: 2,
        page: parseInt(routeTo.query.page) || 1
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
  },
  computed: {
    events() {
      return this.$store.state.events
    },
    totalEvents() {
      return this.$store.state.totalEvents
    },
    hasNextPage() {
      return this.page < Math.ceil(this.totalEvents / 2)
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
