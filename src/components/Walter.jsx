import { useEffect, useState, useRef } from "react";
import "../styles/walter.css";
import { usePOIs } from "../hooks/usePOIs";
import LocationEnabler from "./map_UI/LocationEnabler/LocationEnabler";

function Walter() {
  const checkFirstRender = useRef(true);
  const checkSecondRender = useRef(true);

  const { POIs } = usePOIs();

  const [walterIsVisible, setWalterIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [importantMessage, setImportantMessage] = useState("");

  const failMessages = [
    "Well, that was a lovely little treasure hunt… for absolutely nothing!",
    "Nothing here but crickets ! Maybe try another place ?",
    "Searching for results? You might as well look for a needle in a haystack… blindfolded!",
    "Nothing here yet, but remember, even the best explorers faced a few empty maps before striking gold!",
  ];

  const tips = [
    "Welcome, dear explorer! Below are some buttons to quench your thirst during your jolly good adventure!!",
    "Drink like a fish, but stick to water, not beer. Dehydration isn’t exactly a laugh on a hike!",
    "A chocolate bar is lovely, but do throw in some dried fruit as well. Eating is fab; staying energised is even better!",
    "Don't forget your water bottle! You’re not a cactus; you’ll need some proper hydration!",
    "Relieve yourself away from the paths... unless you fancy the inquisitive stares of squirrels.",
    "Have a light snack before you head out; otherwise, you’ll be rolling down the trails instead of walking!",
    "Nuts are splendid for breaks: energising and crunchy! Chips, however, are a hard pass!",
    "Hydrate regularly, dear. This isn’t a race; it’s a leisurely hike, so no need to cart around a water tank!",
    "A decent sandwich is the secret to happiness on a hike. No need for fancy foie gras; a good old ham and butter will do nicely!",
    "Need a pick-me-up? Have a square of dark chocolate. In need of a breather? Sit back and soak in the scenery.",
    "Improvised loo? Dig a hole and cover it up afterwards. Bears appreciate a tidy environment, thank you very much!",
  ];

  const walterSays = (something, delay) => {
    setWalterIsVisible(true);
    setMessage(something);
    if (delay) setTimeout(() => setWalterIsVisible(false), delay);
  };

  const randomEntry = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  // needed to make walter say stuff from time to time
  useEffect(() => {
    setMessage(randomEntry(tips));

    // change message every 30 segonds
    const intervalId = setInterval(() => setMessage(randomEntry(tips)), 30000);

    return () => clearInterval(intervalId);
  }, []);

  //warn the user when his search didn't find anything
  useEffect(() => {
    // this is here to skip the first two renders
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
      return;
    } else if (checkSecondRender.current) {
      checkSecondRender.current = false;
      return;
    }
    if (POIs.length === 0) {
      walterSays(randomEntry(failMessages), 3500);
    }
  }, [POIs]);

  return (
    <div className={`walter-container ${walterIsVisible ? "" : "hidden"}`}>
      <button
        role="button"
        onClick={() => setWalterIsVisible(!walterIsVisible)}
      >
        <img
          id="walter"
          src="/icons/walter-color.svg"
          alt="adventurous walter with a big mustache, a walking stick and a hat"
        />
      </button>

      <div className={`walter-infotip ${walterIsVisible ? "" : "fade-out"}`}>
        <button
          role="button"
          className="button-close-infotip"
          onClick={() => setWalterIsVisible(false)}
        >
          ignore <span className="icon-close"></span>
        </button>
        <div className="container-infos">
          <p>{importantMessage || message}</p>
          <LocationEnabler
            setWalterIsVisible={setWalterIsVisible}
            setImportantMessage={setImportantMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Walter;
