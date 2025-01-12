import React, { createContext, useState } from "react";

export const DrawingContext = createContext();

const DrawingProvider = ({ children }) => {
  const [state, setState] = useState({});
  const [brushActive, setBrushActive] = useState(true);
  const [fillColor, setFillColor] = useState(false);
  const [selectedTool, setSelectedTool] = useState("Brush");
  const [selectedColor, setSelectedColor] = useState("black");
  const [brushSize, setBrushSize] = useState(1);

  const toggleBrush = () => {
    setBrushActive(true);
    setSelectedTool("Brush");
  };
  const toggleEraser = () => {
    setBrushActive(false);
    setSelectedTool("Eraser");
  };

  return (
    <DrawingContext.Provider
      value={{
        state,
        setState,
        brushActive,
        toggleBrush,
        toggleEraser,
        selectedTool,
        setSelectedTool,
        selectedColor,
        setSelectedColor,
        fillColor,
        setFillColor,
        brushSize,
        setBrushSize,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export default DrawingProvider;
