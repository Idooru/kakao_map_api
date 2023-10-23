import { displayPage } from "./display.mjs";

const getData = async ({ myX, myY }) => {
  const { data } = await axios
    .get(
      `http://localhost:8080/search-api?x=${myX}&y=${myY}&radius=1000&size=15&keyword=일식&page=1`,
    )
    .catch((err) => console.error(err));

  return data;
};

const requestBackend = async () => {
  const myX = 127.02829779581167;
  const myY = 37.499855842189014;
  const myCoordinate = { myX, myY };

  const data = await getData(myCoordinate);

  const keyword = data.result.keyword;
  const shops = data.result.documents;

  const shopInfo = {
    shops,
    keyword,
  };

  displayPage(shopInfo, myCoordinate);
  return { shopInfo, myCoordinate };
};

export const { shopInfo, myCoordinate } = await requestBackend();
