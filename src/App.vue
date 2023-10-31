<template>
  <div id="app">
    <div class="shop-row">
      <div class="shop-row__part">
        <div class="currency">
          <span>Курс: </span>
          <el-input-number v-model="currency" :min="1"></el-input-number>
        </div>
        <products-block />
      </div>
      <div class="shop-row__part">
        <div class="timer">
          <i class="el-icon-timer" size="large"></i>
          Обновление через:
          {{ timerLeft }}
        </div>
        <cart-block />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartBlock from "./components/CartBlock.vue";
import ProductsBlock from "./components/ProductsBlock.vue";

export default {
  name: "App",
  components: {
    CartBlock,
    ProductsBlock,
  },
  data: () => ({
    timerLeft: 0,
    intervalId: null,
  }),
  computed: {
    ...mapGetters({
      currencyRate: "currencyRate",
    }),
    currency: {
      set(val) {
        this.updateCurrencyRate(val);
      },
      get() {
        return this.currencyRate;
      },
    },
  },
  mounted() {
    // запрос товаров
    this.loadProducts();
    // запустим интервал в 15 секунд
    this.timerLeft = 15;
    this.intervalId = setInterval(() => {
      this.timerLeft--;
      if (this.timerLeft === 0) {
        // обновим товары
        this.updateProductList();
        // установим курс случайное число от 20 до 80
        this.currency = Math.floor(Math.random() * (80 - 20) + 20);
        this.timerLeft = 15;
      }
    }, 1000);
  },
  beforeDestroy() {
    // очистим интервал
    clearInterval(this.intervalId);
  },
  methods: {
    ...mapActions({
      loadProducts: "products/loadProducts",
      updateProductList: "products/updateProductList",
      updateCurrencyRate: "updateCurrencyRate",
    }),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.shop-row {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  &__part {
    width: 50%;
  }
  .currency,
  .timer {
    height: 50px;
  }
}
</style>
