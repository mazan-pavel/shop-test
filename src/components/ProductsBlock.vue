<template>
  <div class="good-items">
    <el-table
      :data="productsByCategory"
      style="width: 100%"
      :show-header="false"
      row-class-name="tableRowClassName"
      row-key="id"
    >
      <el-table-column type="expand" prop="products">
        <template slot-scope="props">
          <div
            v-for="product in props.row.products"
            class="product-item"
            :key="product.id"
          >
            <div class="product-item__name">
              {{ product.name }} ({{ product.stock }})
            </div>
            <el-tag type="info">{{ product.getFormatedCost() }}</el-tag>
            <el-button
              type="primary"
              icon="el-icon-shopping-cart-2"
              @click="addProductToCart({ ...product })"
              >Купить</el-button
            >
          </div>
          <span v-if="!props.row.products.length"
            >Нет товаров в данной категории</span
          >
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      productsByCategory: "products/getProductsByCategory",
    }),
  },
  methods: {
    ...mapActions({
      loadProducts: "products/loadProducts",
      updateCurrencyRate: "updateCurrencyRate",
      addProductToCart: "cart/addProductToCart",
    }),
  },
};
</script>

<style lang="scss">
.good-items {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  .product-item {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    padding: 0 10px;
    &__name {
      flex: 1;
    }
  }
}
</style>
