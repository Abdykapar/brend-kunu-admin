<template>
    <b-navbar type="is-primary">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Categories
            </b-navbar-item>
            <b-navbar-item href="#">
                Posts
            </b-navbar-item>
            <b-navbar-item href="#">
                Comments
            </b-navbar-item>
            <b-navbar-item href="#">
                Tags
            </b-navbar-item>
            <!-- <b-navbar-dropdown label="Info">
                  <b-navbar-item href="#">
                      About
                  </b-navbar-item>
                  <b-navbar-item href="#">
                      Contact
                  </b-navbar-item>
              </b-navbar-dropdown> -->
        </template>

        <template #end>
            <b-navbar-item tag="div">
              <div class="user-info">
                <p>Welcome, {{ user.name }}</p>
              </div>
                <div class="buttons">
                    <a class="button is-info">
                        Log out
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "BkHeader",
  computed: {
    ...mapState(["user"])
  }
}
</script>
<style lang="scss">
.user-info {
  margin-right: 1rem;
}
</style>
