import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PixelBlastProps {
  className?: string;
}

const PixelBlast: React.FC<PixelBlastProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x818cf8, 1);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Create animated wave mesh
    const waveGeometry = new THREE.PlaneGeometry(50, 50, 50, 50);
    const waveMaterial = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
      side: THREE.DoubleSide,
    });
    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.rotation.x = -Math.PI / 4;
    waveMesh.position.y = -5;
    scene.add(waveMesh);

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.OctahedronGeometry(0.7),
      new THREE.TetrahedronGeometry(0.8),
      new THREE.IcosahedronGeometry(0.6),
      new THREE.TorusGeometry(0.5, 0.2, 16, 50),
    ];

    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x6366f1 : 0x818cf8,
        transparent: true,
        opacity: 0.4,
        wireframe: Math.random() > 0.5,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Store initial position and random velocity
      (mesh as any).initialPosition = mesh.position.clone();
      (mesh as any).velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
      (mesh as any).rotationVelocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate wave
      const positions = waveGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 2;
      }
      waveGeometry.attributes.position.needsUpdate = true;
      waveGeometry.computeVertexNormals();

      // Rotate wave slowly
      waveMesh.rotation.z = time * 0.1;

      // Animate shapes
      shapes.forEach((shape) => {
        // Floating motion
        shape.position.y += Math.sin(time + shape.position.x) * 0.01;
        
        // Rotate
        shape.rotation.x += (shape as any).rotationVelocity.x;
        shape.rotation.y += (shape as any).rotationVelocity.y;
        shape.rotation.z += (shape as any).rotationVelocity.z;

        // Mouse interaction
        const dx = mousePosition.current.x * 20 - shape.position.x;
        const dy = mousePosition.current.y * 20 - shape.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 10) {
          shape.position.x -= dx * 0.002;
          shape.position.y -= dy * 0.002;
        }

        // Pulse scale
        const scale = 1 + Math.sin(time * 2 + shape.position.x) * 0.1;
        shape.scale.set(scale, scale, scale);
      });

      // Rotate camera slightly for depth
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      // Animate lights
      pointLight1.position.x = Math.sin(time * 0.7) * 10;
      pointLight1.position.z = Math.cos(time * 0.7) * 10;
      pointLight2.position.x = Math.cos(time * 0.5) * 10;
      pointLight2.position.z = Math.sin(time * 0.5) * 10;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      shapes.forEach(shape => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default PixelBlast;
