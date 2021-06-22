<template>
  <h1>Edit the event {{ event.title }}</h1>

  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <label>Select a category: </label>
      <select v-model="newEvent.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === event.category"
        >
          {{ option }}
        </option>
      </select>

      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input v-model="newEvent.title" type="text" placeholder="Title" />

      <label>Description</label>
      <input
        v-model="newEvent.description"
        type="text"
        placeholder="Description"
      />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input v-model="newEvent.location" type="text" placeholder="Location" />

      <h3>When is your event?</h3>
      <label>Date</label>
      <input v-model="newEvent.date" type="text" placeholder="Date" />

      <label>Time</label>
      <input v-model="newEvent.time" type="text" placeholder="Time" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  props: ['event'],
  data() {
    return {
      categories: EventService.getCategories(),
      newEvent: {
        title: this.event.title,
        category: this.event.category,
        description: this.event.description,
        location: this.event.location,
        date: this.event.date,
        time: this.event.time
      }
    }
  },
  methods: {
    onSubmit() {
      const event = {
        ...this.newEvent,
        id: this.event.id,
        organizer: this.$store.state.user
      }
      this.$store.dispatch('updateEvent', event).finally(() => {
        this.$router.push({ name: 'EventDetails', params: { id: event.id } })
      })
    }
  }
}
</script>
