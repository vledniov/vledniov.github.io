import * as React from "react";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {ToBackAction, ToFrontAction} from "src/Constants";
import {ChangeZIndex} from "src/redux/actions";

export function Toolbox() {
  const dispatch: Dispatch<any> = useDispatch();
  const toBackHandler = () => {
    dispatch(ChangeZIndex(ToBackAction));
  };

  const toFrontHandler = () => {
    dispatch(ChangeZIndex(ToFrontAction));
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
