<template>
  <v-card class="book-card" elevation="3" @click="$emit('click', book)">
    <v-row no-gutters>
      <!-- Обложка слева -->
      <v-col cols="4" class="image-col">
        <v-img
          :src="book.image || 'https://via.placeholder.com/192x303?text=Обложка'"
          width="230"
          height="295"
          cover
          class="book-image"
          alt="Обложка книги"
        />
      </v-col>

      <!-- Описание справа с отступом -->
      <v-col cols="8" class="info-col pl-6">
        <v-card-title class="text-h6 mb-1" :title="book.title">{{ book.title }}</v-card-title>
        <v-card-subtitle v-if="book.author" class="mb-2">{{ book.author }}</v-card-subtitle>

        <div class="book-genre-year mb-2">{{ book.genre }} • {{ book.year }}</div>

        <div class="book-description mb-3">
          {{ book.description }}
        </div>

        <div class="price mb-2 font-weight-bold text-h6">{{ book.price }} ₽</div>

        <v-btn color="black" @click.stop="$emit('add-to-cart', book)">В корзину</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.book-card {
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.2s ease;
  max-width: 700px;
  margin: 8px auto;
}
.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15); /* TODO вынести в константу цвет тени, чекни в инете как*/
}

.image-col {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5; /* TODO вынести в константу, чекни в инете как*/
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  overflow: hidden;
}

.book-image {
  border-radius: 12px;
  object-fit: contain !important;
}

.info-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.book-description {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 110px;
  line-height: 1.2rem;
}

.book-genre-year {
  color: #666;
  font-size: 0.9rem;
}

.price {
  color: #000000; /* TODO вынести в константу, чекни в инете как*/
}
</style>
