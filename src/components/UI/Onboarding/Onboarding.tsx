import useLocalStorage from '@/utilities/useLocalStorage';
import { useRef, useEffect } from 'react';
import './Onboarding.css';

export default function Onboarding() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [onBoardingStep, setOnboardingStep] = useLocalStorage<number>(
    'walter_water_onboarding',
    0,
  );

  useEffect(() => {
    if (onBoardingStep === 0 && dialogRef.current) {
      dialogRef.current.showModal(); // Open the dialog
      document.body.classList.add('dialog-open');
    }
  }, [onBoardingStep]);

  const handleClose = () => dialogRef.current && dialogRef.current.close();


  const steps=[
    {
      title: 'Welcome explorer, what are you looking for ?',
      subtitle: 'Walter will help you find water taps or toilets near you',
      choices: <>
      <button className="call-to-action-button">water</button>
      <button className="call-to-action-button">toilets</button>
    </>,
    },
    {
      title: 'Find it near you !',
      subtitle: 'Enable geolocation to see points of interest around you, we will NOT store this data',
      choices: <button className="call-to-action-button">enable geolocation</button>,
    },
    {
      title: 'Click any icon on the map to see details',
      subtitle: 'subtitles[2]',
      choices:  <button className="call-to-action-button" onClick={handleClose}>
      ok, got it !
    </button>,
    }
  ]

  const handleSkip = () =>{
    if(onBoardingStep<steps.length){
      setOnboardingStep(onBoardingStep + 1);
    }

  } 
  console.log(onBoardingStep);

  return (
    <dialog ref={dialogRef} id="onboarding-dialog">
      <div id="onboarding-dialog-content">
        <h1>{steps[onBoardingStep].title}</h1>
        <h4>{steps[onBoardingStep].subtitle}</h4>
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
    </dialog>
  );
}
