import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeModel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 3);
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });
      renderer.outputEncoding = THREE.sRGBEncoding;
      const loader = new GLTFLoader();
      scene.background = new THREE.Color("white");
      const light = new THREE.DirectionalLight(0xffff00, 10);
      scene.add(light);

      loader.load("/scene.gltf", (object) => {
        scene.add(object.scene);
        renderer.render(scene, camera);
      });
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} id="canvas" width="700" height="700" />;
};

export default ThreeModel;
