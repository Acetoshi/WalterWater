const faucet = "/markerIcons/faucet_icon.svg";
const toilet = "/markerIcons/toilet_icon.svg";
const food = "/markerIcons/food_icon.svg";
const walter = "/markerIcons/walter_icon_color.svg";
const capybara = "/markerIcons/capybara_icon.svg";
import L from "leaflet";

export let faucetIcon = new L.icon({
  iconUrl: faucet,
  iconRetinaUrl: faucet,
  iconAnchor: [17, 48],
  popupAnchor: [0, -48],
  iconSize: [35, 48],
});

export let toiletIcon = new L.icon({
  iconUrl: toilet,
  iconRetinaUrl: toilet,
  iconAnchor: [17, 48],
  popupAnchor: [0, -48],
  iconSize: [35, 48],
});

export let foodIcon = new L.icon({
  iconUrl: food,
  iconRetinaUrl: food,
  iconAnchor: [17, 48],
  popupAnchor: [0, -48],
  iconSize: [35, 48],
});

export let walterIcon = new L.icon({
  iconUrl: walter,
  iconRetinaUrl: walter,
  iconAnchor: [28, 72],
  popupAnchor: [0, -72],
  iconSize: [56, 72],
});

export let capybaraIcon = new L.icon({
  iconUrl: capybara,
  iconRetinaUrl: capybara,
  iconAnchor: [28, 72],
  popupAnchor: [0, -72],
  iconSize: [56, 72],
});
