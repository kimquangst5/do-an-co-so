const main = () => {
  const address = document.getElementById("address");
  if (!address) return;
  const city = address.getAttribute("city");
  const district = address.getAttribute("district");
  const ward = address.getAttribute("ward");
  console.log(ward);

  console.log(city);
  console.log(district);
  console.log(ward);

  const Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
    method: "GET",
    responseType: "json",
  };
  const promise = axios(Parameter);
  //Xử lý khi request thành công
  promise.then(function (result) {
    let add = [];
    result.data.forEach((it) => {
      if (parseInt(it.Id) == parseInt(city)) {
        add.push(it.Name);
        it.Districts.forEach((dis) => {
          if (parseInt(dis.Id) == parseInt(district)) {
            add.push(dis.Name);
            dis.Wards.forEach((war) => {
              if (parseInt(war.Id) == parseInt(ward)) {
                add.push(war.Name);
                return;
              }
            });
            return;
          }
        });
        return;
      }
    });
    address.innerHTML = `${address.innerHTML}, ${add.reverse().join(", ")}`;
  });
};

main();

const qrcode = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const qr = document.querySelector("sl-qr-code[qr-code-order]");
    qr.value = location.href;
    qr.attachShadow({ mode: "open" });
    const shadowRoot = qr.shadowRoot;
    setTimeout(async () => {
      const canvas = shadowRoot.querySelector("canvas");
      if (!canvas) return;
      const btnDow = document.querySelector("sl-button[download]");
      btnDow.href = canvas.toDataURL();
      const copyQrCode = document.querySelector("sl-copy-button[copy-qr-code]");
      if (!copyQrCode) return;
      copyQrCode.addEventListener("click", async () => {
        const response = await fetch(btnDow.href);
        const blob = await response.blob();
        const ctx = canvas.getContext("2d");

        const imageBitmap = await createImageBitmap(blob);
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        ctx.drawImage(imageBitmap, 0, 0);

        canvas.toBlob(async (blob) => {
          const data = [new ClipboardItem({ "image/png": blob })];
          await navigator.clipboard.write(data);
        }, "image/png");
      });
    }, 200);
  });
};

qrcode();
