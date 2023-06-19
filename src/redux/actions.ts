import {AddShapeAction, ShapeSpecificConfigs} from "src/Constants";
import { ICanvasState, IDragShape } from "./reducer";
import { Dispatch } from "redux";

export function AddShape(payload: any) {
    console.log("Adding shape", payload)
    const adjusted = ShapeSpecificConfigs[payload.kind].centerPosition;

    return (dispatch: Dispatch, getState: () => ICanvasState) => {
        const newObject: IDragShape = {
            type: payload.kind,
            x: payload.x - adjusted,
            y: payload.y - adjusted,
            id: payload.id,
            isActive: true,
        };
    
        const prevShapes = getState().shapes.map((shape) => {
            return {...shape, isActive: false};
        });
        dispatch({type: AddShapeAction, payload: [...prevShapes, newObject]})
    }
}