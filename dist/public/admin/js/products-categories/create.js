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
      label: "Ảnh đại diện cho sản phẩm",
      chooseFile: "Chọn ảnh đại diện cho sản phẩm (Tối đa 2 ảnh)",
      browse: "Duyệt ảnh",
      selectedCount: "ảnh được chọn",
    },
    accept: "image/*",
  }
);

const main = () => {
  const btnSubmit = document.querySelector("[btn-create-new-product-category]");
  if (!btnSubmit) return;
  btnSubmit.addEventListener("click", () => {
    const name = document.querySelector("sl-input[name='name']");
    const parent = document.querySelector("sl-select[name='category-parent']");
    const position = document.querySelector("sl-input[name='position']");
    const status = document.querySelector("sl-radio-group[name='status']");
    const description = tinymce.get("desc").getContent();
    const link = btnSubmit.getAttribute("btn-create-new-product-category");
    if (name.value && link) {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("position", position.value);
      formData.append("status", status.value);
      formData.append("description", description);
      if (parent.value) formData.append("parentId", parent.value);

      axios.post(link, formData).then((res) => {
        if (res.status == 200) {
          localStorage.setItem(
            "alert-success",
            JSON.stringify({
              title: "Thêm danh mục thành công!",
              icon: "success",
            })
          );
          location.reload();
        }
      });
    }
  });
};

main();
