import useLocalStorage from '@/utilities/useLocalStorage';
import { useRef, useState, useEffect } from 'react';
import usePOIs from '@/Contexts/PointsOfInterest/usePOIs';
import './Onboarding.css';
import usePosition from '@/Contexts/Position/usePosition';

export default function Onboarding() {
  const { setUserFilters } = usePOIs();
  const { askUserLocation } = usePosition();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [onBoardingDone, setOnboardingDone] = useLocalStorage<boolean>('ww_onboarding_done', false);
  const [onBoardingStep, setOnboardingStep] = useState<number>(0);

  useEffect(() => {
    if (!onBoardingDone) {
      setTimeout(() => dialogRef.current && dialogRef.current.showModal(), 2000);
    }
  }, [onBoardingDone]);

  const handleClose = () => dialogRef.current && dialogRef.current.close();

  const finishOnboarding = () => {
    setOnboardingDone(true);
    setTimeout(handleClose, 300);
  };

  const handleSkip = () => {
    if (onBoardingStep < steps.length - 1) {
      incrementWithDelay();
    } else if (onBoardingStep === steps.length - 1) {
      handleClose();
      setOnboardingStep(0);
    }
  };

  const incrementWithDelay = () => setTimeout(() => setOnboardingStep(onBoardingStep + 1), 300);

  const steps = [
    {
      title: 'Welcome, explorer ! What are you looking for ?',
      subtitle: 'Stay hydrated by finding refill points, or find clean and accessible restrooms.',
      image: '/onboarding/filters.gif',
      choices: (
        <>
          <button
            className="call-to-action-button button-feedback"
            onClick={() => {
              setUserFilters({ water: true, food: false, toilets: false });
              incrementWithDelay();
            }}
          >
            I need water <img src="/icons/faucet-icon.svg" alt="" />
          </button>
          <button
            className="call-to-action-button button-feedback"
            onClick={() => {
              setUserFilters({ water: false, food: false, toilets: true });
              incrementWithDelay();
            }}
          >
            I need toilets <img src="/icons/toilets-icon.svg" alt="" />
          </button>
          <button className="skip-button button-feedback" onClick={handleSkip}>
            Skip for now
          </button>
        </>
      ),
    },
    {
      title: 'Find it near you !',
      subtitle: 'Let us show you nearby refill points and toilets. Your location will not be stored on our servers',
      image: '/onboarding/location.gif',
      choices: (
        <>
          <button
            className="call-to-action-button button-feedback"
            onClick={async () => {
              const geolocObtained = await askUserLocation();
              if (geolocObtained) incrementWithDelay();
            }}
          >
            Enable geolocation
          </button>
          <button className="skip-button button-feedback" onClick={handleSkip}>
            Skip for now
          </button>
        </>
      ),
    },
    {
      title: 'Click any icon on the map to see details',
      subtitle: 'Tap any icon to discover important details, like accessibility, distance, and more.',
      image: '/onboarding/poi-details.gif',
      choices: (
        <>
          <button className="call-to-action-button button-feedback" onClick={finishOnboarding}>
            Ok, got it !
          </button>
          <button className="skip-button button-feedback" onClick={handleSkip}>
            Remind me later
          </button>
        </>
      ),
    },
  ];

  return (
    <dialog ref={dialogRef} id="onboarding-dialog">
      <div id="onboarding-dialog-content">
        <hgroup>
          <h1>{steps[onBoardingStep].title}</h1>
          <p>{steps[onBoardingStep].subtitle}</p>
        </hgroup>

        {steps[onBoardingStep].image && (
          <figure>
            <img className="onboarding-illustration" src={steps[onBoardingStep].image} alt="" />
          </figure>
        )}
        <div id="onboarding-buttons-and-progress-wrapper">
          <div id="onboarding-choice-button-wrapper">{steps[onBoardingStep].choices}</div>
          <div id="onboarding-progress-bar">
            <button
              onClick={() => setOnboardingStep(0)}
              aria-label="go to onboarding step 1"
              className={onBoardingStep >= 0 ? 'active' : 'inactive'}
            />
            <button
              onClick={() => setOnboardingStep(1)}
              aria-label="go to onboarding step 2"
              className={onBoardingStep >= 1 ? 'active' : 'inactive'}
            />
            <button
              onClick={() => setOnboardingStep(2)}
              aria-label="go to onboarding step 3"
              className={onBoardingStep >= 2 ? 'active' : 'inactive'}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}
