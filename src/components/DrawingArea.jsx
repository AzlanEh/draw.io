import React, { useRef, useState, useEffect, useContext } from "react";
import { DrawingContext } from "../context/Context.jsx";

const DrawingArea = React.forwardRef((props, ref) => {
  const canvasRef = ref || useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { selectedColor, selectedTool, fillColor, brushSize } =
    useContext(DrawingContext);

  const [prevMouseX, setPrevMouseX] = useState(undefined);
  const [prevMouseY, setPrevMouseY] = useState(undefined);
  const [snapshot, setSnapshot] = useState(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // context.lineWidth = brushSize;
    context.lineCap = "round";
    context.strokeStyle = selectedColor;

    const setCanvasBackground = () => {
      context.fillStyle = "#e2e8f0";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = selectedColor;
    };

    window.addEventListener("load", () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      setCanvasBackground();
    });

    const drawRect = (e) => {
      if (!fillColor) {
        return context.strokeRect(
          prevMouseX,
          prevMouseY,
          e.offsetX - prevMouseX,
          e.offsetY - prevMouseY
        );
      }
      context.fillRect(
        prevMouseX,
        prevMouseY,
        e.offsetX - prevMouseX,
        e.offsetY - prevMouseY
      );
    };
    const drawCir = (e) => {
      context.beginPath();
      let radius = Math.sqrt(
        Math.pow(prevMouseX - e.offsetX, 2) +
          Math.pow(prevMouseY - e.offsetY, 2)
      );
      context.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
      fillColor ? context.fill() : context.stroke();
    };
    const drawTri = (e) => {
      context.beginPath();
      context.moveTo(prevMouseX, prevMouseY);
      context.lineTo(e.offsetX, e.offsetY);
      context.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
      context.closePath();
      fillColor ? context.fill() : context.stroke();
    };

    const startDrawing = (e) => {
      setIsDrawing(true);
      setPrevMouseX(e.offsetX);
      setPrevMouseY(e.offsetY);
      context.beginPath();
      context.lineWidth = brushSize;
      context.strokeStyle = selectedColor;
      context.fillStyle = selectedColor;
      context.moveTo(e.offsetX, e.offsetY);
      let shape = context.getImageData(0, 0, canvas.width, canvas.height);
      setSnapshot(shape);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      context.putImageData(snapshot, 0, 0);
      context.strokeStyle = selectedColor;
      context.lineWidth = brushSize;
      if (selectedTool === "Brush") {
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      } else if (selectedTool === "Eraser") {
        context.strokeStyle = "#e2e8f0";
        context.lineWidth = brushSize + 15;
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      } else if (selectedTool === "Rectangle") {
        console.log(selectedTool);
        drawRect(e);
      } else if (selectedTool === "Circle") {
        drawCir(e);
      } else if (selectedTool === "Triangle") {
        drawTri(e);
      }
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      context.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [
    canvasRef,
    isDrawing,
    selectedColor,
    selectedTool,
    brushSize,
    fillColor,
    snapshot,
    prevMouseX,
    prevMouseY,
  ]);

  return (
    <>
      <div className="bg-slate-200 h-full w-[80%] rounded-lg">
        <canvas ref={canvasRef} {...props} className="h-full w-full p-[2px]" />
      </div>
    </>
  );
});

export default DrawingArea;
