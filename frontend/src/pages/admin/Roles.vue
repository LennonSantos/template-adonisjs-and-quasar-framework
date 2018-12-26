<template>
  <q-page padding>
    <!-- content -->
    <q-tabs :animated="true" align="justify" :glossy="true">
      <!-- Tabs - notice slot="title" -->
      <q-tab default count="5" slot="title" name="roles" icon="fa fa-shield-alt" label="roles" />
      <q-tab slot="title" name="tab-2" icon="fingerprint" label="Permissões" />
      <q-tab slot="title" name="tab-3" icon="accessibility" label="Usuários"/>

      <!-- Targets -->
      <q-tab-pane name="roles">
        <div class="row gutter-xs">
          <div class="col-md-4">
            <q-input
              v-model="form.name"
              @blur="$v.form.name.$touch"
              @keyup.enter="saveRole"
              :error="$v.form.name.$error"
              float-label="Nome"
              placeholder="Informe o nome"
            />
          </div>
          <div class="col-md-4">
            <q-input
              v-model="form.slug"
              @blur="$v.form.name.$touch"
              @keyup.enter="saveRole"
              :error="$v.form.slug.$error"
              float-label="Slug"
              placeholder="Informe o slug"
            />
          </div>
          <div class="col-md-4">
            <q-select
              :multiple="true"
              v-model="form.permisions"
              :options="optionsPermissions"
              @change="form.permisions"
              :error="$v.form.permisions.$error"
              @blur="$v.form.permisions.$touch"
              float-label="Permissões"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <br>
            <q-btn color="primary" @click="saveRole">Salvar Role</q-btn>
          </div>
        </div>

        <br> <br> <br>

        <q-table
          title="Roles"
          :grid="false"
          :data="tableDataRoles"
          :columns="[{label: '#', field: 'id', align: 'left'}, {label: 'Nome', field: 'name', align: 'left' }, {label: 'Slug', field: 'slug', align: 'left'}]"
          row-key="id"
        />
      </q-tab-pane>

      <q-tab-pane name="tab-2">
        <div class="row gutter-xs">
          <div class="col-md-6">
            <q-input
              v-model="permision.name"
              @blur="$v.permision.name.$touch"
              @keyup.enter="savePermision"
              :error="$v.permision.name.$error"
              float-label="Nome"
              placeholder="Informe o nome"
            />
          </div>
          <div class="col-md-6">
            <q-input
              v-model="permision.slug"
              @blur="$v.permision.name.$touch"
              @keyup.enter="savePermision"
              :error="$v.permision.slug.$error"
              float-label="Slug"
              placeholder="Informe o slug"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <br>
            <q-btn color="primary" @click="savePermision">Salvar Permissão</q-btn>
          </div>
        </div>

        <br> <br> <br>

        <q-table
          title="Permissões"
          :grid="false"
          :data="tableDataPermisions"
          :columns="[{label: '#', field: 'id', align: 'left'}, {label: 'Nome', field: 'name', align: 'left' }, {label: 'Slug', field: 'slug', align: 'left'}]"
          row-key="id"
        />

      </q-tab-pane>
      <q-tab-pane name="tab-3">Tab Three</q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  // name: 'PageName',
  data () {
    return {
      form: {
        name: '',
        slug: '',
        permisions: []
      },
      permision: {
        name: '',
        slug: ''
      },
      tableDataRoles: [],
      tableDataPermisions: []
    }
  },
  validations: {
    form: {
      name: { required },
      slug: { required },
      permisions: { required }
    },
    permision: {
      name: { required },
      slug: { required }
    }
  },
  created () {
    this.selectRoles()
    this.selectPermisions()
  },
  computed: {
    optionsPermissions () {
      return this.tableDataPermisions.map(e => {
        e.label = e.name
        e.value = e.id
        return e
      })
    }
  },
  methods: {
    saveRole () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify('Por favor revise os campos em vermelho.')
      } else {
        this.$axios.post('roles', this.form)
          .then(response => {
            this.$q.notify({color: 'positive', message: 'Role salva com sucesso.'})
            this.tableDataRoles.push(response.data)
            console.log(response.data)
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },
    savePermision () {
      this.$v.permision.$touch()

      if (this.$v.permision.$error) {
        this.$q.notify('Por favor revise os campos em vermelho.')
      } else {
        this.$axios.post('permisions', {
          name: this.permision.name,
          slug: this.permision.slug
        })
          .then(response => {
            this.$q.notify({color: 'positive', message: 'Permissão salva com sucesso.'})
            console.log(response.data)
            this.tableDataPermisions.push(response.data)
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },
    selectRoles () {
      this.$axios.get('roles')
        .then(response => {
          this.tableDataRoles = response.data
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    selectPermisions () {
      this.$axios.get('permisions')
        .then(response => {
          this.tableDataPermisions = response.data
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>

<style>
</style>
