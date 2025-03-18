function OTPInput() {
  const inputs = document.querySelectorAll("#otp > *[id]");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keydown", function (event) {
      if (event.key === "Backspace") {
        inputs[i].value = "";
        if (i !== 0) inputs[i - 1].focus();
      } else {
        if (i === inputs.length - 1 && inputs[i].value !== "") {
          return true;
        } else if (event.keyCode > 47 && event.keyCode < 58) {
          inputs[i].value = event.key;
          if (i !== inputs.length - 1) inputs[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode > 64 && event.keyCode < 91) {
          inputs[i].value = String.fromCharCode(event.keyCode);
          if (i !== inputs.length - 1) inputs[i + 1].focus();
          event.preventDefault();
        }
      }
    });
  }
}
OTPInput();

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  var time = 60 * 3,
    display = document.querySelector("#time");
  startTimer(time, display);
};

const main = () => {
  const submit = document.querySelector("[button-submit]");
  if (!submit) return;
  submit.addEventListener("click", () => {
    const link = submit.getAttribute("button-submit");
    if (!link) return;
    const email = document.querySelector("input[name='email']");
    const listCode = document.querySelectorAll("#otp > *[id]");
    let code = "";
    [...listCode].forEach((input) => (code += input.value));
    showLoader();
    axios
      .post(link, {
        email: email.value,
        code: code,
      })
      .then((res) => {
        if (res.data.code == 200) {
          const redirect = submit.getAttribute("redirect");
          location.href = `${redirect}?email=${res.data.email}`;
        }
      })
      .catch((error) => {
        closeLoader();

        localStorage.setItem(
          "alert-error",
          JSON.stringify({
            title: error.response.data.message,
            icon: "warning",
          })
        );
        showAlertError();
      });
  });
};

main();
