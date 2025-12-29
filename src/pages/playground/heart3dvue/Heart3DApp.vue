<template>
	<div class="app">
		<Heart3D 
			:color="selectedColor" 
			:size="size"
		/>
		<button 
			class="toggle-btn"
			:class="{ 'open': isControlsOpen }"
			@click="toggleControls"
			:aria-label="isControlsOpen ? 'Đóng bảng điều khiển' : 'Mở bảng điều khiển'"
		>
			<svg v-if="!isControlsOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M3 12h18M3 6h18M3 18h18"/>
			</svg>
			<svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6L6 18M6 6l12 12"/>
			</svg>
		</button>
		<Transition name="slide">
			<div v-if="isControlsOpen" class="controls-panel">
				<h1 class="title">💖 3D Neon Heart</h1>
				
				<ColorControls 
					:colors="colors"
					:selected-index="selectedColorIndex"
					@color-change="handleColorChange"
				/>

				<SizeControl 
					v-model="size"
				/>

				<p class="info-text">Điều chỉnh màu sắc và kích thước trái tim</p>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Heart3D from './Heart3D.vue';
import ColorControls from './ColorControls.vue';
import SizeControl from './SizeControl.vue';

const selectedColorIndex = ref(0);
const size = ref(1.0);
const isControlsOpen = ref(true);

const colors = [
	'#ff6b9d', // Pink
	'#c44569', // Dark Pink
	'#ff1744', // Red
	'#e91e63', // Pink Red
	'#9c27b0', // Purple
	'#673ab7', // Deep Purple
	'#3f51b5', // Indigo
	'#00bcd4', // Cyan
	'#00e676', // Green
	'#ffeb3b', // Yellow
	'#ff9800', // Orange
	'#ff5722'  // Deep Orange
];

const selectedColor = computed(() => colors[selectedColorIndex.value]);

function handleColorChange(index) {
	selectedColorIndex.value = index;
}

function toggleControls() {
	isControlsOpen.value = !isControlsOpen.value;
}
</script>

<style scoped>
.app {
	width: 100vw;
	height: 100vh;
	position: relative;
	background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
	overflow: hidden;
}

.toggle-btn {
	position: absolute;
	top: 2rem;
	left: 2rem;
	width: 48px;
	height: 48px;
	border-radius: 12px;
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	color: #fff;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	z-index: 100;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.toggle-btn:hover {
	background: rgba(0, 0, 0, 0.9);
	transform: scale(1.05);
	border-color: rgba(255, 107, 157, 0.5);
	box-shadow: 0 0 20px rgba(255, 107, 157, 0.3);
}

.toggle-btn.open {
	left: calc(320px + 2rem);
}

.controls-panel {
	position: absolute;
	top: 2rem;
	left: 2rem;
	width: 320px;
	max-height: calc(100vh - 4rem);
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 2rem;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.1);
	overflow-y: auto;
	z-index: 99;
}

.controls-panel::-webkit-scrollbar {
	width: 6px;
}

.controls-panel::-webkit-scrollbar-track {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 10px;
}

.controls-panel::-webkit-scrollbar-thumb {
	background: rgba(255, 107, 157, 0.5);
	border-radius: 10px;
}

.controls-panel::-webkit-scrollbar-thumb:hover {
	background: rgba(255, 107, 157, 0.7);
}

.title {
	text-align: center;
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 1.5rem;
	background: linear-gradient(135deg, #ff6b9d, #c44569, #ff6b9d);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-shadow: 0 0 30px rgba(255, 107, 157, 0.5);
}

.info-text {
	text-align: center;
	font-size: 0.85rem;
	color: rgba(255, 255, 255, 0.6);
	margin-top: 1rem;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease;
}

.slide-enter-from {
	opacity: 0;
	transform: translateX(-100%);
}

.slide-leave-to {
	opacity: 0;
	transform: translateX(-100%);
}

@media (max-width: 768px) {
	.toggle-btn {
		top: 1rem;
		left: 1rem;
		width: 40px;
		height: 40px;
	}

	.toggle-btn.open {
		left: calc(280px + 1rem);
	}

	.controls-panel {
		top: 1rem;
		left: 1rem;
		width: 280px;
		max-height: calc(100vh - 2rem);
		padding: 1.5rem;
	}

	.title {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
}
</style>
