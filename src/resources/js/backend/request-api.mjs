export const requestApi = async ({ myX, myY, page, keyword }) => {
  const { data } = await axios
    .get(
      `http://localhost:8080/search-api?x=${myX}&y=${myY}&radius=1000&size=15&keyword=${keyword}&page=${page}`,
    )
    .catch((err) => console.error(err));

  return data;
};
