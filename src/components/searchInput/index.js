export default Vue.component('search-input', {
  props: ['value'],
  template: `
  <div class="search">
    <input type="text" class="goodsSearch"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)">
  </div>
  `
})