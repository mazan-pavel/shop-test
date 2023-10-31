import Vue from "vue";
import Vuex from "vuex";
import cart from "./cart";
import products from "./products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyRate: 80,
  },
  getters: {
    currencyRate: ({ currencyRate }) => currencyRate,
  },
  mutations: {
    setCurrencyRate(state, newRate) {
      state.currencyRate = newRate;
    },
  },
  actions: {
    /**
     * Обновить курс
     * @param {*} context
     * @param {Number} rate новый курс
     */
    updateCurrencyRate({ commit, dispatch }, rate) {
      commit("setCurrencyRate", rate);
      // при обновлении курса обновим стоимость товара в каталоге и корзине
      dispatch("products/updateProductPrice", rate, { root: true });
      dispatch("cart/updateProductPrice", rate, { root: true });
    },
  },
  modules: {
    cart,
    products,
  },
});
