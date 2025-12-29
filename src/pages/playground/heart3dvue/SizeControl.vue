<template>
	<div class="control-group">
		<label class="control-label">Kích thước</label>
		<div class="size-control">
			<input
				type="range"
				class="slider"
				min="0.5"
				max="2"
				step="0.1"
				:value="modelValue"
				@input="handleInput"
			>
			<span class="size-value">{{ modelValue.toFixed(1) }}x</span>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: Number,
		default: 1.0
	}
});

const emit = defineEmits(['update:modelValue']);

function handleInput(event) {
	const value = parseFloat(event.target.value);
	emit('update:modelValue', value);
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

.size-control {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.slider {
	flex: 1;
	height: 8px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.2);
	outline: none;
	-webkit-appearance: none;
	appearance: none;
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: linear-gradient(135deg, #ff6b9d, #c44569);
	cursor: pointer;
	box-shadow: 0 0 15px rgba(255, 107, 157, 0.8);
	transition: all 0.3s;
}

.slider::-webkit-slider-thumb:hover {
	transform: scale(1.2);
	box-shadow: 0 0 25px rgba(255, 107, 157, 1);
}

.slider::-moz-range-thumb {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: linear-gradient(135deg, #ff6b9d, #c44569);
	cursor: pointer;
	border: none;
	box-shadow: 0 0 15px rgba(255, 107, 157, 0.8);
	transition: all 0.3s;
}

.slider::-moz-range-thumb:hover {
	transform: scale(1.2);
	box-shadow: 0 0 25px rgba(255, 107, 157, 1);
}

.size-value {
	min-width: 50px;
	text-align: center;
	font-weight: 600;
	font-size: 1rem;
	color: #ff6b9d;
	text-shadow: 0 0 10px rgba(255, 107, 157, 0.5);
}

@media (max-width: 768px) {
	.control-group {
		margin-bottom: 1rem;
	}
}
</style>
