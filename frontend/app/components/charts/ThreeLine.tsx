import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeLine({ data }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300);
    ref.current!.appendChild(renderer.domElement);

    const points = data.map(
      (d: any, i: number) => new THREE.Vector3(i, d.value, 0)
    );

    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: 0xffaa00 });
    const line = new THREE.Line(geom, mat);

    scene.add(line);
    renderer.render(scene, camera);

    return () => {
      ref.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [data]);

  return <div ref={ref} />;
}
