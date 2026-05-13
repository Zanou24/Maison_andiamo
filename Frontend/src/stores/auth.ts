import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/plugins/axios";

export const useAuthStore = defineStore("auth", () => {
  const isOwner = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function login(password: string) {
    isLoading.value = true;
    error.value = null;
    try {
      await api.post("/auth/login", { password });
      isOwner.value = true;
    } catch {
      error.value = "Mot de passe incorrect";
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    await api.post("/auth/logout");
    isOwner.value = false;
  }

  async function checkSession() {
    // appelé au chargement de l'app pour restaurer la session
    try {
      await api.get("/auth/me");
      isOwner.value = true;
    } catch {
      isOwner.value = false;
    }
  }

  return { isOwner, isLoading, error, login, logout, checkSession };
});
