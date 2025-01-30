import { Dispatch, SetStateAction } from 'react';
import { MapSelecter } from '@/pages/Map/Map.types';

export default interface MapProviderSelecterProps {
  mapSelecter: MapSelecter;
  setMapSelecter: Dispatch<SetStateAction<MapSelecter>>;
}
