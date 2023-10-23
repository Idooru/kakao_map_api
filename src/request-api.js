const requestBackend = async () => {
  const myX = 127.02829779581167;
  const myY = 37.499855842189014;
  const myCoordinate = { myX, myY };

  const { data } = await axios
    .get(
      `http://localhost:8080/search-api?x=${myX}&y=${myY}&radius=1000&size=15&keyword=일식&page=1`,
    )
    .catch((err) => console.error(err));

  await displayPage(data, myCoordinate);
};

const displayPage = async (data, myCoordinate) => {
  const keyword = data.result.keyword;
  const shops = data.result.documents;

  const shopInfo = {
    shops,
    keyword: data.result.keyword,
  };

  displayShopInfo(shopInfo);
  displayMap(shops, myCoordinate);
};

const displayShopInfo = ({ shops, keyword }) => {
  const searchKeywordEle = document.querySelector("#search_keyword");
  searchKeywordEle.innerText = keyword;

  shops.forEach((item) => {
    const shopInfoListEle = document.querySelector(".shop_info_list");

    const shopInfoItemEle = document.createElement("div");
    shopInfoItemEle.className = "shop_info_item";

    const placeNameEle = document.createElement("p");
    placeNameEle.id = "place_name";
    placeNameEle.innerText = item.place_name;

    const middleItemEle = document.createElement("div");
    middleItemEle.className = "middle_item";

    const addressNameEle = document.createElement("p");
    addressNameEle.id = "address_name";
    addressNameEle.innerText = item.address_name;

    const distanceEle = document.createElement("p");
    distanceEle.id = "distance";
    distanceEle.innerText = `${item.distance}m`;

    const middleItemComposition = [addressNameEle, distanceEle];
    middleItemComposition.forEach((composition) =>
      middleItemEle.append(composition),
    );

    const underItemEle = document.createElement("div");
    underItemEle.className = "under_item";

    const phoneEle = document.createElement("p");
    phoneEle.id = "phone";
    phoneEle.innerText = item.phone;

    const detailPageEle = document.createElement("a");
    detailPageEle.id = "detail";
    detailPageEle.innerText = "상세 페이지";

    const underItemComposition = [phoneEle, detailPageEle];
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

const displayMap = (shops, myCoordinate) => {
  const { myX, myY } = myCoordinate;
  const { kakao } = window;

  const container = document.querySelector("#map");
  const options = {
    center: new kakao.maps.LatLng(myY, myX),
    level: 4,
  };

  const map = new kakao.maps.Map(container, options);

  displayMyCoordinate(map, myCoordinate);
  displayShopCoordinate(map, shops, myCoordinate);
};

const displayMyCoordinate = (map, { myX, myY }) => {
  const { kakao } = window;
  const imageSrc =
    "https://cdn.icon-icons.com/icons2/2104/PNG/512/map_location_icon_129048.png"; // 마커이미지의 주소입니다
  const imageSize = new kakao.maps.Size(50, 52); // 마커이미지의 크기입니다
  const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption,
  );

  const markerPosition = new kakao.maps.LatLng(myY, myX); // 마커가 표시될 위치입니다

  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage, // 마커이미지 설정
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
};

const displayShopCoordinate = (map, shops, myCoordinate) => {
  const { myX, myY } = myCoordinate;
  const { kakao } = window;

  shops.forEach((shop) => {
    const shopX = shop.x;
    const shopY = shop.y;

    const markerPosition = new kakao.maps.LatLng(shopY, shopX);

    const marker = new kakao.maps.Marker({ position: markerPosition });
    marker.setMap(map);
  });
};

window.addEventListener("load", requestBackend);
