export const getUrlParam = (page) => {
  const urlParams = new URLSearchParams(window.location.search);

  return {
    myX: urlParams.get("x"),
    myY: urlParams.get("y"),
    keyword: urlParams.get("keyword"),
    page,
  };
};