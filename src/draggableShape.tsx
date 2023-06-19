import * as React from "react";
import {ShapeTypes} from "src/Constants";
import {IDragShape} from "src/redux/reducer";

export function DraggableShape(props: IDragShape & React.SVGProps<SVGSVGElement | SVGRectElement | SVGCircleElement>) {
  const {type, x, y, isActive, onMouseDown} = props;

  switch (type) {
    case ShapeTypes.SQUARE:
      return (
        <rect
          width="40"
          height="40"
          x={x}
          y={y}
          onMouseDown={onMouseDown}
          className={"draggableShape" + (isActive ? " active" : "")}
        />
      );
    case ShapeTypes.CIRCLE:
      return (
        <circle
          r="20"
          cx={x}
          cy={y}
          onMouseDown={onMouseDown}
          className={"draggableShape" + (isActive ? " active" : "")}
        />
      );
    case ShapeTypes.TRIANGLE:
      return (
        <svg x={x} y={y} onMouseDown={onMouseDown}>
          <polygon
            points="7,40 24,7 43,40"
            strokeLinejoin="round"
            className={"draggableShape" + (isActive ? " active" : "")}
          />
        </svg>
      );
    default:
      return null;
  }
}
