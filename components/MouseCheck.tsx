"use client"
import { useState, useEffect } from "react";

export default function MouseCheck() {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setRadius(100);
    };

    const handleMouseStop = () => {
      setRadius(0);
    };

    let timeout :any;
    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mousemove", () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleMouseStop, 1000);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);
  
  return (
      <div
        className="pointer-radius"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: `${radius}px`,
          height: `${radius}px`,
        }}
      />
  );
}
