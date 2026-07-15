"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Cameroon city positions mapped to 3D space (approximate geography)
const CITIES = {
  DLA: new THREE.Vector3(-3.1, -1.1, 0), // Douala - west coast
  YDE: new THREE.Vector3(0.5, -0.7, 0), // Yaoundé - center
  BFS: new THREE.Vector3(-1.1, 1.3, 0), // Bafoussam - west highlands
  BDA: new THREE.Vector3(-2.3, 1.9, 0), // Bamenda - northwest
  LIM: new THREE.Vector3(-3.4, -2.0, 0), // Limbe - near coast
  NGE: new THREE.Vector3(2.9, 1.6, 0), // Ngaoundéré - north
};

const ROUTE_PAIRS = [
  ["DLA", "YDE"],
  ["YDE", "BFS"],
  ["DLA", "BFS"],
  ["BFS", "BDA"],
  ["DLA", "LIM"],
  ["YDE", "NGE"],
];

// Create a curved path between two city nodes
function makeCurve(a, b) {
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  // Add a perpendicular arc in the z-axis for a natural road curve
  const perp = new THREE.Vector3(-(b.y - a.y), b.x - a.x, 0).normalize();
  mid.addScaledVector(perp, 0.55);
  mid.z = 0.3;
  return new THREE.CatmullRomCurve3([a, mid, b], false, "catmullrom", 0.5);
}

export default function HeroThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Renderer ─────────────────────────────────────────────
    const W = el.clientWidth;
    const H = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 8);

    // ── Lighting ──────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xfff5e0, 0.4));
    const ptLight = new THREE.PointLight(0xe85d04, 3, 12);
    ptLight.position.set(-1, 0, 3);
    scene.add(ptLight);

    // ── Atmosphere particles (background warm dust) ───────────
    const PARTICLE_COUNT = 1400;
    const pPos = new Float32Array(PARTICLE_COUNT * 3);
    const pColor = new Float32Array(PARTICLE_COUNT * 3);
    const palette = [
      [0.91, 0.36, 0.02], // #E85D04
      [0.85, 0.29, 0.0], // #D94A00
      [1.0, 0.72, 0.2], // golden
      [0.72, 0.26, 0.0], // deep amber
    ];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      pColor[i * 3] = c[0];
      pColor[i * 3 + 1] = c[1];
      pColor[i * 3 + 2] = c[2];
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColor, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Build routes + traveling bus particles ────────────────
    const curves = [];
    const busGroups = []; // { mesh, curve, t, speed }

    ROUTE_PAIRS.forEach(([aC, bC]) => {
      const aPos = CITIES[aC];
      const bPos = CITIES[bC];
      const curve = makeCurve(aPos, bPos);
      curves.push(curve);

      // Route tube
      const tubePts = curve.getPoints(60);
      const tubeGeo = new THREE.BufferGeometry().setFromPoints(tubePts);
      const tubeMat = new THREE.LineBasicMaterial({
        color: 0xe85d04,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      scene.add(new THREE.Line(tubeGeo, tubeMat));

      // 2–3 bus particles per route at staggered offsets
      const busCount = 2 + Math.round(Math.random());
      for (let b = 0; b < busCount; b++) {
        const busGeo = new THREE.SphereGeometry(0.055, 8, 8);
        const busMat = new THREE.MeshBasicMaterial({
          color: 0xffc040,
          transparent: true,
          opacity: 0.95,
        });
        const busMesh = new THREE.Mesh(busGeo, busMat);

        // Trailing glow halo
        const haloGeo = new THREE.SphereGeometry(0.12, 8, 8);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0xe85d04,
          transparent: true,
          opacity: 0.22,
          blending: THREE.AdditiveBlending,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        busMesh.add(halo);

        scene.add(busMesh);
        busGroups.push({
          mesh: busMesh,
          curve,
          t: b / busCount, // staggered start
          speed: 0.0018 + Math.random() * 0.001,
        });
      }
    });

    // ── City nodes (glowing spheres) ──────────────────────────
    Object.entries(CITIES).forEach(([code, pos]) => {
      // Core sphere
      const nodeGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xff8c40 });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      scene.add(node);

      // Outer glow ring
      const ringGeo = new THREE.RingGeometry(0.14, 0.22, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xe85d04,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      scene.add(ring);
    });

    // ── Mouse parallax ────────────────────────────────────────
    let mouseX = 0,
      mouseY = 0;
    let targetRX = 0,
      targetRY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      const W2 = el.clientWidth;
      const H2 = el.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ───────────────────────────────────────────────
    let raf;
    let elapsed = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      elapsed += dt;

      // Slow particle drift
      particles.rotation.y += 0.00025;
      particles.rotation.z += 0.0001;

      // Smooth camera parallax based on mouse
      targetRX += (-mouseY * 0.12 - targetRX) * 0.04;
      targetRY += (mouseX * 0.18 - targetRY) * 0.04;
      camera.rotation.x = targetRX;
      camera.rotation.y = targetRY;

      // Pulsing point light
      ptLight.intensity = 2.5 + Math.sin(elapsed * 1.8) * 0.8;

      // Move buses along curves
      busGroups.forEach((bg) => {
        bg.t = (bg.t + bg.speed * dt * 60) % 1;
        const pt = bg.curve.getPoint(bg.t);
        bg.mesh.position.copy(pt);
        // scale with subtle pulse
        const s = 1 + Math.sin(elapsed * 5 + bg.t * 10) * 0.18;
        bg.mesh.scale.setScalar(s);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        opacity: 0.72,
        mixBlendMode: "screen",
      }}
    />
  );
}
