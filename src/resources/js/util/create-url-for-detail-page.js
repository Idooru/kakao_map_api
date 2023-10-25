export const createUrlForDetailPage = (shop) => {
  const { place_name, phone, category_name, place_url, x, y } = shop;

  return `http://localhost:8082/src/index.html?place_name=${place_name}&phone=${phone}&category_name=${category_name}&place_url=${place_url}&x=${x}&y=${y}`;
};
