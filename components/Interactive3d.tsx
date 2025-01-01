"use client";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  PerspectiveCamera,
} from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";
import { Robot } from "./Robot";
import { Robot2 } from "./Robot2";
import { Robot3 } from "./Robot3";

const Interactive3d = ({model}: any) => {
  const spotlightTarget = useRef();
  return (

        <div style={{ width: "100%", height: "400px" }}>
          <Canvas >
            <ambientLight intensity={0.5} />

            <directionalLight
              position={[15, 20, 10]}
              intensity={10}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />

            {/* Overhead Spotlight */}
            <spotLight
              position={[0, 10, 0]}
              intensity={10}
              angle={90}
              penumbra={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              target={spotlightTarget.current}
            />

            {/* <Robot ref={spotlightTarget}/> */}
            <Robot2 ref={spotlightTarget}/>
            {/* <Robot3 ref={spotlightTarget}/> */}

            <PerspectiveCamera makeDefault position={[3, 3, 10]} />

            <OrbitControls
              minDistance={30}
              maxDistance={40}
              zoomSpeed={0.5}
              target={[0, 0, 0]}
              enableDamping={true}
              dampingFactor={0.25}
              minPolarAngle={0} 
              maxPolarAngle={Math.PI / 2 - 0.1} 
            />

          </Canvas>
        </div>
  );
};

export default Interactive3d;
