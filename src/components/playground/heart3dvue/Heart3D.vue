<template>
	<div ref="canvasContainer" class="canvas-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
	color: {
		type: String,
		default: '#ff6b9d'
	},
	size: {
		type: Number,
		default: 1.0
	}
});

const canvasContainer = ref(null);
let scene, camera, renderer, particleSystem, glowSystem;
let animationId;

// Heart shape parametric equation
function heartShape(t, scale = 1) {
	const x = 16 * Math.pow(Math.sin(t), 3) * scale;
	const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale;
	return { x, y };
}

function initThree() {
	// Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	// Camera
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = 30;

	// Renderer
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	canvasContainer.value.appendChild(renderer.domElement);

	// Create particles
	const particleCount = 2000;
	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(particleCount * 3);
	const colors_array = new Float32Array(particleCount * 3);

	// Generate heart shape particles
	for (let i = 0; i < particleCount; i++) {
		const t = (i / particleCount) * Math.PI * 2;
		const { x, y } = heartShape(t, 1);
		const z = (Math.random() - 0.5) * 2;

		positions[i * 3] = x;
		positions[i * 3 + 1] = y;
		positions[i * 3 + 2] = z;

		// Color based on prop
		const color = new THREE.Color(props.color);
		colors_array[i * 3] = color.r;
		colors_array[i * 3 + 1] = color.g;
		colors_array[i * 3 + 2] = color.b;
	}

	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors_array, 3));

	// Material with neon glow effect
	const material = new THREE.PointsMaterial({
		size: 0.3,
		vertexColors: true,
		transparent: true,
		opacity: 0.9,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});

	particleSystem = new THREE.Points(geometry, material);
	scene.add(particleSystem);

	// Add glow effect with additional particles
	const glowGeometry = new THREE.BufferGeometry();
	const glowPositions = new Float32Array(particleCount * 3);
	const glowColors = new Float32Array(particleCount * 3);

	for (let i = 0; i < particleCount; i++) {
		const t = (i / particleCount) * Math.PI * 2;
		const { x, y } = heartShape(t, 1.05);
		const z = (Math.random() - 0.5) * 2;

		glowPositions[i * 3] = x;
		glowPositions[i * 3 + 1] = y;
		glowPositions[i * 3 + 2] = z;

		const color = new THREE.Color(props.color);
		glowColors[i * 3] = color.r * 0.5;
		glowColors[i * 3 + 1] = color.g * 0.5;
		glowColors[i * 3 + 2] = color.b * 0.5;
	}

	glowGeometry.setAttribute('position', new THREE.BufferAttribute(glowPositions, 3));
	glowGeometry.setAttribute('color', new THREE.BufferAttribute(glowColors, 3));

	const glowMaterial = new THREE.PointsMaterial({
		size: 0.5,
		vertexColors: true,
		transparent: true,
		opacity: 0.3,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});

	glowSystem = new THREE.Points(glowGeometry, glowMaterial);
	scene.add(glowSystem);

	// Animation
	function animate() {
		animationId = requestAnimationFrame(animate);

		// Rotate heart
		particleSystem.rotation.y += 0.005;
		glowSystem.rotation.y += 0.005;

		// Pulsing effect
		const time = Date.now() * 0.001;
		particleSystem.scale.setScalar(props.size + Math.sin(time) * 0.1);
		glowSystem.scale.setScalar(props.size + Math.sin(time) * 0.1);

		renderer.render(scene, camera);
	}

	animate();
}

function updateColor() {
	if (!particleSystem || !glowSystem) return;

	const color = new THREE.Color(props.color);
	const colors_array = particleSystem.geometry.attributes.color.array;
	const glowColors = glowSystem.geometry.attributes.color.array;

	for (let i = 0; i < colors_array.length; i += 3) {
		colors_array[i] = color.r;
		colors_array[i + 1] = color.g;
		colors_array[i + 2] = color.b;

		if (i < glowColors.length) {
			glowColors[i] = color.r * 0.5;
			glowColors[i + 1] = color.g * 0.5;
			glowColors[i + 2] = color.b * 0.5;
		}
	}

	particleSystem.geometry.attributes.color.needsUpdate = true;
	glowSystem.geometry.attributes.color.needsUpdate = true;
}

function handleResize() {
	if (!camera || !renderer) return;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

onMounted(() => {
	initThree();
	window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
	if (animationId) {
		cancelAnimationFrame(animationId);
	}
	window.removeEventListener('resize', handleResize);
	if (renderer && canvasContainer.value) {
		renderer.dispose();
		canvasContainer.value.removeChild(renderer.domElement);
	}
});

watch(() => props.color, () => {
	updateColor();
});
</script>

<style scoped>
.canvas-container {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
</style>
