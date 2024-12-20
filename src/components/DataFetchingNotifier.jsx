import { useEffect, useState } from "react";
import { usePOIs } from "../hooks/usePOIs";
import "../styles/dataFetchingNotifier.css";

// Needed for the user to know when the app is fetching
export default function DataFetchingNotifier() {
  const { requestStatus } = usePOIs();
  const [isHidden, setIsHidden] = useState(true);

  // this is to prevent the button from showing if the fetching takes less than 1s
  useEffect(() => {
    let timeoutId;
    if (requestStatus === "fetching data") {
      timeoutId = setTimeout(() => {
        if (requestStatus === "fetching data") {
          setIsHidden(false);
        }
      }, 1000);
    } else if (requestStatus === "server error") {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [requestStatus]);

  return (
    <div id="data-fetching-notifier-container">
      <span
        id="data-fetching-notifier"
        className={`disabled ${isHidden ? "hidden" : ""}`}
      >
        {requestStatus === "fetching data" && (
          <p>
            <span className="loader"></span> fetching data
          </p>
        )}
        {requestStatus === "data received" && <p>data received</p>}
        {requestStatus === "server error" && (
          <p>server error, try zooming in</p>
        )}
      </span>
    </div>
  );
}
