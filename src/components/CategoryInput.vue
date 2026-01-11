<script setup lang="ts">
import type {Category} from '../types/game';
import {ref, watch} from "vue";

const props = defineProps<{
  category: Category;
}>();

const emit = defineEmits<{
  update: [categoryId: string, options: string[]];
}>();

//Start with 4 empty strings if the category has no options
const optionInputs = ref<string[]>(
    props.category.options.length > 0
        ? props.category.options.map(opt => opt.value)
        : ['', '', '', '']
);

function addOption() {
  optionInputs.value.push('');
}

function removeOption(index: number) {
  if (optionInputs.value.length > 4) {
    optionInputs.value.splice(index, 1);
    emitUpdate();
  }
}

function emitUpdate() {
  const validOptions = optionInputs.value.filter(opt => opt.trim() !== '');
  emit('update', props.category.id, validOptions);
}

watch(optionInputs, () => {
  emitUpdate();
}, {deep: true});
</script>

<template>
  <div class="category-input">
    <h3>{{ category.name }}</h3>
    <div class="options">
      <div v-for="(_, index) in optionInputs" :key="index" class="option-row">
        <input v-model="optionInputs[index]" type="text" :placeholder="`Option ${index + 1}`" class="option-input"/>
        <button v-if="optionInputs.length > 4" @click="removeOption(index)" class="btn-remove" type="button">Remove
        </button>
      </div>
    </div>
    <button @click="addOption" class="btn-primary" type="button">Add Option</button>
  </div>
</template>

<style scoped>
.category-input {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
}

.category-input h3 {
  margin: 0 0 1rem 0;
  color: #000000;
  font-size: 1.5rem;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 0.5rem;

}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-row {
  display: flex;
  gap: 0.5rem;
}

.option-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.option-input:focus {
  outline: none;
  border-color: #4CAF50;
}

</style>