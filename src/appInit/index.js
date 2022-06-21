import { GET_GOODS_ITEMS } from '../constants';

export function init() {

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