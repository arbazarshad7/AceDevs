import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { createPulseLineMaterial, createParticleMaterial } from './shaders/cyberShaders';
import { useCyberCanvas } from './CyberCanvas';

// System cluster node configurations
const NODE_DEFINITIONS = [
  {
    id: 'arbaz',
    label: 'ARBAZ ARSHAD',
    subtitle: 'CO-FOUNDER // GAME DEV & AI SYSTEMS',
    code: 'DEV-01',
    position: [-6.5, 2.8, 2.5],
    size: 1.5,
    color: 0xd5e0ff,
    primary: true
  },
  {
    id: 'devesh',
    label: 'DEVESH DAS',
    subtitle: 'CO-FOUNDER // GAME DEV & CS ENGINEER',
    code: 'DEV-02',
    position: [6.5, -1.8, -2.5],
    size: 1.5,
    color: 0xd5e0ff,
    primary: true
  },
  {
    id: 'core',
    label: 'CORE ENGINE',
    subtitle: 'VITE + REACT + THREE.JS WEBGL',
    code: 'SYS-01',
    position: [0.0, 4.2, -3.8],
    size: 1.25,
    color: 0x64b5f6,
    primary: false
  },
  {
    id: 'ai',
    label: 'AI & TRIE SEARCH',
    subtitle: 'IN-MEMORY TRIE & INVERTED INDEX',
    code: 'SRCH-01',
    position: [-4.2, -3.8, 3.2],
    size: 1.15,
    color: 0x82b1ff,
    primary: false
  },
  {
    id: 'db',
    label: 'SUPABASE BACKEND',
    subtitle: 'POSTGRES + RLS & AUTH GATEWAY',
    code: 'AUTH-01',
    position: [4.8, 3.6, 2.8],
    size: 1.15,
    color: 0x448aff,
    primary: false
  },
  {
    id: 'repos',
    label: 'GITHUB AGGREGATOR',
    subtitle: 'OCTOKIT AUTOMATED REPO PIPELINE',
    code: 'REPO-01',
    position: [6.8, 1.2, 4.2],
    size: 0.95,
    color: 0x80d8ff,
    primary: false
  },
  {
    id: 'blog',
    label: 'ENGINEERING BLOG',
    subtitle: 'MARKDOWN CMS & ADMIN PANEL',
    code: 'BLOG-01',
    position: [0.2, -4.8, -2.4],
    size: 0.95,
    color: 0x82b1ff,
    primary: false
  },
  {
    id: 'hud',
    label: 'HUD TELEMETRY',
    subtitle: 'TACTICAL SENSOR ARRAY [00]',
    code: 'HUD-00',
    position: [-7.2, -1.2, -4.5],
    size: 0.9,
    color: 0x90caf9,
    primary: false
  }
];

