const previewImageMain = new FileUploadWithPreview.FileUploadWithPreview(
  "upload-image-preview-main",
  {
    multiple: true,
    maxFileCount: 2,
    text: {
      label: "Ảnh đại diện cho sản phẩm",
      chooseFile: "Chọn ảnh đại diện cho sản phẩm (Tối đa 2 file)", // Nút chọn file (chính)
      browse: "Duyệt ảnh", // Nút duyệt file
      selectedCount: "ảnh được chọn",
    },
    accept: "image/*",
  }
);

const previewImageSub = new FileUploadWithPreview.FileUploadWithPreview(
  "upload-image-preview-sub",
  {
    multiple: true,
    maxFileCount: 10,
    text: {
      label: "Ảnh sản phẩm",
      chooseFile: "Chọn ảnh cho sản phẩm (Tối đa 10 ảnh)", // Nút chọn file (chính)
      browse: "Duyệt ảnh", // Nút duyệt file
      selectedCount: "ảnh được chọn (Tối đa 10 ảnh)",
    },
    accept: "image/*",
  }
);
// const setCookie = (name, value, days) => {
//      const expires = days ?
//           `expires=${new Date(
//         Date.now() + days * 24 * 60 * 60 * 1000
//       ).toUTCString()};` :
//           "";
//      document.cookie = `${name}=${value}; ${expires}`;
// };
setTimeout(() => {
  axios.get(location.pathname + "/getImage").then(async (res) => {
    if (res.data.images_main && res.data.images_sub) {
      const addPath = async (array, preview) => {
        for await (const path of array) {
          try {
            const defaultType = "image/jpeg";
            const response = await fetch(path, {
              mode: "cors",
            });
            const blob = await response.blob();
            const file = new File([blob], "preset-file", {
              type: blob.type || defaultType,
            });
            preview.addFiles([file]);
          } catch (error) {
            if (error instanceof Error) {
              console.warn(`${error.message.toString()}`);
            }

            console.warn("Image cannot be added to the cachedFileArray.");
          }
        }
      };
      await addPath(res.data.images_main, previewImageMain);
      await addPath(res.data.images_sub, previewImageSub);

      async function loadImages(preview, imageUrls) {
        // setTimeout(async () => {
        //      for (const url of imageUrls) {
        //           console.log(url);
        //           await preview.addImagesFromPath([url]);
        //      }
        // }, 1000);
      }
      // loadImages(previewImageMain, res.data.images_main)
      // loadImages(previewImageSub, res.data.images_sub)

      // previewImageMain.addImagesFromPath(res.data.images_main);
      // previewImageSub.addImagesFromPath(res.data.images_sub);
      // setCookie("images_main", JSON.stringify(res.data.images_main_id));
      // setCookie("images_sub", JSON.stringify(res.data.images_sub_id));
    }
  });
}, 0);

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
// const getCookie = (cookieName) => {
//      // Tách chuỗi thành một mảng các cặp name/value
//      let cookieArray = document.cookie.split("; ");
//      // Chuyển name/value từ dạng string thành object
//      cookieArray = cookieArray.map((item) => {
//           item = item.split("=");
//           return {
//                name: item[0],
//                value: item[1],
//           };
//      });
//      // Lấy ra cookie đang cần tìm
//      const cookie = cookieArray.find((item) => {
//           return item.name === cookieName;
//      });

//      return cookie ? cookie.value : null;
// };
// window.addEventListener(FileUploadWithPreview.Events.IMAGE_DELETED, (e) => {
//      if (e.detail.uploadId == "upload-image-preview-main") {
//           const main = JSON.parse(getCookie("images_main"));
//           main.splice(e.detail.index, 1);
//           setCookie("images_main", JSON.stringify(main));
//      }
//      if (e.detail.uploadId == "upload-image-preview-sub") {
//           const sub = JSON.parse(getCookie("images_sub"));
//           sub.splice(e.detail.index, 1);
//           setCookie("images_sub", JSON.stringify(sub));
//      }
// });

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
  const btnUpdateProduct = document.querySelector("[btn-update-product]");
  const link = btnUpdateProduct.getAttribute("btn-update-product");
  if (!btnUpdateProduct) return;
  BAT_SU_KIEN_THAY_DOI_GIA();
  btnUpdateProduct.addEventListener("click", async () => {
    showLoader();
    updateFileOrder();
    const formData = new FormData();

    previewImageMain.cachedFileArray.forEach((it, index) => {
      console.log(it);

      formData.append("images_main", it);
      // if (index >= JSON.parse(getCookie("images_main")).length) {
      //      formData.append("images_main", it);
      // }
    });
    previewImageSub.cachedFileArray.forEach((it, index) => {
      formData.append("images_sub", it);
      // if (index >= JSON.parse(getCookie("images_sub")).length) {
      //      formData.append("images_sub", it);
      // }
    });

    const name = document.querySelector("sl-input[name='name-product']");
    const categoryId = document.querySelector(
      "sl-select[name='category-parent']"
    );
    const slug = document.querySelector("sl-input[name='slug']");
    const position = document.querySelector("sl-input[name='position']");
    const status = document.querySelector(
      "sl-radio-group[name='status-product']"
    );
    const featured = document.querySelector("sl-radio-group[name='featured']");

    formData.append("name", name.value);
    formData.append("categoryId", JSON.stringify(categoryId.value));
    formData.append("slug", slug.value);
    formData.append("position", position.value);
    formData.append("status", status.value);
    formData.append("featured", featured.value);
    formData.append("descriptionShort", tinymce.get("desc-short").getContent());
    formData.append("description", tinymce.get("desc").getContent());

    {
      const variant = await dataSendBackEndVariant();

      formData.append("bien_the", JSON.stringify(variant));
    }

    // formData.append("images_main_id", getCookie("images_main"));
    // formData.append("images_sub_id", getCookie("images_sub"));

    axios.patch(link, formData).then((res) => {
      if (res.status == 200) {
        localStorage.setItem(
          "alert-success",
          JSON.stringify({
            title: "Cập nhật thành công!",
            icon: "success",
          })
        );
        previewImageMain.resetPreviewPanel();
        previewImageSub.resetPreviewPanel();
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
    tr.innerHTML = trRoot.innerHTML;
    {
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
    const id = it.getAttribute("product-item-id");
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
      if (id) data.id = id;
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
        const sub = previewImageMain.cachedFileArray.find(
          (ele) => ele.name == it
        );
        array.push(sub);
      });
      previewImageMain.resetPreviewPanel();
      previewImageMain.addFiles(array);
    } else {
      updatedFiles.forEach((it) => {
        const sub = previewImageSub.cachedFileArray.find(
          (ele) => ele.name == it
        );
        array.push(sub);
      });
      previewImageSub.resetPreviewPanel();
      previewImageSub.addFiles(array);
    }
  });
};
