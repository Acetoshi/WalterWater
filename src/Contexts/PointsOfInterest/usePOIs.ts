import { useContext } from "react";
import {PointsOfInterestContext} from "./PointsOfInterestProvider"

export default function usePOIs() {
  return useContext(PointsOfInterestContext);
}