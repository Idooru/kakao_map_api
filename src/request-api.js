const requestBackend = async () => {
  const { data } = await axios
    .get(
      "http://localhost:8082/search-api?x=127.06283102249932&y=37.514322572335935&radius=1000&size=10&keyword=중식&page=1",
    )
    .catch((err) => console.error(err));

  console.log(data);

  await drawKakaoMap(data);
};

const drawKakaoMap = async (data) => {
  const { kakao } = window;
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(37.499855842189014, 127.02829779581167),
    level: 3,
  };

  const map = new kakao.maps.Map(container, options);
};

window.addEventListener("load", requestBackend);