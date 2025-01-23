import { useContext } from "react";
import { PositionContext } from "./PositionProvider";

export default function usePosition() {
  return useContext(PositionContext);
}