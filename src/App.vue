<template>
  <div id="app">
    <div id="flashMessage" v-if="flashMessage">
      {{ flashMessage }}
    </div>
    <div id="nav">
      <router-link :to="{ name: 'EventList' }">Events</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <router-link :to="{ name: 'EventCreate' }">Create Event</router-link>
    </div>
    <router-view />
    <button v-if="!isConnected" @click="connect">
      Connect
    </button>
    <button v-else-if="isConnected" @click="disconnect" class="connect-btn">
      Disconnect
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    flashMessage() {
      return this.$store.state.flashMessage
    },
    isConnected() {
      return this.$store.state.isAuthorized
    }
  },
  methods: {
    connect() {
      this.$store.dispatch('connect')
    },
    disconnect() {
      this.$store.dispatch('disconnect')
    }
  }
}
</script>

<style>
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  align-items: center;
  height: 50px;
  padding: 0 40px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s linear;
  margin-top: 20px;
}

button:hover {
  -webkit-transform: scale(1.02);
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 40px;
  font-weight: 700;
}

h3 {
  font-size: 25px;
  font-weight: 700;
}

h4 {
  font-size: 20px;
  font-weight: 700;
}

input {
  display: block;
  width: 100%;
  height: 30px;
  margin-bottom: 24px;
}

input[type='text'] {
  padding: 0px 10px;
}

input:focus {
  border-color: #16c0b0;
  outline: 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.form-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10%;
}

select:focus {
  border-color: #16c0b0;
  outline: 0;
}
</style>
