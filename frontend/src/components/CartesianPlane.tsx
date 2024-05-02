"use client";

import { RoverContext } from "@/context/RoverContext";
import { useContext } from "react";

function CartesianPlane() {
  const { resultSentRover } = useContext(RoverContext);
  const lastPosition = resultSentRover?.lastPosition;

  return (
    <div className="flex flex-col gap-3">
      {!!resultSentRover && !!lastPosition && (
        <div className="font-bold mt-3">
          <span>
            Posição final: X: {lastPosition.x}, Y: {lastPosition.y} e Direção:{" "}
            {lastPosition.direction}
          </span>
        </div>
      )}

      {!!resultSentRover && (
        <div className="flex flex-col">
          <h2 className="font-semibold">Posições percorridas:</h2>
          <ul className="text-sm">
            {resultSentRover.positions.map((position, index) => {
              return (
                <li key={index}>
                  {index + 1} - X: {position.x}, Y: {position.y} e Direção:{" "}
                  {position.direction}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CartesianPlane;
