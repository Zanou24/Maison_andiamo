---
description: "Projet Maison Andiamo - Instructions pour Copilot"
---

# Instructions Copilot - Projet Maison Andiamo

## 🇫🇷 Langue de Communication

**Répondre toujours en français** dans tous les contextes : explications de code, suggestions, documentation, commentaires, et messages d'erreur.

## Structure du Projet

- **Backend**: NestJS avec authentification JWT et gestion des cookies
- **Frontend**: Vue 3 + TypeScript avec Pinia pour la gestion d'état
- Authentification propriétaire avec hash de mot de passe

## Conventions

- Utiliser les DTOs (Data Transfer Objects) pour valider les données entrantes
- Protéger les routes sensibles avec `JwtAuthGuard`
- Utiliser `bcrypt` pour le hachage des mots de passe
- Stocker les tokens dans des cookies `httpOnly`, `secure`, `sameSite: 'strict'`
- Utiliser Pinia pour l'état global d'authentification côté frontend
