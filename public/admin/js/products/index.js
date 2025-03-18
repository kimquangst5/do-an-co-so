const deleteProduct = () => {
  const listItem = document.querySelectorAll("tr.group");
  if (listItem.length <= 0) return;
  listItem.forEach((it) => {
    const btnTrash = it.querySelector("button[trash]");
    const name = it.querySelector("[name-product]");
    btnTrash.addEventListener("click", () => {
      const link = btnTrash.getAttribute("trash");
      if (!link) return;
      Swal.fire({
        showCancelButton: true,
        title: `Xóa sản phẩm?`,
        text: `Bạn chắc muốn xóa sản phẩm ${name.innerHTML}?`,
        icon: "warning",
        confirmButtonText: "Xóa",
        confirmButtonColor: "#FFA09B",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          showLoader();
          axios.patch(link).then((res) => {
            if (res.status == 200) {
              localStorage.setItem(
                "alert-success",
                JSON.stringify({
                  title: "Xóa sản phẩm thành công!",
                  icon: "success",
                })
              );
              location.reload();
            }
          });
        }
      });
    });
  });
};
deleteProduct();

const changeStatus = () => {
  const list = document.querySelectorAll("[change-status]");
  if (list.length == 0) return;
  list.forEach((btn) => {
    btn.addEventListener("click", () => {
      showLoader();
      const status = btn.getAttribute("variant");
      const data = {};
      if (status == "success") {
        data.status = "inactive";
      } else {
        data.status = "active";
      }
      const link = btn.getAttribute("change-status");
      if (data.status && link) {
        axios.patch(link, data).then((res) => {
          if (res.status == 200) {
            localStorage.setItem(
              "alert-success",
              JSON.stringify({
                title: "Cập nhật trang thái thành công!",
                icon: "success",
              })
            );
            location.reload();
          }
        });
      }
    });
  });
};
changeStatus();

const changeStatusMany = async () => {
  const checkAll = document.querySelector("thead tr th sl-checkbox");
  if (!checkAll) return;
  checkAll.addEventListener("click", () => {
    const listCheckItem = document.querySelectorAll("tbody tr td sl-checkbox");

    if (listCheckItem.length == 0) return;
    listCheckItem.forEach((item) => {
      item.checked = checkAll.checked;
    });
  });

  const listCheckItem = document.querySelectorAll("tbody tr td sl-checkbox");
  if (listCheckItem.length == 0) return;
  listCheckItem.forEach((it) => {
    it.addEventListener("click", () => {
      const itemChecked = Array.from(listCheckItem).filter(
        (item) => item.checked
      );
      if (itemChecked.length == listCheckItem.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }
    });
  });

  const dropdown = document.querySelector("sl-dropdown[link]");
  if (!dropdown) return;
  const link = dropdown.getAttribute("link");
  if (!link) return;

  dropdown.addEventListener("sl-select", (e) => {
    const value = e.detail.item.value;
    const listItem = document.querySelectorAll("tbody tr td sl-checkbox");
    if (listItem.length == 0) return;
    const itemChecked = Array.from(listItem).filter((it) => it.checked);
    if (itemChecked.length == 0) {
      localStorage.setItem(
        "alert-error",
        JSON.stringify({
          title: "Vui lòng chọn ít nhất 1 sản phẩm!",
          icon: "error",
        })
      );
      showAlertError();
    } else {
      if (value == "trash-product") {
        Swal.fire({
          showCancelButton: true,
          title: `Xóa sản phẩm?`,
          text: `Bạn chắc muốn xóa ${itemChecked.length} sản phẩm đã chọn?`,
          icon: "warning",
          confirmButtonText: "Xóa",
          confirmButtonColor: "#FFA09B",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            showLoader();
            const data = {
              status: value,
              id: [],
            };
            itemChecked.forEach((check) => {
              data.id.push(check.value);
            });

            axios.patch(link, data).then((res) => {
              if (res.status == 200) {
                localStorage.setItem(
                  "alert-error",
                  JSON.stringify({
                    title: "Cập nhật thành công!",
                    icon: "success",
                  })
                );
                location.reload();
              }
            });
          }
        });
      } else {
        Swal.fire({
          showCancelButton: true,
          title: `Cập nhật trạng thái?`,
          text: `Bạn muốn cập nhật trạng thái của ${listItem.length} sản phẩm đã chọn?`,
          icon: "warning",
          confirmButtonText: "Cập nhật",
          confirmButtonColor: "#FFA09B",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            showLoader();
            const data = {
              status: value,
              id: [],
            };
            itemChecked.forEach((check) => {
              data.id.push(check.value);
            });

            axios.patch(link, data).then((res) => {
              if (res.status == 200) {
                localStorage.setItem(
                  "alert-error",
                  JSON.stringify({
                    title: "Cập nhật thành công!",
                    icon: "success",
                  })
                );
                location.reload();
              }
            });
          }
        });
      }
    }
  });
};

