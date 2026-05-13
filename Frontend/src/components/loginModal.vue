<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const password = ref("");

async function handleLogin() {
  await auth.login(password.value);
  password.value = ""; // efface le mot de passe du DOM après soumission
}
</script>

<template>
  <div class="modal">
    <h2>Connexion</h2>

    <input
      v-model="password"
      type="password"
      placeholder="Mot de passe"
      @keyup.enter="handleLogin"
    />

    <p v-if="auth.error" class="error">{{ auth.error }}</p>

    <button :disabled="auth.isLoading.value" @click="handleLogin">
      {{ auth.isLoading ? "Connexion..." : "Se connecter" }}
    </button>
  </div>
</template>
