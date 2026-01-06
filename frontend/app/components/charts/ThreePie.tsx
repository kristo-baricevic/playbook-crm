import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreePie({ data }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    ref.current.replaceChildren(renderer.domElement);

    const total = data.reduce((sum: number, d: any) => sum + d.value, 0);
    let start = 0;

    data.forEach((d: any) => {
      const angle = (d.value / total) * Math.PI * 2;

      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.absarc(0, 0, 2, start, start + angle, false);
      shape.lineTo(0, 0);

      const geom = new THREE.ShapeGeometry(shape);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
      });

      scene.add(new THREE.Mesh(geom, mat));
      start += angle;
    });

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
