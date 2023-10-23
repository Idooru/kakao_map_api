import { requestBackend } from "./request-api.mjs";

const buttons = document.querySelectorAll(".shop_page button");

buttons.forEach((button) => {
  button.addEventListener("click", async function() {
    const page = this.value;
    await requestBackend(page);
  });
});

