import { useContext } from "react";
import {PointsOfInterestContext} from "../Contexts/PointsOfInterestProvider"

export function usePOIs() {
  return useContext(PointsOfInterestContext);
}