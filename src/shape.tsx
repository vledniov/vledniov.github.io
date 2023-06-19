import * as React from "react";
import {useDrag} from "react-dnd";

interface ShapeProps {
  type: string;
}

export function Shape(props: ShapeProps) {
  const type = props.type;
  const svgLocation = `assets/shapes.svg#${type}`;

  const [{isDragging}, drag] = useDrag(
    () => ({
      type: type,
      item: {type: type},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <div className="shape" ref={drag} style={{opacity: isDragging ? 0.5 : 1}}>
      <svg
        width="50"
        height="50"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <use xlinkHref={svgLocation} />
      </svg>
    </div>
  );
}
