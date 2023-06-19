import * as React from "react";
import {useDispatch} from "react-redux";
import {ToBackAction, ToFrontAction} from "src/Constants";

export function Toolbox() {
  const dispatch = useDispatch();
  const toBackHandler = () => {
    dispatch({type: ToBackAction});
  };

  const toFrontHandler = () => {
    dispatch({type: ToFrontAction});
  };

  return (
    <div className="toolkit">
      <button type="button" onClick={toBackHandler}>
        <img className="toBack" src="assets/to_back.png" alt="to-back" />
      </button>
      <button type="button" onClick={toFrontHandler}>
        <img className="toFront" src="assets/to_front.png" alt="to-back" />
      </button>
    </div>
  );
}
