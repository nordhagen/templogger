<template>
  <div class="app">
    <select name="logfileMenu" id="logfileMenu" @change="onLogfileSelect">
      <option v-for="id in logfiles" v-bind:key="id">{{ id }}</option>
  </select>
  <section v-if="logfile">
    <h2>Selected logfile: {{logfile.id}}</h2>
    <p v-for="(point, i) in logfile.data" v-bind:key="i">{{i}}: {{point.time}} = {{point.tempC}}</p>
  </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import chart from 'chart.js'

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
    methods: {
      onLogfileSelect(e){
        this.$store.dispatch('fetchLogfile', e.target.value)
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