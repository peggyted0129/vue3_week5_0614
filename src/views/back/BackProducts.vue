<template>
<section>
  <div class="py-20 text-theme fw-bolder">
    <loading v-model:active="isLoading">
      <img src="https://upload.cc/i1/2021/06/12/N7mIQ1.gif" alt="loading">
    </loading>
    <div class="container">
      <div class="text-end mb-8">
        <button class="btn btn-hgray btn-md h5" @click="openModal('new')"  data-bs-toggle="modal" data-bs-target="#productModal" type="button">建立新產品</button>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" width="150">分類</th>
            <th scope="col">產品名稱</th>
            <th scope="col" width="100">原價</th>
            <th scope="col" width="100">售價</th>
            <th scope="col" width="180">是否啟用</th>
            <th scope="col" width="160">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-end">{{ item.origin_price }}</td>
            <td class="text-end">{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-lgreen">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-theme btn-sm me-4 fw-bolder" @click="openModal('edit', item)" type="button">編輯</button>
              <button class="btn btn-outline-danger btn-sm fw-bolder" @click="openModal('delete', item)" type="button">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @get-product="getProductsA" class="mt-10"></Pagination>
    </div>
    <!-- Modal -->
    <ProductModal ref="touchModal" :is-new="isNew" @update-product="updateProduct" :inner-temp="tempProduct" @get-data="getProductsA" @close-del-modal="closeDelModal"></ProductModal>
  </div>
</section>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import ProductModal from '@/components/back/ProductModal.vue'
import * as bootstrap from 'bootstrap'

export default {
  components: {
    Pagination,
    ProductModal
  },
  data () {
    return {
      isLoading: false,
      products: [],
      isNew: false,
      pagination: {},
      tempProduct: {
        imagesUrl: []
      },
      productModal: '',
      delProductModal: ''
    }
  },
  methods: {
    getProductsA (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      vm.$http.get(api).then((res) => {
        console.log('產品列表', res.data)
        if (res.data.success) {
          vm.isLoading = false
          vm.products = res.data.products
          vm.pagination = res.data.pagination
        } else {
          vm.isLoading = false
          vm.$router.push('/backstage/shopping')
          vm.$swal({ title: res.data.message, icon: 'error' })
        }
      })
    },
    updateProduct (tempProduct) {
      const vm = this
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let http = 'post'
      if (!vm.isNew) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${tempProduct.id}`
        http = 'put'
      }
      vm.$http[http](url, { data: tempProduct }).then((res) => {
        if (res.data.success) {
          vm.$swal({ title: res.data.message, icon: 'success' })
          this.productModal.hide()
          vm.getProductsA()
        } else {
          vm.$swal({ title: res.data.message, icon: 'error' })
        }
      })
    },
    openModal (isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.productModal.show()
      }
      if (isNew === 'edit') {
        this.tempProduct = { ...item }
        this.isNew = false
        console.log('tempProduct', this.tempProduct)
        this.productModal.show()
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item }
        this.isNew = false
        this.delProductModal.show()
      }
    },
    closeDelModal () {
      this.delProductModal.hide()
    }
  },
  created () {
    this.getProductsA()
  },
  mounted () {
    this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false,
      backdrop: 'static'
    })
    this.delProductModal = new bootstrap.Modal(this.$refs.touchModal.$refs.delProductModal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
