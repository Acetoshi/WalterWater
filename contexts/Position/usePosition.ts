import { useContext } from "react";
import { PositionContext } from "./PositionProvider";

export function usePosition() {
  return useContext(PositionContext);
}