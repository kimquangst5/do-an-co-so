const listColors = document.querySelectorAll("input[name='color']");
const sizeProduct = document.querySelector("sl-radio-group[size-product]");

listColors.forEach((color) => {
  color.addEventListener("click", () => {
    // showLoader();
    const colorId = color.getAttribute("color-id");
    if (colorId) {
      axios
        .put(`${location.href}/getSize`, {
          color: colorId,
        })
        .then((res) => {
          // if (res.status == 200) {
          //   console.log("ok");
          // }
          if (
            res.status == 200 &&
            res.data.listSizes &&
            res.data.listSizes.length > 0
          ) {
            const sizeP = document.querySelector(
              "sl-radio-group[size-product]"
            );
            if (!res.data.listSizes.find((size) => size == sizeP.value)) {
              sizeP.value = "";
            }
            const listSizeBtn = sizeP.querySelectorAll("sl-radio-button");
            listSizeBtn.forEach((btn) => {
              if (!res.data.listSizes.find((size) => size == btn.value)) {
                btn.disabled = true;
              } else {
                btn.disabled = false;
                if (btn.checked == true) {
                  btn.click();
                } else {
                  btn.checked = false;
                }
              }
            });
          }
        });
    }
  });
});

const sizeParent = document.querySelector("[size-product]");
const listSize = sizeParent.querySelectorAll("sl-radio-button");
listSize.forEach((size) => {
  size.addEventListener("click", () => {
    const colorChecked = document.querySelector(
      "[color-product] input:checked"
    );
    if (colorChecked) {
      const colorId = colorChecked.getAttribute("color-id");
      axios
        .post(`${location.href}/getItem`, {
          color: colorId,
          size: size.value,
        })
        .then((res) => {
          const item = res.data.productItem;
          if (item) {
            const priceNew = document.querySelector("[price-new]");
            const price = document.querySelector("[product-price]");
            const discount = document.querySelector("[discount-product]");
            priceNew.classList.remove("hidden");
            priceNew.value = item.priceNew;
            if (item.discount == 0) {
              price.classList.add("hidden");
              discount.classList.add("hidden");
            } else {
              price.value = item.price;
              discount.innerHTML = `-${item.discount}%`;
              price.classList.remove("hidden");
              discount.classList.remove("hidden");
            }
            const btnCart = document.querySelector("[add-cart]");
            if (item.quantity == 0) {
              btnCart.innerHTML = "HẾT HÀNG";
              btnCart.setAttribute("disabled", "");
            } else {
              btnCart.innerHTML = "Thêm vào giỏ hàng";
              btnCart.removeAttribute("disabled");
            }
          }
        });
    }
  });
});

const priceNew = document.querySelector("sl-format-number[price-new]");
const price = document.querySelector("[product-price]");
const discount = document.querySelector("[discount-product]");
if (priceNew && !priceNew.value) {
  priceNew.classList.add("hidden");
  price.classList.add("hidden");
  discount.classList.add("hidden");
}

{
  const carousel = document.querySelector(".carousel-thumbnails");
  const scroller = document.querySelector(".thumbnails__scroller");
  const thumbnails = document.querySelectorAll(".thumbnails__image");
  if (scroller) {
    scroller.addEventListener("click", (e) => {
      const target = e.target;

      if (target.matches(".thumbnails__image")) {
        const index = [...thumbnails].indexOf(target);
        carousel.goToSlide(index);
      }
    });
  }
  if (carousel) {
    carousel.addEventListener("sl-slide-change", (e) => {
      const slideIndex = e.detail.index;

      [...thumbnails].forEach((thumb, i) => {
        thumb.classList.toggle("active", i === slideIndex);
        if (i === slideIndex) {
          thumb.scrollIntoView({
            block: "nearest",
          });
        }
      });
    });
  }
}

const comment = () => {
  const btnComment = document.querySelector("[btn-comment]");
  if (!btnComment) return;
  btnComment.addEventListener("click", () => {
    const link = btnComment.getAttribute("btn-comment");
    if (!link) return;
    const rating = document.querySelector("sl-rating");
    const comment = document.querySelector("sl-textarea");
    axios
      .post(link, {
        rating: rating.value,
        content: comment.value,
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem(
            "alert-success",
            JSON.stringify({
              title: "Đánh giá sản phẩm thành công!",
              icon: "success",
            })
          );
          rating.value = 0;
          comment.value = "";
          showAlertSuccess();
        }
      })
      .catch((error) => {
        localStorage.setItem(
          "alert-error",
          JSON.stringify({
            title: error.response.data.message,
            icon: "warning",
          })
        );
        showAlertError();
      });
  });
};

comment();

const addCart = () => {
  const btnAdd = document.querySelector("[add-cart]");
  if (!btnAdd) return;
  btnAdd.addEventListener("click", () => {
    const link = btnAdd.getAttribute("add-cart");
    if (!link) return;
    const colorElement = document.querySelector(
      "[color-product] input:checked"
    );
    if (!colorElement) {
      localStorage.setItem(
        "alert-error",
        JSON.stringify({
          title: "Vui lòng chọn màu sắc",
          icon: "warning",
        })
      );
      showAlertError();
      return;
    }
    const colorId = colorElement.getAttribute("color-id");
    const sizeId = document.querySelector("[size-product]").value;
    if (!sizeId) {
      localStorage.setItem(
        "alert-error",
        JSON.stringify({
          title: "Vui lòng chọn kích thước",
          icon: "warning",
        })
      );
      showAlertError();
      return;
    }
    const quantity = document.querySelector("[quantity-product]");
    if (!quantity.innerHTML || quantity.innerHTML < 1) {
      localStorage.setItem(
        "alert-error",
        JSON.stringify({
          title: "Số lượng không hợp lệ!",
          icon: "warning",
        })
      );
      showAlertError();
    }
    showLoader();
    axios
      .post(link, {
        colorId: colorId,
        sizeId: sizeId,
        quantity: parseInt(quantity.innerHTML),
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem(
            "alert-error",
            JSON.stringify({
              title: "Thêm vào giỏ hàng thành công!",
              icon: "success",
            })
          );
          const redirect = btnAdd.getAttribute("redirect");
          location.href = redirect;
        }
      })
      .catch((error) => {
        closeLoader();
        localStorage.setItem(
          "alert-error",
          JSON.stringify({
            title: error.response.data.message,
            icon: "warning",
          })
        );
        showAlertError();
      });
  });
};

addCart();
