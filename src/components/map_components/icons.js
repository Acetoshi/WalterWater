import faucet from "/markerIcons/faucet_icon.svg";
import toilet from "/markerIcons/toilet_icon.svg";
import food from "/markerIcons/food_icon.svg";
import walter from "/markerIcons/walter_icon_color.svg";
import capybara from "/markerIcons/capybara_icon.svg"
import L from "leaflet";

// give the source to your icon

export const faucetIcon = new L.icon({
  iconUrl: faucet,
  iconRetinaUrl: faucet,
  iconAnchor: [17, 48],
  popupAnchor: [0, -48],
  iconSize: [35, 48],
});

export const toiletIcon = new L.icon({
  iconUrl: toilet,
  iconRetinaUrl: toilet,
  iconAnchor: [17, 48],
  popupAnchor: [0, -48],
  iconSize: [35, 48],
});

export const foodIcon = new L.icon({
  iconUrl: food,
  iconRetinaUrl: food,
  iconAnchor: [17, 48],
  popupAnchor: [0, -48],
  iconSize: [35, 48],
});

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

