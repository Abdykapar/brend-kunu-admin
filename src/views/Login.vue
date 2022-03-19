<template>
  <div class="login">
    <div class="login__content">
      <h3 class="login__title">Brend Kunu</h3>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form class="form" @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider name="username" v-slot="{errors}" rules="required">
            <b-field
              label="Username"
              class="w-200"
              :type="errors[0] && 'is-danger'"
              :message="errors">
              <b-input v-model="username" type="text"> </b-input>
            </b-field>
          </ValidationProvider>
          <ValidationProvider name="password" v-slot="{errors}" rules="required">
            <b-field
              label="Password"
              class="w-200"
              :type="errors[0] && 'is-danger'"
              :message="errors"
            >
              <b-input v-model="password" type="password"></b-input>
            </b-field>
          </ValidationProvider>
          <div class="submit">
            <b-button native-type="submit" type="is-primary">Login</b-button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "Login",
  data () {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit () {
      this.login({ username: this.username, password: this.password })
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__content {
    padding: 2rem;
    border-radius: 10px;
    background: rgba(1, 1, 1, 0.05);
  }
  &__title {
    font-size: 30px;
    margin-bottom: 1rem;
  }
  .submit {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  .w-200 {
    min-width: 350px;
  }
}
</style>
