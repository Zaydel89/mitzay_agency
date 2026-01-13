
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NeuralNexusSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create Neural Network Particles
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00DC01,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="horizontal-section bg-black flex flex-col items-center justify-center p-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40" ref={containerRef}></div>
      <div className="relative z-10 text-center max-w-4xl">
        <h2 className="text-primary text-sm font-black tracking-[0.5em] uppercase mb-4">Neural Nexus</h2>
        <h3 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-6">El Futuro es Autónomo</h3>
        <p className="text-gray-400 text-lg leading-relaxed">
          Nuestras redes neuronales procesan, analizan y ejecutan estrategias que mantienen tu negocio operando 24/7 sin supervisión humana.
        </p>
      </div>
    </div>
  );
};

export default NeuralNexusSection;
