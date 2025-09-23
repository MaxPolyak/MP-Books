<template>
  <div class="p-4">
    <h1 class="mb-4">Корзина</h1>

    <div v-if="cartItems.length === 0">
      Корзина пуста
    </div>

    <v-row v-else>
      <v-col
        v-for="item in cartItems"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card outlined class="d-flex flex-row align-center pa-2">
  <v-img :src="item.image" alt="cover" max-width="80" class="mr-4" />
  <div class="flex-grow-1">
    <h3 class="mb-1">{{ item.title }}</h3>
    <p class="mb-1 text--secondary">{{ item.author }}</p>
    <p class="mb-1">{{ item.price }} ₽ × {{ item.quantity }}</p>
  </div>
          <!-- Кнопка удалить -->
  <v-btn @click="removeFromCart(item.id)"
    style="background-color: red; width: 32px; height: 32px; min-width: 0; padding: 0;"
    class="d-flex align-center justify-center rounded-circle"
  ><v-icon small color="white">mdi-close</v-icon>
  </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="cartItems.length > 0" class="mt-4">
      <h3>Итого: {{ cartTotal }} ₽</h3>
      <v-btn color="green" class="mt-2">Оформить заказ</v-btn>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

// Список товаров в корзине
const cartItems = computed(() => store.getters.cartItems)

// Итоговая сумма
const cartTotal = computed(() => store.getters.cartTotal)

// Удаление книги из корзины
const removeFromCart = (id) => {
  store.commit('REMOVE_FROM_CART', id)
}
</script>

<style scoped>
.v-card {
  min-height: 100px;
}
</style>

  