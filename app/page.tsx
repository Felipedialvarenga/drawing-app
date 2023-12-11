"use client";
import { useDrawn } from "@/hooks/useDraw";
import { FC, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { canvasRef, onMouseDown } = useDrawn(drawLine);
  const [color, setColor] = useState("#000");

  function drawLine({ ctx, currentPoint, previousPoint }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineWidth = 5;

    let startPoint = previousPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <HexColorPicker color={color} onChange={setColor} />
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        height={750}
        width={750}
        className="border border-black rounded-md"
      />
    </div>
  );
};

export default Page;
