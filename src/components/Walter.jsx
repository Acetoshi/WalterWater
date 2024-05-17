import { useEffect, useState } from "react";
import "../styles/walter.css";

function Walter() {
  const conseilsRandonneur = [
    {
      id: 0,
      conseil:
        "Bienvenue cher(e) explorateur, Tu trouveras via les boutons ci-dessous de quoi te désalterer durant <br>ton incroyable périple !!",
    },
    {
      id: 1,
      conseil:
        "Buvez comme un poisson, mais de l'eau, pas de la bière. La déshydratation, c'est pas très fun en rando!",
    },
    {
      id: 2,
      conseil:
        "Une barre de chocolat, c'est bien, mais pensez aussi aux fruits secs. Manger, c'est bien; rester énergisé, c'est mieux!",
    },
    {
      id: 3,
      conseil:
        "N’oubliez pas votre gourde! Vous n'êtes pas un cactus, vous avez besoin d’eau!",
    },
    {
      id: 4,
      conseil:
        "Faites pipi loin des sentiers... à moins d'aimer les regards curieux des écureuils.",
    },
    {
      id: 5,
      conseil:
        "Mangez léger avant de partir, sinon vous allez rouler sur les sentiers au lieu de marcher.",
    },
    {
      id: 6,
      conseil:
        "Des noix, c'est parfait pour les pauses: énergisant et croquant! Par contre, les chips, c'est non!",
    },
    {
      id: 7,
      conseil:
        "Hydratez-vous régulièrement. Ce n'est pas une course, c'est une rando, pas besoin d'une citerne non plus!",
    },
    {
      id: 8,
      conseil:
        "Un bon sandwich, c'est la clé du bonheur en rando. Pas besoin de foie gras, un jambon-beurre suffit!",
    },
    {
      id: 9,
      conseil:
        "Besoin d’un coup de boost ? Un carré de chocolat noir. Besoin de repos ? Asseyez-vous, admirez le paysage.",
    },
    {
      id: 10,
      conseil:
        "Toilettes improvisées ? Creusez un trou et couvrez-le après. Les ours aiment la nature propre, merci!",
    },
  ];

  // console.log('%c⧭', 'color: #ff0000', adviseHiking[0]);

  const [isVisible, setIsVisible] = useState(false);
  const [displayWalterInfos, setDisplayWalterInfos] = useState(false);

  const [conseil, setConseil] = useState("");
  // const [randomAdvise, setRandomAdvise] = useState(adviseHiking[0]);

  // toggle bulle Walter
  const handleWalterInfos = () => {
    setDisplayWalterInfos(true);
  };

  // toggle bulle Wal
  const handleWalter = () => {
    setDisplayWalterInfos(false);
  };

  // random number
  function getNumberRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // console.log('%c⧭ getNumberRandom', 'color: #00e600', getNumberRandom(0, adviseHiking.length));

  // au chargement
  useEffect(() => {
    //affichage bulle infos
    setIsVisible(true);

    // Déclencher l'animation après le montage du composant
    const firstLoad = localStorage.getItem("firstLoad");
    if (!firstLoad) {
      // First load, show the first element and set the flag in localStorage
      setConseil(conseilsRandonneur[0].conseil);
      localStorage.setItem("firstLoad", "true");
    } else {
      // Subsequent loads, show a random element
      const randomIndex = Math.floor(Math.random() * conseilsRandonneur.length);
      setConseil(conseilsRandonneur[randomIndex].conseil);
    }
  }, []);

  return (
    <div
      className={`container-walter ${displayWalterInfos ? "hide-walter" : ""}`}
    >
      <div className={`infos-walter ${displayWalterInfos ? "fade-in" : ""}`}>
        <button className="close-walter" onClick={handleWalterInfos}>
          <span className="icon-close" aria-label="Fermer modal"></span>
        </button>
        <div className="container-infos">
          <p>{conseil}</p>
        </div>
      </div>
      <span
        className="icon-walter-color"
        aria-label="Walter la mascotte"
        onClick={handleWalter}
      >
        <span className="path1"></span>
        <span className="path2"></span>
        <span className="path3"></span>
        <span className="path4"></span>
        <span className="path5"></span>
        <span className="path6"></span>
      </span>
    </div>
  );
}

export default Walter;
