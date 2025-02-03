document
     .querySelector("[data-upload-id = 'upload-image-preview-main']")
     .addEventListener("change", () => {
          const selectedImageCount = previewImageMain.cachedFileArray.length;
          const button = document.querySelector(
               "[data-upload-id = 'upload-image-preview-main'] span.input-visible"
          );
          button.innerHTML = `Thêm hình ảnh (${selectedImageCount}/2)`; // Cập nhật nội dung nút
     });
document
     .querySelector("[data-upload-id = 'upload-image-preview-sub']")
     .addEventListener("change", () => {
          const selectedImageCount = previewImageSub.cachedFileArray.length;
          const button = document.querySelector(
               "[data-upload-id = 'upload-image-preview-sub'] span.input-visible"
          );
          button.innerHTML = `Thêm hình ảnh (${selectedImageCount}/10)`; // Cập nhật nội dung nút
     });
const previewImageMain = new FileUploadWithPreview.FileUploadWithPreview(
     "upload-image-preview-main", {
          multiple: true,
          maxFileCount: 2,
          text: {
               label: "Ảnh bìa",
               chooseFile: "Thêm hình ảnh (0/2)", // Nút chọn file (chính)
               browse: "Duyệt ảnh",
               // selectedCount: "ảnh được chọn",
          },
          accept: "image/*",
     }
);

const previewImageSub = new FileUploadWithPreview.FileUploadWithPreview(
     "upload-image-preview-sub", {
          multiple: true,
          maxFileCount: 10,
          text: {
               label: "Hình ảnh sản phẩm",
               chooseFile: "Thêm hình ảnh (0/10)", // Nút chọn file (chính)
               browse: "Duyệt ảnh", // Nút duyệt file
               selectedCount: "ảnh được chọn (Tối đa 10 ảnh)",
          },
          accept: "image/*",
     }
);

window.addEventListener(
     FileUploadWithPreview.Events.IMAGE_MULTI_ITEM_CLICKED,
     (e) => {
          const file = e.detail.file;
          const imageElement = document.createElement("img");
          imageElement.src = URL.createObjectURL(file);
          const viewerContainer = document.createElement("div");
          viewerContainer.appendChild(imageElement);
          document.body.appendChild(viewerContainer);

          const viewer = new Viewer(imageElement, {
               hidden: () => {
                    document.body.removeChild(viewerContainer);
                    viewer.destroy();
               },
          });

          viewer.show();
     }
);

const BAT_SU_KIEN_THAY_DOI_GIA = () => {
     const listCol = document.querySelectorAll("[parent-variant] tr");
     if (!listCol) return;
     listCol.forEach((it) => {
          const container = it.querySelector(".format-number-overview");
          const formatter = it.querySelector("sl-format-number");
          const input = container.querySelector("sl-input");
          const discount = it.querySelector("sl-input[discount]");
          input.addEventListener(
               "sl-input",
               () =>
               (formatter.value =
                    parseInt(input.value) -
                    (parseInt(input.value) * parseInt(discount.value)) / 100 || 0)
          );
          discount.addEventListener("sl-input", () => {
               discount.value = parseInt(discount.value);
               if (!discount.value) discount.value = 0;
               formatter.value =
                    parseInt(input.value) -
                    parseInt(input.value) * (Math.abs(parseInt(discount.value)) / 100) ||
                    0;
          });
     });
};

const main = async () => {
     const btnCreateProduct = document.querySelector("[btn-create-new-product]");
     const link = btnCreateProduct.getAttribute("btn-create-new-product");
     if (!btnCreateProduct) return;
     BAT_SU_KIEN_THAY_DOI_GIA();
     btnCreateProduct.addEventListener("click", async () => {
          showLoader();
          updateFileOrder();
          const formData = new FormData();

          previewImageMain.cachedFileArray.forEach((it) => {
               formData.append("images_main", it);
          });
          previewImageSub.cachedFileArray.forEach((it) => {
               formData.append("images_sub", it);
          });

          const name = document.querySelector("sl-input[name='name-product']");
          const categoryId = document.querySelector(
               "sl-select[name='category-parent']"
          );
          const position = document.querySelector("sl-input[name='position']");
          const status = document.querySelector(
               "sl-radio-group[name='status-product']"
          );
          const featured = document.querySelector("sl-radio-group[name='featured']");

          formData.append("categoryId", JSON.stringify(categoryId.value));
          formData.append("name", name.value);
          formData.append("position", position.value);
          formData.append("status", status.value);
          formData.append("featured", featured.value);
          formData.append("descriptionShort", tinymce.get("desc-short").getContent());
          formData.append("description", tinymce.get("desc").getContent());

          {
               const variant = await dataSendBackEndVariant();
               formData.append("bien_the", JSON.stringify(variant));
          }
          if (name.value && categoryId.value)
               axios.post(link, formData).then((res) => {
                    if (res.status == 200 && res.data.code == 200) {
                         localStorage.setItem(
                              "alert-success",
                              JSON.stringify({
                                   title: "Thêm sản phẩm thành công!",
                                   icon: "success",
                              })
                         );
                         location.reload();
                    } else if (res.data.code == 503) {
                         localStorage.setItem(
                              "alert-success",
                              JSON.stringify({
                                   title: "Vui lòng cấp quyền!",
                                   icon: "error",
                              })
                         );
                         location.reload();
                    }
               });
     });
};

