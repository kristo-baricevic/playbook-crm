import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeLine({ data }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    ref.current.replaceChildren(renderer.domElement);

    const points = data.map(
      (d: any, i: number) => new THREE.Vector3(i, d.value, 0)
    );

    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: 0xffaa00 });
    scene.add(new THREE.Line(geom, mat));

    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
      ref.current?.replaceChildren();
    };
  }, [data]);

  return (
    <div className="border border-slate-500 rounded-md flex items-center justify-center w-[300px] h-[300px]">
      <div ref={ref} />
    </div>
  );
}
