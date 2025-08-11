<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <v-toolbar-title>📚 MP Books</v-toolbar-title>
      <v-spacer />
      <v-btn text to="/">Главная</v-btn>
      <v-btn text to="/books">Книги</v-btn>
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

onMounted(() => {
  console.log('Приложение загружено')
})
</script>
