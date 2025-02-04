import faucet from '/markerIcons/faucet_icon.svg';
import toilet from '/markerIcons/toilet_icon.svg';
import food from '/markerIcons/food_icon.svg';
import walter from '/markerIcons/walter_icon_color.svg';
import search from '/markerIcons/search_icon.svg';
import capybara from '/markerIcons/capybara_icon.svg';
import L from 'leaflet';

// give the source to your icon

const iconFromSVG = (svgImg) => {
  const regularIconSize = {
    iconAnchor: [17, 48],
    popupAnchor: [0, -48],
    iconSize: [35, 48],
  };

  const zoom = 1.4

  const zoomedIconSize = {
    iconAnchor: [17 * zoom, 48 * zoom],
    popupAnchor: [0, -48 * zoom],
    iconSize: [35 * zoom, 48 * zoom],
  };

  return {
    regular: new L.icon({
      ...regularIconSize,
      iconUrl: svgImg,
      iconRetinaUrl: svgImg,
    }),
    zoomed: new L.icon({
      ...zoomedIconSize,
      iconUrl: svgImg,
      iconRetinaUrl: svgImg,
    }),
  };
};

export const faucetIcon = iconFromSVG(faucet);
export const toiletIcon = iconFromSVG(toilet);
export const foodIcon = iconFromSVG(food);
export const searchIcon = iconFromSVG(search);

export const walterIcon = new L.icon({
  iconUrl: walter,
  iconRetinaUrl: walter,
  iconAnchor: [28, 72],
  popupAnchor: [0, -72],
  iconSize: [56, 72],
});

export const capybaraIcon = new L.icon({
  iconUrl: capybara,
  iconRetinaUrl: capybara,
  iconAnchor: [28, 72],
  popupAnchor: [0, -72],
  iconSize: [56, 72],
});


export const iconMap = {
  drinking_water: faucetIcon,
  toilets: toiletIcon,
  restaurant: foodIcon,
};