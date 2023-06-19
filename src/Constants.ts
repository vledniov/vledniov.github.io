export enum ShapeTypes {
    SQUARE = "square",
    CIRCLE = "circle",
    TRIANGLE = "triangle"
}

export const ToBackAction = "shapes/moveToBack"
export const ToFrontAction = "shapes/moveToFront"
export const AddShape = "shapes/add"
export const MoveShape = "shapes/move"
export const SetActiveShape = "shapes/setActive"

interface CenterPosition {
    centerPosition: number
}

export const ShapeSpecificConfigs: Record<string, CenterPosition> = {
    square: {
        centerPosition: 20 // the value representing the distance to the center of the SVG element from the top-left corner
    },
    circle: {
        centerPosition: 0 // the value is 0 here since the circle is always drawn from the center
    },
    triangle: {
        centerPosition: 25
    }
}