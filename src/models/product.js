import { currencyFormat } from "@/helpers/product";
export class Product {
  constructor(id, name, cost, stock, groupId, currencyRate) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.costInCurrency = currencyRate * this.cost;
    this.stock = stock;
    this.groupId = groupId;
  }
  /**
   * Получить форматированную цену
   * @returns cost in RUB
   */
  getFormatedCost() {
    return currencyFormat.format(this.costInCurrency);
  }
}

export class CartProduct extends Product {
  constructor({ id, name, cost, stock, groupId, currencyRate }) {
    super(id, name, cost, stock, groupId, currencyRate);
    this.quantity = 1;
  }
  getSumm() {
    return this.quantity * this.costInCurrency;
  }
  getFormatedSumm() {
    return currencyFormat.format(this.quantity * this.costInCurrency);
  }
}
