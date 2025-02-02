import { useEffect, useState } from 'react';
import usePOIs from '../../../Contexts/PointsOfInterest/usePOIs';
import './DataFetchingNotifier.css';

// Needed for the user to know when the app is fetching
export default function DataFetchingNotifier() {
  const { requestStatus } = usePOIs();
  const [isHidden, setIsHidden] = useState(true);

  // this is to prevent the button from showing if the fetching takes less than 300s
  useEffect(() => {
    if (requestStatus === 'loading' || requestStatus === 'error') {
      setIsHidden(false);
    } else {
      setTimeout(() => setIsHidden(true), 600);
    }
  }, [requestStatus]);

  return (
    <div id="data-fetching-notifier-container">
      <span id="data-fetching-notifier" className={`disabled ${isHidden ? 'hidden' : ''}`}>
        {requestStatus === 'loading' && (
          <p>
            <span className="loader"></span> loading data
          </p>
        )}
        {requestStatus === 'success' && <p>data received</p>}
        {requestStatus === 'error' && <p>error, try zooming in</p>}
      </span>
    </div>
  );
}
