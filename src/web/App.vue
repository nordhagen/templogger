<template>
  <div class="app">
    <select name="logfile" id="logfile">
      <option v-for="id in logfiles">{{ id }}</option>
  </select>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
      }
    },
    computed: {
      logfiles () {
        return this.$store.state.logfiles
      },
      logfile () {
        return this.$store.state.logfile
      }
    },
    mounted () {
      this.$store.dispatch('fetchLogfiles')
    }
  }
</script>

<style lang="postcss" scoped>
.app {
  padding: 1rem;
  color:#666;
}
</style>