changeStatusMany();

const filterStatus = () => {
  const select = document.querySelector("sl-select[filter-status]");

  select.addEventListener("sl-change", () => {
    const url = new URL(location.href);
    if (select.value != "") url.searchParams.set("trang_thai", select.value);
    else url.searchParams.delete("trang_thai");
    location.href = url.href;
  });
  const url = new URL(location.href);
  select.defaultValue = url.searchParams.get("trang_thai");
};
filterStatus();

const searchProduct = () => {
  const form = document.querySelector("[search-product]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.srcElement.children[0].value);
    const content = event.srcElement.children[0].value;
    const url = new URL(location.href);
    if (content != "") url.searchParams.set("tim_kiem", content);
    else url.searchParams.delete("tim_kiem");
    location.href = url.href;
  });
  const url = new URL(location.href);

  const input = document.querySelector("[search-product] sl-input");
  input.value = url.searchParams.get("tim_kiem");
};
searchProduct();

const pagination = () => {
  const btnTrang = document.querySelectorAll("[trang]");
  if (!btnTrang || btnTrang.length == 0) return;
  btnTrang.forEach((trang) => {
    trang.addEventListener("click", () => {
      showLoader();
      const url = new URL(location.href);
      url.searchParams.set("trang", trang.getAttribute("trang"));
      location.href = url.href;
    });
  });
  const url = new URL(location.href);
  if (url.searchParams.get("trang")) {
    const btnTrang = document.querySelector(
      `[trang = '${url.searchParams.get("trang")}']`
    );
    btnTrang.classList.add("bg-[#0EA5E9]", "text-[white]");
  } else
    document
    .querySelector(`[trang = '1']`)
    .classList.add("bg-[#0EA5E9]", "text-[white]");
  const trangTruoc = document.querySelector("[trang-truoc]");
  if (
    url.searchParams.get("trang") &&
    parseInt(url.searchParams.get("trang")) > 1
  ) {
    trangTruoc.addEventListener("click", () => {
      showLoader();
      url.searchParams.set(
        "trang",
        parseInt(url.searchParams.get("trang")) - 1
      );
      location.href = url.href;
    });
  }

  const trangDau = document.querySelector("[trang-dau]");
  if (
    url.searchParams.get("trang") &&
    parseInt(url.searchParams.get("trang")) > 1
  ) {
    trangDau.addEventListener("click", () => {
      showLoader();
      url.searchParams.set("trang", 1);
      location.href = url.href;
    });
  }

  const trangSau = document.querySelector("[trang-sau]");
  trangSau.addEventListener("click", () => {
    const url = new URL(location.href);
    if (!url.searchParams.get("trang")) {
      showLoader();
      url.searchParams.set("trang", 2);
      location.href = url.href;
    } else {
      if (
        parseInt(url.searchParams.get("trang")) <
        parseInt(trangSau.getAttribute("trang-sau"))
      ) {
        showLoader();
        url.searchParams.set(
          "trang",
          parseInt(url.searchParams.get("trang")) + 1
        );
        location.href = url.href;
      }
    }
  });

  const trangCuoi = document.querySelector("[trang-cuoi]");
  trangCuoi.addEventListener("click", () => {
    const url = new URL(location.href);
    if (!url.searchParams.get("trang")) {
      showLoader();
      url.searchParams.set(
        "trang",
        parseInt(trangCuoi.getAttribute("trang-cuoi"))
      );
      location.href = url.href;
    } else {
      if (
        parseInt(url.searchParams.get("trang")) <
        parseInt(trangCuoi.getAttribute("trang-cuoi"))
      ) {
        showLoader();
        url.searchParams.set(
          "trang",
          parseInt(trangCuoi.getAttribute("trang-cuoi"))
        );
        location.href = url.href;
      }
    }
  });
};
pagination();

const soTrang = () => {
  const select = document.querySelector("[so-trang]");

  if (!select) return;
  select.addEventListener("sl-change", () => {
    showLoader();
    const url = new URL(location.href);
    url.searchParams.set("sotrang", select.value);
    location.href = url.href;
  });

  const url = new URL(location.href)
  if (url.searchParams.get('sotrang')) {
    select.defaultValue = url.searchParams.get('sotrang')

  }
};

soTrang();