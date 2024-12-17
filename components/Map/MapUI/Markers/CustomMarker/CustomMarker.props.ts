import { Point } from "@/contexts/contexts.types";

export default interface CustomMarkerProps {
  point: Point;
  onMarkerClick: (point: Point) => void;
}