export default function CyberNodeNetwork({
  bearing = 0,
  onBearingChange = null,
  interactive = true,
  onNodeSelect = null
}) {
  const canvasCtx = useCyberCanvas();
  const [hoveredNode, setHoveredNode] = useState(null);
  const tooltipRef = useRef(null);
  const hoveredNodeIdRef = useRef(null);

  // Store callbacks and flags in mutable refs to avoid tearing down the 3D scene on re-renders
  const onBearingChangeRef = useRef(onBearingChange);
  onBearingChangeRef.current = onBearingChange;

  const onNodeSelectRef = useRef(onNodeSelect);
  onNodeSelectRef.current = onNodeSelect;

  const interactiveRef = useRef(interactive);
  interactiveRef.current = interactive;

  // Camera orbit physics references
  const thetaRef = useRef(0);
  const targetThetaRef = useRef((bearing * Math.PI) / 180);
  const phiRef = useRef(0.08);
  const targetPhiRef = useRef(0.08);
  const radius = 27.0;

  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const hasUserDragged = useRef(false);
  const lastEmittedBearing = useRef(-1);
  const lastEmitTime = useRef(0);

  // Synchronize targetTheta ONLY when external bearing changes (e.g. from CompassRosette drag)
  useEffect(() => {
    if (isDragging.current) return;
    if (bearing === lastEmittedBearing.current) return;

    const incomingRad = (bearing * Math.PI) / 180;
    // Find shortest angular path to target bearing
    let diff = (incomingRad - (thetaRef.current % (Math.PI * 2)));
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    targetThetaRef.current = thetaRef.current + diff;
  }, [bearing]);

  useEffect(() => {
    if (!canvasCtx) return;
    const { scene, camera, renderer, registerTick, unregisterTick, container } = canvasCtx;

    // Group for the entire cybernetic constellation
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // 1. CREATE NODES
    const nodeMeshes = [];
    const nodeMeshesMap = new Map();

    NODE_DEFINITIONS.forEach((def) => {
      const nodeSubGroup = new THREE.Group();
      nodeSubGroup.position.set(...def.position);

      // Outer Wireframe Polyhedron
      const outerGeo = new THREE.IcosahedronGeometry(def.size, 1);
      const outerMat = new THREE.MeshBasicMaterial({
        color: def.color,
        wireframe: true,
        transparent: true,
        opacity: def.primary ? 0.8 : 0.55
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      nodeSubGroup.add(outerMesh);

      // Inner Glowing Solid Core
      const innerGeo = new THREE.OctahedronGeometry(def.size * 0.52);
      const innerMat = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: def.primary ? 0.8 : 0.45,
        roughness: 0.25,
        metalness: 0.85
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      nodeSubGroup.add(innerMesh);

      // Orbital Tracking Ring for Primary Founders
      let orbitalRing = null;
      if (def.primary) {
        const ringGeo = new THREE.RingGeometry(def.size * 1.55, def.size * 1.68, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xd5e0ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4
        });
        orbitalRing = new THREE.Mesh(ringGeo, ringMat);
        orbitalRing.rotation.x = Math.PI / 2.5;
        nodeSubGroup.add(orbitalRing);
      }

      // Invisible hit target for raycasting
      const hitGeo = new THREE.SphereGeometry(def.size * 1.6, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { nodeData: def, subGroup: nodeSubGroup, outerMesh, innerMesh };
      nodeSubGroup.add(hitMesh);

      networkGroup.add(nodeSubGroup);
      nodeMeshes.push(hitMesh);
      nodeMeshesMap.set(def.id, { nodeSubGroup, outerMesh, innerMesh, orbitalRing, def });
    });

    // 2. CREATE CONNECTION LINES & PULSE SHADER
    const linePairs = [];
    const maxConnectDist = 11.5;

    // Build neural topological edge list
    for (let i = 0; i < NODE_DEFINITIONS.length; i++) {
      for (let j = i + 1; j < NODE_DEFINITIONS.length; j++) {
        const n1 = NODE_DEFINITIONS[i];
        const n2 = NODE_DEFINITIONS[j];
        const p1 = new THREE.Vector3(...n1.position);
        const p2 = new THREE.Vector3(...n2.position);
        const dist = p1.distanceTo(p2);

        // Connect if close or if guaranteed backbone connection
        const isBackbone = (n1.primary && (n2.id === 'core' || n2.id === 'ai' || n2.id === 'db')) ||
                           (n1.id === 'arbaz' && n2.id === 'devesh');

        if (dist <= maxConnectDist || isBackbone) {
          linePairs.push({ p1, p2, dist });
        }
      }
    }

    const linePositions = new Float32Array(linePairs.length * 6);
    const lineProgress = new Float32Array(linePairs.length * 2);
    const lineOffset = new Float32Array(linePairs.length * 2);

    linePairs.forEach((pair, idx) => {
      const vOffset = Math.random() * 10.0;
      // Vertex A
      linePositions[idx * 6 + 0] = pair.p1.x;
      linePositions[idx * 6 + 1] = pair.p1.y;
      linePositions[idx * 6 + 2] = pair.p1.z;
      lineProgress[idx * 2 + 0] = 0.0;
      lineOffset[idx * 2 + 0] = vOffset;

      // Vertex B
      linePositions[idx * 6 + 3] = pair.p2.x;
      linePositions[idx * 6 + 4] = pair.p2.y;
      linePositions[idx * 6 + 5] = pair.p2.z;
      lineProgress[idx * 2 + 1] = 1.0;
      lineOffset[idx * 2 + 1] = vOffset;
    });

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('aProgress', new THREE.BufferAttribute(lineProgress, 1));
    linesGeometry.setAttribute('aOffset', new THREE.BufferAttribute(lineOffset, 1));

    const pulseLineMat = createPulseLineMaterial({
      color1: 0xd5e0ff,
      color2: 0x2155cd,
      pulseSpeed: 1.4,
      pulseFrequency: 2.5
    });

    const linesSegments = new THREE.LineSegments(linesGeometry, pulseLineMat);
    networkGroup.add(linesSegments);

    // 3. CREATE FLOATING PARTICLE FIELD
    const particleCount = 750;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScale = new Float32Array(particleCount);
    const particlePhase = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 44;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 32;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 44;
      particleScale[i] = 0.6 + Math.random() * 1.2;
      particlePhase[i] = Math.random();
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(particleScale, 1));
    particlesGeometry.setAttribute('aPhase', new THREE.BufferAttribute(particlePhase, 1));

    const particleMat = createParticleMaterial({
      color1: 0xd5e0ff,
      color2: 0x3877ff
    });

    const particlePoints = new THREE.Points(particlesGeometry, particleMat);
    scene.add(particlePoints);

    // 4. RAYCASTER & MOUSE INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);

    const handlePointerDown = (e) => {
      if (!interactiveRef.current) return;
      isDragging.current = true;
      hasUserDragged.current = false;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging.current && interactiveRef.current) {
        const deltaX = e.clientX - lastPointer.current.x;
        const deltaY = e.clientY - lastPointer.current.y;
        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
          hasUserDragged.current = true;
        }

        lastPointer.current = { x: e.clientX, y: e.clientY };

        targetThetaRef.current -= deltaX * 0.0055;
        targetPhiRef.current = Math.max(-0.45, Math.min(0.65, targetPhiRef.current + deltaY * 0.004));
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleClick = () => {
      if (!interactiveRef.current) return;
      if (hasUserDragged.current) return;
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const nodeData = intersects[0].object.userData.nodeData;
        if (onNodeSelectRef.current) onNodeSelectRef.current(nodeData);
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('click', handleClick);

    // 5. ANIMATION TICK LOOP
    const tickHandler = (elapsedTime, delta) => {
      // Advance Shader Uniforms
      pulseLineMat.uniforms.uTime.value = elapsedTime;
      particleMat.uniforms.uTime.value = elapsedTime;

      // Continuous subtle idle orbit if not dragging
      if (!isDragging.current) {
        targetThetaRef.current += delta * 0.045; // Gentle atmospheric rotation
      }

      // Smooth inertia interpolation
      thetaRef.current += (targetThetaRef.current - thetaRef.current) * 0.08;
      phiRef.current += (targetPhiRef.current - phiRef.current) * 0.08;

      // Update camera spherical position
      const cosPhi = Math.cos(phiRef.current);
      camera.position.x = radius * Math.sin(thetaRef.current) * cosPhi;
      camera.position.y = radius * Math.sin(phiRef.current) + 2.0;
      camera.position.z = radius * Math.cos(thetaRef.current) * cosPhi;
      camera.lookAt(0, 0, 0);

      // Calculate 0°-360° heading and throttle emitting to avoid React 60fps re-render thrashing
      let headingDeg = Math.round((thetaRef.current * 180) / Math.PI) % 360;
      if (headingDeg < 0) headingDeg += 360;

      const now = performance.now();
      if (headingDeg !== lastEmittedBearing.current && now - lastEmitTime.current > 120) {
        lastEmittedBearing.current = headingDeg;
        lastEmitTime.current = now;
        if (onBearingChangeRef.current) {
          onBearingChangeRef.current(headingDeg);
        }
      }

      // Rotate individual node polyhedra
      nodeMeshesMap.forEach((entry) => {
        entry.outerMesh.rotation.y += delta * 0.35;
        entry.outerMesh.rotation.x += delta * 0.2;
        entry.innerMesh.rotation.y -= delta * 0.65;
        entry.innerMesh.rotation.z += delta * 0.4;
        if (entry.orbitalRing) {
          entry.orbitalRing.rotation.z += delta * 0.5;
        }
      });

      // Node Raycasting for tooltips & hover highlight ONLY when interactive and not dragging
      if (interactiveRef.current && !isDragging.current) {
        raycaster.setFromCamera(mouseNorm, camera);
        const intersects = raycaster.intersectObjects(nodeMeshes);

        if (intersects.length > 0) {
          const hitData = intersects[0].object.userData.nodeData;
          if (hoveredNodeIdRef.current !== hitData.id) {
            hoveredNodeIdRef.current = hitData.id;
            setHoveredNode(hitData);
          }

          // Direct DOM transform update (Zero React re-render overhead per frame!)
          const hitSubGroup = intersects[0].object.userData.subGroup;
          const worldPos = new THREE.Vector3();
          hitSubGroup.getWorldPosition(worldPos);
          worldPos.project(camera);

          const rect = container.getBoundingClientRect();
          const screenX = ((worldPos.x + 1) / 2) * rect.width;
          const screenY = ((-worldPos.y + 1) / 2) * rect.height;

          if (tooltipRef.current) {
            tooltipRef.current.style.transform = `translate(${screenX}px, ${screenY - 20}px) translate(-50%, -100%)`;
            tooltipRef.current.style.visibility = 'visible';
          }

          // Highlight outer mesh
          intersects[0].object.userData.outerMesh.scale.set(1.2, 1.2, 1.2);
          intersects[0].object.userData.innerMesh.material.emissiveIntensity = 1.3;
        } else {
          if (hoveredNodeIdRef.current !== null) {
            hoveredNodeIdRef.current = null;
            setHoveredNode(null);
            nodeMeshesMap.forEach((entry) => {
              entry.outerMesh.scale.set(1, 1, 1);
              entry.innerMesh.material.emissiveIntensity = entry.def.primary ? 0.8 : 0.45;
            });
          }
        }
      } else {
        if (hoveredNodeIdRef.current !== null) {
          hoveredNodeIdRef.current = null;
          setHoveredNode(null);
          nodeMeshesMap.forEach((entry) => {
            entry.outerMesh.scale.set(1, 1, 1);
            entry.innerMesh.material.emissiveIntensity = entry.def.primary ? 0.8 : 0.45;
          });
        }
      }
    };

    registerTick(tickHandler);

    // 6. CLEANUP
    return () => {
      unregisterTick(tickHandler);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('click', handleClick);

      scene.remove(networkGroup);
      scene.remove(particlePoints);

      linesGeometry.dispose();
      pulseLineMat.dispose();
      particlesGeometry.dispose();
      particleMat.dispose();

      nodeMeshesMap.forEach((entry) => {
        entry.outerMesh.geometry.dispose();
        entry.outerMesh.material.dispose();
        entry.innerMesh.geometry.dispose();
        entry.innerMesh.material.dispose();
        if (entry.orbitalRing) {
          entry.orbitalRing.geometry.dispose();
          entry.orbitalRing.material.dispose();
        }
      });
    };
  }, [canvasCtx]); // Note: ONLY re-run if canvasCtx changes!

  // Projected tactical 3D HUD Tooltip rendered directly over the canvas
  return (
    <>
      {hoveredNode && (
        <div
          ref={tooltipRef}
          className="cyber-node-tooltip"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            zIndex: 25,
            visibility: 'hidden'
          }}
        >
          <div className="cyber-tooltip-card">
            <div className="cyber-tooltip-header">
              <span className="cyber-tooltip-badge">[{hoveredNode.code}]</span>
              <span className="cyber-tooltip-title">{hoveredNode.label}</span>
            </div>
            <div className="cyber-tooltip-role">{hoveredNode.subtitle}</div>
            <div className="cyber-tooltip-footer">
              <span className="cyber-tooltip-status">NODE // ACTIVE</span>
              <span className="cyber-tooltip-hint">CLICK TO FOCUS</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
