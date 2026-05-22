<template>
	<div class="control-group">
		<label class="control-label">Màu sắc</label>
		<div class="color-buttons">
			<button
				v-for="(color, index) in colors"
				:key="index"
				class="color-btn"
				:class="{ active: selectedIndex === index }"
				:style="{ background: color }"
				@click="handleClick(index)"
			></button>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	colors: {
		type: Array,
		required: true
	},
	selectedIndex: {
		type: Number,
		default: 0
	}
});

const emit = defineEmits(['color-change']);

function handleClick(index) {
	emit('color-change', index);
}
</script>

<style scoped>
.control-group {
	margin-bottom: 1.5rem;
}

.control-label {
	display: block;
	margin-bottom: 0.75rem;
	font-size: 0.9rem;
	font-weight: 600;
	color: #fff;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.color-buttons {
	display: flex;
	gap: 0.75rem;
	flex-wrap: wrap;
	justify-content: center;
}

.color-btn {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: 3px solid transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
	position: relative;
	background: currentColor;
}

.color-btn:hover {
	transform: scale(1.1);
	box-shadow: 0 0 20px currentColor;
}

.color-btn.active {
	border-color: #fff;
	box-shadow: 0 0 25px currentColor, 0 0 50px currentColor;
	transform: scale(1.15);
}

.color-btn::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.3);
	opacity: 0;
	transition: opacity 0.3s;
}

.color-btn.active::after {
	opacity: 1;
}

@media (max-width: 768px) {
	.color-btn {
		width: 40px;
		height: 40px;
	}

	.control-group {
		margin-bottom: 1rem;
	}
}
</style>
