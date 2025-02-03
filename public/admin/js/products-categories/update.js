const showLoader = () => {
  const loader = document.querySelector("[wait-load]");
  loader.classList.remove("hidden");
};

const previewImageMain = new FileUploadWithPreview.FileUploadWithPreview(
  "upload-image-preview-main",
  {
    multiple: true,
    maxFileCount: 2,
    text: {
      label: "Ảnh danh mục sản phẩm",
      chooseFile: "Chọn ảnh đại diện cho sản phẩm (Tối đa 1 ảnh)",
      browse: "Duyệt ảnh",
      selectedCount: "ảnh được chọn",
    },
    accept: "image/*",
  }
);

const main = () => {
  const btnSubmit = document.querySelector("[btn-update-product-category]");
  if (!btnSubmit) return;
  btnSubmit.addEventListener("click", () => {
    const name = document.querySelector("sl-input[name='name']");
    const parent = document.querySelector("sl-select[name='category-parent']");
    const position = document.querySelector("sl-input[name='position']");
    const status = document.querySelector("sl-radio-group[name='status']");
    const description = tinymce.get("desc").getContent();
    const link = btnSubmit.getAttribute("btn-update-product-category");
    if (name.value && link) {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("position", position.value);
      formData.append("status", status.value);
      formData.append("description", description);
      if (parent.value) formData.append("parentId", parent.value);

      axios.patch(link, formData).then((res) => {
        if (res.status == 200) {
          location.reload();
          localStorage.setItem(
            "alert-success",
            JSON.stringify({
              title: "Cập nhật thành công!",
              icon: "success",
            })
          );
        }
      });
    }
  });
};

main();
