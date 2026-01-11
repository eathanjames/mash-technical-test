<script setup lang="ts">
import type { Category } from '../types/game';
import { useGameEngine } from '../composables/useGameEngine';

const props = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  playAgain: [];
}>();

const { getFinalSelections } = useGameEngine();

const finalSelections = getFinalSelections(props.categories);

function handlePlayAgain() {
  emit('playAgain');
}
</script>

<template>
  <div class="results">
    <div class="header">
      <h1>Your MASH predictions</h1>
    </div>
    <div class="results-grid">
      <div
          v-for="category in categories"
          :key="category.id"
          class="result-card"
      >
        <div class="card-header">
          <h3>{{ category.name }}</h3>
        </div>
        <div class="card-body">
          <div class="result-value">
            {{ finalSelections.get(category.id)?.value }}
          </div>
        </div>
      </div>
    </div>

    <div class="fortune-text">
      <p>
        You will live in a <strong>{{ finalSelections.get('home')?.value }}</strong>,
        drive a <strong>{{ finalSelections.get('car')?.value }}</strong>,
        marry <strong>{{ finalSelections.get('partner')?.value }}</strong>,
        have <strong>{{ finalSelections.get('kids')?.value }}</strong> kids,
        and work as a <strong>{{ finalSelections.get('job')?.value }}</strong>
        earning <strong>${{ finalSelections.get('salary')?.value }}</strong>.
      </p>
    </div>

    <div class="actions">
      <button @click="handlePlayAgain" class="btn-primary">
        Restart
      </button>
    </div>
  </div>
</template>

<style scoped>
.results{
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.result-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: slideIn 0.5s ease backwards;
}

.result-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.result-card:nth-child(1) { animation-delay: 0.1s; }
.result-card:nth-child(2) { animation-delay: 0.2s; }
.result-card:nth-child(3) { animation-delay: 0.3s; }
.result-card:nth-child(4) { animation-delay: 0.4s; }
.result-card:nth-child(5) { animation-delay: 0.5s; }


@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  background: #4CAF50;
  padding: 1.5rem;
  text-align: center;
}

.card-header h3 {
  margin: 0;
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-body {
  padding: 2rem 1.5rem;
  text-align: center;
}

.result-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  line-height: 1;
}

.fortune-text {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  margin: 3rem 0;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.fortune-text p {
  font-size: 1.3rem;
  line-height: 1.8;
  color: black;
  margin: 0;
}

.fortune-text strong {
  color: #4CAF50;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;
}
</style>