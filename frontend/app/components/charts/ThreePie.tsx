import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreePie({ data }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    ref.current!.appendChild(renderer.domElement);

    let start = 0;
    data.forEach((d: any) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.absarc(0, 0, 2, start, start + d.value, false);
      shape.lineTo(0, 0);

      const geom = new THREE.ShapeGeometry(shape);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
      });

      scene.add(new THREE.Mesh(geom, mat));
      start += d.value;
    });

    renderer.render(scene, camera);

    return () => {
      ref.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [data]);

  return <div ref={ref} />;
}
