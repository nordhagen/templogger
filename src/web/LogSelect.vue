<template>
  <select name="logfile" id="logfile">
    <option v-for="id in logfiles">{{ id }}</option>
  </select>
</template>

<script>
export default {
  props: {
    logfiles: Array
  }
}
</script>