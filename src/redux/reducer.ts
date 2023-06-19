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

interface CommonAction {
  type: string
  payload: {
    id: string;
    kind: string;
    x: number;
    y: number;
  }
}

interface AddAction {
  type: string
  payload: ICanvasState
}

const getActiveShape = (state: ICanvasState): IDragShape => {
  return state.shapes.find(shape => (shape.isActive))!
}

export const reducer = (state = INITIAL_STATE, action: CommonAction & AddAction): ICanvasState => {
  switch (action.type) {
    case AddShapeAction:
      // let adjusted = ShapeSpecificConfigs[action.payload.kind].centerPosition;
      // const newObject: IDragShape = {
      //   type: action.payload.kind,
      //   x: action.payload.x - adjusted,
      //   y: action.payload.y - adjusted,
      //   id: action.payload.id,
      //   isActive: true,
      // };

      // const prevShapes = state.shapes.map((shape) => {
      //   return {...shape, isActive: false};
      // });
      // return {shapes: [...prevShapes, newObject]}
      return {shapes: action.payload.shapes}
    case MoveShapeAction:
      return {shapes: state.shapes.map((shape) => {
        if (shape.id === action.payload.id) {
          let adjusted = ShapeSpecificConfigs[shape.type].centerPosition;
          return {...shape, x: action.payload.x - adjusted, y: action.payload.y - adjusted};
        }
        return shape;
      })}
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
        return {shapes: state.shapes}
      }

      const activeShape = getActiveShape(state)
      const oldShapes = state.shapes.filter(shape => (shape.id !== activeShape.id))
      return {shapes: [activeShape, ...oldShapes]};
    }
    case ToFrontAction: {
      if (state.shapes.length <= 1) {
        return {shapes: state.shapes}
      }

      let activeShape = getActiveShape(state)
      let oldShapes = state.shapes.filter(shape => (shape.id !== activeShape!.id))
      return {shapes: [...oldShapes, activeShape!]};
    }
    default:
      return {shapes: []};
  }
};
