<script setup lang="ts">
import data from "../../bdd.json";
const getImage = (img: string) => {
  return new URL(`../assets/${img}`, import.meta.url).href;
};
</script>

<template>
  <h2>Les vestes</h2>
  <div class="article_cards">
    <article v-for="article in data" :key="article.title">
      <div class="flip-container">
        <div class="flipper">
          <!-- RECTO -->
          <a href="#" class="card face recto">
            <img :src="getImage(article.image_recto)" :alt="article.title" />
            <div class="card-body">
              <h2>{{ article.title }}</h2>
              <!-- <p>{{ article.description }}</p> -->
              <p>{{ article.price }}</p>
            </div>
          </a>
          <!-- VERSO -->
          <a href="#" class="card face verso">
            <img
              :src="getImage(article.image_verso)"
              :alt="article.title + ' - verso'"
            />
            <div class="card-body">
              <h2>{{ article.title }}</h2>
              <!-- <p>{{ article.description }}</p> -->
              <p>{{ article.price }}</p>
            </div>
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.article_cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

article {
  display: flex;
  flex: 1;
  min-width: 220px;
}

.flip-container {
  width: 100%;
  perspective: 1000px;
  aspect-ratio: 3 / 4;
}
.flipper,
.card {
  height: 100%;
}

.flipper {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%; /* ← prend la hauteur du parent */
}

.flip-container:hover .flipper {
  transform: rotateY(180deg);
}

.card {
  background-color: var(--bg_2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  border-radius: 17px;
  width: 100%;
  height: 100%; /* ← occupe toute la hauteur */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  text-decoration: none;
  color: inherit;
}

.face {
  position: absolute;
  top: 0;
  left: 0;
}

.recto {
  position: relative;
}

.verso {
  transform: rotateY(180deg);
}

.card img {
  height: 80%;
  width: 100%;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px;
  flex: 1; /* ← le texte prend l'espace restant */
}

/* ── CARROUSEL MOBILE ── */
@media (max-width: 600px) {
  .article_cards {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 12px;
    padding: 8px 16px 16px;
    scroll-padding-left: 16px;
    scrollbar-width: none;
    align-items: stretch; /* ← toutes les cartes ont la même hauteur */
  }

  .article_cards::-webkit-scrollbar {
    display: none;
  }

  article {
    flex: 0 0 80vw; /* ← légèrement plus large */
    min-width: unset;
    scroll-snap-align: start;
    display: flex;
    align-self: stretch; /* ← étire la carte verticalement */
  }

  .flip-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .flipper {
    flex: 1; /* ← prend toute la hauteur disponible */
  }

  .flip-container:hover .flipper {
    transform: none;
  }

  .card img {
    height: auto;
    aspect-ratio: 3 / 4;
    flex-shrink: 0;
  }
}
</style>
