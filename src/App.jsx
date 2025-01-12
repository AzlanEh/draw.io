import React, { useRef } from "react";
import "./App.css";
import DrawingArea from "./components/DrawingArea.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const canvasRef = useRef(null);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = `${Date.now()}.jpg`;
      link.href = canvas.toDataURL("image/jpeg");
      link.click();
    }
  };

  return (
    <>
      <div className="bg-zinc-600 h-dvh w-dvw  ">
        <Navbar />
        <div className="flex h-[90%] gap-2 mt-2 px-2 ">
          <Sidebar clearCanvas={clearCanvas} saveImage={saveImage} />
          <DrawingArea ref={canvasRef} />
        </div>
      </div>
    </>
  );
}

export default App;
