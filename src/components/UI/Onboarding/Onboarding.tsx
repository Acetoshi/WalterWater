import useLocalStorage from '@/utilities/useLocalStorage';
import { useRef, useState } from 'react';
import './Onboarding.css';
import usePOIs from '@/Contexts/PointsOfInterest/usePOIs';
import useEffectSkipFirstRender from '@/utilities/useEffectSkipFirstRender';

export default function Onboarding() {
  const { setUserFilters } = usePOIs();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [onBoardingDone, setOnboardingDone] = useLocalStorage<boolean>(
    'ww_onboarding_done',
    false,
  );
  const [onBoardingStep, setOnboardingStep] = useState<number>(0);

  console.log(onBoardingDone);

  useEffectSkipFirstRender(() => {
    if (!onBoardingDone && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [onBoardingDone]);

  const handleClose = () => dialogRef.current && dialogRef.current.close();

  const finishOnboarding = () => {
    setOnboardingDone(true);
    handleClose();
  };

  const handleSkip = () => {
    if (onBoardingStep < steps.length - 1) {
      setOnboardingStep(onBoardingStep + 1);
    } else if (onBoardingStep === steps.length - 1) {
      handleClose();
      setOnboardingStep(0);
    }
  };

  const steps = [
    {
      title: 'Welcome, explorer ! what are you looking for ?',
      subtitle: 'Walter will help you find water taps or toilets near you',
      choices: (
        <>
          <button
            className="call-to-action-button"
            onClick={() => {
              setUserFilters({ water: true, food: false, toilets: false });
              setOnboardingStep(onBoardingStep + 1);
            }}
          >
            water <img src="/icons/faucet-icon.svg" alt="" />
          </button>
          <button
            className="call-to-action-button"
            onClick={() => {
              setUserFilters({ water: false, food: false, toilets: true });
              setOnboardingStep(onBoardingStep + 1);
            }}
          >
            toilets <img src="/icons/toilets-icon.svg" alt="" />
          </button>
        </>
      ),
    },
    {
      title: 'Find it near you !',
      subtitle:
        'Enable geolocation to see points of interest around you, we will NOT store this data',
      choices: (
        <button className="call-to-action-button">enable geolocation</button>
      ),
    },
    {
      title: 'Click any icon on the map to see details',
      subtitle:
        'Each point of interest will have details such as accessibility, toilet position and much more !',
      image: '/onboarding/poi-details.gif',
      choices: (
        <button className="call-to-action-button" onClick={finishOnboarding}>
          ok, got it !
        </button>
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

        {/* {steps[onBoardingStep].image && <img className="onboarding-illustration" src={steps[onBoardingStep].image} alt=""/>} */}
        <div id="onboarding-buttons-and-progress-wrapper">
          <div id="onboarding-choice-button-wrapper">
            {steps[onBoardingStep].choices}
            <button className="skip-button" onClick={handleSkip}>
              Skip
            </button>
          </div>
          <div id="onboarding-progress-bar">
            <button
              onClick={() => setOnboardingStep(0)}
              aria-label="got to onboarding step 1"
              className={onBoardingStep >= 0 ? 'active' : 'inactive'}
            />
            <button
              onClick={() => setOnboardingStep(1)}
              aria-label="got to onboarding step 2"
              className={onBoardingStep >= 1 ? 'active' : 'inactive'}
            />
            <button
              onClick={() => setOnboardingStep(2)}
              aria-label="got to onboarding step 3"
              className={onBoardingStep >= 2 ? 'active' : 'inactive'}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}
