
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import anime from 'https://esm.sh/animejs@3.2.2';
import { createNoise3D, createNoise4D } from 'https://esm.sh/simplex-noise@4.0.1';

const NeuralNexusSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [infoText, setInfoText] = useState('Shape: Sphere (Click to morph)');
  const [activeScheme, setActiveScheme] = useState('fire');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Refs para lógica de Three.js accesible desde React
  const triggerMorphRef = useRef<() => void>(() => {});
  const updateColorsRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let scene: THREE.Scene, 
        camera: THREE.PerspectiveCamera, 
        renderer: THREE.WebGLRenderer, 
        controls: OrbitControls, 
        clock: THREE.Clock;
    let composer: EffectComposer;
    let particlesGeometry: THREE.BufferGeometry, particleSystem: THREE.Points;
    let currentPositions: Float32Array, sourcePositions: Float32Array, targetPositions: Float32Array[], swarmPositions: Float32Array;
    let particleSizes: Float32Array, particleEffectStrengths: Float32Array;
    let noise3D: any, noise4D: any;
    let morphTimeline: any = null;
    let isMorphing = false;

    const CONFIG = {
      particleCount: 15000,
      shapeSize: 14,
      swarmDistanceFactor: 1.5,
      swirlFactor: 4.0,
      noiseFrequency: 0.1,
      noiseTimeScale: 0.04,
      noiseMaxStrength: 2.8,
      colorScheme: 'fire',
      morphDuration: 4000,
      particleSizeRange: [0.08, 0.25],
      starCount: 18000,
      bloomStrength: 1.3,
      bloomRadius: 0.5,
      bloomThreshold: 0.05,
      idleFlowStrength: 0.25,
      idleFlowSpeed: 0.08,
      morphSizeFactor: 0.5,
      morphBrightnessFactor: 0.6
    };

    const COLOR_SCHEMES: any = {
      fire: { startHue: 0, endHue: 45, saturation: 0.95, lightness: 0.6 },
      neon: { startHue: 300, endHue: 180, saturation: 1.0, lightness: 0.65 },
      nature: { startHue: 90, endHue: 160, saturation: 0.85, lightness: 0.55 },
      rainbow: { startHue: 0, endHue: 360, saturation: 0.9, lightness: 0.6 }
    };

    const morphState = { progress: 0.0 };
    const tempVec = new THREE.Vector3();
    const sourceVec = new THREE.Vector3();
    const targetVec = new THREE.Vector3();
    const swarmVec = new THREE.Vector3();
    const noiseOffset = new THREE.Vector3();
    const flowVec = new THREE.Vector3();
    const bezPos = new THREE.Vector3();
    const swirlAxis = new THREE.Vector3();
    const currentVec = new THREE.Vector3();

    // Shape Generators
    function generateSphere(count: number, size: number) {
      const points = new Float32Array(count * 3);
      const phi = Math.PI * (Math.sqrt(5) - 1);
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        points[i * 3] = Math.cos(theta) * radius * size;
        points[i * 3 + 1] = y * size;
        points[i * 3 + 2] = Math.sin(theta) * radius * size;
      }
      return points;
    }

    function generateCube(count: number, size: number) {
      const points = new Float32Array(count * 3);
      const halfSize = size / 2;
      for (let i = 0; i < count; i++) {
        const face = Math.floor(Math.random() * 6);
        const u = Math.random() * size - halfSize;
        const v = Math.random() * size - halfSize;
        switch (face) {
          case 0: points.set([halfSize, u, v], i * 3); break;
          case 1: points.set([-halfSize, u, v], i * 3); break;
          case 2: points.set([u, halfSize, v], i * 3); break;
          case 3: points.set([u, -halfSize, v], i * 3); break;
          case 4: points.set([u, v, halfSize], i * 3); break;
          case 5: points.set([u, v, -halfSize], i * 3); break;
        }
      }
      return points;
    }

    function generatePyramid(count: number, size: number) {
      const points = new Float32Array(count * 3);
      const halfBase = size / 2;
      const height = size * 1.2;
      const apex = new THREE.Vector3(0, height / 2, 0);
      const baseVertices = [
        new THREE.Vector3(-halfBase, -height / 2, -halfBase),
        new THREE.Vector3(halfBase, -height / 2, -halfBase),
        new THREE.Vector3(halfBase, -height / 2, halfBase),
        new THREE.Vector3(-halfBase, -height / 2, halfBase)
      ];
      const totalArea = (size * size) + (4 * (0.5 * size * Math.sqrt(Math.pow(height, 2) + Math.pow(halfBase, 2))));
      const baseWeight = (size * size) / totalArea;

      for (let i = 0; i < count; i++) {
        const r = Math.random();
        let p = new THREE.Vector3();
        if (r < baseWeight) {
          const u = Math.random(); const v = Math.random();
          p.lerpVectors(baseVertices[0], baseVertices[1], u);
          const p2 = new THREE.Vector3().lerpVectors(baseVertices[3], baseVertices[2], u);
          p.lerp(p2, v);
        } else {
          const faceIndex = Math.floor((r - baseWeight) / ((1 - baseWeight) / 4));
          const v1 = baseVertices[faceIndex]; const v2 = baseVertices[(faceIndex + 1) % 4];
          let u = Math.random(); let v = Math.random();
          if (u + v > 1) { u = 1 - u; v = 1 - v; }
          p.addVectors(v1, new THREE.Vector3().subVectors(v2, v1).multiplyScalar(u));
          p.add(new THREE.Vector3().subVectors(apex, v1).multiplyScalar(v));
        }
        points.set([p.x, p.y, p.z], i * 3);
      }
      return points;
    }

    const SHAPES = [
      { name: 'Sphere', generator: generateSphere },
      { name: 'Cube', generator: generateCube },
      { name: 'Pyramid', generator: generatePyramid },
      { name: 'Torus', generator: (count: any, size: any) => {
          const points = new Float32Array(count * 3);
          const R = size * 0.7; const r = size * 0.3;
          for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2; const phi = Math.random() * Math.PI * 2;
            points[i * 3] = (R + r * Math.cos(phi)) * Math.cos(theta);
            points[i * 3 + 1] = r * Math.sin(phi);
            points[i * 3 + 2] = (R + r * Math.cos(phi)) * Math.sin(theta);
          }
          return points;
      }},
      { name: 'Galaxy', generator: (count: any, size: any) => {
          const points = new Float32Array(count * 3);
          for (let i = 0; i < count; i++) {
            const t = Math.pow(Math.random(), 1.5); const radius = t * size;
            const armIndex = Math.floor(Math.random() * 4);
            const angle = (armIndex / 4) * Math.PI * 2 + (radius / size * 6);
            const spread = (Math.random() - 0.5) * 0.6 * (1 - radius / size);
            points[i * 3] = radius * Math.cos(angle + spread);
            points[i * 3 + 1] = (Math.random() - 0.5) * size * 0.1 * (1 - radius / size * 0.3);
            points[i * 3 + 2] = radius * Math.sin(angle + spread);
          }
          return points;
      }},
      { name: 'Wave', generator: (count: any, size: any) => {
          const points = new Float32Array(count * 3);
          for (let i = 0; i < count; i++) {
            const u = Math.random() * 2 - 1; const v = Math.random() * 2 - 1;
            const x = u * size; const z = v * size;
            const dist = Math.sqrt(u * u + v * v);
            const y = Math.sin(dist * Math.PI * 3) * Math.cos(Math.atan2(v, u) * 2) * (size * 0.4) * (1 - dist);
            points[i * 3] = x; points[i * 3 + 1] = y; points[i * 3 + 2] = z;
          }
          return points;
      }}
    ];
    let currentShapeIndex = 0;

    const init = () => {
      let progress = 0;
      const updateProgress = (inc: number) => {
        progress += inc;
        setLoadingProgress(Math.min(100, progress));
        if (progress >= 100) {
          setTimeout(() => setIsLoading(false), 500);
        }
      };

      clock = new THREE.Clock();
      noise3D = createNoise3D();
      noise4D = createNoise4D();
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000308, 0.03);
      updateProgress(10);

      camera = new THREE.PerspectiveCamera(70, containerRef.current!.clientWidth / containerRef.current!.clientHeight, 0.1, 1000);
      camera.position.set(0, 8, 28);
      updateProgress(10);

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      updateProgress(15);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.enableZoom = false;
      updateProgress(10);

      // Starfield
      const createStarTexture = () => {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.2, 'rgba(255,255,255,0.8)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.3)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(canvas);
      };

      const starGeo = new THREE.BufferGeometry();
      const starPos = []; const starSizes = []; const starColors = [];
      for(let i=0; i<CONFIG.starCount; i++) {
        tempVec.set(THREE.MathUtils.randFloatSpread(400), THREE.MathUtils.randFloatSpread(400), THREE.MathUtils.randFloatSpread(400));
        if (tempVec.length() < 100) tempVec.setLength(100 + Math.random() * 300);
        starPos.push(tempVec.x, tempVec.y, tempVec.z);
        starSizes.push(Math.random() * 0.15 + 0.05);
        const color = new THREE.Color().setHSL(0.6, Math.random()*0.1, 0.8+Math.random()*0.2);
        starColors.push(color.r, color.g, color.b);
      }
      starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
      starGeo.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));
      starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
      const starMat = new THREE.ShaderMaterial({
        uniforms: { pointTexture: { value: createStarTexture() } },
        vertexShader: `attribute float size; varying vec3 vColor; void main() { vColor = color; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * (400.0 / -mvPosition.z); gl_Position = projectionMatrix * mvPosition; }`,
        fragmentShader: `uniform sampler2D pointTexture; varying vec3 vColor; void main() { float alpha = texture2D(pointTexture, gl_PointCoord).a; if (alpha < 0.1) discard; gl_FragColor = vec4(vColor, alpha * 0.9); }`,
        blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, vertexColors: true
      });
      scene.add(new THREE.Points(starGeo, starMat));
      updateProgress(20);

      // Post Processing
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), CONFIG.bloomStrength, CONFIG.bloomRadius, CONFIG.bloomThreshold);
      composer.addPass(bloom);
      updateProgress(15);

      // Particles System
      targetPositions = SHAPES.map(s => s.generator(CONFIG.particleCount, CONFIG.shapeSize));
      currentPositions = new Float32Array(targetPositions[0]);
      sourcePositions = new Float32Array(targetPositions[0]);
      swarmPositions = new Float32Array(CONFIG.particleCount * 3);
      
      particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
      
      particleSizes = new Float32Array(CONFIG.particleCount);
      particleEffectStrengths = new Float32Array(CONFIG.particleCount);
      for(let i=0; i<CONFIG.particleCount; i++){
        particleSizes[i] = THREE.MathUtils.randFloat(CONFIG.particleSizeRange[0], CONFIG.particleSizeRange[1]);
        particleEffectStrengths[i] = 0.0;
      }
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
      particlesGeometry.setAttribute('aEffectStrength', new THREE.BufferAttribute(particleEffectStrengths, 1));
      
      const colors = new Float32Array(CONFIG.particleCount * 3);
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.ShaderMaterial({
        uniforms: { pointTexture: { value: createStarTexture() } },
        vertexShader: `
          attribute float size; attribute float aEffectStrength; varying vec3 vColor; varying float vEffectStrength;
          void main() {
            vColor = color; vEffectStrength = aEffectStrength;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float sizeScale = 1.0 - vEffectStrength * ${CONFIG.morphSizeFactor.toFixed(2)};
            gl_PointSize = size * sizeScale * (400.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }`,
        fragmentShader: `
          uniform sampler2D pointTexture; varying vec3 vColor; varying float vEffectStrength;
          void main() {
            float alpha = texture2D(pointTexture, gl_PointCoord).a; if (alpha < 0.05) discard;
            vec3 finalColor = vColor * (1.0 + vEffectStrength * ${CONFIG.morphBrightnessFactor.toFixed(2)});
            gl_FragColor = vec4(finalColor, alpha);
          }`,
        blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, vertexColors: true
      });
      particleSystem = new THREE.Points(particlesGeometry, particleMat);
      scene.add(particleSystem);
      
      updateProgress(20);
      animate();
    };

    const updateColorArray = () => {
      const scheme = COLOR_SCHEMES[CONFIG.colorScheme] || COLOR_SCHEMES.fire;
      const colors = particlesGeometry.attributes.color.array as Float32Array;
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      const maxRadius = CONFIG.shapeSize * 1.1;
      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        tempVec.set(positions[i3], positions[i3+1], positions[i3+2]);
        const dist = tempVec.length();
        let hue;
        if (CONFIG.colorScheme === 'rainbow') {
          hue = ((tempVec.x / maxRadius + 1) * 120 + (tempVec.y / maxRadius + 1) * 120 + (tempVec.z / maxRadius + 1) * 120) % 360;
        } else {
          hue = THREE.MathUtils.mapLinear(dist, 0, maxRadius, scheme.startHue, scheme.endHue);
        }
        const color = new THREE.Color().setHSL(hue / 360, scheme.saturation, scheme.lightness);
        color.toArray(colors, i3);
      }
      particlesGeometry.attributes.color.needsUpdate = true;
    };
    updateColorsRef.current = updateColorArray;

    const triggerMorph = () => {
      if (isMorphing) return;
      isMorphing = true;
      controls.autoRotate = false;
      
      setInfoText(`Morphing...`);
      sourcePositions.set(currentPositions);
      const nextIdx = (currentShapeIndex + 1) % SHAPES.length;
      const nextTarget = targetPositions[nextIdx];
      
      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        sourceVec.fromArray(sourcePositions, i3);
        targetVec.fromArray(nextTarget, i3);
        swarmVec.lerpVectors(sourceVec, targetVec, 0.5);
        const offset = tempVec.set(noise3D(i*0.05, 10, 10), noise3D(20, i*0.05, 20), noise3D(30, 30, i*0.05)).normalize();
        swarmVec.addScaledVector(offset, (sourceVec.distanceTo(targetVec) * 0.1 + CONFIG.shapeSize * CONFIG.swarmDistanceFactor) * (0.5 + Math.random()*0.8));
        swarmPositions[i3] = swarmVec.x; swarmPositions[i3+1] = swarmVec.y; swarmPositions[i3+2] = swarmVec.z;
      }
      
      currentShapeIndex = nextIdx;
      morphState.progress = 0;
      if (morphTimeline) morphTimeline.pause();
      morphTimeline = anime({
        targets: morphState,
        progress: 1,
        duration: CONFIG.morphDuration,
        easing: 'cubicBezier(0.4, 0.0, 0.2, 1.0)',
        complete: () => {
          setInfoText(`Shape: ${SHAPES[currentShapeIndex].name} (Click to morph)`);
          currentPositions.set(targetPositions[currentShapeIndex]);
          particleEffectStrengths.fill(0.0);
          particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
          sourcePositions.set(targetPositions[currentShapeIndex]);
          updateColorArray();
          isMorphing = false;
          controls.autoRotate = true;
        }
      });
    };
    triggerMorphRef.current = triggerMorph;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();
      controls.update();

      const positions = particlesGeometry.attributes.position.array as Float32Array;
      const effects = particlesGeometry.attributes.aEffectStrength.array as Float32Array;

      if (isMorphing) {
        const t = morphState.progress;
        const targets = targetPositions[currentShapeIndex];
        const effectStrength = Math.sin(t * Math.PI);
        for (let i = 0; i < CONFIG.particleCount; i++) {
          const i3 = i * 3;
          sourceVec.fromArray(sourcePositions, i3);
          swarmVec.fromArray(swarmPositions, i3);
          targetVec.fromArray(targets, i3);
          
          const t_inv = 1 - t;
          bezPos.copy(sourceVec).multiplyScalar(t_inv * t_inv)
                .addScaledVector(swarmVec, 2 * t_inv * t)
                .addScaledVector(targetVec, t * t);

          if (effectStrength > 0.01) {
            swirlAxis.set(noise3D(i*0.02, elapsed*0.1, 0), noise3D(0, i*0.02, elapsed*0.1+5), noise3D(elapsed*0.1+10, 0, i*0.02)).normalize();
            tempVec.subVectors(bezPos, sourceVec).applyAxisAngle(swirlAxis, effectStrength * CONFIG.swirlFactor * delta * 50 * (0.5 + Math.random()*0.5));
            bezPos.copy(sourceVec).add(tempVec);
            
            const nTime = elapsed * CONFIG.noiseTimeScale;
            noiseOffset.set(noise4D(bezPos.x*CONFIG.noiseFrequency, bezPos.y*CONFIG.noiseFrequency, bezPos.z*CONFIG.noiseFrequency, nTime), 
                           noise4D(bezPos.x*CONFIG.noiseFrequency+100, bezPos.y*CONFIG.noiseFrequency+100, bezPos.z*CONFIG.noiseFrequency+100, nTime), 
                           noise4D(bezPos.x*CONFIG.noiseFrequency+200, bezPos.y*CONFIG.noiseFrequency+200, bezPos.z*CONFIG.noiseFrequency+200, nTime));
            bezPos.addScaledVector(noiseOffset, effectStrength * CONFIG.noiseMaxStrength);
          }
          positions[i3] = bezPos.x; positions[i3+1] = bezPos.y; positions[i3+2] = bezPos.z;
          effects[i] = effectStrength;
        }
        particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
      } else {
        const breath = 1.0 + Math.sin(elapsed * 0.5) * 0.015;
        for (let i = 0; i < CONFIG.particleCount; i++) {
          const i3 = i * 3;
          sourceVec.fromArray(sourcePositions, i3);
          tempVec.copy(sourceVec).multiplyScalar(breath);
          flowVec.set(noise4D(tempVec.x*0.1, tempVec.y*0.1, tempVec.z*0.1, elapsed*CONFIG.idleFlowSpeed),
                     noise4D(tempVec.x*0.1+10, tempVec.y*0.1+10, tempVec.z*0.1+10, elapsed*CONFIG.idleFlowSpeed),
                     noise4D(tempVec.x*0.1+20, tempVec.y*0.1+20, tempVec.z*0.1+20, elapsed*CONFIG.idleFlowSpeed));
          tempVec.addScaledVector(flowVec, CONFIG.idleFlowStrength);
          currentVec.fromArray(positions, i3).lerp(tempVec, 0.05);
          positions[i3] = currentVec.x; positions[i3+1] = currentVec.y; positions[i3+2] = currentVec.z;
          if (effects[i] !== 0) effects[i] = 0;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      composer.render();
      requestAnimationFrame(animate);
    };

    init();
    updateColorArray();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      composer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Sincronización de esquemas de color
  useEffect(() => {
    // Actualizamos el esquema en la lógica de Three.js indirectamente a través del objeto CONFIG o llamando a la ref
    const COLOR_SCHEMES_KEYS: any = { fire: 'fire', neon: 'neon', nature: 'nature', rainbow: 'rainbow' };
    (window as any)._currentScheme = activeScheme; 
    // Debido a cómo se estructuró el código proporcionado, forzamos la actualización de colores
    updateColorsRef.current();
  }, [activeScheme]);

  return (
    <div 
      ref={containerRef}
      className="horizontal-section relative overflow-hidden bg-black flex items-center justify-center font-mono"
    >
      {isLoading && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center transition-opacity duration-700">
          <span className="text-2xl tracking-[2px] mb-4">Initializing Particles...</span>
          <div className="w-60 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00a2ff] to-[#00ffea] transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
          </div>
        </div>
      )}

      <div className="absolute top-4 w-full text-center z-50 pointer-events-none">
        <div className="inline-block px-4 py-2 bg-[#191e32]/35 border border-white/10 rounded-xl backdrop-blur-xl shadow-inner shadow-white/5 transition-all text-sm text-[#0080ff] drop-shadow-[0_0_5px_rgba(0,128,255,0.8)]">
          {infoText}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-center bg-[#191e32]/40 p-4 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg">
        <button 
          onClick={() => triggerMorphRef.current()}
          className="bg-[#0050b4]/70 text-white border border-[#00b4ff]/60 rounded-md px-4 py-2 mx-2 text-sm hover:bg-[#006edc]/90 hover:border-[#00d2ff]/90 transition-all hover:-translate-y-px hover:shadow-[0_3px_8px_rgba(0,150,255,0.3)]"
        >
          Change Shape
        </button>

        <div className="mt-4 flex justify-center gap-3">
          {[
            { id: 'fire', grad: 'from-[#ff4500] to-[#ffcc00]' },
            { id: 'neon', grad: 'from-[#ff00ff] to-[#00ffff]' },
            { id: 'nature', grad: 'from-[#00ff00] to-[#66ffcc]' },
            { id: 'rainbow', grad: 'from-red-500 via-yellow-500 to-blue-500' }
          ].map(scheme => (
            <div 
              key={scheme.id}
              onClick={() => {
                // Inyectamos el cambio en el objeto global que la ref puede leer o simplemente actualizamos el estado
                (window as any)._currentScheme = scheme.id;
                setActiveScheme(scheme.id);
              }}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all bg-gradient-to-br ${scheme.grad} ${activeScheme === scheme.id ? 'scale-125 border-white shadow-[0_0_10px_rgba(255,255,255,0.7)]' : 'border-white/20 hover:scale-110 hover:border-white/70'}`}
            />
          ))}
        </div>
      </div>

      <canvas 
        ref={canvasRef} 
        className="block w-full h-full cursor-pointer" 
        onClick={() => triggerMorphRef.current()}
      />
    </div>
  );
};

export default NeuralNexusSection;
