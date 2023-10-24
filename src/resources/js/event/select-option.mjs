import { getUrlParam } from "../util/get-url-param.mjs";
import { requestApi } from "../backend/request-api.mjs";
import { displayOtherShopList } from "../ui/display-other-shop-list.mjs";

const optionEle = document.querySelector("#option");

const swap = async function() {
  const option = this.value;
  const changedPage = JSON.parse(localStorage.getItem("changedPage"));

  const request = getUrlParam(changedPage);
  const data = await requestApi(request);
  const shops = data.result.documents;


  if (option === "distance") {
    alert("거리가 가까운 순으로 표시합니다.");

    const nearDistanceShop = shops.slice().sort((a, b) => a.distance - b.distance);
    displayOtherShopList(changedPage, nearDistanceShop);
  } else if (option === "like") {
    alert("좋아요가 많은 순으로 표시합니다.");

    const manyLikesShop = shops.map();

    // displayPage(manyLikesShop, myCoordinate);
  }
};

optionEle.addEventListener("change", swap);


