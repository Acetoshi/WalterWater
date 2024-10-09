import { useEffect, useState, useRef } from "react";
import "../styles/walter.css";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";

function Walter() {
  const checkFirstRender = useRef(true);
  const checkSecondRender = useRef(true);

  const { areaPOIs } = usePOIs();

  const [walterIsVisible, setWalterIsVisible] = useState(false);
  const [message, setMessage] = useState("");

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

  const walterSays = (something) => {
    setWalterIsVisible(true);
    setMessage(something);
    setTimeout(() => setWalterIsVisible(false), 3500);
  };

  const randomInt = (max)=>{
    return Math.floor(Math.random() * max)
  }

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
    if (areaPOIs.length === 0) {
      walterSays(
        failMessages[randomInt(failMessages.length-1)]
      );
    }
  }, [areaPOIs]);

  // au chargement
  useEffect(() => {
    // Déclencher l'animation après le montage du composant
    const firstLoad = localStorage.getItem("firstLoad");
    if (!firstLoad) {
      // First load, show the first element and set the flag in localStorage
      localStorage.setItem("firstLoad", "true");
    } else {
      // Subsequent loads, show a random element
      if(randomInt(5)===1) walterSays(tips[randomInt(tips.length-1)]);
    }
  }, []);

  return (
    <button
      className={`container-walter ${walterIsVisible ? "" : "hidden"}`}
      onClick={() => setWalterIsVisible(!walterIsVisible)}
    >
      <div className={`infos-walter ${walterIsVisible ? "" : "fade-in"}`}>
        <button
          role="button"
          className="close-walter"
          onClick={() => setWalterIsVisible(false)}
        >
          ignore <span className="icon-close" ></span>
        </button>
        <div className="container-infos">
          <p>{message}</p>
        </div>
      </div>
      <span className="icon-walter-color" >
        <span className="path1"></span>
        <span className="path2"></span>
        <span className="path3"></span>
        <span className="path4"></span>
        <span className="path5"></span>
        <span className="path6"></span>
      </span>
    </button>
  );
}

export default Walter;
