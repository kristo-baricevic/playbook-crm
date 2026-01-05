import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeCombo({ data }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300);
    ref.current!.appendChild(renderer.domElement);

    data.forEach((d: any, i: number) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, d.value, 0.6),
        new THREE.MeshBasicMaterial({ color: 0x3366ff })
      );
      bar.position.x = i - data.length / 2;
      bar.position.y = d.value / 2;
      scene.add(bar);
    });

    const linePoints = data.map(
      (d: any, i: number) => new THREE.Vector3(i - data.length / 2, d.value, 0)
    );
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(linePoints),
      new THREE.LineBasicMaterial({ color: 0xff3333 })
    );
    scene.add(line);

    renderer.render(scene, camera);

    return () => {
      ref.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [data]);

  return <div ref={ref} />;
}
