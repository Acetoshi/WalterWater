import faucet from "../assets/markerIcons/faucet_icon.svg";
import toilet from '../assets/markerIcons/toilet_icon.svg'
import L from 'leaflet';

// give the source to your icon

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
