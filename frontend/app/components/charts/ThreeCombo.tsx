import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeCombo({ data }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    ref.current.replaceChildren(renderer.domElement);

    data.forEach((d: any, i: number) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, d.value, 0.6),
        new THREE.MeshBasicMaterial({ color: 0x3366ff })
      );
      bar.position.x = i - data.length / 2 + 0.5;
      bar.position.y = d.value / 2;
      scene.add(bar);
    });

    const points = data.map(
      (d: any, i: number) =>
        new THREE.Vector3(i - data.length / 2 + 0.5, d.value, 0)
    );

    scene.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0xff3333 })
      )
    );

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
