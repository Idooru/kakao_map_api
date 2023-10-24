import { displayMyCoordinate } from "./display-my-coordinate.mjs";
import { displayShopCoordinate } from "./display-shop-coordinate.mjs";

export const displayMap = (shops, myCoordinate) => {
  const { myX, myY } = myCoordinate;
  const { kakao } = window;

  const container = document.querySelector("#map");
  const options = {
    center: new kakao.maps.LatLng(myY, myX),
    level: 1,
  };

  const map = new kakao.maps.Map(container, options);

  displayMyCoordinate(map, myCoordinate);
  displayShopCoordinate(map, shops);
};
