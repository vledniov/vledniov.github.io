import { Dispatch } from "redux";
import {AddShapeAction, ShapeSpecificConfigs} from "src/Constants"
import { ICanvasState, IDragShape, CommonAction } from "src/redux/reducer";
import { ThunkAction } from "redux-thunk";

type ShapesThunkAction = ThunkAction<void, ICanvasState, any, CommonAction>

export function AddShape(payload: IDragShape): ShapesThunkAction {
    return (dispatch: Dispatch) => {
        let adjusted = ShapeSpecificConfigs[payload.type].centerPosition;
        const newObject: IDragShape = {
          type: payload.type,
          x: payload.x - adjusted,
          y: payload.y - adjusted,
          id: payload.id,
          isActive: true,
        };

        dispatch({type: AddShapeAction, payload: newObject})
    }
}

export function ChangeZIndex(direction: string): ShapesThunkAction {
  return (dispatch: Dispatch, getState: () => ICanvasState) => {
    const activeShape = getState().shapes.find(shape => (shape.isActive))!
    dispatch({type: direction, payload: activeShape})
  }
}