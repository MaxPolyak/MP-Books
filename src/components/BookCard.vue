<template>
    <v-card
      class="book-card"
      elevation="3"
    >
      <v-img
        :src="book.image || 'https://via.placeholder.com/300x400?text=Обложка'"
        height="440"
        contain
        class="book-image"
        style="background-color: #f5f5f5;"
      ></v-img>
  
      <v-card-title class="text-h6">{{ book.title }}</v-card-title>
      <v-card-subtitle v-if="book.author">{{ book.author }}</v-card-subtitle>
  
      <v-card-text>
        <div class="text-body-2 text-grey-darken-1">{{ book.genre }} • {{ book.year }}</div>
        <div class="mt-2 font-weight-bold text-h6">{{ book.price }} ₽</div>
      </v-card-text>
  
      <v-card-actions>
        <v-btn color="primary" @click="$emit('add-to-cart', book)">В корзину</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  defineProps({
    book: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .book-card {
    transition: all 0.2s ease;
    cursor: pointer;
    border-radius: 16px;
  }
  .book-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
  .book-image {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  </style>
  