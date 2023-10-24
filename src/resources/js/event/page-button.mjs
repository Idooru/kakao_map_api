import { requestApi } from "../backend/request-api.mjs";
import { getUrlParam } from "../util/get-url-param.mjs";
import { displayMap } from "../ui/display-map.mjs";
import { displayOtherShopList } from "../ui/display-other-shop-list.mjs";

const buttons = document.querySelectorAll(".shop_page button");

buttons.forEach((button) => {
  button.addEventListener("click", async function() {
    const selectEle = document.querySelector("#option");
    selectEle.children[0].selected = true;

    const page = this.value;

    localStorage.setItem("changedPage", page);

    const request = getUrlParam(page);

    const data = await requestApi(request);
    const shops = data.result.documents;

    const myCoordinate = JSON.parse(localStorage.getItem("myCoordinate"));

    displayOtherShopList(page, shops);
    displayMap(shops, myCoordinate);
  });
});
