const main = () => {
  const btnCreateColorProduct = document.querySelector(
    "[btn-create-size-product]"
  );
  if (!btnCreateColorProduct) return;
  const parentItem = document.querySelector("[parent]");
  btnCreateColorProduct.addEventListener("click", () => {
    const div = document.createElement("div");
    div.setAttribute("items-size-product", "");
    div.innerHTML = `<div class="flex w-full justify-between items-center"><sl-switch checked="" value="status" size="medium" form="" data-optional="" data-valid="">Trạng thái</sl-switch><sl-input label="Kích thước" size="small" name="name"  type="text" form="" data-optional="" data-valid="" data-user-valid=""></sl-input><sl-input label="Đường dẫn" size="small" name="slug" type="text" form="" data-optional="" data-valid="" data-user-valid=""></sl-input><sl-icon class="text-[red] cursor-pointer" name="trash" aria-hidden="true" library="default"></sl-icon></div>`;
    const icon = div.querySelector("sl-icon");
    icon.addEventListener("click", () => {
      parentItem.removeChild(div);
    });
    parentItem.appendChild(div);
  });
  const listItem = document.querySelectorAll("[items-size-product]");
  if (listItem.length > 0) {
    listItem.forEach((it) => {
      const trash = it.querySelector("sl-icon");
      trash.addEventListener("click", () => {
        parentItem.removeChild(it);
      });
    });
  }

  const btnUpdateColorProduct = document.querySelector(
    "[btn-update-size-product]"
  );
  if (!btnUpdateColorProduct) return;
  const link = btnUpdateColorProduct.getAttribute("btn-update-size-product");
  btnUpdateColorProduct.addEventListener("click", () => {
    const listItem = document.querySelectorAll("[items-size-product]");
    const listData = [];
    listItem.forEach((it) => {
      const id = it.getAttribute("items-size-product");
      const status = it.querySelector("sl-switch").checked;
      const name = it.querySelector("sl-input[name='name']");
      const slug = it.querySelector("sl-input[name='slug']");
      const data = {
        id,
        status: status == true ? "active" : "inactive",
        name: name.value,
      };
      if (slug && slug.value) {
        data.slug = slug.value;
      }
      if (name && name.value) listData.push(data);
    });

    axios.patch(link, listData).then((res) => {
      if (res.status == 200) {
        location.reload();
      }
    });
  });
};
main();
