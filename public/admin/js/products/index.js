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
                         text: `Bạn chắc muốn xóa ${listItem.length} sản phẩm đã chọn?`,
                         icon: "warning",
                         confirmButtonText: "Xóa",
                         confirmButtonColor: "#FFA09B",
                         cancelButtonColor: "#d33",
                    }).then((result) => {
                         if (result.isConfirmed) {
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
     const select = document.querySelector('sl-select[filter-status]')

     select.addEventListener('sl-change', () => {
          const url = new URL(location.href)
          if (select.value != '') url.searchParams.set('trang_thai', select.value)
          else url.searchParams.delete('trang_thai')
          location.href = url.href

     })
     const url = new URL(location.href)
     select.defaultValue = url.searchParams.get('trang_thai')

}
filterStatus()

const searchProduct = () => {
     const form = document.querySelector('[search-product]')
     form.addEventListener('submit', (event) => {
          event.preventDefault()
          console.log(event.srcElement.children[0].value)
          const content = event.srcElement.children[0].value
          const url = new URL(location.href)
          if (content != '') url.searchParams.set('tim_kiem', content)
          else url.searchParams.delete('tim_kiem')
          location.href = url.href
     })
     const url = new URL(location.href)

     const input = document.querySelector('[search-product] sl-input')
     input.value = url.searchParams.get('tim_kiem')

}
searchProduct()