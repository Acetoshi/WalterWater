import { useContext } from "react";
import {PointsOfInterestContext} from "./PointsOfInterestProvider"

export function usePOIs() {
  return useContext(PointsOfInterestContext);
}