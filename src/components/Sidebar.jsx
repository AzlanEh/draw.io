import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DrawingContext } from "../context/Context.jsx";

const Sidebar = ({ clearCanvas, saveImage }) => {
  const {
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
  } = useContext(DrawingContext);

  return (
    <>
      <div className="bg-slate-200 h-full w-[20%] rounded-lg p-4 flex flex-col justify-between  ">
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-semibold text-zinc-600">Shape</label>
            <div>
              <button
                className={`hover:text-blue-500   ${
                  selectedTool === "Rectangle" ? "text-blue-500" : ""
                }   `}
                onClick={() => {
                  setSelectedTool("Rectangle");
                  console.log(selectedTool);
                }}
              >
                Rectangle
              </button>
            </div>
            <div>
              <button
                className={`hover:text-blue-500   ${
                  selectedTool === "Circle" ? "text-blue-500" : ""
                }   `}
                onClick={() => {
                  setSelectedTool("Circle");
                  console.log(selectedTool);
                }}
              >
                Circle
              </button>
            </div>
            <div>
              <button
                className={`hover:text-blue-500   ${
                  selectedTool === "Triangle" ? "text-blue-500" : ""
                }   `}
                onClick={() => {
                  setSelectedTool("Triangle");
                  console.log(selectedTool);
                }}
              >
                Triangle
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setFillColor(!fillColor);
                  console.log(fillColor);
                }}
                className={`hover:text-blue-500 ${
                  fillColor ? "text-blue-500" : "text-black"
                }`}
              >
                Fil color
              </button>
            </div>
          </div>
          <div>
            <label className="font-semibold text-zinc-600">Options</label>
            <div>
              <button
                onClick={toggleBrush}
                className={` hover:text-blue-500  ${
                  selectedTool === "Brush" ? "text-blue-500" : ""
                } `}
              >
                Brush
              </button>
            </div>
            <div>
              <button
                className={`hover:text-blue-500   ${
                  selectedTool === "Eraser" ? "text-blue-500" : ""
                }   `}
                onClick={toggleEraser}
              >
                Eraser
              </button>
            </div>
            <div className="w-full px-1">
              <input
                className="w-full"
                type="range"
                min={"1"}
                max={"40"}
                value={brushSize}
                onChange={(e) => {
                  setBrushSize(parseInt(e.target.value, 10));
                }}
              ></input>
            </div>
          </div>
          <div>
            <div>
              <label className="font-semibold text-zinc-600">Colors</label>
            </div>
            <button
              className="size-5 m-2 bg-black rounded-full  hover:border-2 "
              onClick={() => {
                setSelectedColor("black");
                console.log(selectedColor);
              }}
            ></button>
            <button
              className="size-5 m-2 bg-red-600 rounded-full  hover:border-2 "
              onClick={() => {
                setSelectedColor("red");
                console.log(selectedColor);
              }}
            ></button>
            <button
              className="size-5 m-2 bg-blue-600 rounded-full  hover:border-2 "
              onClick={() => {
                setSelectedColor("blue");
                console.log(selectedColor);
              }}
            ></button>
            <button
              className="size-5 m-2 bg-green-600 rounded-full  hover:border-2 "
              onClick={() => {
                setSelectedColor("green");
                console.log(selectedColor);
              }}
            ></button>
          </div>
        </div>
        <div>
          <div className="flex-col justify-center items-center flex gap-2">
            <div className="w-full">
              <button
                onClick={clearCanvas}
                className="border-zinc-600 border-2  text-zinc-600 w-full rounded p-2"
              >
                Clear Canvas
              </button>
            </div>
            <div className="w-full">
              <button
                className="bg-zinc-600 text-slate-200 w-full rounded p-2"
                onClick={saveImage}
              >
                Save As Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  clearCanvas: PropTypes.func.isRequired, // Specify the type and that it's required
  saveImage: PropTypes.func.isRequired, // Specify the type and that it's required
};

export default Sidebar;
