const filter = () => {
  const btn = document.querySelector("[btn-filter]");
  if (!btn) return;
  btn.addEventListener("click", () => {
    showLoader();
    const priceMin = document.querySelector("[filter-price-min]");
    const priceMax = document.querySelector("[filter-price-max]");
    if (!priceMin || !priceMax) return;
    const data = [];
    if (priceMin.value && priceMax.value) {
      const url = new URL(location.href);
      data.push({
        khoanggia: `${priceMin.value}-${priceMax.value}`,
      });
      // url.searchParams.set("khoanggia", `${priceMin.value}-${priceMax.value}`);
      // location.href = url.href;
    }

    const listColor = document.querySelector("[list-color]");
    const list = listColor.querySelector("input:checked");
    if (list) {
      data.push({
        mausac: list.getAttribute("slug"),
      });
    }

    const filterSize = document.querySelector("[filter-size]");
    if (filterSize) {
      data.push({
        kichthuoc: filterSize.value,
      });
    }

    if (data.length > 0) {
      const url = new URL(location.href);
      data.forEach((it) => {
        if (it.khoanggia) {
          url.searchParams.set("khoanggia", it.khoanggia);
        }
        if (it.mausac) {
          url.searchParams.set("mausac", it.mausac);
        }
        if (it.kichthuoc) {
          url.searchParams.set("kichthuoc", it.kichthuoc);
        }
      });
      location.href = url.href;
    }
  });
};

filter();

const khoanggia = () => {
  const url = new URL(location.href);
  const price = url.searchParams.get("khoanggia");
  if (!price) return;
  const priceMin = price.split("-")[0];
  const priceMax = price.split("-")[1];
  const priceMinEle = document.querySelector("[filter-price-min]");
  const priceMaxEle = document.querySelector("[filter-price-max]");
  if (!priceMinEle || !priceMaxEle) return;
  priceMinEle.value = priceMin;
  priceMaxEle.value = priceMax;
};

khoanggia();

const mausac = () => {
  const url = new URL(location.href);
  const color = url.searchParams.get("mausac");
  if (!color) return;
  const listColor = document.querySelector("[list-color]");
  const list = listColor.querySelectorAll("input");
  list.forEach((input) => {
    if (input.getAttribute("slug") == color) {
      input.checked = true;
    }
  });
};
mausac();

const resetFilter = () => {
  const btn = document.querySelector("[reset-filter]");
  if (!btn) return;
  btn.addEventListener("click", () => {
    showLoader();
    const url = new URL(location.href);
    if (url.searchParams.get("kichthuoc")) {
      url.searchParams.delete("kichthuoc");
    }
    if (url.searchParams.get("mausac")) {
      url.searchParams.delete("mausac");
    }
    if (url.searchParams.get("khoanggia")) {
      url.searchParams.delete("khoanggia");
    }
    location.href = url.href;
  });
};
resetFilter();

const pagination = () => {
  const pagination = document.querySelector("[pagination]");
  if (!pagination) return;
  const listPage = pagination.querySelectorAll("[trang]");
  if (listPage.length == 0) return;
  listPage.forEach((trang) => {
    trang.addEventListener("click", () => {
      showLoader();
      const url = new URL(location.href);
      url.searchParams.set("trang", trang.getAttribute("trang"));
      location.href = url.href;
    });
  });
};
pagination();

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

const sizeProduct = () => {
  const sizeCurrent = document.querySelector("[filter-size]");
  if (!sizeCurrent) return;
  const url = new URL(location.href);
  if (url.searchParams.get("kichthuoc")) {
    sizeCurrent.setAttribute("value", url.searchParams.get("kichthuoc"));
  }
};
sizeProduct();

const paginationSkipBack = () => {
  const btnBack = document.querySelector("[btn-pagination-back]");
  const btnSkip = document.querySelector("[btn-pagination-skip]");
  if (!btnBack) return;
  if (!btnSkip) return;
  btnBack.addEventListener("click", () => {
    const url = new URL(location.href);
    if (url.searchParams.get("trang") && url.searchParams.get("trang") > 1) {
      showLoader();
      url.searchParams.set(
        "trang",
        parseInt(url.searchParams.get("trang")) - 1
      );
      location.href = url.href;
    }
  });
  btnSkip.addEventListener("click", () => {
    const url = new URL(location.href);
    const totalPage = btnSkip.getAttribute("btn-pagination-skip");
    if (!totalPage) return;
    if (url.searchParams.get("trang")) {
      if (parseInt(url.searchParams.get("trang")) < parseInt(totalPage)) {
        showLoader();
        url.searchParams.set(
          "trang",
          parseInt(url.searchParams.get("trang")) + 1
        );
        location.href = url.href;
      }
    } else {
      url.searchParams.set("trang", 2);
      location.href = url.href;
    }
  });
};
paginationSkipBack();

const sortProduct = () => {
  const select = document.querySelector("[select-sort-product]");
  if (!select) return;
  document.addEventListener("DOMContentLoaded", () => {
    select.addEventListener("mouseenter", () => {
      select.show();
    });
    select.addEventListener("mouseleave", () => {
      select.hide();
    });
  });
  select.addEventListener("sl-change", () => {
    showLoader();
    const url = new URL(location.href);
    if (select.value) {
      url.searchParams.set("sapxep", select.value);
    } else url.searchParams.delete("sapxep");
    location.href = url.href;
  });
  const url = new URL(location.href);
  if (url.searchParams.get("sapxep")) {
    const list = select.querySelectorAll("*");
    if (list.length > 0) {
      list.forEach((it) => {
        if (it.getAttribute("value") == url.searchParams.get("sapxep"))
          select.setAttribute("value", url.searchParams.get("sapxep"));
      });
    }
  }

  // select.addEventListener("mouseout", () => {
  //   select.removeAttribute("open");
  // });
};
sortProduct();
