import { createUrlForDetailPage } from "../util/create-url-for-detail-page.js";

export const displayInitialShopList = ({ shops, keyword }) => {
  const searchKeywordEle = document.querySelector("#search_keyword");
  searchKeywordEle.innerText = keyword;

  shops.forEach((shop) => {
    const shopInfoListEle = document.querySelector(".shop_info_list");

    const shopInfoItemEle = document.createElement("div");
    shopInfoItemEle.className = "shop_info_item";

    const placeNameEle = document.createElement("a");
    placeNameEle.id = "place_name";
    placeNameEle.innerText = shop.place_name;
    placeNameEle.setAttribute("href", "#");

    const middleItemEle = document.createElement("div");
    middleItemEle.className = "middle_item";

    const addressNameEle = document.createElement("p");
    addressNameEle.id = "address_name";
    addressNameEle.innerText = shop.address_name;

    const distanceEle = document.createElement("p");
    distanceEle.id = "distance";
    distanceEle.innerText = `${shop.distance}m`;

    const middleItemComposition = [addressNameEle, distanceEle];
    middleItemComposition.forEach((composition) =>
      middleItemEle.append(composition),
    );

    const underItemEle = document.createElement("div");
    underItemEle.className = "under_item";

    const phoneEle = document.createElement("p");
    phoneEle.id = "phone";
    phoneEle.innerText = shop.phone;

    const detailEle = document.createElement("a");

    detailEle.id = "detail";
    detailEle.innerText = "상세 페이지";
    const url = createUrlForDetailPage(shop);
    detailEle.setAttribute("href", url);

    const underItemComposition = [phoneEle, detailEle];
    underItemComposition.forEach((composition) =>
      underItemEle.append(composition),
    );

    const shopInfoComposition = [placeNameEle, middleItemEle, underItemEle];

    shopInfoComposition.forEach((composition) =>
      shopInfoItemEle.append(composition),
    );

    shopInfoListEle.appendChild(shopInfoItemEle);
  });
};
