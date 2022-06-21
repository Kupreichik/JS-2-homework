import { BASKET_GOODS_ITEMS } from '../../constants';
import { serviceWithBody } from '../../service';

export default Vue.component('goods-item', {
  props: ['item'],
  template: `
    <div class="goods-item">
      <h3 class="goods-title">{{ item.product_name }}</h3>
      <p class="goods-price">{{ item.price }}$</p>
      <custom-button class="addInBasket" @click="addGood">
        Добавить в корзину
      </custom-button>
    </div>
    `,
    methods: {
      addGood() {
        serviceWithBody(BASKET_GOODS_ITEMS, 'POST', {
          id: this.item.id
        })
      }
    }
  })