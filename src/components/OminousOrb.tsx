import { Line, Outlines } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import * as THREE from 'three';

interface AnimationState {
	progress: number;
	duration: number;
	startTime: number;
	baseSpeed: number;
	maxSpeedMultiplier: number;
}
function OminousOrb() {
	const groupRef = useRef<THREE.Group>(null);
	const orbRef = useRef<THREE.Mesh>(null);
	const containerRef = useRef<THREE.Group>(null);
	const radiatingLinesRef = useRef<THREE.Group>(null);
	const [animating, setAnimating] = useState(false);
	const animationRef = useRef<AnimationState>({
		progress: 0,
		duration: 1,
		startTime: 0,
		baseSpeed: 0.01,
		maxSpeedMultiplier: 10,
	});

	const [animate, dispatch] = useReducer((animate: number) => {
		return ++animate;
	}, 0);

	useEffect(() => {
		if (animate) {
			setAnimating(true);
			animationRef.current.startTime = Date.now();
			animationRef.current.progress = 0;
		}
	}, [animate]);

	const orbLines = useMemo(() => {
		const radius = 3.01;
		const segments = 64;
		const rings = 50;

		const linesData = [];

		for (let i = 1; i < rings; i++) {
			const phi = (Math.PI * i) / rings;
			const y = radius * Math.cos(phi);

			const lineLength = Math.random() * 0.5;
			const lineOffset = Math.random();

			const linePoints = [];

			const startAngle = Math.PI * lineOffset * 2;
			const endAngle = startAngle + Math.PI * lineLength * 2;

			const arcSegments = Math.floor(segments * lineLength);

			for (let j = 0; j <= arcSegments; j++) {
				const theta =
					startAngle + (endAngle - startAngle) * (j / arcSegments);
				const x = radius * Math.sin(phi) * Math.cos(theta);
				const z = radius * Math.sin(phi) * Math.sin(theta);

				linePoints.push(new THREE.Vector3(x, y, z));
			}

			linesData.push(linePoints);
		}

		return linesData;
	}, []);

	const radiatingLines = useMemo(() => {
		const orbRadius = 3;
		const startDistance = orbRadius + 0.7;
		const numLines = 100;
		const maxLength = 100;

		const lines = [];

		for (let i = 0; i < numLines; i++) {
			const angle = (i / numLines) * Math.PI * 2;
			const startX = Math.cos(angle) * startDistance;
			const startY = Math.sin(angle) * startDistance;

			const endX = Math.cos(angle) * (startDistance + maxLength);
			const endY = Math.sin(angle) * (startDistance + maxLength);

			lines.push([
				new THREE.Vector3(startX, startY, 0),
				new THREE.Vector3(endX, endY, 0),
			]);
		}

		return lines;
	}, []);

	const easeInOutQuad = (t: number): number => {
		return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
	};

	useFrame(() => {
		if (groupRef.current) {
			let rotationSpeed = animationRef.current.baseSpeed;

			if (animating) {
				const elapsed =
					(Date.now() - animationRef.current.startTime) / 1000;
				const { duration, maxSpeedMultiplier } = animationRef.current;

				if (elapsed >= duration) {
					setAnimating(false);
				} else {
					animationRef.current.progress = elapsed / duration;

					const t = animationRef.current.progress;
					let speedFactor;

					if (t < 0.5) {
						speedFactor = easeInOutQuad(t * 2) * maxSpeedMultiplier;
					} else {
						speedFactor =
							easeInOutQuad((1 - t) * 2) * maxSpeedMultiplier;
					}

					rotationSpeed =
						animationRef.current.baseSpeed * (1 + speedFactor);
				}
			}

			groupRef.current.rotation.y += rotationSpeed;

			if (radiatingLinesRef.current) {
				radiatingLinesRef.current.rotation.z += rotationSpeed * 0.05;
			}
		}
	});

	return (
		<group ref={containerRef}>
			<group ref={groupRef}>
				<mesh
					ref={orbRef}
					castShadow
					receiveShadow
					onClick={dispatch}
				>
					<sphereGeometry args={[3, 32, 32]} />
					<meshStandardMaterial
						color={'#121414'}
						roughness={0.7}
						metalness={0.1}
					/>
					<Outlines
						thickness={3}
						color="#efdbbd"
					/>
				</mesh>

				{orbLines.map((points, index) => (
					<Line
						key={index}
						points={points}
						color="#efdbbd"
						lineWidth={2}
						castShadow
					/>
				))}
			</group>
			<group ref={radiatingLinesRef}>
				{radiatingLines.map((points, index) => (
					<Line
						key={`radiating-${index}`}
						points={points}
						color="#efdbbd"
						lineWidth={1.5}
						dashed={false}
					/>
				))}
			</group>
		</group>
	);
}

function OminousOrbScene() {
	return (
		<Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
			<directionalLight
				position={[5, 5, 3]}
				intensity={1.5}
			/>
			<OminousOrb />
		</Canvas>
	);
}

export default OminousOrbScene;
