<template>
  <q-page padding>
    <!-- content -->
    dashboard
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  created () {
    this.$axios.post('teste')
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style>
</style>
