import { Point } from '@/Contexts/contexts.types';

export default interface CustomMarkerProps {
  point: Point;
  onMarkerClick: (point: Point) => void;
}
