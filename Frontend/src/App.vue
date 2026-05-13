<script setup lang="ts">
import { ref } from "vue";
import ArticleCards from "./components/articleCards.vue";
import Menu from "./components/menu.vue";
import ArticleCard from "./components/articleCard.vue";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import LoginModal from "./components/loginModal.vue";

const auth = useAuthStore();
const showLogin = ref(false);

onMounted(() => {
  auth.checkSession(); // vérifie si le cookie est encore valide
});

const isLight = ref(false);
const menu = ref(false);

function toggleLight() {
  isLight.value = !isLight.value;
  document.documentElement.classList.toggle("light", isLight.value);
}
function toggleMenu() {
  menu.value = !menu.value;
}
</script>

<template>
  <header>
    <nav class="navbar">
      <button @click="toggleMenu">Menu</button>
    </nav>
    <h1>
      <span class="maison">Maison </span><span class="andiamo">Andiamo</span>
    </h1>
    <button @click="toggleLight">light</button>
  </header>
  <main>
    <section class="header"></section>
    <Menu v-if="menu" />

    <section class="article_cards">
      <ArticleCards />
    </section>
    <section>section 2</section>
    <section>
      <ArticleCard
        title="title1"
        image="img1"
        description="desc1"
        price="price1"
      />
    </section>
    <div>
      <h1>Mon site</h1>

      <!-- bouton de connexion discret si non connecté -->
      <button v-if="!auth.isOwner" @click="showLogin = true">Connexion</button>

      <!-- contrôles d'édition si connecté -->
      <EditToolbar v-if="auth.isOwner" />
      <button v-if="auth.isOwner" @click="auth.logout">Se déconnecter</button>

      <LoginModal v-if="showLogin && !auth.isOwner" />
    </div>
  </main>
  <footer></footer>
</template>

<style global>
:root {
  --header-bg: rgb(20 19 19 / 0.8);
  --bg: rgb(20 19 19 /1);
  --bg_2: #2a2b2b;
  --text: #ffd700;
  --text_2: #b8860b;
  --button-bg: #ffffff;
}
:root.light {
  --header-bg: #aaaaaa;
  --bg: #ffffff;
  --bg_2: #f7f7f7;
  --text: #b8860b;
  --text_2: #ffd700;
  --button-bg: #0d0d0d;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  color: var(--text);
}
body {
  background-color: var(--bg);
  font-family: Arial, sans-serif;
}
button {
  background-color: var(--button-bg);
  color: var(--text_2);
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}
h1 {
  color: var(--text);
}
</style>
<style scoped>
header {
  background-color: var(--header-bg);
  padding: 0 1rem;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  width: 100%;
  min-height: 50px;
  height: fit-content;
  z-index: 1000;
}

section {
  /* height: 100vh; */
  width: 100%;
}
.header {
  min-height: 50px;
  height: 5vh;
}
h1:has(span.maison) {
  font-family: "Lobster", "sans-serif";
}
.maison {
  font-size: 2.5rem;
  color: #f01b1b;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #ff0000;
  letter-spacing: 2px;
  margin-bottom: -10px;
}

.andiamo {
  font-size: 2.5rem;
  color: #0cc971;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #00ff88;
  letter-spacing: 2px;
  margin-left: -8px;
}

/* Flicker animation subtile */
@keyframes flicker {
  0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    opacity: 1;
  }
  20%,
  24%,
  55% {
    opacity: 0.92;
  }
}

.maison {
  animation: flicker 6s infinite;
}
.andiamo {
  animation: flicker 8s infinite 1s;
}
</style>
