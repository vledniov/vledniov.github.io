import * as React from "react";
import {DropTargetMonitor, useDrop} from "react-dnd";
import {ICanvasState, IDragShape} from "src/redux/reducer";
import {DraggableShape} from "src/draggableShape";
import {v4 as uuidv4} from "uuid";
import {MoveShapeAction, SetActiveShapeAction, ShapeTypes} from "src/Constants";
import {useSelector, useDispatch} from "react-redux";
import {AddShape} from "src/redux/actions";
import {Dispatch} from "redux";

export function Canvas() {
  const ref = React.useRef<HTMLInputElement>(null);
  const [draggedShapeId, setDraggedShapeId] = React.useState<string | undefined>(undefined);
  const dispatch: Dispatch<any> = useDispatch();
  const shapes = useSelector((state: ICanvasState) => state.shapes)!;

  // handles the drag and drop case for the shape from the toolbar
  const [, drop] = useDrop(() => ({
    accept: Object.values(ShapeTypes),
    drop: (droppedObject: IDragShape, monitor: DropTargetMonitor) => {
      const offset = monitor.getClientOffset();
      const rect = ref.current?.getBoundingClientRect();
      if (!offset || !rect) {
        return;
      }

      dispatch(
        AddShape({
          x: offset.x - rect.x,
          y: offset.y - rect.y,
          id: uuidv4(),
          type: droppedObject.type,
          isActive: true,
        })
      );
    },
  }));

  const handleMouseMove = (e: MouseEvent | React.MouseEvent) => {
    if (!draggedShapeId) {
      return;
    }

    let {clientX, clientY} = e;
    let {x, y} = ref.current?.getBoundingClientRect()!;

    dispatch({
      type: MoveShapeAction,
      payload: {id: draggedShapeId, x: clientX - x, y: clientY - y},
    });
  };

  const handleMouseDown = (id: string) => {
    return () => {
      setDraggedShapeId(id);
      dispatch({type: SetActiveShapeAction, payload: {id}});
    };
  };

  return (
    <div
      ref={ref}
      className="canvasWrapper"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDraggedShapeId(undefined)}
    >
      <svg ref={drop} className="canvas" viewBox="0 0 1200 600" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {shapes.map((el: IDragShape) => (
          <DraggableShape
            key={el.id}
            type={el.type}
            x={el.x}
            y={el.y}
            id={el.id}
            isActive={el.isActive}
            onMouseDown={handleMouseDown(el.id)}
          />
        ))}
      </svg>
    </div>
  );
}
