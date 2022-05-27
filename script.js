"use strict"

const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

class GoodsItem {
  constructor({title = 'Странный товар...', price = 'Нет на складе'} = {}) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `
    <div class="goods-item">
      <h3 class="goods-title">${this.title}</h3>
      <p class="goods-price">${this.price}$</p>
    </div>
    `;
  }
}

class GoodsList {
  list = [];

  fetchGoods() {
    this.list = goods
  }

  getCount() {
    let count = this.list.reduce(((sum, {price}) => sum + price), 0)
    return count;
  }

  render() {
    const goods = this.list.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render();
    });
  
    document.querySelector('.goodList').innerHTML = goods.join(' ');
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
console.log(goodsList.getCount())