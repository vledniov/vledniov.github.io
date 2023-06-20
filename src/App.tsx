import * as React from "react";
import "src/App.css";
import {Shape} from "src/shape";
import {ShapeTypes} from "src/Constants";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {Canvas} from "src/canvas";
import {Toolbox} from "src/toolbox";
import {Provider} from "react-redux";
import {applyMiddleware, Store, legacy_createStore as createStore} from "redux";
import {CommonAction, ICanvasState, reducer} from "src/redux/reducer";
import thunk from "redux-thunk";

export function App() {
  const store: Store<ICanvasState, CommonAction> & {
    dispatch: (args: any) => void;
  } = createStore(reducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="editor">
          <div className="palette">
            <Shape type={ShapeTypes.SQUARE} />
            <Shape type={ShapeTypes.CIRCLE} />
            <Shape type={ShapeTypes.TRIANGLE} />
            <Toolbox />
          </div>

          <div className="workspace">
            <Canvas />
          </div>
        </div>
      </DndProvider>
    </Provider>
  );
}
