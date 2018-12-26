<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          v-if="$store.state.Auth.loggedIn"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Portal do Site
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>

        <q-btn flat
               icon="arrow_left"
               v-if="!$store.state.Auth.loggedIn"
               label="Voltar Para Site"
               @click="$router.push('/')">
        </q-btn>
        <q-btn flat
               icon="arrow_back"
               v-else
               label="logout"
               @click="logout">
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      v-if="$store.state.Auth.loggedIn"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Menu de opções</q-list-header>
        <q-item :to="{name: 'dashboard'}">
          <q-item-side icon="fa fa-tachometer-alt" />
          <q-item-main label="Dashboard" />
        </q-item>
        <q-item :to="{name: 'roles'}">
          <q-item-side icon="fa fa-shield-alt" />
          <q-item-main label="Roles" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    logout () {
      this.$q.dialog({
        title: 'Aviso',
        message: 'Realmente deseja sair?',
        ok: 'Sim',
        cancel: 'Não'
      }).then(() => {
        this.$store.commit('Auth/logout')
        this.$q.localStorage.clear()
        this.$router.push({name: 'login'})

        this.$q.notify('logout realizado!')
      }).catch(() => {
        // this.$q.notify('Disagreed...')
      })
    }
  }
}
</script>

<style>
</style>
