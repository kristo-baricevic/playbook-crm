import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBar({ data }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300);
    ref.current!.appendChild(renderer.domElement);

    data.forEach((d: any, i: number) => {
      const geom = new THREE.BoxGeometry(0.8, d.value, 0.8);
      const mat = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.x = i - data.length / 2;
      mesh.position.y = d.value / 2;
      scene.add(mesh);
    });

    renderer.render(scene, camera);

    return () => {
      ref.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [data]);

  return <div ref={ref} />;
}
