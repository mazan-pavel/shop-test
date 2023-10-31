import { CartProduct } from "@/models/product";
import { currencyFormat } from "@/helpers/product";
export default {
  namespaced: true,
  state: () => ({
    cart: [],
  }),
  getters: {
    cart: ({ cart }) => cart,
    getOrderSumm: ({ cart }) =>
      cart.reduce((acc, item) => acc + item.getSumm(), 0),
    getOrderFormatedSumm: (state, getters) =>
      currencyFormat.format(getters.getOrderSumm),
  },
  mutations: {
    addProductToCart(state, product) {
      state.cart.push(product);
    },
    changeProductCount(state, { product, count }) {
      const productIndex = state.cart.indexOf(product);
      if (productIndex === -1) return;
      state.cart[productIndex].quantity = count;
    },
    updateProductPrice(state, currencyRate) {
      state.cart.forEach((product) => {
        product.costInCurrency = currencyRate * product.cost;
      });
    },
    deleteProductFromCart(state, product) {
      state.cart = state.cart.filter((item) => item.id !== product.id);
    },
  },
  actions: {
    /**
     * Добавить товар в корзину
     * @param {*} context
     * @param {Object} product product to cart
     */
    addProductToCart({ commit, rootGetters }, product) {
      const { currencyRate } = rootGetters;
      commit("addProductToCart", new CartProduct({ ...product, currencyRate }));
    },
    /**
     * Удалить товар из корзины
     * @param {*} context
     * @param {Object} product товар
     */
    deleteProductFromCart({ commit }, product) {
      commit("deleteProductFromCart", product);
    },
    /**
     * Обновить цены в корзине
     * @param {*} context
     * @param {Number} currencyRate текущий курс
     */
    updateProductPrice({ commit }, currencyRate) {
      commit("updateProductPrice", currencyRate);
    },
    /**
     * Изменить количество позиции
     * @param {*} context
     * @param {Object} data товар и количество
     */
    changeProductCount({ commit }, data) {
      commit("changeProductCount", data);
    },
  },
};
