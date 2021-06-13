# vicky_vue3

## 開發流程

- 準備模板
- 登入功能
- 產品列表
- 新增產品 tempProduct
  - 開啟 Modal
  - 新增品項
- 更新產品
- 刪除產品

---

- 拆分 Pagination
- 拆分 BackProducts 對應 ProductModal
  - 在外層設定開啟 BS5 的 Modal
- 拆分 BackShopping 對應 UserProductModal
  - 在內層設定開啟 BS5 的 Modal (透過 ref 來呼叫)

---

- 注意事項
  - 新增相同產品到購物車時需累加項目
  - 送出訂單後，購物車需要清除原本項目
  - 購物車無產品時不建議發出結帳請求

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
