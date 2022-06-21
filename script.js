"use strict"

const GET_GOODS_ITEMS = 'http://localhost:8000/goods.json';
const GET_BASKET_GOODS_ITEMS = 'http://localhost:8000/basket';

function init() {
  const customButton = Vue.component('custom-button', {
    template: `
      <button class="cartBtn" type="button" v-on:click="$emit('click')">
        <slot></slot>
      </button>
    `
  });

  const goodsItem = Vue.component('goods-item', {
    props: ['item'],
    template: `
      <div class="goods-item">
        <h3 class="goods-title">{{ item.product_name }}</h3>
        <p class="goods-price">{{ item.price }}$</p>
      </div>
      `
    });

  const basket = Vue.component('basket-card', {
    data() {
      return {
        basketGoodsItems: []
      }
    },

    template: `
      <div class="basketList"> 
        <i class="closeBtn fa-solid fa-xmark" @click="$emit ('close')"></i>
        <h2>Корзина</h2>
        <div class="basket-items">
        <basket-item v-bind:item="item" v-for="item in basketGoodsItems"></basket-item>
        </div>
        <div class="basket-amount">К оплате 
          <b>{{ basketTotal }}$<b>
        </div>
      </div>
    `,

    computed: {
      basketTotal() {
        const totaItemlList = this.basketGoodsItems.map(({quantity, price}) => quantity * price);
        return totaItemlList.reduce(((sum, item) => sum + item), 0)
      }
    },

    mounted() {
      return fetch(GET_BASKET_GOODS_ITEMS)
          .then(response => response.json())
          .then(result => {
            return this.basketGoodsItems = result
          })
    }
  });

  const basketItem = Vue.component('basket-item', {
    props: ['item'],
    template: `
    <div class="basket-item">
      <h3 class="goods-title">{{ item.product_name }}</h3>
      <p class="goods-price">{{ item.price }}$</p>
      <div>
        <button>-</button>
        <span>{{ item.quantity }}</span>
        <button>+</button>
      </div>
      <div class="itemTotal">Итого: {{ basketItemTotal }}$</div>
    </div>
    `,
    computed: {
      basketItemTotal() {
        let itemTotal = this.item.price * this.item.quantity;
        return itemTotal
      }
    }
  });

  const searchInput = Vue.component('search-input', {
    props: ['value'],
    template: `
    <div class="search">
      <input type="text" class="goodsSearch"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)">
    </div>
    `
  });

  const errorInfo = Vue.component('error-message', {
    props: ['errorText'],
    template: `
    <div class=errorMessage>
    <div class="closeErrorBtn" @click="$emit ('close')">x</div>
      <strong>Ой! Произошла ошибка: </strong>
      {{ errorText }}
    </div>
    `
  });

  const app = new Vue({
    el: "#root",
    data: {
      list: [],
      searchValue: '',
      isVisibleCart: false,
      errored: false,
      errorText: ''
    },

    methods: {
      fetchGoods(url) {
        return fetch(url)
          .then(response => response.json())
          .then(result => {
            return this.list = result
          })
          .catch(error => {
            this.errorText = error.code +' '+ error.message;
            this.errored = true;
          })
      },

      setVisionCart() {
        return this.isVisibleCart = !this.isVisibleCart
      },

      closeErrorMessage(){
        return this.errored = false
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
      },

      isLoadedData() {
        return this.filterList.length !== 0
      }
    },

    mounted() {
      this.fetchGoods(GET_GOODS_ITEMS)
    }
  })
}

window.onload = init;