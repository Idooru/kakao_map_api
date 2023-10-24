import { requestApi } from "../backend/request-api.mjs";
import { displayInitialShopList } from "../ui/display-initial-shop-list.mjs";
import { displayMap } from "../ui/display-map.mjs";
import { getUrlParam } from "../util/get-url-param.mjs";

const shopInfo = {
  shops: [],
  keyword: "",
};

const pageInit = async () => {
  const page = "1";
  localStorage.setItem("page", page);

  const request = getUrlParam(page);

  const data = await requestApi(request);
  const shops = data.result.documents;

  shopInfo.shops = shops;
  shopInfo.keyword = request.keyword;

  const myCoordinate = { myX: request.myX, myY: request.myY };

  localStorage.setItem("myCoordinate", JSON.stringify(myCoordinate));

  displayInitialShopList(shopInfo);
  displayMap(shops, myCoordinate);
};

window.addEventListener("load", pageInit);

export { shopInfo };