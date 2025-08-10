<template>
  <div>
    <h1>Каталог книг</h1>
    <v-row>
      <v-col
        v-for="book in books"
        :key="book.id"
        cols="12"
        sm="6"
        md="3"
        lg="2"
      >
        <BookCard :book="book" @add-to-cart="addToCart" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchBooks } from '../api/books'
import BookCard from '../components/BookCard.vue'

const books = ref([])

const addToCart = (book) => {
  console.log('Добавили в корзину:', book.title)
  // здесь можно вызвать store.commit('cart/addBook', book)
}

onMounted(async () => {
  try {
    books.value = await fetchBooks()
  } catch (e) {
    console.error('Ошибка при загрузке книг:', e)
  }
})
</script>
