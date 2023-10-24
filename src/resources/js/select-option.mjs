import { shopInfo } from "./request-api.mjs";
import { displayNearDistanceShop } from "./display.mjs";

const optionEle = document.querySelector("#option");

const swap = function() {
  const option = this.value;

  if (option === "distance") {
    alert("거리가 가까운 순으로 표시합니다.");

    const nearDistanceShop = shopInfo.shops.slice().sort((a, b) => a.distance - b.distance);
    displayNearDistanceShop(nearDistanceShop);
  } else if (option === "like") {
    alert("좋아요가 많은 순으로 표시합니다.");

    const manyLikesShop = shopInfo.shops.map();

    // displayPage(manyLikesShop, myCoordinate);
  }
};


optionEle.addEventListener("change", swap);


