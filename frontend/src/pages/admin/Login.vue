<template>
  <q-page padding>
    <!-- content -->
    <div class="row">
      <div class="col">
        <p>Login</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <q-field
          icon="email"
          :error="mailHasError"
          error-label="Você precisa inserir um email válido."
        >
          <q-input v-model.trim="email" float-label="Email" />
        </q-field>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <q-field
          icon="no_encryption"
          :error="mailHasError"
          error-label="Você precisa inserir um email válido."
        >
          <q-input v-model.trim="password" type="password" float-label="Senha" />
        </q-field>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          <q-checkbox v-model="manterlogado" label="Manter logado" />
        </p>
        <q-btn color="primary" @click="entrar">Entrar</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      email: 'lennonsbueno@gmail.com',
      password: '123',
      mailHasError: false,
      manterlogado: false
    }
  },
  methods: {
    entrar () {
      this.$axios.post('/authenticate', {email: this.email, password: this.password})
        .then(response => {
          this.$store.dispatch('Auth/login', response.data)
          this.$q.localStorage.set('token', response.data.attempt.token)
          this.$q.localStorage.set('refreshToken', response.data.attempt.refreshToken)
          this.$q.localStorage.set('manterlogado', true)

          this.$router.push({name: 'dashboard'})
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    if (this.$store.state.Auth.loggedIn) {
      this.$router.push({name: 'dashboard'})
    }
    // console.log(this.$store.state.example.Auth.loggedIn)
    // console.log(this.$store.commit)
  }
}
</script>

<style>
</style>
