export default interface MapProviderSelectorProps {
  mapSelecter: {
    isOpen: boolean;
    providerId: number;
  };
  setMapSelecter: React.Dispatch<React.SetStateAction<{
    isOpen: boolean;
    providerId: number;
  }>>;
}
