<template>
  <el-empty
    v-if="cart.length === 0"
    description="Корзина пуста"
    :image-size="200"
  />
  <div v-else class="cart-block">
    <div v-for="item in cart" class="cart-block__item cart-item" :key="item.id">
      <div class="cart-item__name">
        <el-tag class="ml-2" type="warning">{{
          categoriesName[item.groupId]
        }}</el-tag>
        <div class="cart-item__name">
          {{ item.name }}
        </div>
      </div>
      <el-tag class="ml-2" type="info">{{ item.getFormatedSumm() }}</el-tag>
      <el-input-number
        class="cart-item__quantity"
        size="small"
        :value="item.quantity"
        @change="changeQuantity(item, $event)"
        :min="1"
      ></el-input-number>
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
        @click="deleteProductFromCart(item)"
      ></el-button>
    </div>
    <div class="cart-block__total">
      <div>Общая стоимость:</div>
      <div
        class="cart-block__summ"
        :class="{
          'cart-block__summ_red': currencyRateUp,
          'cart-block__summ_green': currencyRateDown,
        }"
      >
        {{ orderFormatedSumm }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CartBlock",
  data: () => ({
    currencyRateUp: false,
    currencyRateDown: false,
  }),
  computed: {
    ...mapGetters({
      cart: "cart/cart",
      currencyRate: "currencyRate",
      orderFormatedSumm: "cart/getOrderFormatedSumm",
      categoriesName: "products/categoriesName",
    }),
  },
  watch: {
    currencyRate(newSumm, oldSumm) {
      if (!oldSumm) return;
      if (newSumm > oldSumm) {
        this.currencyRateUp = true;
        this.currencyRateDown = false;
      }
      if (newSumm < oldSumm) {
        this.currencyRateUp = false;
        this.currencyRateDown = true;
      }
    },
  },
  methods: {
    ...mapActions({
      deleteProductFromCart: "cart/deleteProductFromCart",
      changeProductCount: "cart/changeProductCount",
    }),
    changeQuantity(item, value) {
      this.changeProductCount({ product: item, count: value });
    },
  },
};
</script>

<style lang="scss">
.cart-block {
  margin: 10px;
  &__summ {
    font-size: 18px;
    font-weight: 600;
    &_red {
      color: red;
    }
    &_green {
      color: green;
    }
  }
  &__total {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__item {
    display: flex;
    gap: 10px;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 5px;
  }
  .cart-item {
    &__name {
      display: flex;
      align-items: flex-start;
      text-align: left;
      gap: 5px;
      font-size: 12px;
      font-weight: 600;
      flex: 1;
    }
    &__quantity {
      width: 120px;
      flex-shrink: 0;
    }
  }
}
</style>
