<template>
<section class="py-20">
  <loading v-model:active="isLoading">
    <img src="https://upload.cc/i1/2021/06/12/N7mIQ1.gif
" alt="loading">
  </loading>
  <div class="container">
    <!--- 商品卡片 --->
    <div class="row mt-9">
      <div class="col-md-3 mb-7" v-for="item in products" :key="item.id">
        <a href="#" class="product-card" @click.prevent="openModal(item)">
          <div class="card position-relative back-card-shadow border-0 card-radius">
            <div style="height: 253px; background-size: contain; background-position: center; background-repeat: no-repeat;"
              :style="{backgroundImage: `url(${item.imageUrl})`}">
            </div>
            <div class="card-bg d-flex align-items-center">
              <p class="text-white fw-bolder p-8">{{ item.description }}</p>
            </div>
            <div class="card-body bg-light p-4" style="height: 100px">
              <div class="d-flex justify-content-between mb-3">
                <h5 class="card-title mb-0 text-theme fw-bolder">{{ item.title }}</h5>
                <span class="badge bg-secondary align-self-center">{{ item.category }}</span>
              </div>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="h6 text-streak" v-if="item.price">NT$ {{ item.origin_price }} 元</del>
                <div class="h5 text-danger fw-bolder" v-if="item.price">NT$ {{ item.price }} 元</div>
              </div>
            </div>
            <div class="card-footer position-relative bg-light d-flex align-items-center p-7">
              <button type="button" @click="addCart(item.id)" class="btn position-absolute start-0 zindex-1 border-end btn-product-card hvr-bounce-to-right py-2 px-0 w-50">
                <i :class="{ 'disappear' : item.id === loadingStatus.loadingItem }" class="fas fa-shopping-cart me-1"></i>
                <i v-if="item.id === loadingStatus.loadingItem" class="fas fa-spinner fa-pulse me-1"></i>
                加到購物車
              </button>
              <button type="button" @click.prevent="openModal(item)" class="btn position-absolute zindex-1 end-0 hvr-icon-wobble-vertical btn-product-card py-2 px-0 w-50">
                <i class="fas fa-file-alt hvr-icon me-1"></i>
                詳細資訊
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
    <!-- 購物車列表 -->
    <table class="table align-middle mx-auto mt-5" style="max-width:800px">
      <thead class="table-light">
        <tr>
          <th style="width: 150px">刪除</th>
          <th style="width: 150px">品名</th>
          <th>單價</th>
          <th style="width: 180px">數量/單位</th>
          <th>總金額</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts"><!-- 判斷 購物車內是否有資料 -->
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td>{{ item.product.title }}</td>
            <td class="text-end">${{ item.product.price }}</td>
            <td>
              <div class="input-group justify-content-start align-items-center">
                <button type="button" class="input-group-text" :disabled="item.qty === 1"
                 @click="updateCart(item.id, item.qty - 1)">
                  <i class="fas fa-minus"></i>
                </button>
                <p class="form-control text-center m-0 cartNum">{{ item.qty }}</p>
                <button type="button" class="input-group-text" @click="updateCart(item.id, item.qty + 1)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </td>
            <td class="text-end">${{ item.final_total }}</td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td class="border-bottom-0">
            <button @click="deleteAllCarts" class="btn btn-outline-danger" type="button">清空購物車</button>
          </td>
          <td colspan="4" class="text-end cart-foot-underline">
            <del class="me-7">總計 {{ cart.total }}</del>
            <span class="h5 fw-bolder">折扣價 NT$ {{ cart.final_total }}</span>
          </td>
        </tr>
      </tfoot>
    </table>
    <!-- 顧客資料 -->
    <Form @submit="createOrder" ref="form" class="row g-3 mt-5 mx-auto" v-slot="{ errors }" style="max-width:800px">
      <div class="col-md-4">
        <label for="姓名" class="form-label">姓名<span class="text-danger" style="padding-left: 3px;">*</span></label>
        <Field  v-model="form.user.name" type="text" class="form-control" id="姓名" name="姓名" :class="{ 'is-invalid': errors['姓名'] }" rules="required" placeholder="請輸入姓名" />
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>
      <div class="col-md-4">
        <label for="手機" class="form-label">手機<span class="text-danger" style="padding-left: 3px;">*</span></label>
        <Field v-model="form.user.tel" type="tel" :rules="isPhone" :class="{ 'is-invalid': errors['手機'] }" class="form-control" id="手機" name="手機" placeholder="請輸入手機" />
        <error-message name="手機" class="invalid-feedback"></error-message>
      </div>
      <div class="col-md-4">
        <label for="email" class="form-label">Email<span class="text-danger" style="padding-left: 3px;">*</span></label>
        <Field v-model="form.user.email" type="email" :class="{ 'is-invalid': errors['email'] }" rules="email|required" class="form-control" id="email" name="email" placeholder="請輸入 email" />
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>
      <div class="col-12">
        <label for="地址" class="form-label">地址<span class="text-danger" style="padding-left: 3px;">*</span></label>
        <Field v-model="form.user.address" :class="{ 'is-invalid': errors['地址'] }" rules="required" type="text" class="form-control" id="地址" name="地址" placeholder="請輸入地址" />
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="留言" class="form-label">留言</label>
        <textarea name="留言" id="留言" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-hgray hvr-bounce-to-right">送出訂單</button>
      </div>
    </Form>
    <!---=========================--->
  </div>
  <!-- Modal -->
  <user-product-modal ref="userProductModal" :product="product" :loading-status="loadingStatus" @add-cart="addCart"></user-product-modal>
