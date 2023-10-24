import { displayPage } from "./display.mjs";

const getData = async ({ myX, myY, page, keyword }) => {
  const { data } = await axios
    .get(
      `http://localhost:8080/search-api?x=${myX}&y=${myY}&radius=200&size=15&keyword=${keyword}&page=${page}`,
    )
    .catch((err) => console.error(err));

  return data;
};

export const requestBackend = async (page) => {
  if (!page) {
    page = "1";
    localStorage.setItem("page", page);
  }

  const request = {
    myX: 127.02829779581167,
    myY: 37.499855842189014,
    page: page,
    keyword: "한식",
  };

  const data = await getData(request);
  const shops = data.result.documents;
  const shopInfo = {
    shops,
    keyword: request.keyword,
  };

  const myCoordinate = { myX: request.myX, myY: request.myY };
  displayPage(shopInfo, myCoordinate, page);

  return { shopInfo, myCoordinate };
};

export const { shopInfo, myCoordinate } = await requestBackend();
