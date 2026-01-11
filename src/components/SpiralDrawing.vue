<script setup lang="ts">
import { ref, onMounted } from 'vue';

const emit = defineEmits<{
  complete: [number: number];
}>();

const canvas = ref<HTMLCanvasElement>();
const isDrawing = ref(false);
const spiralCount = ref(0);
const hasDrawn = ref(false);

let ctx: CanvasRenderingContext2D | null = null;
let lastX = 0;
let lastY = 0;

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#4CAF50';
    }
  }
});

function startDrawing(e: MouseEvent) {
  if (!ctx || !canvas.value) return;
  isDrawing.value = true;
  hasDrawn.value = true;
  const rect = canvas.value.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
  spiralCount.value = 0;
}

function draw(e: MouseEvent) {
  if (!isDrawing.value || !ctx || !canvas.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  lastX = currentX;
  lastY = currentY;
  spiralCount.value++;
}

function stopDrawing() {
  if (!isDrawing.value) return;
  isDrawing.value = false;
}

function finishSpiral() {
  const eliminationNumber = Math.min(15, Math.max(3, Math.floor(spiralCount.value / 100)));
  emit('complete', eliminationNumber);
}

function clearCanvas() {
  if (ctx && canvas.value) {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    spiralCount.value = 0;
    hasDrawn.value = false;
  }
}
</script>

<template>
  <div class="spiral-container">
    <div class="header">
      <h2>Draw a Spiral</h2>
      <p class="instructions">
        Click and drag to draw a spiral
      </p>
      <p class="hint">
        The length of the spiral determines your elimination pattern
      </p>
    </div>

    <div class="canvas-wrapper">
      <canvas
          ref="canvas"
          width="600"
          height="600"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
      />
      <div v-if="!hasDrawn" class="overlay-hint">
        Start drawing here.
      </div>
    </div>

    <div class="controls">
      <div v-if="spiralCount > 0" class="count">
        Spiral Score: <strong>{{ spiralCount }}</strong>
        <span class="elimination-preview">
          (Elimination number: {{ Math.min(15, Math.max(3, Math.floor(spiralCount / 100))) }})
        </span>
      </div>

      <div class="buttons">
        <button
            @click="clearCanvas"
            class="btn-secondary"
            :disabled="!hasDrawn"
        >
          Clear & Redraw
        </button>
        <button
            @click="finishSpiral"
            class="btn-primary"
            :disabled="spiralCount < 30"
        >Finish</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spiral-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  min-height: 100vh;
}

.canvas-wrapper {
  position: relative;
  display: inline-block;
  border: 3px solid #4CAF50;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  cursor: crosshair;
  background: white;
}

canvas {
  display: block;
}

.overlay-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #ccc;
  pointer-events: none;
  font-weight: 600;
}

.controls {
  margin-top: 2rem;
}

.count {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: black;
}

.count strong {
  color: #4CAF50;
  font-size: 1.5rem;
}

.elimination-preview {
  display: block;
  font-size: 1rem;
  color: black;
  margin-top: 0.5rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>