"use client";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  PerspectiveCamera,
} from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Axel } from "./Axel";
import { Car } from "./Car";
import { useRef } from "react";
import { Robot } from "./Robot";

const Interactive3d = ({model}: any) => {
  const spotlightTarget = useRef();
  return (
    // <Card className="md:h-[400px] overflow-hidden">
    //   <CardContent className="p-0">
    //     {" "}
        <div style={{ width: "100%", height: "400px" }}>
          <Canvas >
            <ambientLight intensity={0.5} />

            <directionalLight
              position={[15, 20, 10]} // sunlight position
              intensity={3.5}
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
              intensity={5}
              angle={0.5}
              penumbra={0.3}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              target={spotlightTarget.current}
            />

            {/* <Car ref={spotlightTarget}/> */}
            <Robot ref={spotlightTarget}/>
            model

            <PerspectiveCamera makeDefault position={[3, 3, 10]} />

            <OrbitControls
              minDistance={7}
              maxDistance={10}
              zoomSpeed={0.5}
              target={[0, 0, 0]}
              enableDamping={true}
              dampingFactor={0.25}
              minPolarAngle={0} 
              maxPolarAngle={Math.PI / 2 - 0.1} 
            />

          </Canvas>
        </div>
    //   </CardContent>
    // </Card>
  );
};

export default Interactive3d;
