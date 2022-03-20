<template>
  <div>
      <bk-header />
      <div class="container">
          <section class="section">
            <router-view />
          </section>
      </div>
  </div>
</template>

<script>
import BkHeader from "../components/BkHeader.vue"
export default {
  name: "AdminLayout",
  components: { BkHeader }
}
</script>

<style>

</style>
