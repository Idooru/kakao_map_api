export const displayPage = (shopInfo, myCoordinate, page) => {
  const { shops } = shopInfo;

  if (localStorage.getItem("page") !== page) {
    displayOtherShopInfo(shopInfo, page);
  } else {
    displayEarlyShopInfo(shopInfo);
  }

  displayMap(shops, myCoordinate);
};

export const displayNearDistanceShop = (nearDistanceShop) => {
  displayChangeShop(nearDistanceShop);
};

const displayEarlyShopInfo = ({ shops, keyword }) => {
  console.log(shops);
  const searchKeywordEle = document.querySelector("#search_keyword");
  searchKeywordEle.innerText = keyword;

  shops.forEach((item) => {
    const shopInfoListEle = document.querySelector(".shop_info_list");

    const shopInfoItemEle = document.createElement("div");
    shopInfoItemEle.className = "shop_info_item";

    const placeNameEle = document.createElement("a");
    placeNameEle.id = "place_name";
    placeNameEle.innerText = item.place_name;
    placeNameEle.setAttribute("href", "#");

    const middleItemEle = document.createElement("div");
    middleItemEle.className = "middle_item";

    const addressNameEle = document.createElement("p");
    addressNameEle.id = "address_name";
    addressNameEle.innerText = item.address_name;

    const distanceEle = document.createElement("p");
    distanceEle.id = "distance";
    distanceEle.innerText = `${item.distance}m`;

    const middleItemComposition = [addressNameEle, distanceEle];
    middleItemComposition.forEach((composition) => middleItemEle.append(composition));

    const underItemEle = document.createElement("div");
    underItemEle.className = "under_item";

    const phoneEle = document.createElement("p");
    phoneEle.id = "phone";
    phoneEle.innerText = item.phone;

    const detailPageEle = document.createElement("a");
    detailPageEle.id = "detail";
    detailPageEle.innerText = "상세 페이지";
    detailPageEle.setAttribute("href", "#");

    const underItemComposition = [phoneEle, detailPageEle];
    underItemComposition.forEach((composition) => underItemEle.append(composition));

    const shopInfoComposition = [placeNameEle, middleItemEle, underItemEle];

    shopInfoComposition.forEach((composition) => shopInfoItemEle.append(composition));

    shopInfoListEle.appendChild(shopInfoItemEle);
  });
};

const displayOtherShopInfo = ({ shops }, page) => {
  localStorage.setItem("page", page);

  displayChangeShop(shops);
};

const displayChangeShop = (shops) => {
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
  });
};

const displayMap = (shops, myCoordinate) => {
  const { myX, myY } = myCoordinate;
  const { kakao } = window;

  const container = document.querySelector("#map");
  const options = {
    center: new kakao.maps.LatLng(myY, myX), level: 1,
  };

  const map = new kakao.maps.Map(container, options);

  displayMyCoordinate(map, myCoordinate);
  displayShopCoordinate(map, shops);
};

const displayMyCoordinate = (map, { myX, myY }) => {
  const { kakao } = window;
  const imageSrc = "https://cdn.icon-icons.com/icons2/2104/PNG/512/map_location_icon_129048.png"; // 마커이미지의 주소입니다
  const imageSize = new kakao.maps.Size(50, 52); // 마커이미지의 크기입니다
  const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  const markerPosition = new kakao.maps.LatLng(myY, myX); // 마커가 표시될 위치입니다

  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    position: markerPosition, image: markerImage, // 마커이미지 설정
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
};

const displayShopCoordinate = (map, shops) => {
  const { kakao } = window;

  shops.forEach((shop) => {
    const shopX = shop.x;
    const shopY = shop.y;

    const markerPosition = new kakao.maps.LatLng(shopY, shopX);

    const marker = new kakao.maps.Marker({ position: markerPosition });
    marker.setMap(map);
  });
};
