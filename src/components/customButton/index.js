export default Vue.component('custom-button', {
  template: `
    <button class="cartBtn" type="button" v-on:click="$emit('click')">
      <slot></slot>
    </button>
  `
})