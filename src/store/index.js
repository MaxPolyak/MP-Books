import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: [] // книги в корзине
  },
  mutations: {
    ADD_TO_CART(state, book) {
      // проверим, есть ли книга уже
      const existing = state.cart.find(item => item.id === book.id)
      if (existing) {
        existing.quantity++
      } else {
        state.cart.push({ ...book, quantity: 1 })
      }
    },
    REMOVE_FROM_CART(state, bookId) {
      state.cart = state.cart.filter(item => item.id !== bookId)
    },
    CLEAR_CART(state) {
      state.cart = []
    }
  },
  getters: {
    cartItems: state => state.cart,
    cartCount: state => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: state => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
})