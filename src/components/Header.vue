<script setup></script>


<template>
   <header>
    <router-link to="/">Главная</router-link>
    <router-link to="/cart">
      🛒 Корзина ({{ cartCount }})
    </router-link>
  </header>
 <v-app-bar :elevation="2">
  <template v-slot:prepend>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </template>
  <v-app-bar-title>Application Bar</v-app-bar-title>
</v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', ['cartCount'])
  }
};
</script>