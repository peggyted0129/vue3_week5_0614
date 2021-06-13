<template>
<section>
  <loading v-model:active="isLoading">
    <img src="https://upload.cc/i1/2021/06/12/N7mIQ1.gif
" alt="loading">
  </loading>
  <div class="main">
    <div class="glass">
      <h3 class="mb-0 mb-sm-3 text-center text-theme fw-bolder">
        <i class="fas fa-user-alt me-9"></i>登入後台
      </h3>
      <Form @submit="signin" :validation-schema="schema" v-slot="{ errors, values, validate }" class="my-0 mx-10 m-sm-10 fw-bolder">
        <div style="display:none">{{ errors }}{{ values }}{{ validate }}</div>
        <div class="row mb-3">
          <label for="email" class="col-sm-3 col-form-label fs-5">Email</label>
          <div class="col-sm-9">
            <Field type="email" v-model="userData.username" class="form-control" id="email" name="email" placeholder="email" :class="{ 'is-invalid': errors['email'] }" rules="required" autofocus></Field>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>
        </div>
        <div class="row mb-3">
          <label for="密碼" class="col-sm-3 col-form-label fs-5">Password</label>
          <div class="col-sm-9 position-relative">
            <Field :type="passwordStatus" v-model="userData.password" autocomplete="on" class="form-control" id="密碼" name="密碼" placeholder="Password" :class="{ 'is-invalid': errors['密碼'] }" rules="required"></Field>
            <error-message name="密碼" class="invalid-feedback"></error-message>
            <a href="#" @click.prevent="eyeChange" class="eye">
              <h3 class="link-dark" style="font-size: 20px">
                <i class="fas fa-eye-slash" id="eye"></i>
              </h3>
            </a>
          </div>
        </div>
        <div class="row mb-3 align-items-center">
          <legend class="col-form-label col-sm-3 pt-0 fs-5">Radios</legend>
          <div class="col-sm-9">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck1">
              <label class="form-check-label" for="gridCheck1">
                記住我的密碼
              </label>
            </div>
          </div>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-hgray hvr-shadow-radial mt-4">Sign in</button>
        </div>
      </Form>
    </div>
  </div>
</section>
</template>
<script>
export default {
  data () {
    const schema = {
      密碼: 'required|min:6',
      email: 'email|required'
    }
    return {
      schema,
      isLoading: false,
      passwordStatus: 'password',
      userData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.isLoading = true
      vm.$http.post(api, vm.userData).then(res => {
        console.log(res)
        const { expired, token } = res.data
        document.cookie = `vue3Token=${token}; expires=${new Date(expired)}; path=/`
        vm.isLoading = false
        vm.$router.push('/admin/products')
        if (!res.data.success) {
          vm.$swal({ title: res.data.message, icon: 'error' })
        }
      })
        .catch(err => {
          console.log(err.response)
          vm.isLoading = false
          vm.$swal({ title: err.data.message, icon: 'error' })
        })
    },
    eyeChange (e) {
      if (e.target.classList.contains('fa-eye-slash')) {
        this.passwordStatus = 'current-password'
        e.target.classList.replace('fa-eye-slash', 'fa-eye')
      } else {
        e.target.classList.replace('fa-eye', 'fa-eye-slash')
        this.passwordStatus = 'password'
      }
    }
  }
}
</script>
<style scoped>
.was-validated .form-control:invalid, .form-control.is-invalid {
  background-image: none;
}
</style>
