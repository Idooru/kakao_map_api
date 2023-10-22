const requestBackend = async () => {
  const { data } = await axios
    .get(
      "http://localhost:8080/search-api?x=127.06283102249932&y=37.514322572335935&radius=1000&size=15&keyword=양식&page=1",
    )
    .catch((err) => console.error(err));

  await displayPage(data);
};

const displayPage = async (data) => {
  const { kakao } = window;

  const keyword = data.result.keyword;
  const shops = data.result.documents;

  const shopInfo = {
    shops,
    keyword: data.result.keyword,
  };

  displayShopInfo(shopInfo);
  displayMap(shops);
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
const displayMap = (shops) => {
  const container = document.querySelector("#map");
  const options = {
    center: new kakao.maps.LatLng(37.499855842189014, 127.02829779581167),
    level: 2,
  };
  const map = new kakao.maps.Map(container, options);
};

window.addEventListener("load", requestBackend);
