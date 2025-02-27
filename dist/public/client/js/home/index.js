const imgProductMain = document.querySelectorAll(
  "sl-animation[img-product-main]"
);
imgProductMain.forEach((img) => {
  const group = img.parentElement;
  group.addEventListener("mouseleave", () => {
    img.setAttribute("play", "");
    img.setAttribute("iterations", "1");
  });
});

const imgProductSub = document.querySelectorAll(
  "sl-animation[img-product-sub]"
);
imgProductSub.forEach((img) => {
  const group = img.parentElement;
  group.addEventListener("mouseenter", () => {
    img.setAttribute("play", "");
    img.setAttribute("iterations", "1");
  });
});
