import { createUrlForDetailPage } from "../util/create-url-for-detail-page.js";

export const displayOtherShopList = (page, shops) => {
  if (localStorage.getItem("page") === page) return;

  localStorage.setItem("page", page);
  shops.forEach((shop, idx) => {
    const shopInfoListEle = document.querySelector(".shop_info_list");
    const shops = Array.from(shopInfoListEle.children);

    const placeNameEle = shops[idx].querySelector("#place_name");
    const addressNameEle = shops[idx].querySelector("#address_name");
    const distanceEle = shops[idx].querySelector("#distance");
    const phoneEle = shops[idx].querySelector("#phone");
    const detailEle = shops[idx].querySelector("#detail");

    placeNameEle.innerText = shop.place_name;
    addressNameEle.innerText = shop.address_name;
    distanceEle.innerText = shop.distance + "m";
    phoneEle.innerText = shop.phone;
    detailEle.innerText = "상세 페이지";
    const url = createUrlForDetailPage(shop);
    detailEle.setAttribute("href", url);
  });
};