</section>
</template>
<script>
import userProductModal from '@/components/UserProductModal.vue'

export default {
  components: {
    userProductModal
  },
  data () {
    return {
      isLoading: false,
      products: [], // 產品列表
      product: {}, // props 傳遞到內層的暫存資料
      loadingStatus: { // 讀取效果
        loadingItem: ''
      },
      form: { // 表單結構
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cart: {} // 購物車列表
    }
  },
  methods: {
    getProducts () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`
      vm.$http.get(api).then((res) => {
        console.log('產品 All 列表', res.data)
        if (res.data.success) {
          vm.isLoading = false
          vm.products = res.data.products
        } else {
          vm.toastTopEnd(res.data.message, 'error')
        }
      })
    },
    addCart (id, qty = 1) {
      const vm = this
      vm.loadingStatus.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.post(api, { data: cart }).then((res) => {
        console.log('加入購物車', res.data, cart)
        vm.loadingStatus.loadingItem = ''
        vm.toastTopEnd(res.data.message, 'success')
        vm.getCart() // 重新取得購物車列表
      })
    },
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then((res) => {
        console.log('Cart 列表', res.data)
        vm.cart = res.data.data
      })
    },
    updateCart (id, qty) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      const cart = {
        product_id: id,
        qty
      }
      vm.$http.put(api, { data: cart }).then((res) => {
        if (res.data.success) {
          vm.toastTopEnd(res.data.message, 'success')
          vm.isLoading = false
          vm.getCart()
        } else {
          vm.toastTopEnd(res.data.message, 'error')
          vm.isLoading = false
        }
      })
    },
    removeCartItem (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            vm.toastTopEnd(res.data.message, 'success')
            vm.isLoading = false
            vm.getCart()
          } else {
            vm.toastTopEnd(res.data.message, 'error')
            vm.isLoading = false
          }
        })
        .catch((err) => {
          vm.$swal({ title: err.data.message, icon: 'error' })
          vm.isLoading = false
        })
    },
    deleteAllCarts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/carts`
      vm.isLoading = true
      vm.$http.delete(api)
        .then((res) => {
          console.log('刪除全部商品', res.data)
          if (res.data.success) {
            vm.toastTopEnd('購物車商品已全部刪除', 'success')
            vm.getCart()
          } else {
            vm.toastTopEnd(res.data.message, 'error')
          }
          vm.isLoading = false
        })
        .catch((err) => {
          vm.$swal({ title: err.data.message, icon: 'error' })
          vm.isLoading = false
        })
    },
    openModal (item) {
      const vm = this
      console.log(item)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${item.id}`
      vm.$http.get(api).then((res) => {
        vm.product = res.data.product
        vm.$refs.userProductModal.openModal()
      })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.isLoading = true
      if (vm.cart.carts.length === 0) {
        vm.isLoading = false
        vm.toastTopEnd('購物車空空的哦...，無法送出訂單', 'error')
      } else {
        vm.$http.post(api, { data: order })
          .then((res) => {
            if (res.data.success) {
              vm.isLoading = false
              console.log(res.data)
              vm.toastTopEnd(res.data.message, 'success')
              vm.getCart()
              vm.$refs.form.resetForm() // 清空欄位
              vm.form.message = ''
            } else {
              vm.toastTopEnd(res.data.message, 'error')
              vm.isLoading = false
            }
          })
          .catch((err) => {
            vm.toastTopEnd(err.data.message, 'error')
            vm.isLoading = false
          })
      }
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    toastTopEnd (msg, icon) {
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: icon,
        title: msg
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
<style scope>
.swal2-container {
  margin-top: 100px;
}
</style>
