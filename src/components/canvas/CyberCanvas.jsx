import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import * as THREE from 'three';
import './canvas.css';

export const CyberCanvasContext = createContext(null);

export function useCyberCanvas() {
  return useContext(CyberCanvasContext);
}

/**
 * CyberCanvas: High-performance Three.js WebGL canvas container with
 * dynamic pixelRatio capping, resize management, and render lifecycle.
 */
export default function CyberCanvas({
  children,
  onSceneReady = null,
  cameraPosition = [0, 2, 28],
  fov = 55,
  className = '',
  style = {}
}) {
  const mountRef = useRef(null);
  const [context, setContext] = useState(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020a19);
    scene.fog = new THREE.FogExp2(0x020a19, 0.015);

    // 2. Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
    camera.position.set(...cameraPosition);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Ambient & Rim Lighting (Cybernetic blue/cyan)
    const ambientLight = new THREE.AmbientLight(0x0a1c3d, 1.2);
    scene.add(ambientLight);

    const cyanRimLight = new THREE.DirectionalLight(0xd5e0ff, 1.8);
    cyanRimLight.position.set(20, 40, 20);
    scene.add(cyanRimLight);

    const bluePointLight = new THREE.PointLight(0x2155cd, 3.5, 60);
    bluePointLight.position.set(0, -10, 15);
    scene.add(bluePointLight);

    // Animation callbacks collection
    const tickCallbacks = new Set();
    const registerTick = (cb) => tickCallbacks.add(cb);
    const unregisterTick = (cb) => tickCallbacks.delete(cb);

    // 5. Main Render Loop with Visibility Optimization
    let timer;
    if (THREE.Timer) {
      timer = new THREE.Timer();
    } else {
      timer = new THREE.Clock();
    }
    let isPaused = false;

    const animate = () => {
      if (isPaused) return;
      animFrameId.current = requestAnimationFrame(animate);

      let delta = 0.016;
      let elapsedTime = 0;
      if (timer.update && timer.getDelta) {
        timer.update();
        delta = timer.getDelta();
        elapsedTime = timer.getElapsed();
      } else {
        delta = timer.getDelta();
        elapsedTime = timer.getElapsedTime();
      }

      // Clamp delta to prevent huge jumps
      const safeDelta = Math.min(delta, 0.05);

      // Execute registered sub-component updates
      tickCallbacks.forEach((cb) => cb(elapsedTime, safeDelta));

      renderer.render(scene, camera);
    };
    animate();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        if (animFrameId.current) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
        }
      } else {
        if (isPaused) {
          isPaused = false;
          if (timer.update) {
            timer.update();
          } else {
            timer.getDelta(); // flush delta
          }
          animate();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 6. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const sceneCtx = {
      scene,
      camera,
      renderer,
      registerTick,
      unregisterTick,
      container
    };
    setContext(sceneCtx);

    if (onSceneReady) {
      onSceneReady(sceneCtx);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      tickCallbacks.clear();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <CyberCanvasContext.Provider value={context}>
      <div ref={mountRef} className={`cyber-canvas-container ${className}`} style={style}>
        <div className="cyber-canvas-vignette" />
        <div className="cyber-canvas-scanlines" />
        {context && (typeof children === 'function' ? children(context) : children)}
      </div>
    </CyberCanvasContext.Provider>
  );
}
