import { BASKET_GOODS_ITEMS } from '../../constants';
import { serviceWithBody } from '../../service';

export default Vue.component('basket-card', {
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
      <basket-item
        v-bind:item="item"
        v-for="item in basketGoodsItems"
        @add="addGood"
        @delete="deleteGood">
      </basket-item>
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

  methods: {
    addGood(id) {
      serviceWithBody(BASKET_GOODS_ITEMS, 'POST', {
        id
      }).then((data) => this.basketGoodsItems = data)
    },

    deleteGood(id) {
      serviceWithBody(BASKET_GOODS_ITEMS, 'DELETE', {
        id
      }).then((data) => this.basketGoodsItems = data)
    }
  },

  mounted() {
    return fetch(BASKET_GOODS_ITEMS)
        .then(response => response.json())
        .then(result => {
          return this.basketGoodsItems = result
        })
  }
})