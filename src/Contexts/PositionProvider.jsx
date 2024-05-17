import { createContext, useContext, useState } from "react";

const PositionContext = createContext();

export default function PositionProvider({ children }) {
  const [userLocation, setUserLocation] = useState([48.866, 2.33333]);

  return (
    <PositionContext.Provider value={{userLocation, setUserLocation}}>
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition(){
   return useContext(PositionContext)
}
