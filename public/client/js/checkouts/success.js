const main = () => {
  const address = document.getElementById("address");
  if (!address) return;
  const city = address.getAttribute("city");
  const district = address.getAttribute("district");
  const ward = address.getAttribute("ward");

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

// const qrcode = () => {
//   document.addEventListener("DOMContentLoaded", () => {
//     const qr = document.querySelector("sl-qr-code[qr-code-order]");
//     const canvas = shadowRoot.querySelector("canvas");
//     if (!canvas) return;
//     const btnDow = document.querySelector("sl-button[download]");
//     // setTimeout(() => {
//     //   copyQrCodeFunction();
//     // }, 1000);
//     console.log(btnDow);
//     qr.value = location.href;
//     qr.attachShadow({ mode: "open" });
//     const shadowRoot = qr.shadowRoot;

//     btnDow.href = canvas.toDataURL();
//     const copyQrCode = document.querySelector("sl-copy-button[copy-qr-code]");
//     if (!copyQrCode) return;
//     copyQrCode.addEventListener("click", async () => {
//       const response = await fetch(btnDow.href);
//       const blob = await response.blob();
//       const ctx = canvas.getContext("2d");

//       const imageBitmap = await createImageBitmap(blob);
//       canvas.width = imageBitmap.width;
//       canvas.height = imageBitmap.height;
//       ctx.drawImage(imageBitmap, 0, 0);

//       canvas.toBlob(async (blob) => {
//         const data = [new ClipboardItem({ "image/png": blob })];
//         console.log(data);

//         await navigator.clipboard.write(data);
//       }, "image/png");
//     });
//   });
// };

// qrcode();
const copyQrCodeFunction = async () => {
  const qrcode = document.querySelector("[qr-code-order]");
  const eleQr = document.createElement("sl-qr-code");
  eleQr.setAttribute("radius", "0.5");
  eleQr.setAttribute("size", "100");
  eleQr.setAttribute("value", location.href);
  qrcode.appendChild(eleQr);
  setTimeout(() => {
    const shadowRoot = eleQr.shadowRoot;
    const canvas = shadowRoot.querySelector("canvas");
    // const copyQrCode = document.querySelector("sl-copy-button[copy-qr-code]");
    const parentCopy = document.querySelector("[copy-qr-code]");
    const copyQrCode = document.createElement("sl-copy-butto");
    copyQrCode.setAttribute("copy-label", "Sao chéo hình ảnh");
    copyQrCode.setAttribute("success-label", "Đã sao chép!");
    copyQrCode.setAttribute(
      "error-label",
      "Lỗi sao chép, xin lỗi vì điều bất tiện này!"
    );
    parentCopy.appendChild(copyQrCode);
    copyQrCode.addEventListener("click", async () => {
      // Code copy ảnh từ canvas (phần xử lý copy)
      const response = await fetch(location.href);
      const blob = await response.blob();
      const ctx = canvas.getContext("2d");

      console.log(blob);
      canvas.toBlob(async (blob) => {
        const data = [new ClipboardItem({ "image/png": blob })];
        console.log(data);
        await navigator.clipboard.write(data);
      }, "image/png");
    });
  }, 200);
  return;
  if (!copyQrCode) return;

  // Giả sử component phát ra sự kiện 'ready' khi shadow DOM được tạo
  eleQr.addEventListener("ready", () => {
    const shadowRoot = eleQr.shadowRoot;
    const canvas = shadowRoot && shadowRoot.querySelector("canvas");
    console.log(canvas);

    if (!canvas) return;
  });
};
copyQrCodeFunction();
