<script setup lang="ts">
import type {Category} from "../types/game.ts";
import CategoryInput from "./CategoryInput.vue";

defineProps<{
  categories: Category[];
  isComplete: boolean;
}>();

const emit = defineEmits<{
  complete: [];
  updateCategory: [categoryId: string, options: string[]];
}>();

function handleCategoryUpdate(categoryId: string, options: string[]) {
  emit('updateCategory', categoryId, options);
}

function handleNext() {
  emit('complete');
}
</script>
<template>
  <div class="game-setup">
    <div class="header">
      <h1>Predict Your Future!</h1>
      <p class="instructions">
        For help on how to play, check <a href="https://lifehacker.com/how-to-play-mash-1809951633">here.</a>
      </p>
    </div>
    <div class="categories">
      <CategoryInput
          v-for="category in categories"
          :key="category.id"
          :category="category"
          @update="handleCategoryUpdate"
      />
    </div>

    <div class="submit">
    <button
        @click="handleNext"
        :disabled="!isComplete"
        class="btn-primary"
    >
      Submit
    </button>
      </div>
  </div>
</template>

<style scoped>
.game-setup {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}


.categories {
  display: grid;
  gap: 2rem;
  margin: 2rem 0 3rem 0;
}
.submit {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>