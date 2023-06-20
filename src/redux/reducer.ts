import {ToBackAction, ToFrontAction, AddShapeAction, MoveShapeAction, ShapeSpecificConfigs, SetActiveShapeAction} from "src/Constants";

export interface IDragShape {
  id: string;
  type: string;
  x: number;
  y: number;
  isActive: boolean;
}

export interface ICanvasState {
  shapes: IDragShape[]; 
}

const INITIAL_STATE: ICanvasState = {
  shapes: []
}

export interface CommonAction {
  type: string
  payload: IDragShape
}

export const reducer = (state = INITIAL_STATE, action: CommonAction): ICanvasState => {
  switch (action.type) {
    case AddShapeAction: {
      const prevShapes = state.shapes.map((shape) => {
        return {...shape, isActive: false};
      });
      return {shapes: [...prevShapes, action.payload]}
    }
    case MoveShapeAction: {
      let {x, y, id} = action.payload
      return {shapes: state.shapes.map((shape) => {
        if (shape.id === id) {
          let adjusted = ShapeSpecificConfigs[shape.type].centerPosition;

          return {...shape, x: x - adjusted, y: y - adjusted};
        }
        return shape;
      })}
    }
    case SetActiveShapeAction:
        return {shapes: state.shapes.map((shape) => {
          if (shape.id === action.payload.id) {
            return {...shape, isActive: true};
          } else {
            return {...shape, isActive: false};
          }
        })}
    case ToBackAction: {
      if (state.shapes.length <= 1) {
        return state
      }

      const activeShape = action.payload
      const oldShapes = state.shapes.filter(shape => (shape.id !== activeShape.id))
      return {shapes: [activeShape, ...oldShapes]};
    }
    case ToFrontAction: {
      if (state.shapes.length <= 1) {
        return state
      }

      const activeShape = action.payload
      let oldShapes = state.shapes.filter(shape => (shape.id !== activeShape!.id))
      return {shapes: [...oldShapes, activeShape!]};
    }
    default:
      return state
  }
};
