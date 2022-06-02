"use strict"

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

window.onload = () => {
  const app = new Vue({
    el: "#root",
    data: {
      list: [],
      searchValue: '',
      isVisibleCart: false,
      isLoadedData: false
    },

    methods: {
      fetchGoods() {
        requestData(GET_GOODS_ITEMS)
          .then(result => {
            return this.list = result
          })
          .then(this.isLoadedData = true)
      },

      showCart() {
        return this.isVisibleCart = true
      },

      closeCart() {
        return this.isVisibleCart = false
      }
    },

    computed: {
      getCount() {
        let count = this.list.reduce(((sum, { price }) => sum + price), 0)
        return count;
      },

      filterList() {
        return this.list.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.searchValue, 'gui'))
        })
      }
    },

    mounted() {
      this.fetchGoods()
    }
  })
}