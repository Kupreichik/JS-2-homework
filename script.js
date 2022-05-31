"use strict"

const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const GET_BASKET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';

function requestData(url) {
  return fetch(url)
  .then(checkStatus)
  .then(response => response.json())
}

function checkStatus(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

class GoodsItem {
  constructor({product_name = 'Странный товар...', price = 'Нет на складе'} = {}) {
    this.title = product_name;
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
  filtredList = [];

  fetchGoods() {
    requestData(GET_GOODS_ITEMS)
      .then(result => {
        this.list = JSON.parse(JSON.stringify(result));
        return this.filtredList = JSON.parse(JSON.stringify(result))
        })
      .then(this.render)
  }

  filterList(searchValue) {
    return new Promise((resolve) =>
      resolve(
        this.filtredList = this.list.filter(({product_name}) => {
          return product_name.match(new RegExp(searchValue, 'gui'))
        })
      )
    )
    .then(this.render)
  }

  getCount() {
    let count = this.list.reduce(((sum, {price}) => sum + price), 0)
    return count;
  }

  render(arr) {
      const goods = arr.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render();
      });
      
    document.querySelector('.goodList').innerHTML = goods.join(' ');
  }
}

class BasketList {
  list = [];

  fetchGoods() {
    requestData(GET_BASKET_GOODS_ITEMS)
      .then(result => {
        return this.list = JSON.parse(JSON.stringify(result))})
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods();

const basketList = new BasketList();
basketList.fetchGoods();

document.querySelector('.searchButton').addEventListener('click', () => {
  const searchValue = document.querySelector('.goodsSearch').value;
  goodsList.filterList(searchValue)
})