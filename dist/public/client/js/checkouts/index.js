const citis = document.getElementById("city");
const districts = document.getElementById("district");
const wards = document.getElementById("ward");
const Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "json",
};
const promise = axios(Parameter);
promise.then(function (result) {
  renderCity(result.data);
});
function renderCity(data) {
  for (const x of data) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  $(citis).selectpicker("refresh");
  citis.onchange = function () {
    districts.length = 1;
    wards.length = 1;
    if (this.value != "") {
      const result = data.filter((n) => n.Id === this.value);

      for (const k of result[0].Districts) {
        districts.options[districts.options.length] = new Option(k.Name, k.Id);
        $(districts).selectpicker("refresh");
      }
    }
  };
  districts.onchange = function () {
    wards.length = 1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(
        (n) => n.Id === this.value
      )[0].Wards;

      for (const w of dataWards) {
        wards.options[wards.options.length] = new Option(w.Name, w.Id);
        $(wards).selectpicker("refresh");
      }
    }
  };
}
// function renderCity(data) {
//   // Xóa các menu item cũ nếu cần
//   citis.innerHTML = "";

//   // Thêm menu item cho từng tỉnh/thành
//   for (const x of data) {
//     const menuItem = document.createElement("sl-option");
//     menuItem.value = x.Id;
//     menuItem.textContent = x.Name;
//     citis.appendChild(menuItem);
//   }

//   setTimeout(() => {
//     if (citis.value !== "") {
//       const result = data.filter((n) => n.Id === citis.value);
//       for (const k of result[0].Districts) {
//         const menuItem = document.createElement("sl-option");
//         menuItem.value = k.Id;
//         menuItem.textContent = k.Name;
//         districts.appendChild(menuItem);
//       }
//     }
//   }, 200);

//   citis.addEventListener("sl-change", function () {
//     districts.innerHTML = "";
//     wards.innerHTML = "";

//     if (this.value !== "") {
//       const result = data.filter((n) => n.Id === this.value);
//       for (const k of result[0].Districts) {
//         const menuItem = document.createElement("sl-option");
//         menuItem.value = k.Id;
//         menuItem.textContent = k.Name;
//         districts.appendChild(menuItem);
//       }
//     }
//   });
//   setTimeout(() => {
//     if (districts.value !== "") {
//       const dataCity = data.filter((n) => n.Id === citis.value);
//       const dataWards = dataCity[0].Districts.filter(
//         (n) => n.Id === districts.value
//       )[0].Wards;
//       for (const w of dataWards) {
//         const menuItem = document.createElement("sl-option");
//         menuItem.value = w.Id;
//         menuItem.textContent = w.Name;
//         wards.appendChild(menuItem);
//       }
//     }
//   }, 200);
//   districts.addEventListener("sl-change", function () {
//     wards.innerHTML = "";
//     const dataCity = data.filter((n) => n.Id === citis.value);
//     if (this.value !== "") {
//       const dataWards = dataCity[0].Districts.filter(
//         (n) => n.Id === this.value
//       )[0].Wards;
//       for (const w of dataWards) {
//         const menuItem = document.createElement("sl-option");
//         menuItem.value = w.Id;
//         menuItem.textContent = w.Name;
//         wards.appendChild(menuItem);
//       }
//     }
//   });
// }

const main = () => {
  const btnSubmit = document.querySelector("[btn-submit]");
  if (!btnSubmit) return;
  btnSubmit.addEventListener("click", () => {
    const link = btnSubmit.getAttribute("btn-submit");
    if (!link) return;
    const listCart = document.querySelectorAll("[cart-id]");
    if (!listCart || listCart.length == 0) return;
    showLoader();
    const fullname = document.querySelector("sl-input[name='fullname']");
    const email = document.querySelector("sl-input[name='email']");
    const phone = document.querySelector("sl-input[name='phone']");
    const address = document.querySelector("sl-input[name='address']");
    const city = document.querySelector("[id='city']");
    const district = document.querySelector("[id='district']");
    const ward = document.querySelector("[id='ward']");
    const note = document.querySelector("sl-textarea[name='note']");
    let arrayCart = [];
    listCart.forEach((cart) => {
      const id = cart.getAttribute("cart-id");
      arrayCart.push(id);
    });

    axios
      .post(link, {
        fullname: fullname.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        city: city.value,
        district: district.value,
        ward: ward.value,
        note: note.value,
        cart: arrayCart,
      })
      .then((res) => {
        if (res.status == 200) {
          const redirect = btnSubmit.getAttribute("redirect");
          const url = new URL(origin + redirect);
          url.searchParams.set("id-don-hang", res.data.newOrder);
          location.href = url.href;
        }
      })
      .catch((error) => {
        closeLoader();
        console.log(error);

        if (error.response.data && error.response.data.message) {
          localStorage.setItem(
            "alert-error",
            JSON.stringify({
              title: error.response.data.message,
              icon: "warning",
            })
          );
        }
        showAlertError();
      });
  });
};

main();
