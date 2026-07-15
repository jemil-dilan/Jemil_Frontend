import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // African-Inspired Particles - Warm Colors
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    // African warm color palette
    const africanColors = [
      { r: 0.82, g: 0.41, b: 0.12 }, // Terracotta #D2691E
      { r: 0.8, g: 0.33, b: 0.0 }, // Burnt Orange #CC5500
      { r: 1.0, g: 0.84, b: 0.0 }, // Golden #FFD700
      { r: 1.0, g: 0.42, b: 0.42 }, // Coral #FF6B6B
    ];

    for (let i = 0; i < particlesCount; i++) {
      // Position
      posArray[i * 3] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Color - random African color
      const color =
        africanColors[Math.floor(Math.random() * africanColors.length)];
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    // Animated Route Lines (simulating bus routes across Cameroon)
    const createRouteLine = () => {
      const points = [];
      const startX = (Math.random() - 0.5) * 10;
      const startY = (Math.random() - 0.5) * 10;
      const startZ = (Math.random() - 0.5) * 10;

      const endX = (Math.random() - 0.5) * 10;
      const endY = (Math.random() - 0.5) * 10;
      const endZ = (Math.random() - 0.5) * 10;

      points.push(new THREE.Vector3(startX, startY, startZ));
      points.push(new THREE.Vector3(endX, endY, endZ));

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xd2691e, // Terracotta
        transparent: true,
        opacity: 0.3,
        linewidth: 2,
      });

      return new THREE.Line(lineGeometry, lineMaterial);
    };

    const routeLines = [];
    for (let i = 0; i < 8; i++) {
      const line = createRouteLine();
      routeLines.push(line);
      scene.add(line);
    }

    // Floating 3D Bus Geometry
    const busGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.8);
    const busMaterial = new THREE.MeshBasicMaterial({
      color: 0xd2691e,
      transparent: true,
      opacity: 0.4,
    });
    const bus = new THREE.Mesh(busGeometry, busMaterial);
    bus.position.set(0, 0, 2);
    scene.add(bus);

    // Bus wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16);
    const wheelMaterial = new THREE.MeshBasicMaterial({
      color: 0x2c2c2c,
      transparent: true,
      opacity: 0.5,
    });

    const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel1.rotation.z = Math.PI / 2;
    wheel1.position.set(-0.15, -0.12, 2.2);
    scene.add(wheel1);

    const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel2.rotation.z = Math.PI / 2;
    wheel2.position.set(0.15, -0.12, 2.2);
    scene.add(wheel2);

    camera.position.z = 5;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.001;

      // Slow rotation of particles
      particlesMesh.rotation.y += 0.0008;
      particlesMesh.rotation.x += 0.0004;

      // Mouse interaction - subtle
      particlesMesh.rotation.y += mouseX * 0.02;
      particlesMesh.rotation.x += -mouseY * 0.02;

      // Animate route lines
      routeLines.forEach((line, i) => {
        line.rotation.y = time * (0.3 + i * 0.1);
        line.rotation.x = Math.sin(time + i) * 0.2;
      });

      // Floating bus animation
      bus.position.y = Math.sin(time * 2) * 0.3;
      bus.rotation.y = time * 0.5;

      wheel1.position.y = bus.position.y - 0.12;
      wheel2.position.y = bus.position.y - 0.12;

      wheel1.rotation.x += 0.05;
      wheel2.rotation.x += 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (
        containerRef.current &&
        renderer.domElement.parentElement === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      busGeometry.dispose();
      busMaterial.dispose();
      wheelGeometry.dispose();
      wheelMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none opacity-70"
      style={{
        filter: "blur(0.3px)",
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 50%, #1a1a1a 100%)",
      }}
    />
  );
}