main();

const btnNewVariant = async () => {
     const btn = document.querySelector("[btn-create-new-variant]");
     if (!btn) return;
     const parentVariant = document.querySelector("[parent-variant]");
     const trRoot = document.querySelector("tbody tr");
     btn.addEventListener("click", () => {
          const tr = document.createElement("tr");
          tr.innerHTML = trRoot.innerHTML; {
               const icon = tr.querySelector("sl-icon[name='trash']");
               icon.addEventListener("click", () => parentVariant.removeChild(tr));
          }

          {
               // BẮT SỰ KIỆN THAY ĐỔI GIÁ
               const container = tr.querySelector(".format-number-overview");
               const formatter = tr.querySelector("sl-format-number");
               const input = container.querySelector("sl-input");
               const discount = tr.querySelector("sl-input[discount]");
               input.addEventListener(
                    "sl-input",
                    () =>
                    (formatter.value =
                         parseInt(input.value) -
                         (parseInt(input.value) * parseInt(discount.value)) / 100 || 0)
               );
               discount.addEventListener("sl-input", () => {
                    discount.value = parseInt(discount.value);
                    if (!discount.value) discount.value = 0;
                    formatter.value =
                         parseInt(input.value) -
                         parseInt(input.value) *
                         (Math.abs(parseInt(discount.value)) / 100) || 0;
               });
          }

          parentVariant.appendChild(tr);
     });
     const listCol = document.querySelectorAll("tbody tr");
     if (listCol.length > 0) {
          listCol.forEach((it) => {
               const icon = it.querySelector("sl-icon[name='trash']");

               icon.addEventListener("click", () => {
                    parentVariant.removeChild(it);
               });
          });
     }
};

btnNewVariant();

const dataSendBackEndVariant = async () => {
     const listCol = document.querySelectorAll("[parent-variant] tr");
     if (!listCol) return;
     const result = [];
     listCol.forEach((it) => {
          const status = it.querySelector("sl-switch").checked;
          const color = it.querySelector("sl-select[name='color']");
          const size = it.querySelector("sl-select[name='size']");
          const price = it.querySelector("sl-input[name='price']");
          const discount = it.querySelector("sl-input[name='discount']");
          const quantity = it.querySelector("sl-input[name='quantity']");
          if (color.value && size.value && price && price.value) {
               const data = {
                    status: status == true ? "active" : "inactive",
                    color: color.value,
                    size: size.value,
                    price: parseInt(price.value),
                    discount: discount.value ? parseInt(discount.value) : 0,
                    quantity: quantity.value ? parseInt(quantity.value) : 0,
               };
               result.push(data);
          }
     });
     return result;
};

const list = document.querySelectorAll(".image-preview");
list.forEach((it, i) => {
     it.setAttribute("id", `id-item-${i + 1}`);
});
const containers = [
     document.getElementById("id-item-1"),
     document.getElementById("id-item-2"),
];
dragula(containers);

const updateFileOrder = () => {
     containers.forEach((container, index) => {
          const updatedFiles = Array.from(container.children).map((child) => {
               const fileId = child.getAttribute("data-upload-name");
               return fileId;
          });
          let array = [];
          if (index == 0) {
               updatedFiles.forEach((it) => {
                    const sub = previewImageSub.cachedFileArray.find(
                         (ele) => ele.name == it
                    );
                    array.push(sub);
               });
               previewImageSub.resetPreviewPanel();
               previewImageSub.addFiles(array);
          } else {
               updatedFiles.forEach((it) => {
                    const sub = previewImageMain.cachedFileArray.find(
                         (ele) => ele.name == it
                    );
                    array.push(sub);
               });
               previewImageMain.resetPreviewPanel();
               previewImageMain.addFiles(array);
          }
     });
};