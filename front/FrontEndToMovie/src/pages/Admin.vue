<template>
    <div>
    <Test></Test>
    <Id></Id>
    <Del></Del>
        <Add></Add>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Test from '../components/SearchComponents/Directors/UpdateDirector'
import Id from '../components/SearchComponents/Directors/DirectorById'

import Del from '../components/SearchComponents/Directors/DeleteDirectorById'
import Add from '../components/SearchComponents/Directors/AddDirector'


export default {
  components: {
    Header,
      Test,
      Id,
      Del,
      Add
  }
}
</script>