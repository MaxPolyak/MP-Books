<template>
  <div>
    <h1 class="mb-4">Каталог книг</h1>

    <!-- Поиск -->
    <v-text-field
      v-model="searchTitle"
      label="Поиск по названию"
      clearable
      dense
      class="mb-4"
    />

    <!-- Фильтры -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" sm="3">
        <v-autocomplete
          v-model="selectedAuthor"
          :items="authors"
          label="Автор"
          clearable
          dense
          :filter="filterSelect"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <v-autocomplete
          v-model="selectedGenre"
          :items="genres"
          label="Жанр"
          clearable
          dense
          :filter="filterSelect"
        />
      </v-col>

      <v-col cols="12" sm="3">
        <v-autocomplete
          v-model="selectedYear"
          :items="years"
          label="Год"
          clearable
          dense
          :filter="filterSelect"
        />
      </v-col>

      <v-col cols="12" sm="3" class="d-flex align-center">
        <v-btn color="black" variant="outlined" @click="resetFilters" block>
          Сбросить фильтры
        </v-btn>
      </v-col>
    </v-row>

    <!-- Сортировка -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" sm="6">
        <v-select
          v-model="sortBy"
          :items="[
            { title: 'Цена', value: 'price' },
            { title: 'Год издания', value: 'year' }
          ]"
          label="Сортировать по"
          dense
          clearable
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="sortOrder"
          :items="[
            { title: 'По возрастанию', value: 'asc' },
            { title: 'По убыванию', value: 'desc' }
          ]"
          label="Порядок"
          dense
          clearable
        />
      </v-col>
    </v-row>

    <!-- Список книг -->
    <v-row>
      <v-col
        v-for="book in sortedBooks"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
      >
        <!-- пробрасываем книгу и событие -->
        <BookCard :book="book" @add-to-cart="addToCart" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { fetchBooks } from '@/api/books'
import BookCard from '@/components/BookCard.vue'

const store = useStore()
const books = ref([])

// Фильтры
const searchTitle = ref('')
const selectedAuthor = ref(null)
const selectedGenre = ref(null)
const selectedYear = ref(null)

const sortBy = ref('year')
const sortOrder = ref('desc')

const authors = ref([])
const genres = ref([])
const years = ref([])

// Фильтрация для поиска в селектах
const filterSelect = (item, queryText, itemText) => {
  const text = itemText.toString().toLowerCase()
  const searchText = queryText.toString().toLowerCase()
  return text.includes(searchText)
}

// Вычисляемый список отфильтрованных книг
const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const authorMatch = !selectedAuthor.value || book.author === selectedAuthor.value
    const genreMatch = !selectedGenre.value || book.genre === selectedGenre.value
    const yearMatch = !selectedYear.value || book.year === selectedYear.value
    const titleMatch =
      !searchTitle.value ||
      book.title.toLowerCase().includes(searchTitle.value.toLowerCase())
    return authorMatch && genreMatch && yearMatch && titleMatch
  })
})

const sortedBooks = computed(() => {
  if (!sortBy.value) return filteredBooks.value

  const sorted = [...filteredBooks.value].sort((a, b) => {
    if (sortBy.value === 'price') {
      return sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
    } else if (sortBy.value === 'year') {
      return sortOrder.value === 'asc' ? a.year - b.year : b.year - a.year
    }
    return 0
  })
  return sorted
})

// Сброс фильтров
const resetFilters = () => {
  selectedAuthor.value = null
  selectedGenre.value = null
  selectedYear.value = null
  searchTitle.value = ''
  sortBy.value = null
  sortOrder.value = 'asc'
}

// 👉 добавление книги в корзину
const addToCart = (book) => {
  store.commit('ADD_TO_CART', book)
}
 
// Загружаем книги
onMounted(async () => {
  try {
    books.value = await fetchBooks()

    authors.value = [...new Set(books.value.map(b => b.author).filter(Boolean))].sort()
    genres.value = [...new Set(books.value.map(b => b.genre).filter(Boolean))].sort()
    years.value = [...new Set(books.value.map(b => b.year).filter(Boolean))].sort((a, b) => b - a)
  } catch (e) {
    console.error('Ошибка при загрузке книг:', e)
  }
})
</script>
