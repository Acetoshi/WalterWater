import { useContext } from "react";
import { PositionContext } from "../Contexts/PositionProvider";

export function usePosition() {
  return useContext(PositionContext);
}