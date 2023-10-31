import axios from "axios";
import { getProductsByCategory } from "@/helpers/product";
import { getProductsWithName } from "@/helpers/product";

export default {
  namespaced: true,
  state: () => ({
    categories: [],
    products: [],
  }),
  getters: {
    categories: ({ categories }) => categories,
    products: ({ products }) => products,
    categoriesName: ({ categories }) =>
      categories.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {}),
    getProductsByCategory: ({ categories, products }) =>
      [...categories].map((category) => {
        const productsByCategory = products.filter(
          (product) => product.groupId === category.id
        );
        return { ...category, products: productsByCategory };
      }),
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setProducts(state, products) {
      state.products = products;
    },
    updateProduct(state, { index, cost, stock }) {
      state.products[index].cost = cost;
      state.products[index].stock = stock;
    },
    updateProductPrice(state, currencyRate) {
      state.products.forEach((product) => {
        product.costInCurrency = currencyRate * product.cost;
      });
    },
  },
  actions: {
    /**
     * Загрузка товаров и категорий
     * @param {*} context
     */
    async loadProducts({ commit, rootGetters }) {
      const { currencyRate } = rootGetters;
      //получим данные
      const [data, names] = await Promise.all([
        axios.get("/data.json").then((res) => res.data),
        axios.get("/names.json").then((res) => res.data),
      ]);
      const {
        Value: { Goods = [] },
      } = data;
      // массив с товарами
      let products = [];
      // сформируем массив категорий
      const categories = Object.entries(names).map(
        ([key, { G: groupName, B: productsNames }]) => {
          // получить товары по категории
          const categoryProducts = getProductsByCategory(Goods, key);
          getProductsWithName(
            categoryProducts,
            productsNames,
            currencyRate
          ).forEach((product) => {
            // добавим товары в массив
            products.push(product);
          });
          return { id: Number(key), name: groupName };
        }
      );
      commit("setProducts", products);
      commit("setCategories", categories);
    },
    /**
     * Получить данные и обновить цени и остатки в каталоге
     * @param {*} context
     */
    async updateProductList({ state, commit }) {
      const {
        Value: { Goods = [] },
      } = await axios.get("/data.json").then((res) => res.data);
      state.products.forEach((product, index) => {
        const { C: cost, P: stock } = Goods.find(
          (good) => good.T === product.id
        );
        commit("updateProduct", { index, stock: stock, cost });
      });
    },
    /**
     * Обновить цены с учетом курса
     * @param {*} context
     * @param {Number} currencyRate Текущий курс
     */
    updateProductPrice({ commit }, currencyRate) {
      commit("updateProductPrice", currencyRate);
    },
  },
};
