export default Vue.component('error-message', {
  props: ['errorText'],
  template: `
  <div class=errorMessage>
  <div class="closeErrorBtn" @click="$emit ('close')">x</div>
    <strong>Ой! Произошла ошибка: </strong>
    {{ errorText }}
  </div>
  `
})