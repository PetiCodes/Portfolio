"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function LaptopScene() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  
  // Mouse interaction state
  const mouseRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    rotationX: 0,
    rotationY: 0
  });
  
  // Auto-rotation state
  const autoRotationRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x121212, 1); // Match main page background color #121212
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    
    console.log('Canvas dimensions:', `${mountRef.current.clientWidth}x${mountRef.current.clientHeight}`);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);
    
    // Add a second point light for better illumination
    const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
    pointLight2.position.set(10, 5, 10);
    scene.add(pointLight2);

    // Camera position
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    // Load the GLB model
    const loader = new GLTFLoader();
    let laptopModel = null;

    // Show loading message
    console.log('Loading 3D laptop model...');

    loader.load(
      '/models/laptop.glb',
      (gltf) => {
        console.log('3D model loaded successfully!');
        console.log('GLTF object:', gltf);
        console.log('Scene children:', gltf.scene.children);
        
        laptopModel = gltf.scene;
        
        // Debug: Log original bounds
        const originalBox = new THREE.Box3().setFromObject(laptopModel);
        const originalSize = originalBox.getSize(new THREE.Vector3());
        console.log('Original model size:', `x:${originalSize.x.toFixed(2)}, y:${originalSize.y.toFixed(2)}, z:${originalSize.z.toFixed(2)}`);
        console.log('Original model bounds min:', `x:${originalBox.min.x.toFixed(2)}, y:${originalBox.min.y.toFixed(2)}, z:${originalBox.min.z.toFixed(2)}`);
        console.log('Original model bounds max:', `x:${originalBox.max.x.toFixed(2)}, y:${originalBox.max.y.toFixed(2)}, z:${originalBox.max.z.toFixed(2)}`);
        
        // Center the model
        const box = new THREE.Box3().setFromObject(laptopModel);
        const center = box.getCenter(new THREE.Vector3());
        laptopModel.position.sub(center);
        
        // Scale the model to fit better
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 60 / maxDimension; // Reduced to 60 for better screen fit
        laptopModel.scale.setScalar(scale);
        
        // Ensure the model is positioned at the center of the scene
        laptopModel.position.set(0, 0, 0);
        
        console.log('Applied scale:', scale.toFixed(3));
        console.log('Final position:', `x:${laptopModel.position.x.toFixed(2)}, y:${laptopModel.position.y.toFixed(2)}, z:${laptopModel.position.z.toFixed(2)}`);
        console.log('Final scale:', `x:${laptopModel.scale.x.toFixed(3)}, y:${laptopModel.scale.y.toFixed(3)}, z:${laptopModel.scale.z.toFixed(3)}`);
        console.log('Max dimension of original model:', maxDimension.toFixed(2));
        
        // Enable shadows and check materials
        laptopModel.traverse((child) => {
          if (child.isMesh) {
            console.log('Mesh found:', child.name, child.material);
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Ensure material is visible
            if (child.material) {
              child.material.transparent = false;
              child.material.opacity = 1;
            }
          }
        });
        
        console.log('Adding model to scene...');
        
        // Remove the floor/ground object
        const meshesToRemove = [];
        laptopModel.traverse((child) => {
          if (child.isMesh && (child.name === 'Floor' || child.name.toLowerCase().includes('floor') || child.name.toLowerCase().includes('ground'))) {
            console.log('Removing floor/ground mesh:', child.name);
            meshesToRemove.push(child);
          }
        });
        
        // Remove the identified floor meshes
        meshesToRemove.forEach(mesh => {
          if (mesh.parent) {
            mesh.parent.remove(mesh);
          }
        });
        
        scene.add(laptopModel);
        console.log('Model added to scene successfully');
        
        // Force a render
        renderer.render(scene, camera);
        
        // Add mouse interaction event listeners
        const handleMouseDown = (event) => {
          if (event.button === 0) { // Left mouse button
            mouseRef.current.isDown = true;
            mouseRef.current.startX = event.clientX;
            mouseRef.current.startY = event.clientY;
            renderer.domElement.style.cursor = 'grabbing';
          }
        };

        const handleMouseMove = (event) => {
          if (!mouseRef.current.isDown) return;
          
          const deltaX = event.clientX - mouseRef.current.startX;
          const deltaY = event.clientY - mouseRef.current.startY;
          
          // Update manual rotation based on mouse movement
          mouseRef.current.rotationY += deltaX * 0.01;
          mouseRef.current.rotationX += deltaY * 0.01;
          
          // Clamp X rotation to prevent flipping
          mouseRef.current.rotationX = Math.max(-Math.PI/2, Math.min(Math.PI/2, mouseRef.current.rotationX));
          
          mouseRef.current.startX = event.clientX;
          mouseRef.current.startY = event.clientY;
        };

        const handleMouseUp = () => {
          mouseRef.current.isDown = false;
          renderer.domElement.style.cursor = 'grab';
        };

        // Add event listeners
        renderer.domElement.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        renderer.domElement.style.cursor = 'grab';
        
        // Store event listeners for cleanup
        sceneRef.current.eventListeners = {
          handleMouseDown,
          handleMouseMove,
          handleMouseUp
        };
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(1);
        console.log('Loading progress:', percent + '%');
      },
      (error) => {
        console.error('Error loading 3D model:', error);
        console.log('Error details:', error.message);
        console.log('Make sure laptop.glb is in the /public/models/ folder');
        
        // Fallback: Create a simple laptop shape if model fails to load
        console.log('Creating fallback laptop...');
        createFallbackLaptop();
      }
    );

    // Fallback laptop function
    const createFallbackLaptop = () => {
      const laptopGroup = new THREE.Group();

      // Screen (reduced size for better fit)
      const screenGeometry = new THREE.BoxGeometry(3.6, 2.4, 0.12);
      const screenMaterial = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(0, 1.2, 0);
      screen.rotation.x = -0.2;
      
      // Screen display (reduced size for better fit)
      const displayGeometry = new THREE.PlaneGeometry(3.1, 1.9);
      const displayMaterial = new THREE.MeshBasicMaterial({ color: 0x00D4FF });
      const display = new THREE.Mesh(displayGeometry, displayMaterial);
      display.position.set(0, 1.2, 0.07);
      display.rotation.x = -0.2;

      // Keyboard base (reduced size for better fit)
      const baseGeometry = new THREE.BoxGeometry(3.6, 0.24, 2.4);
      const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.set(0, -0.12, 1.2);

      laptopGroup.add(screen, display, base);
      laptopGroup.position.set(0, 0, 0);
      laptopGroup.rotation.y = 0.3;
      scene.add(laptopGroup);
      
      laptopModel = laptopGroup;
      
      // Add the same mouse interaction for fallback laptop
      const handleMouseDown = (event) => {
        if (event.button === 0) {
          mouseRef.current.isDown = true;
          mouseRef.current.startX = event.clientX;
          mouseRef.current.startY = event.clientY;
          renderer.domElement.style.cursor = 'grabbing';
        }
      };

      const handleMouseMove = (event) => {
        if (!mouseRef.current.isDown) return;
        
        const deltaX = event.clientX - mouseRef.current.startX;
        const deltaY = event.clientY - mouseRef.current.startY;
        
        mouseRef.current.rotationY += deltaX * 0.01;
        mouseRef.current.rotationX += deltaY * 0.01;
        mouseRef.current.rotationX = Math.max(-Math.PI/2, Math.min(Math.PI/2, mouseRef.current.rotationX));
        
        mouseRef.current.startX = event.clientX;
        mouseRef.current.startY = event.clientY;
      };

      const handleMouseUp = () => {
        mouseRef.current.isDown = false;
        renderer.domElement.style.cursor = 'grab';
      };

      renderer.domElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      renderer.domElement.style.cursor = 'grab';
      
      sceneRef.current.eventListeners = {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
      };
    };

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Rotate the laptop model if it exists
      if (laptopModel) {
        // Update auto-rotation
        autoRotationRef.current += 0.005;
        
        // Apply combined rotations: auto + manual
        laptopModel.rotation.x = mouseRef.current.rotationX;
        laptopModel.rotation.y = autoRotationRef.current + mouseRef.current.rotationY;
        laptopModel.rotation.z = 0; // Keep Z rotation stable
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Store refs
    sceneRef.current = { scene, camera, renderer, laptopModel };

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Clean up mouse event listeners
      if (sceneRef.current?.eventListeners) {
        const { handleMouseDown, handleMouseMove, handleMouseUp } = sceneRef.current.eventListeners;
        if (renderer.domElement) {
          renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'transparent'
      }} 
    />
  );
} 