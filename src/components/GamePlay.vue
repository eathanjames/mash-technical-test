<script setup lang="ts">
import {ref, onMounted} from 'vue';
import type {Category} from '../types/game';
import {useGameEngine} from '../composables/useGameEngine';

const props = defineProps<{
  categories: Category[];
  eliminationNumber: number;
}>();

const emit = defineEmits<{
  complete: [];
}>();

const currentStepIndex = ref(-1);
const eliminatedIds = ref<Set<string>>(new Set());
const steps = ref<string[]>([]);
const isAnimating = ref(true);

onMounted(() => {
  // Calculate all elimination steps
  steps.value = useGameEngine().calculateEliminations(props.categories, props.eliminationNumber);
  animateElimination();
});

async function animateElimination() {
  // Initial suspense
  await delay(1500);

  // Animate each elimination step
  for (let i = 0; i < steps.value.length; i++) {
    const step = steps.value[i];
    if (!step) continue;

    currentStepIndex.value = i;
    eliminatedIds.value.add(step);
    await delay(600);
  }

  isAnimating.value = false;
  await delay(1000);
  emit('complete');

}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isEliminated(optionId: string): boolean {
  return eliminatedIds.value.has(optionId);
}

function isCurrentlyEliminating(optionId: string): boolean {
  if (currentStepIndex.value < 0 || currentStepIndex.value >= steps.value.length) return false;
  return steps.value[currentStepIndex.value] === optionId;
}

function getOrdinalSuffix(num: number): string {
  if (num === 1) return 'st';
  if (num === 2) return 'nd';
  if (num === 3) return 'rd';
  return 'th';
}
</script>

<template>
  <div class="game-play">
    <div class="header">
      <h2>Running eliminations...</h2>
      <p class="elimination-number">
        Every <strong>{{ eliminationNumber }}{{ getOrdinalSuffix(eliminationNumber) }}</strong> item is eliminated
      </p>
      <div v-if="isAnimating" class="progress-indicator">
        <div class="spinner"></div>
        <p>Determining your fate</p>
      </div>
    </div>

    <div class="categories-grid">
      <div
          v-for="category in categories"
          :key="category.id"
          class="category"
      >
        <h3>{{ category.name }}</h3>
        <ul class="options-list">
          <li
              v-for="option in category.options"
              :key="option.id"
              :class="{
              'eliminated': isEliminated(option.id),
              'eliminating': isCurrentlyEliminating(option.id),
              'survived': !isAnimating && !isEliminated(option.id)
            }"
          >
            <span class="option-text">{{ option.value }}</span>
            <span v-if="isCurrentlyEliminating(option.id)" class="elimination-marker"></span>
            <span v-if="!isAnimating && !isEliminated(option.id)" class="winner-marker"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-play {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}


.elimination-number {
  font-size: 1.3rem;
  color: black;
  margin-bottom: 1.5rem;
}

.elimination-number strong {
  color: #4CAF50;
  font-size: 1.5rem;
}

.progress-indicator {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: black;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.category {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.category:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.category h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.4rem;
  border-bottom: 3px solid #4CAF50;
  padding-bottom: 0.5rem;
}

.options-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.options-list li {
  padding: 1rem;
  margin: 0.75rem 0;
  background: #f8f8f8;
  border-radius: 8px;
  transition: all 0.5s ease;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.05rem;
}

.option-text {
  flex: 1;
}

.options-list li.eliminating {
  background: linear-gradient(135deg, #ff6b6b, #ff5252);
  color: white;
  transform: scale(1.05);
  animation: pulse 0.5s ease;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.options-list li.eliminated {
  text-decoration: line-through;
  opacity: 0.25;
  background: #e0e0e0;
  color: #999;
  transform: scale(0.95);
}

.options-list li.survived {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  font-weight: 600;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
  animation: celebrate 0.6s ease;
}

.elimination-marker,
.winner-marker {
  font-size: 1.2rem;
  animation: fadeIn 0.3s ease;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.05); }
  50% { transform: scale(1.1); }
}

@keyframes celebrate {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1.05); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}
</style>