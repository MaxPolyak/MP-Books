<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <v-toolbar-title>📚 MP Books</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Главная</v-btn>
      <v-btn text to="/books">Книги</v-btn>
      <v-btn to="/cart" variant="outlined" color="white" class="ml-4">
  <v-icon start>mdi-cart</v-icon>
  Корзина
  <span
    v-if="cartCount > 0"
    class="ml-2 px-2 py-1 text-white rounded-full bg-red-600 text-xs"
  >
    {{ cartCount }}
  </span>
</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>  
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

onMounted(() => {
  console.log('Приложение загружено')
})
const store = useStore()
const cartCount = computed(() => store.getters.cartCount)
</script>
