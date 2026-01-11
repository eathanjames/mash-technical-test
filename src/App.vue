<script setup lang="ts">
import { onMounted } from 'vue';
import { useGameState } from './composables/useGameState';
import GameSetup from './components/GameSetup.vue';
import SpiralDrawing from "./components/SpiralDrawing.vue";
import Results from "./components/Results.vue";
import GamePlay from './components/GamePlay.vue';

const {
  gameState,
  updateCategory,
  isSetupPhaseComplete,
  initialiseMashGame,
  startSpiralPhase,
  startEliminationPhase,
  startResultsPhase,
  resetGameState,
} = useGameState();


onMounted(() => {
  initialiseMashGame();
});

function handleSetupComplete() {
  startSpiralPhase();
}

function handleCategoryUpdate(categoryId: string, options: string[]) {
  updateCategory(categoryId, options);
}

function handleSpiralComplete(number: number) {
  startEliminationPhase(number);
}

function handleEliminationComplete() {
  startResultsPhase();
}

function handlePlayAgain() {
  resetGameState();
}

</script>

<template>
  <div id="app">
    <GameSetup
        v-if="gameState.phase === 'choices'"
        :categories="gameState.categories"
        :is-complete="isSetupPhaseComplete"
        @complete="handleSetupComplete"
        @update-category="handleCategoryUpdate"
    />

   <SpiralDrawing
        v-else-if="gameState.phase === 'spiral'"
        @complete="handleSpiralComplete"
    />

    <GamePlay
           v-else-if="gameState.phase === 'elimination'"
           :categories="gameState.categories"
           @complete="handleEliminationComplete"
           :elimination-number="gameState.eliminationCount" />

       <Results
           v-else-if="gameState.phase === 'results'"
           :categories="gameState.categories"
           @play-again="handlePlayAgain"
       />
  </div>
</template>

<style>

</style>
