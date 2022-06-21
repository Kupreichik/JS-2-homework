export default Vue.component('basket-item', {
  props: ['item'],
  template: `
  <div class="basket-item">
    <h3 class="goods-title">{{ item.product_name }}</h3>
    <p class="goods-price">{{ item.price }}$</p>
    <div>
      <button @click="$emit('delete', item.id)">-</button>
      <span>{{ item.quantity }}</span>
      <button @click="$emit('add', item.id)">+</button>
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
})